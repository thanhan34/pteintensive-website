import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export interface CourseDetail {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  aboutCourse: {
    targetAudience: string[];
    courseInfo: string[];
    benefits: string[];
  };
}

const COLLECTION_NAME = 'courses';

export const courseService = {
  // Get all courses
  async getAllCourses(): Promise<CourseDetail[]> {
    const coursesCol = collection(db, COLLECTION_NAME);
    const courseSnapshot = await getDocs(coursesCol);
    return courseSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as CourseDetail));
  },

  // Get course by slug
  async getCourseBySlug(slug: string): Promise<CourseDetail | null> {
    const coursesCol = collection(db, COLLECTION_NAME);
    const courseSnapshot = await getDocs(coursesCol);
    const course = courseSnapshot.docs.find(doc => doc.data().slug === slug);
    
    if (!course) return null;
    
    return {
      id: course.id,
      ...course.data()
    } as CourseDetail;
  },

  // Add a new course
  async addCourse(course: Omit<CourseDetail, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), course);
    return docRef.id;
  },

  // Update a course
  async updateCourse(id: string, course: Partial<CourseDetail>): Promise<void> {
    const courseRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(courseRef, course);
  },

  // Delete a course
  async deleteCourse(id: string): Promise<void> {
    const courseRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(courseRef);
  }
};
