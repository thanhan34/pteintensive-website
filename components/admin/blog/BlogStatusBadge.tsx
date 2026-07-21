export function BlogStatusBadge({ status }: { status: string }) {
  const published = status === 'published';
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{published ? 'Published' : 'Draft'}</span>;
}
