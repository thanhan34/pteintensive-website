import { db, database } from './initFirebase';
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Query,
  DocumentData
} from 'firebase/firestore';
import { ref, onValue } from 'firebase/database';

// Re-export db
export { db };

// Connection state monitoring
export const onConnectionStateChange = (callback: (isOnline: boolean) => void) => {
  if (typeof window !== 'undefined') {
    // Browser-side connection monitoring
    const handleOnline = () => callback(true);
    const handleOffline = () => callback(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Firebase Realtime Database connection monitoring
    const connectedRef = ref(database, '.info/connected');
    onValue(connectedRef, (snap) => {
      callback(!!snap.val());
    });

    // Initial state
    callback(navigator.onLine);

    // Return cleanup function
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }
  return () => {}; // Return empty cleanup function for non-browser environments
};

// Generic function to get all documents from a collection
export async function getCollection<T extends DocumentData>(collectionName: string): Promise<(T & { id: string })[]> {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as (T & { id: string })[];
}

// Generic function to get a single document
export async function getDocument<T extends DocumentData>(collectionName: string, docId: string): Promise<(T & { id: string }) | null> {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as T & { id: string };
  }
  return null;
}

// Generic function to add a document
export async function addDocument(collectionName: string, data: DocumentData): Promise<string> {
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef.id;
}

// Generic function to update a document
export async function updateDocument(collectionName: string, docId: string, data: DocumentData): Promise<void> {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, data);
}

// Generic function to delete a document
export async function deleteDocument(collectionName: string, docId: string): Promise<void> {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
}

interface QueryCondition {
  field: string;
  operator: '<' | '<=' | '==' | '!=' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any' | 'not-in';
  value: unknown;
}

// Generic function to query documents
export async function queryDocuments<T extends DocumentData>(
  collectionName: string,
  conditions: QueryCondition[],
  orderByField?: string,
  orderDirection: 'asc' | 'desc' = 'asc'
): Promise<(T & { id: string })[]> {
  const collectionRef = collection(db, collectionName);
  let queryRef: Query = collectionRef;

  // Add where clauses
  conditions.forEach(condition => {
    queryRef = query(queryRef, where(condition.field, condition.operator, condition.value));
  });

  // Add orderBy if specified
  if (orderByField) {
    queryRef = query(queryRef, orderBy(orderByField, orderDirection));
  }

  const querySnapshot = await getDocs(queryRef);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as (T & { id: string })[];
}
