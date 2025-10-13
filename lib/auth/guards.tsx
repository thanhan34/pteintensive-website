'use client';

import { useAuth } from './context';
import { UserRole } from '@/lib/types/blog';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  requireAuth?: boolean;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export function AuthGuard({ 
  children, 
  requiredRoles = [], 
  requireAuth = true,
  fallback = <div>Access denied</div>,
  redirectTo = '/login'
}: AuthGuardProps) {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        router.push(redirectTo);
        return;
      }

      if (requiredRoles.length > 0 && userProfile) {
        const hasRequiredRole = requiredRoles.some(role => 
          userProfile.roles.includes(role)
        );
        
        if (!hasRequiredRole) {
          router.push('/');
          return;
        }
      }
    }
  }, [user, userProfile, loading, requireAuth, requiredRoles, router, redirectTo]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return null; // Will redirect
  }

  if (requiredRoles.length > 0 && userProfile) {
    const hasRequiredRole = requiredRoles.some(role => 
      userProfile.roles.includes(role)
    );
    
    if (!hasRequiredRole) {
      return fallback;
    }
  }

  return <>{children}</>;
}

interface AdminGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AdminGuard({ children, fallback }: AdminGuardProps) {
  return (
    <AuthGuard 
      requiredRoles={['admin']} 
      fallback={fallback}
    >
      {children}
    </AuthGuard>
  );
}

interface EditorGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function EditorGuard({ children, fallback }: EditorGuardProps) {
  return (
    <AuthGuard 
      requiredRoles={['admin', 'editor']} 
      fallback={fallback}
    >
      {children}
    </AuthGuard>
  );
}

interface AuthorGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthorGuard({ children, fallback }: AuthorGuardProps) {
  return (
    <AuthGuard 
      requiredRoles={['admin', 'editor', 'author']} 
      fallback={fallback}
    >
      {children}
    </AuthGuard>
  );
}

interface ContributorGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ContributorGuard({ children, fallback }: ContributorGuardProps) {
  return (
    <AuthGuard 
      requiredRoles={['admin', 'editor', 'author', 'contributor']} 
      fallback={fallback}
    >
      {children}
    </AuthGuard>
  );
}

// Hook for conditional rendering based on roles
export function useRoleAccess() {
  const { userProfile, isAdmin, isEditor, isAuthor, hasRole, hasAnyRole } = useAuth();

  return {
    userProfile,
    isAdmin,
    isEditor,
    isAuthor,
    hasRole,
    hasAnyRole,
    canManageUsers: isAdmin(),
    canManageSettings: isAdmin(),
    canManagePosts: isEditor(),
    canManageComments: isEditor(),
    canManageTaxonomies: isEditor(),
    canCreatePosts: isAuthor(),
    canEditOwnPosts: hasRole('author'),
    canPublishPosts: isEditor(),
  };
}
