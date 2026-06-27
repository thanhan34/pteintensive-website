import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './initFirebase';
import type { PteLead } from '@/types/pteLead';

const COLLECTION_NAME = 'pteLeads';

export async function createPteLead(lead: Pick<PteLead, 'name' | 'phone' | 'target' | 'source' | 'status'>) {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...lead,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}