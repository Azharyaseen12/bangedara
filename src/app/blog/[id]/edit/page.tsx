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
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4 font-serif">
              Edit Your Blog Post
            </h1>
            <p className="text-emerald-600 text-lg md:text-xl max-w-2xl mx-auto">
              Update your thoughts and insights for the community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title Field */}
            <div className="space-y-3">
              <label htmlFor="title" className="block text-lg font-semibold text-emerald-800">
                Blog Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                placeholder="Edit your blog title..."
                className="w-full px-6 py-4 text-lg border-2 border-emerald-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            {/* Content Field */}
            <div className="space-y-3">
              <label htmlFor="content" className="block text-lg font-semibold text-emerald-800">
                Blog Content
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={12}
                placeholder="Edit your blog content here..."
                className="w-full px-6 py-4 text-lg border-2 border-emerald-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md resize-vertical leading-relaxed"
                value={form.content}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <Button
                type="submit"
                disabled={loading}
                className="group relative px-12 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {loading ? (
                  <div className="flex items-center justify-center relative z-10">
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating Blog...
                  </div>
                ) : (
                  <div className="flex items-center justify-center relative z-10">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Update Blog
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </ProtectedRoute>
  );
} 