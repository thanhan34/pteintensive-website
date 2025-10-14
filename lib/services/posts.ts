import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  Timestamp,
  QueryDocumentSnapshot,
  DocumentData,
  increment,
} from 'firebase/firestore';
import { db } from '@/lib/initFirebase';
import { Post, PostFormData, PostQuery, PaginatedResponse, PostStatus } from '@/lib/types/blog';
import { slugify, generateUniqueSlug } from '@/lib/utils/slugify';

const POSTS_COLLECTION = 'posts';

// Helper function to calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Helper function to generate excerpt from content
function generateExcerpt(content: string, maxLength: number = 160): string {
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Remove markdown headers
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove markdown links
    .replace(/[*_~`]/g, '') // Remove markdown formatting
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.substring(0, maxLength).trim() + '...';
}

export class PostsService {
  // Get all posts with pagination and filtering
  static async getPosts(
    queryParams: PostQuery = {},
    lastDoc?: QueryDocumentSnapshot<DocumentData>
  ): Promise<PaginatedResponse<Post>> {
    const {
      status = ['published'],
      category,
      tag,
      author,
      search,
      limit: limitCount = 10,
      orderBy: orderByField = 'publishedAt',
      orderDirection = 'desc',
      sticky,
    } = queryParams;

    let q = query(collection(db, POSTS_COLLECTION));

    // Filter by status
    if (status.length > 0) {
      q = query(q, where('status', 'in', status));
    }

    // Filter by category
    if (category) {
      q = query(q, where('category', '==', category));
    }

    // Filter by tag
    if (tag) {
      q = query(q, where('tags', 'array-contains', tag));
    }

    // Filter by author
    if (author) {
      q = query(q, where('author.uid', '==', author));
    }

    // Filter by sticky
    if (sticky !== undefined) {
      q = query(q, where('sticky', '==', sticky));
    }

    // Order by field
    q = query(q, orderBy(orderByField, orderDirection));

    // Pagination
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    q = query(q, limit(limitCount + 1)); // Get one extra to check if there's more

    const snapshot = await getDocs(q);
    const posts = snapshot.docs.slice(0, limitCount).map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];

    // Filter by search term (client-side for now)
    let filteredPosts = posts;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    const hasNext = snapshot.docs.length > limitCount;

    return {
      data: filteredPosts,
      pagination: {
        page: 1, // This would need to be calculated based on offset
        limit: limitCount,
        total: filteredPosts.length, // This would need a separate count query
        totalPages: Math.ceil(filteredPosts.length / limitCount),
        hasNext,
        hasPrev: false, // This would need to be calculated
      },
    };
  }

  // Get single post by slug
  static async getPostBySlug(slug: string): Promise<Post | null> {
    const docRef = doc(db, POSTS_COLLECTION, slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Post;
    }

    // Check for redirects from previous slugs
    const redirectQuery = query(
      collection(db, POSTS_COLLECTION),
      where('prevSlugs', 'array-contains', slug)
    );
    const redirectSnapshot = await getDocs(redirectQuery);

    if (!redirectSnapshot.empty) {
      const redirectDoc = redirectSnapshot.docs[0];
      return {
        id: redirectDoc.id,
        ...redirectDoc.data(),
      } as Post;
    }

    return null;
  }

  // Create new post
  static async createPost(
    postData: PostFormData,
    authorUid: string,
    authorDisplayName: string,
    authorPhotoURL?: string
  ): Promise<string> {
    // Generate slug if not provided or invalid
    let slug = postData.slug || slugify(postData.title);
    
    // Check if slug already exists
    const existingSlugs = await this.getAllSlugs();
    slug = generateUniqueSlug(slug, existingSlugs);

    // Calculate reading time
    const readingMinutes = calculateReadingTime(postData.content);

    // Generate excerpt if not provided
    const excerpt = postData.excerpt || generateExcerpt(postData.content);

    const post: Record<string, unknown> = {
      title: postData.title,
      slug,
      excerpt,
      content: postData.content,
      tags: postData.tags || [],
      status: postData.status,
      sticky: postData.sticky || false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      author: {
        uid: authorUid,
        displayName: authorDisplayName,
      },
      readingMinutes,
      views: 0,
      revision: 1,
      prevSlugs: [],
    };

    // Only add fields if they have values
    if (postData.coverImageUrl) {
      post.coverImageUrl = postData.coverImageUrl;
    }
    
    if (postData.category) {
      post.category = postData.category;
    }
    
    if (postData.series) {
      post.series = postData.series;
    }
    
    if (postData.password) {
      post.passwordHash = await this.hashPassword(postData.password);
    }
    
    if (postData.status === 'published') {
      post.publishedAt = postData.publishedAt 
        ? Timestamp.fromDate(postData.publishedAt) 
        : serverTimestamp();
    }
    
    if (authorPhotoURL) {
      (post.author as { uid: string; displayName: string; photoURL?: string }).photoURL = authorPhotoURL;
    }
    
    if (postData.seo) {
      post.seo = postData.seo;
    }

    // Use slug as document ID
    const docRef = doc(db, POSTS_COLLECTION, slug);
    await setDoc(docRef, post);

    return slug;
  }

  // Update existing post
  static async updatePost(
    slug: string,
    postData: Partial<PostFormData>
  ): Promise<void> {
    const docRef = doc(db, POSTS_COLLECTION, slug);
    const currentPost = await this.getPostBySlug(slug);

    if (!currentPost) {
      throw new Error('Post not found');
    }

    const updates: Record<string, string | number | boolean | object | undefined> = {
      updatedAt: serverTimestamp(),
      revision: (currentPost.revision || 0) + 1,
    };

    // Update fields if provided
    if (postData.title !== undefined) {
      updates.title = postData.title;
    }

    if (postData.excerpt !== undefined) {
      updates.excerpt = postData.excerpt;
    }

    if (postData.content !== undefined) {
      updates.content = postData.content;
      updates.readingMinutes = calculateReadingTime(postData.content);
    }

    if (postData.coverImageUrl !== undefined) {
      updates.coverImageUrl = postData.coverImageUrl;
    }

    if (postData.tags !== undefined) {
      updates.tags = postData.tags;
    }

    if (postData.category !== undefined) {
      updates.category = postData.category;
    }

    if (postData.series !== undefined) {
      updates.series = postData.series;
    }

    if (postData.status !== undefined) {
      updates.status = postData.status;
      
      // Set publishedAt when publishing
      if (postData.status === 'published' && currentPost.status !== 'published') {
        updates.publishedAt = postData.publishedAt 
          ? Timestamp.fromDate(postData.publishedAt)
          : serverTimestamp();
      }
    }

    if (postData.sticky !== undefined) {
      updates.sticky = postData.sticky;
    }

    if (postData.password !== undefined) {
      updates.passwordHash = postData.password 
        ? await this.hashPassword(postData.password)
        : undefined;
    }

    if (postData.seo !== undefined) {
      updates.seo = postData.seo;
    }

    // Handle slug change
    if (postData.slug && postData.slug !== slug) {
      const newSlug = slugify(postData.slug);
      const existingSlugs = await this.getAllSlugs();
      const finalSlug = generateUniqueSlug(newSlug, existingSlugs.filter(s => s !== slug));

      if (finalSlug !== slug) {
        // Create new document with new slug
        const newDocRef = doc(db, POSTS_COLLECTION, finalSlug);
        const newPost = {
          ...currentPost,
          ...updates,
          slug: finalSlug,
          prevSlugs: [...(currentPost.prevSlugs || []), slug],
        };
        
        await setDoc(newDocRef, newPost);
        
        // Delete old document
        await deleteDoc(docRef);
        
        return;
      }
    }

    await updateDoc(docRef, updates);
  }

  // Delete post
  static async deletePost(slug: string): Promise<void> {
    const docRef = doc(db, POSTS_COLLECTION, slug);
    await deleteDoc(docRef);
  }

  // Increment view count
  static async incrementViews(slug: string): Promise<void> {
    const docRef = doc(db, POSTS_COLLECTION, slug);
    await updateDoc(docRef, {
      views: increment(1),
    });
  }

  // Get related posts
  static async getRelatedPosts(post: Post, limitCount: number = 3): Promise<Post[]> {
    let q = query(
      collection(db, POSTS_COLLECTION),
      where('status', '==', 'published')
    );

    // Try to find posts in the same category first
    if (post.category) {
      q = query(q, where('category', '==', post.category));
    }

    q = query(q, orderBy('publishedAt', 'desc'), limit(limitCount));

    const snapshot = await getDocs(q);
    const mappedPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Post[];
    let relatedPosts = mappedPosts.filter((p: Post) => p.id !== post.id);

    // If not enough posts in same category, get posts with similar tags
    if (relatedPosts.length < limitCount && post.tags.length > 0) {
      const remainingLimit = limitCount - relatedPosts.length;
      const tagQuery = query(
        collection(db, POSTS_COLLECTION),
        where('status', '==', 'published'),
        where('tags', 'array-contains-any', post.tags),
        orderBy('publishedAt', 'desc'),
        limit(remainingLimit * 2) // Get more to filter out duplicates
      );

      const tagSnapshot = await getDocs(tagQuery);
      const tagMappedPosts = tagSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Post[];
      const tagPosts = tagMappedPosts
        .filter((p: Post) => p.id !== post.id && !relatedPosts.some(rp => rp.id === p.id))
        .slice(0, remainingLimit);

      relatedPosts = [...relatedPosts, ...tagPosts];
    }

    return relatedPosts.slice(0, limitCount);
  }

  // Get all slugs (for slug uniqueness check)
  private static async getAllSlugs(): Promise<string[]> {
    const snapshot = await getDocs(collection(db, POSTS_COLLECTION));
    return snapshot.docs.map(doc => doc.id);
  }

  // Hash password for password-protected posts
  private static async hashPassword(password: string): Promise<string> {
    // Simple hash for demo - in production, use proper hashing
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Verify password for password-protected posts
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    const hashedInput = await this.hashPassword(password);
    return hashedInput === hash;
  }

  // Get posts by status
  static async getPostsByStatus(status: PostStatus[]): Promise<Post[]> {
    const q = query(
      collection(db, POSTS_COLLECTION),
      where('status', 'in', status),
      orderBy('updatedAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];
  }

  // Get posts by author
  static async getPostsByAuthor(authorUid: string): Promise<Post[]> {
    const q = query(
      collection(db, POSTS_COLLECTION),
      where('author.uid', '==', authorUid),
      orderBy('updatedAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];
  }

  // Search posts
  static async searchPosts(searchTerm: string): Promise<Post[]> {
    // For now, get all published posts and filter client-side
    // In production, consider using Algolia or similar for better search
    const q = query(
      collection(db, POSTS_COLLECTION),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    );

    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];

    const searchLower = searchTerm.toLowerCase();
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }
}
