"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { useToaster } from '../../../components/Toaster';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function NewBlogPage() {
  const { token } = useAuth();
  const { showToast } = useToaster();
  const router = useRouter();
  const [form, setForm] = useState({ title: '', content: '' });
  const [pdf, setPdf] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdf(e.target.files[0]);
      setFileName(e.target.files[0].name);
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
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 animate-fade-in-up border border-emerald-100">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-3 font-serif">
                Post a New Blog
              </h1>
              <p className="text-emerald-600 text-sm md:text-base">
                Share your thoughts and insights with our community
              </p>
            </div>

            {/* Title Field */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-semibold text-emerald-700 mb-2">
                Blog Title
              </label>
              <input 
                id="title" 
                name="title" 
                type="text" 
                required 
                placeholder="Enter your blog title..."
                className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md" 
                value={form.title} 
                onChange={handleChange} 
              />
            </div>

            {/* Content Field */}
            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-semibold text-emerald-700 mb-2">
                Blog Content
              </label>
              <textarea 
                id="content" 
                name="content" 
                required 
                rows={10}
                placeholder="Write your blog content here..."
                className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md resize-vertical" 
                value={form.content} 
                onChange={handleChange} 
              />
            </div>

            {/* File Upload Section */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-emerald-700 mb-3">
                Attach PDF (Optional)
              </label>
              <div className="relative">
                <input 
                  id="pdf" 
                  name="pdf" 
                  type="file" 
                  accept="application/pdf" 
                  className="hidden" 
                  onChange={handleFileChange} 
                />
                <label 
                  htmlFor="pdf" 
                  className="flex items-center justify-center w-full min-h-[72px] py-4 border-2 border-dashed border-emerald-300 rounded-xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200 group"
                >
                  <div className="flex flex-col items-center justify-center w-full">
                    {fileName ? (
                      <div className="text-emerald-700">
                        <svg className="w-5 h-5 mx-auto mb-1 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-sm font-medium">{fileName}</p>
                        <p className="text-xs text-emerald-500">Click to change file</p>
                      </div>
                    ) : (
                      <div className="text-emerald-600 group-hover:text-emerald-700 flex flex-col items-center">
                        <svg className="w-7 h-7 mb-1 text-emerald-500 group-hover:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm font-medium">Click to upload PDF</p>
                        <p className="text-xs text-emerald-500">or drag and drop</p>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publishing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Publish Blog
                  </div>
                )}
              </button>
            </div>

            {/* Success/Error Message Placeholder */}
            {loading && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-sm text-emerald-700 text-center">
                  Your blog is being published...
                </p>
              </div>
            )}
          </form>
        </div>
      </main>
    </ProtectedRoute>
  );
} 