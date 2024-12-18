"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { teacherService, Teacher } from '../../../lib/services/teacherService';
import { useNotification } from '../../components/Notification';
import ImageGallery from '../../components/ImageGallery';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FaEdit, FaTrash, FaSave, FaTimes, FaPlus } from 'react-icons/fa';

export default function TeachersAdmin() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    experience: '',
    achievements: ['']
  });
  const [editFormData, setEditFormData] = useState<Teacher | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { showNotification } = useNotification();

  const loadTeachers = useCallback(async () => {
    try {
      const data = await teacherService.getAllTeachers();
      setTeachers(data);
    } catch (error) {
      showNotification('error', 'Error loading teachers');
      console.error('Error loading teachers:', error);
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    setIsMounted(true);
    loadTeachers();
  }, [loadTeachers]);

  // Rest of the component code remains exactly the same...
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!formData.image) {
        showNotification('error', 'Please upload an image');
        return;
      }

      await teacherService.addTeacher(formData);
      showNotification('success', 'Teacher added successfully');

      // Reset form
      setFormData({
        name: '',
        image: '',
        experience: '',
        achievements: ['']
      });
      
      // Reload teachers
      loadTeachers();
    } catch (error) {
      showNotification('error', 'Error adding teacher');
      console.error('Error adding teacher:', error);
    }
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingId(teacher.id);
    setEditFormData(teacher);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleSaveEdit = async (id: string) => {
    if (!editFormData) return;

    try {
      await teacherService.updateTeacher(id, editFormData);
      showNotification('success', 'Teacher updated successfully');
      setEditingId(null);
      setEditFormData(null);
      loadTeachers();
    } catch (error) {
      showNotification('error', 'Error updating teacher');
      console.error('Error updating teacher:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        const teacher = teachers.find(t => t.id === id);
        if (teacher) {
          await teacherService.deleteTeacher(id);
          showNotification('success', 'Teacher deleted successfully');
          loadTeachers();
        }
      } catch (error) {
        showNotification('error', 'Error deleting teacher');
        console.error('Error deleting teacher:', error);
      }
    }
  };

  const handleAchievementChange = (index: number, value: string) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData({ ...formData, achievements: newAchievements });
  };

  const handleEditAchievementChange = (index: number, value: string) => {
    if (!editFormData) return;
    const newAchievements = [...editFormData.achievements];
    newAchievements[index] = value;
    setEditFormData({ ...editFormData, achievements: newAchievements });
  };

  const addAchievementField = (isEdit: boolean = false) => {
    if (isEdit && editFormData) {
      setEditFormData({
        ...editFormData,
        achievements: [...editFormData.achievements, '']
      });
    } else {
      setFormData({
        ...formData,
        achievements: [...formData.achievements, '']
      });
    }
  };

  const removeAchievementField = (index: number, isEdit: boolean = false) => {
    if (isEdit && editFormData && editFormData.achievements.length > 1) {
      setEditFormData({
        ...editFormData,
        achievements: editFormData.achievements.filter((_, i) => i !== index)
      });
    } else if (!isEdit && formData.achievements.length > 1) {
      setFormData({
        ...formData,
        achievements: formData.achievements.filter((_, i) => i !== index)
      });
    }
  };

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
          <h1 className="text-3xl font-bold">Manage Teachers</h1>
          <Link 
            href="/admin"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Add Teacher Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Teacher</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Experience</label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
              <div className="w-48 h-48">
                <ImageGallery
                  images={formData.image ? [{ id: '1', url: formData.image, alt: formData.name }] : []}
                  section="teachers"
                  onAdd={(url: string) => setFormData({ ...formData, image: url })}
                  onRemove={() => setFormData({ ...formData, image: '' })}
                  maxImages={1}
                  aspectRatio="square"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
              {formData.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => handleAchievementChange(index, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeAchievementField(index)}
                    className="text-red-600 hover:text-red-700 p-2"
                    disabled={formData.achievements.length === 1}
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addAchievementField()}
                className="mt-2 flex items-center text-sm text-red-600 hover:text-red-700"
              >
                <FaPlus className="w-3 h-3 mr-1" /> Add Achievement
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Add Teacher
            </button>
          </form>
        </div>

        {/* Teachers List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Current Teachers</h2>
          <div className="space-y-6">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="border p-6 rounded-lg">
                {editingId === teacher.id && editFormData ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          value={editFormData.name}
                          onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Experience</label>
                        <input
                          type="text"
                          value={editFormData.experience}
                          onChange={(e) => setEditFormData({ ...editFormData, experience: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                      <div className="w-48 h-48">
                        <ImageGallery
                          images={[{ id: teacher.id, url: editFormData.image, alt: editFormData.name }]}
                          section="teachers"
                          onAdd={(url: string) => setEditFormData({ ...editFormData, image: url })}
                          onRemove={() => setEditFormData({ ...editFormData, image: '' })}
                          maxImages={1}
                          aspectRatio="square"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
                      {editFormData.achievements.map((achievement, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={achievement}
                            onChange={(e) => handleEditAchievementChange(index, e.target.value)}
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => removeAchievementField(index, true)}
                            className="text-red-600 hover:text-red-700 p-2"
                            disabled={editFormData.achievements.length === 1}
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addAchievementField(true)}
                        className="mt-2 flex items-center text-sm text-red-600 hover:text-red-700"
                      >
                        <FaPlus className="w-3 h-3 mr-1" /> Add Achievement
                      </button>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      >
                        <FaTimes className="w-4 h-4 mr-1" /> Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(teacher.id)}
                        className="flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        <FaSave className="w-4 h-4 mr-1" /> Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div className="flex gap-6">
                      <div className="relative w-48 h-48 flex-shrink-0">
                        <ImageGallery
                          images={[{ id: teacher.id, url: teacher.image, alt: teacher.name }]}
                          section="teachers"
                          onAdd={() => {}}
                          onRemove={() => handleDelete(teacher.id)}
                          maxImages={1}
                          aspectRatio="square"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{teacher.name}</h3>
                        <p className="text-gray-600 mt-1">{teacher.experience}</p>
                        <div className="mt-3">
                          <h4 className="font-medium text-gray-900 mb-1">Achievements</h4>
                          <ul className="space-y-1">
                            {teacher.achievements.map((achievement, index) => (
                              <li key={index} className="text-sm text-gray-600">• {achievement}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(teacher)}
                        className="text-blue-600 hover:text-blue-700 p-2"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(teacher.id)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
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
