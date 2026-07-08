import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/lib/initFirebase';
import { User, UserRole } from '@/lib/types/blog';

const USERS_COLLECTION = 'users';

export const USER_ROLES: UserRole[] = [
  'admin',
  'editor',
  'author',
  'contributor',
  'subscriber',
];

export class UsersService {
  static async getUsers(): Promise<User[]> {
    const usersQuery = query(
      collection(db, USERS_COLLECTION),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(usersQuery);

    return snapshot.docs.map((userDoc) => ({
      uid: userDoc.id,
      ...userDoc.data(),
    })) as User[];
  }

  static async updateUserRoles(uid: string, roles: UserRole[]): Promise<void> {
    const uniqueRoles = Array.from(new Set(roles));

    if (uniqueRoles.length === 0) {
      throw new Error('User phải có ít nhất một role.');
    }

    await updateDoc(doc(db, USERS_COLLECTION, uid), {
      roles: uniqueRoles,
      updatedAt: serverTimestamp(),
    });
  }
}