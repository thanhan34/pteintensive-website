import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export interface Teacher {
  id: string;
  name: string;
  image: string;
  experience: string;
  achievements: string[];
}

const COLLECTION_NAME = 'teachers';

export const teacherService = {
  // Get all teachers
  async getAllTeachers(): Promise<Teacher[]> {
    const teachersCol = collection(db, COLLECTION_NAME);
    const teacherSnapshot = await getDocs(teachersCol);
    return teacherSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Teacher));
  },

  // Add a new teacher
  async addTeacher(teacher: Omit<Teacher, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), teacher);
    return docRef.id;
  },

  // Update a teacher
  async updateTeacher(id: string, teacher: Partial<Teacher>): Promise<void> {
    const teacherRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(teacherRef, teacher);
  },

  // Delete a teacher
  async deleteTeacher(id: string): Promise<void> {
    const teacherRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(teacherRef);
  }
};
