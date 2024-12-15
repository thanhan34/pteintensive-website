"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { reviewService, Review } from '@/lib/services/reviewService';
import { useNotification } from '@/app/components/Notification';
import ImageGallery from '@/app/components/ImageGallery';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { FaStar, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

export default function ReviewsAdmin() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    rating: 5,
    comment: '',
    course: ''
  });
  const [editFormData, setEditFormData] = useState<Review | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    setIsMounted(true);
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await reviewService.getAllReviews();
      setReviews(data);
    } catch (error) {
      showNotification('error', 'Error loading reviews');
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!formData.image) {
        showNotification('error', 'Please upload an image');
        return;
      }

      await reviewService.addReview(formData);
      showNotification('success', 'Review added successfully');

      // Reset form
      setFormData({
        name: '',
        image: '',
        rating: 5,
        comment: '',
        course: ''
      });
      
      // Reload reviews
      loadReviews();
    } catch (error) {
      showNotification('error', 'Error adding review');
      console.error('Error adding review:', error);
    }
  };

  const handleEdit = (review: Review) => {
    setEditingId(review.id);
    setEditFormData(review);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleSaveEdit = async (id: string) => {
    if (!editFormData) return;

    try {
      await reviewService.updateReview(id, editFormData);
      showNotification('success', 'Review updated successfully');
      setEditingId(null);
      setEditFormData(null);
      loadReviews();
    } catch (error) {
      showNotification('error', 'Error updating review');
      console.error('Error updating review:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewService.deleteReview(id);
        showNotification('success', 'Review deleted successfully');
        loadReviews();
      } catch (error) {
        showNotification('error', 'Error deleting review');
        console.error('Error deleting review:', error);
      }
    }
  };

  const StarRating = ({ 
    rating, 
    onRatingChange,
    readOnly = false 
  }: { 
    rating: number; 
    onRatingChange?: (rating: number) => void;
    readOnly?: boolean;
  }) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readOnly && onRatingChange?.(star)}
          className={`focus:outline-none ${!readOnly && onRatingChange ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
        >
          <FaStar 
            className={`h-6 w-6 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } transition-colors`}
          />
        </button>
      ))}
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
          <h1 className="text-3xl font-bold">Manage Reviews</h1>
          <Link 
            href="/admin"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Add Review Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Review</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Student Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Course</label>
                  <input
                    type="text"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student Image</label>
                <div className="w-48 h-48"> {/* Increased size */}
                  <ImageGallery
                    images={formData.image ? [{ id: '1', url: formData.image, alt: formData.name }] : []}
                    section="reviews"
                    onAdd={(url: string) => setFormData({ ...formData, image: url })}
                    onRemove={() => setFormData({ ...formData, image: '' })}
                    maxImages={1}
                    aspectRatio="square"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <StarRating 
                  rating={formData.rating} 
                  onRatingChange={(rating) => setFormData({ ...formData, rating })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Comment</label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Add Review
              </button>
            </div>
          </form>
        </div>

        {/* Reviews List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Current Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border p-6 rounded-lg">
                {editingId === review.id && editFormData ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Student Name</label>
                        <input
                          type="text"
                          value={editFormData.name}
                          onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Course</label>
                        <input
                          type="text"
                          value={editFormData.course}
                          onChange={(e) => setEditFormData({ ...editFormData, course: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Student Image</label>
                      <div className="w-48 h-48"> {/* Increased size */}
                        <ImageGallery
                          images={[{ id: review.id, url: editFormData.image, alt: editFormData.name }]}
                          section="reviews"
                          onAdd={(url: string) => setEditFormData({ ...editFormData, image: url })}
                          onRemove={() => setEditFormData({ ...editFormData, image: '' })}
                          maxImages={1}
                          aspectRatio="square"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <StarRating 
                        rating={editFormData.rating} 
                        onRatingChange={(rating) => setEditFormData({ ...editFormData, rating })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Comment</label>
                      <textarea
                        value={editFormData.comment}
                        onChange={(e) => setEditFormData({ ...editFormData, comment: e.target.value })}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        required
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      >
                        <FaTimes className="w-4 h-4 mr-1" /> Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(review.id)}
                        className="flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        <FaSave className="w-4 h-4 mr-1" /> Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div className="flex gap-6">
                      <div className="relative w-48 h-48 flex-shrink-0"> {/* Increased size */}
                        <ImageGallery
                          images={[{ id: review.id, url: review.image, alt: review.name }]}
                          section="reviews"
                          onAdd={() => {}}
                          onRemove={() => handleDelete(review.id)}
                          maxImages={1}
                          aspectRatio="square"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{review.name}</h3>
                            <p className="text-sm text-gray-600">{review.course}</p>
                            <div className="mt-1">
                              <StarRating rating={review.rating} readOnly />
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => handleEdit(review)}
                              className="text-blue-600 hover:text-blue-700 p-2"
                            >
                              <FaEdit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(review.id)}
                              className="text-red-600 hover:text-red-700 p-2"
                            >
                              <FaTrash className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <p className="mt-2 text-gray-700">{review.comment}</p>
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
