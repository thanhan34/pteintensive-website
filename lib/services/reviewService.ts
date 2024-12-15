import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export interface Review {
  id: string;
  name: string;
  image: string;
  rating: number;
  comment: string;
  course: string;
}

const COLLECTION_NAME = 'reviews';

export const reviewService = {
  // Get all reviews
  async getAllReviews(): Promise<Review[]> {
    const reviewsCol = collection(db, COLLECTION_NAME);
    const reviewSnapshot = await getDocs(reviewsCol);
    return reviewSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Review));
  },

  // Add a new review
  async addReview(review: Omit<Review, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), review);
    return docRef.id;
  },

  // Update a review
  async updateReview(id: string, review: Partial<Review>): Promise<void> {
    const reviewRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(reviewRef, review);
  },

  // Delete a review
  async deleteReview(id: string): Promise<void> {
    const reviewRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(reviewRef);
  }
};
