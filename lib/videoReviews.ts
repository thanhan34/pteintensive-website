import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { db } from './initFirebase';
import type { VideoReview } from '@/types/videoReview';

const COLLECTION_NAME = 'videoReviews';

function removeUndefinedFields<T extends Record<string, any>>(data: T) {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined)
  ) as T;
}

function sortVideoReviews(reviews: VideoReview[]) {
  return [...reviews].sort((a, b) => {
    const orderA = typeof a.displayOrder === 'number' ? a.displayOrder : Number.MAX_SAFE_INTEGER;
    const orderB = typeof b.displayOrder === 'number' ? b.displayOrder : Number.MAX_SAFE_INTEGER;

    if (orderA !== orderB) return orderA - orderB;
    return (a.name || '').localeCompare(b.name || '', 'vi');
  });
}

export function buildFacebookVideoEmbedUrl(videoUrl: string) {
  const trimmedUrl = videoUrl.trim();

  if (!trimmedUrl) return '';
  if (trimmedUrl.includes('facebook.com/plugins/video.php')) return trimmedUrl;

  return `https://www.facebook.com/plugins/video.php?height=476&href=${encodeURIComponent(trimmedUrl)}&show_text=false&width=267&t=0`;
}

export async function getActiveVideoReviews(): Promise<VideoReview[]> {
  const reviewsQuery = query(
    collection(db, COLLECTION_NAME),
    where('isActive', '==', true)
  );

  const snapshot = await getDocs(reviewsQuery);
  const reviews = snapshot.docs.map((reviewDoc) => ({
    id: reviewDoc.id,
    ...reviewDoc.data(),
  })) as VideoReview[];

  return sortVideoReviews(reviews);
}

export async function getAllVideoReviews(): Promise<VideoReview[]> {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  const reviews = snapshot.docs.map((reviewDoc) => ({
    id: reviewDoc.id,
    ...reviewDoc.data(),
  })) as VideoReview[];

  return sortVideoReviews(reviews);
}

export async function createVideoReview(review: Omit<VideoReview, 'id' | 'createdAt' | 'updatedAt'>) {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...removeUndefinedFields(review),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function updateVideoReview(id: string, review: Partial<Omit<VideoReview, 'id' | 'createdAt'>>) {
  await updateDoc(doc(db, COLLECTION_NAME, id), {
    ...removeUndefinedFields(review),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteVideoReview(id: string) {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}