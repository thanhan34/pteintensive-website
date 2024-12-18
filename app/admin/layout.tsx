"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaUsers, FaBook, FaComments, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import { useNotification } from '../components/Notification';
import LoadingSpinner from '../components/LoadingSpinner';
import ConnectionStatus, { OfflineBanner } from '../components/ConnectionStatus';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: FaTachometerAlt },
  { name: 'Teachers', href: '/admin/teachers', icon: FaUsers },
  { name: 'Courses', href: '/admin/courses', icon: FaBook },
  { name: 'Reviews', href: '/admin/reviews', icon: FaComments },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { showNotification } = useNotification();

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('adminAuth') === 'true';
      setIsAuthenticated(isAuth);
      setIsLoading(false);

      if (!isAuth && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    showNotification('success', 'Logged out successfully');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated && pathname !== '/admin/login') {
    return null;
  }

  if (pathname === '/admin/login') {
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Connection Status */}
      <ConnectionStatus />
      <OfflineBanner />

      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-red-600">Admin Panel</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        inline-flex items-center px-1 pt-1 text-sm font-medium
                        ${isActive 
                          ? 'text-red-600 border-b-2 border-red-500' 
                          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                      `}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <FaSignOutAlt className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile navigation */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-3 py-2 text-base font-medium
                  ${isActive
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="py-6">
        {children}
      </main>
    </div>
  );
}
