"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import { fetchWithAuth } from '../../fetchWithAuth';

interface Blog {
  id: number;
  title: string;
  content: string;
  author_username: string;
  created_at: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { token } = useAuth();
  const auth = useAuth();

  useEffect(() => {
    async function loadBlogs() {
      const res = await fetchWithAuth('http://localhost:8000/api/blogs/', {}, auth);
      const data = await res.json();
      setBlogs(data);
    }
    loadBlogs();
  }, [token]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
        {/* Header Section with Enhanced Design */}
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 py-16 px-4">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif">
                Bangedara Blog
              </h1>
              <div className="w-24 h-1 bg-emerald-300 mx-auto mb-6 rounded-full"></div>
              <p className="text-xl text-emerald-100 font-light max-w-2xl mx-auto leading-relaxed">
                Reflections, knowledge, and inspiration for the Ummah
              </p>
            </div>
            {token && (
              <Link 
                href="/blog/new" 
                className="inline-flex items-center px-8 py-3 bg-white text-emerald-700 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-emerald-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Post a Blog
              </Link>
            )}
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            {blogs.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Posts Yet</h3>
                <p className="text-gray-500 mb-6">Be the first to share knowledge with the community</p>
                {token && (
                  <Link 
                    href="/blog/new" 
                    className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Create First Post
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {blogs.map((post, index) => (
                  <article 
                    key={post.id} 
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Blog Card Content */}
                    <div className="p-8">
                      {/* Title */}
                      <h2 className="text-xl md:text-2xl font-serif font-semibold text-gray-900 mb-4 leading-tight group-hover:text-emerald-700 transition-colors">
                        {post.title}
                      </h2>
                      
                      {/* Content Preview */}
                      <p className="text-gray-600 text-base leading-relaxed mb-6 line-clamp-3">
                        {post.content.slice(0, 150)}...
                      </p>
                      
                      {/* Meta Information */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{post.author_username}</span>
                        </div>
                        <time className="text-sm text-gray-500">
                          {new Date(post.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                      </div>
                      
                      {/* Read More Button */}
                      <Link 
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700 transition-colors group-hover:translate-x-1 transform duration-200"
                      >
                        Read More
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                    
                    {/* Decorative Bottom Border */}
                    <div className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
} 