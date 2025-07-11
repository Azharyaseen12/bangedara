"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../../contexts/AuthContext';
import Button from '../../../../components/Button';
import { useToaster } from '../../../../components/Toaster';
import ProtectedRoute from '../../../../components/ProtectedRoute';

export default function EditBlogPage() {
  const params = useParams();
  const id = params?.id as string;
  const { token, user } = useAuth();
  const { showToast } = useToaster();
  const router = useRouter();
  const [form, setForm] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}/`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(res => res.json())
      .then(data => {
        setForm({ title: data.title, content: data.content });
        setAuthor(data.author_username);
      });
  }, [id, token]);

  // Check if user is the author
  if (author && user?.username !== author) {
    router.push(`/blog/${id}`);
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to update blog');
      showToast('Blog updated!', 'success');
      router.push(`/blog/${id}`);
    } catch {
      showToast('Failed to update blog', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg animate-fade-in-up">
          <h1 className="text-2xl font-bold text-emerald-800 mb-4 text-center">Edit Blog</h1>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
            <input id="title" name="title" type="text" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition border-gray-300" value={form.title} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
            <textarea id="content" name="content" required rows={8} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition border-gray-300" value={form.content} onChange={handleChange} />
          </div>
          <Button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update Blog'}</Button>
        </form>
      </main>
    </ProtectedRoute>
  );
} 