import { AdminBlogLayout } from '../../../../components/admin/blog/AdminLayout';
import { BlogPostForm } from '../../../../components/admin/blog/BlogPostForm';

export default function NewBlogPostPage() {
  return <AdminBlogLayout><div className="mb-6"><h1 className="text-3xl font-bold">Create new blog post</h1><p className="text-gray-600">Save as draft or publish when ready.</p></div><BlogPostForm /></AdminBlogLayout>;
}
