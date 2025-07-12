"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { useToaster } from '../../../components/Toaster';
import ProtectedRoute from '../../../components/ProtectedRoute';

// Function to detect if text contains Urdu characters
const detectLanguage = (text: string): 'ltr' | 'rtl' => {
  if (!text) return 'ltr';
  const urduPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  return urduPattern.test(text) ? 'rtl' : 'ltr';
};

export default function NewBlogPage() {
  const { token } = useAuth();
  const { showToast } = useToaster();
  const router = useRouter();
  const [form, setForm] = useState({ title: '', content: '' });
  const [pdf, setPdf] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdf(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setPdf(file);
        setFileName(file.name);
      } else {
        showToast('Please upload a PDF file.', 'error');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      if (form.content.trim()) {
        formData.append('content', form.content);
      }
      if (pdf) formData.append('pdf', pdf);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/`, {
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

  const titleDirection = detectLanguage(form.title);
  const contentDirection = detectLanguage(form.content);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4 font-serif">
              Share Your Story
            </h1>
            <p className="text-emerald-600 text-lg md:text-xl max-w-2xl mx-auto">
              Create a new blog post and share your insights with our community
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
                placeholder="Enter a compelling title for your blog..."
                className="w-full px-6 py-4 text-lg border-2 border-emerald-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md" 
                value={form.title} 
                onChange={handleChange}
                dir={titleDirection}
                style={{ textAlign: titleDirection === 'rtl' ? 'right' : 'left' }}
              />
            </div>

            {/* Content Field */}
            <div className="space-y-3">
              <label htmlFor="content" className="block text-lg font-semibold text-emerald-800">
                Blog Content (Optional)
              </label>
              <textarea 
                id="content" 
                name="content" 
                rows={12}
                placeholder="Write your blog content here. Share your thoughts, experiences, and insights..."
                className="w-full px-6 py-4 text-lg border-2 border-emerald-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md resize-vertical leading-relaxed" 
                value={form.content} 
                onChange={handleChange}
                dir={contentDirection}
                style={{ textAlign: contentDirection === 'rtl' ? 'right' : 'left' }}
              />
            </div>

            {/* File Upload Section */}
            <div className="space-y-3">
              <label className="block text-lg font-semibold text-emerald-800">
                Attach PDF Document (Optional)
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
                  className={`flex items-center justify-center w-full min-h-[100px] py-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 group ${dragActive ? 'border-emerald-500 bg-emerald-50/80 ring-4 ring-emerald-500/20' : 'border-emerald-300 hover:border-emerald-400 hover:bg-emerald-50/50'}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center w-full">
                    {fileName ? (
                      <div className="text-emerald-700 text-center">
                        <svg className="w-8 h-8 mx-auto mb-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-lg font-medium">{fileName}</p>
                        <p className="text-sm text-emerald-500 mt-1">Click to change file</p>
                      </div>
                    ) : (
                      <div className="text-emerald-600 group-hover:text-emerald-700 flex flex-col items-center">
                        <svg className="w-10 h-10 mb-3 text-emerald-500 group-hover:text-emerald-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-lg font-medium">Click to upload PDF</p>
                        <p className="text-sm text-emerald-500 mt-1">or drag and drop your file here</p>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <button 
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
                    Publishing Your Blog...
                  </div>
                ) : (
                  <div className="flex items-center justify-center relative z-10">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Publish Blog Post
                  </div>
                )}
              </button>
            </div>

            {/* Loading Message */}
            {loading && (
              <div className="text-center py-6">
                <div className="inline-flex items-center px-6 py-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-emerald-700 font-medium">Your blog is being published...</span>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </ProtectedRoute>
  );
} 