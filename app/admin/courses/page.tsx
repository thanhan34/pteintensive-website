"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { courseService, CourseDetail } from '@/lib/services/courseService';
import { useNotification } from '@/app/components/Notification';
import ImageGallery from '@/app/components/ImageGallery';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

export default function CoursesAdmin() {
  const [courses, setCourses] = useState<CourseDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    image: '',
    category: '',
    aboutCourse: {
      targetAudience: [''],
      courseInfo: [''],
      benefits: ['']
    }
  });
  const [editFormData, setEditFormData] = useState<CourseDetail | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    setIsMounted(true);
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await courseService.getAllCourses();
      setCourses(data);
    } catch (error) {
      showNotification('error', 'Error loading courses');
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const title = e.target.value;
    if (isEdit && editFormData) {
      setEditFormData({
        ...editFormData,
        title,
        slug: generateSlug(title)
      });
    } else {
      setFormData({
        ...formData,
        title,
        slug: generateSlug(title)
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!formData.image) {
        showNotification('error', 'Please upload an image');
        return;
      }

      await courseService.addCourse(formData);
      showNotification('success', 'Course added successfully');

      // Reset form
      setFormData({
        title: '',
        slug: '',
        image: '',
        category: '',
        aboutCourse: {
          targetAudience: [''],
          courseInfo: [''],
          benefits: ['']
        }
      });
      
      // Reload courses
      loadCourses();
    } catch (error) {
      showNotification('error', 'Error adding course');
      console.error('Error adding course:', error);
    }
  };

  const handleEdit = (course: CourseDetail) => {
    setEditingId(course.id);
    setEditFormData(course);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleSaveEdit = async (id: string) => {
    if (!editFormData) return;

    try {
      await courseService.updateCourse(id, editFormData);
      showNotification('success', 'Course updated successfully');
      setEditingId(null);
      setEditFormData(null);
      loadCourses();
    } catch (error) {
      showNotification('error', 'Error updating course');
      console.error('Error updating course:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseService.deleteCourse(id);
        showNotification('success', 'Course deleted successfully');
        loadCourses();
      } catch (error) {
        showNotification('error', 'Error deleting course');
        console.error('Error deleting course:', error);
      }
    }
  };

  const handleArrayChange = (
    section: 'targetAudience' | 'courseInfo' | 'benefits',
    index: number,
    value: string,
    isEdit: boolean = false
  ) => {
    if (isEdit && editFormData) {
      setEditFormData({
        ...editFormData,
        aboutCourse: {
          ...editFormData.aboutCourse,
          [section]: editFormData.aboutCourse[section].map((item, i) =>
            i === index ? value : item
          )
        }
      });
    } else {
      setFormData({
        ...formData,
        aboutCourse: {
          ...formData.aboutCourse,
          [section]: formData.aboutCourse[section].map((item, i) =>
            i === index ? value : item
          )
        }
      });
    }
  };

  const addArrayField = (section: 'targetAudience' | 'courseInfo' | 'benefits', isEdit: boolean = false) => {
    if (isEdit && editFormData) {
      setEditFormData({
        ...editFormData,
        aboutCourse: {
          ...editFormData.aboutCourse,
          [section]: [...editFormData.aboutCourse[section], '']
        }
      });
    } else {
      setFormData({
        ...formData,
        aboutCourse: {
          ...formData.aboutCourse,
          [section]: [...formData.aboutCourse[section], '']
        }
      });
    }
  };

  const removeArrayField = (
    section: 'targetAudience' | 'courseInfo' | 'benefits',
    index: number,
    isEdit: boolean = false
  ) => {
    if (isEdit && editFormData && editFormData.aboutCourse[section].length > 1) {
      setEditFormData({
        ...editFormData,
        aboutCourse: {
          ...editFormData.aboutCourse,
          [section]: editFormData.aboutCourse[section].filter((_, i) => i !== index)
        }
      });
    } else if (!isEdit && formData.aboutCourse[section].length > 1) {
      setFormData({
        ...formData,
        aboutCourse: {
          ...formData.aboutCourse,
          [section]: formData.aboutCourse[section].filter((_, i) => i !== index)
        }
      });
    }
  };

  const renderArrayInputs = (
    section: 'targetAudience' | 'courseInfo' | 'benefits',
    title: string,
    data: typeof formData | CourseDetail,
    isEdit: boolean = false
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{title}</label>
      {data.aboutCourse[section].map((item: string, index: number) => (
        <div key={index} className="mb-2 flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => handleArrayChange(section, index, e.target.value, isEdit)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            required
          />
          <button
            type="button"
            onClick={() => removeArrayField(section, index, isEdit)}
            className="text-red-600 hover:text-red-700 p-2"
            disabled={data.aboutCourse[section].length === 1}
          >
            <FaTrash className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addArrayField(section, isEdit)}
        className="mt-2 flex items-center text-sm text-red-600 hover:text-red-700"
      >
        <FaPlus className="w-3 h-3 mr-1" /> Add {title}
      </button>
    </div>
  );

  if (!isMounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Courses</h1>
          <Link 
            href="/admin"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Add Course Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h3 className="font-medium text-gray-900">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 cursor-not-allowed"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Automatically generated from title
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Image</label>
                  <div className="w-96 h-64"> {/* Increased size with 16:9 ratio */}
                    <ImageGallery
                      images={formData.image ? [{ id: '1', url: formData.image, alt: formData.title }] : []}
                      section="courses"
                      onAdd={(url: string) => setFormData({ ...formData, image: url })}
                      onRemove={() => setFormData({ ...formData, image: '' })}
                      maxImages={1}
                      aspectRatio="video"
                    />
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h3 className="font-medium text-gray-900">Course Details</h3>
                {renderArrayInputs('targetAudience', 'Target Audience', formData)}
                {renderArrayInputs('courseInfo', 'Course Information', formData)}
                {renderArrayInputs('benefits', 'Benefits', formData)}
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Add Course
              </button>
            </div>
          </form>
        </div>

        {/* Courses List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Current Courses</h2>
          <div className="space-y-6">
            {courses.map((course) => (
              <div key={course.id} className="border p-6 rounded-lg">
                {editingId === course.id && editFormData ? (
                  <div className="space-y-6">
                    {/* Edit Basic Information */}
                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                      <h3 className="font-medium text-gray-900">Basic Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Title</label>
                          <input
                            type="text"
                            value={editFormData.title}
                            onChange={(e) => handleTitleChange(e, true)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Category</label>
                          <input
                            type="text"
                            value={editFormData.category}
                            onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Slug</label>
                        <input
                          type="text"
                          value={editFormData.slug}
                          readOnly
                          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Course Image</label>
                        <div className="w-96 h-64"> {/* Increased size with 16:9 ratio */}
                          <ImageGallery
                            images={[{ id: course.id, url: editFormData.image, alt: editFormData.title }]}
                            section="courses"
                            onAdd={(url: string) => setEditFormData({ ...editFormData, image: url })}
                            onRemove={() => setEditFormData({ ...editFormData, image: '' })}
                            maxImages={1}
                            aspectRatio="video"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Edit Course Details */}
                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                      <h3 className="font-medium text-gray-900">Course Details</h3>
                      {renderArrayInputs('targetAudience', 'Target Audience', editFormData, true)}
                      {renderArrayInputs('courseInfo', 'Course Information', editFormData, true)}
                      {renderArrayInputs('benefits', 'Benefits', editFormData, true)}
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      >
                        <FaTimes className="w-4 h-4 mr-1" /> Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(course.id)}
                        className="flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        <FaSave className="w-4 h-4 mr-1" /> Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-6 flex-1">
                        <div className="relative w-96 h-64 flex-shrink-0"> {/* Increased size with 16:9 ratio */}
                          <ImageGallery
                            images={[{ id: course.id, url: course.image, alt: course.title }]}
                            section="courses"
                            onAdd={() => {}}
                            onRemove={() => handleDelete(course.id)}
                            maxImages={1}
                            aspectRatio="video"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{course.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{course.category}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(course)}
                          className="text-blue-600 hover:text-blue-700 p-2"
                        >
                          <FaEdit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="text-red-600 hover:text-red-700 p-2"
                        >
                          <FaTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Target Audience</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {course.aboutCourse.targetAudience.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Course Info</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {course.aboutCourse.courseInfo.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Benefits</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {course.aboutCourse.benefits.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
