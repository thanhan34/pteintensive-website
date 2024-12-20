import { Teacher } from '@/lib/teacherData';
import { db } from '@/lib/initFirebase';
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export type { Teacher };

export const teacherService = {
  getAllTeachers: async (): Promise<Teacher[]> => {
    try {
      const teachersRef = collection(db, 'teachers');
      const snapshot = await getDocs(teachersRef);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Teacher));
    } catch (error) {
      console.error('Error getting teachers:', error);
      throw error;
    }
  },

  addTeacher: async (teacherData: Omit<Teacher, 'id'>): Promise<void> => {
    try {
      const teachersRef = collection(db, 'teachers');
      const newTeacherRef = doc(teachersRef);
      await setDoc(newTeacherRef, {
        ...teacherData,
        qualifications: teacherData.qualifications || [],
        position: teacherData.position || '',
        specialization: teacherData.specialization || '',
        currentWork: teacherData.currentWork || '',
        location: teacherData.location || '',
        hobbies: teacherData.hobbies || '',
        quotes: teacherData.quotes || [],
        achievements: teacherData.achievements || []
      });
    } catch (error) {
      console.error('Error adding teacher:', error);
      throw error;
    }
  },

  updateTeacher: async (id: string, teacherData: Partial<Teacher>): Promise<void> => {
    try {
      const teacherRef = doc(db, 'teachers', id);
      await updateDoc(teacherRef, teacherData);
    } catch (error) {
      console.error('Error updating teacher:', error);
      throw error;
    }
  },

  deleteTeacher: async (id: string): Promise<void> => {
    try {
      const teacherRef = doc(db, 'teachers', id);
      await deleteDoc(teacherRef);
    } catch (error) {
      console.error('Error deleting teacher:', error);
      throw error;
    }
  }
};
