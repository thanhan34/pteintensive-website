"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUsers, FaBook, FaComments, FaImage, FaInfoCircle } from 'react-icons/fa';
import { teacherService } from '../../lib/services/teacherService';
import { courseService } from '../../lib/services/courseService';
import { reviewService } from '../../lib/services/reviewService';
import LoadingSpinner from '../components/LoadingSpinner';

interface Stats {
  teachers: number;
  courses: number;
  reviews: number;
}

const quickLinks = [
  {
    name: 'Manage Teachers',
    description: 'Add, edit, or remove teachers and their profiles',
    href: '/admin/teachers',
    icon: FaUsers,
    color: 'bg-blue-500'
  },
  {
    name: 'Manage Courses',
    description: 'Update course information and content',
    href: '/admin/courses',
    icon: FaBook,
    color: 'bg-green-500'
  },
  {
    name: 'Manage Reviews',
    description: 'Moderate student reviews and testimonials',
    href: '/admin/reviews',
    icon: FaComments,
    color: 'bg-purple-500'
  }
];

const tips = [
  {
    title: 'Image Guidelines',
    description: 'Use high-quality images (max 2MB) in JPG or PNG format. Teacher photos should be square.',
    icon: FaImage
  },
  {
    title: 'Content Tips',
    description: 'Keep descriptions clear and concise. Use bullet points for better readability.',
    icon: FaInfoCircle
  }
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [teachers, courses, reviews] = await Promise.all([
          teacherService.getAllTeachers(),
          courseService.getAllCourses(),
          reviewService.getAllReviews()
        ]);

        setStats({
          teachers: teachers.length,
          courses: courses.length,
          reviews: reviews.length
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to Admin Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your content and keep track of your site's performance
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaUsers className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Teachers
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats?.teachers || 0}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaBook className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Courses
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats?.courses || 0}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaComments className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Reviews
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats?.reviews || 0}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div>
                      <span className={`inline-flex p-3 rounded-lg ${link.color} text-white`}>
                        <Icon className="h-6 w-6" />
                      </span>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {link.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        {link.description}
                      </p>
                    </div>
                    <span className="absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
                      →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Tips Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Tips</h2>
            <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
              {tips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <div key={index} className="p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Icon className="h-6 w-6 text-red-500" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-base font-medium text-gray-900">
                          {tip.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
