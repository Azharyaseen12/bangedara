"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../../contexts/AuthContext';
import Button from '../../../../components/Button';
import { useToaster } from '../../../../components/Toaster';
import ProtectedRoute from '../../../../components/ProtectedRoute';

export default function DeleteBlogPage() {
  const params = useParams();
  const id = params?.id as string;
  const { token, user } = useAuth();
  const { showToast } = useToaster();
  const router = useRouter();
  const [author, setAuthor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}/`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(res => res.json())
      .then(data => setAuthor(data.author_username));
  }, [id, token]);

  // Check if user is the author
  if (author && user?.username !== author) {
    router.push(`/blog/${id}`);
    return null;
  }

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to delete blog');
      showToast('Blog deleted!', 'success');
      router.push('/blog');
    } catch {
      showToast('Failed to delete blog', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg animate-fade-in-up text-center">
          <h1 className="text-2xl font-bold text-emerald-800 mb-4">Delete Blog</h1>
          <p className="mb-6">Are you sure you want to delete this blog post? This action cannot be undone.</p>
          <div className="flex gap-4 justify-center">
            <Button type="button" onClick={handleDelete} disabled={loading} className="bg-red-600 hover:bg-red-700">{loading ? 'Deleting...' : 'Yes, Delete'}</Button>
            <Button type="button" onClick={() => router.push(`/blog/${id}`)} className="bg-gray-300 text-gray-800 hover:bg-gray-400">Cancel</Button>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
} 