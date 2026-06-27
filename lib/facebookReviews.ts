import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { db } from './initFirebase';
import type { FacebookReview } from '@/types/facebookReview';

const COLLECTION_NAME = 'facebookReviews';

function removeUndefinedFields<T extends Record<string, unknown>>(data: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined)
  ) as Partial<T>;
}

export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function getRandomReviews(reviews: FacebookReview[], count = 9) {
  return shuffleArray(reviews).slice(0, count);
}

export async function getActiveFacebookReviews(): Promise<FacebookReview[]> {
  const reviewsQuery = query(
    collection(db, COLLECTION_NAME),
    where('isActive', '==', true)
  );

  const snapshot = await getDocs(reviewsQuery);

  return snapshot.docs.map((reviewDoc) => ({
    id: reviewDoc.id,
    ...reviewDoc.data(),
  })) as FacebookReview[];
}

export async function getAllFacebookReviews(): Promise<FacebookReview[]> {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));

  return snapshot.docs.map((reviewDoc) => ({
    id: reviewDoc.id,
    ...reviewDoc.data(),
  })) as FacebookReview[];
}

export async function createFacebookReview(review: Omit<FacebookReview, 'id' | 'createdAt' | 'updatedAt'>) {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...removeUndefinedFields(review),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function updateFacebookReview(id: string, review: Partial<Omit<FacebookReview, 'id' | 'createdAt'>>) {
  await updateDoc(doc(db, COLLECTION_NAME, id), {
    ...removeUndefinedFields(review),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteFacebookReview(id: string) {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}
