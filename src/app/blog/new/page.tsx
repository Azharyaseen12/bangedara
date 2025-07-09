"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/Button';
import { useToaster } from '../../../components/Toaster';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function NewBlogPage() {
  const { token } = useAuth();
  const { showToast } = useToaster();
  const router = useRouter();
  const [form, setForm] = useState({ title: '', content: '' });
  const [pdf, setPdf] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdf(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('content', form.content);
      if (pdf) formData.append('pdf', pdf);
      const res = await fetch('http://localhost:8000/api/blogs/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to post blog');
      showToast('Blog posted!', 'success');
      router.push('/blog');
    } catch {
      showToast('Failed to post blog', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg animate-fade-in-up" encType="multipart/form-data">
          <h1 className="text-2xl font-bold text-emerald-800 mb-4 text-center">Post a New Blog</h1>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
            <input id="title" name="title" type="text" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition border-gray-300" value={form.title} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
            <textarea id="content" name="content" required rows={8} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition border-gray-300" value={form.content} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label htmlFor="pdf" className="block text-sm font-medium mb-1">PDF (optional)</label>
            <input id="pdf" name="pdf" type="file" accept="application/pdf" className="w-full" onChange={handleFileChange} />
          </div>
          <Button type="submit" disabled={loading}>{loading ? 'Posting...' : 'Post Blog'}</Button>
        </form>
      </main>
    </ProtectedRoute>
  );
} 