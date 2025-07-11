"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import Button from '../../components/Button';
import ProtectedRoute from '../../components/ProtectedRoute';

interface Blog {
  id: number;
  title: string;
  content: string;
  author_username: string;
  created_at: string;
}

export default function ProfilePage() {
  const { token, user, logout } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');

  useEffect(() => {
    if (!user?.username) return;
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setBlogs(Array.isArray(data) ? data.filter((b) => b.author_username === user.username) : []);
        setLoading(false);
      });
  }, [token, user]);

  const sortedBlogs = [...blogs].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 px-4 py-8 animate-fade-in-up">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <header className="mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-emerald-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  {/* Profile Avatar */}
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {user?.username ? getInitials(user.username) : 'U'}
                  </div>
                  
                  {/* Welcome Message */}
                  <div>
                    <h1 className="text-3xl font-bold text-emerald-800 mb-2">
                      Welcome, {user?.username || 'User'}
                    </h1>
                                         <p className="text-emerald-600 font-medium">
                       You&apos;ve posted {blogs.length} blog{blogs.length !== 1 ? 's' : ''}
                     </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link 
                    href="/blog/new" 
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Post New Blog
                  </Link>
                  <Button 
                    type="button" 
                    onClick={logout} 
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Sort Controls */}
          {blogs.length > 0 && (
            <div className="mb-8">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-emerald-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-emerald-800">Your Blogs</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-emerald-600 font-medium">Sort by:</span>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value as 'latest' | 'oldest')}
                      className="bg-white border border-emerald-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="latest">Latest First</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog List */}
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                <p className="mt-4 text-emerald-600 font-medium">Loading your blogs...</p>
              </div>
            ) : blogs.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center border border-emerald-100">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-emerald-800 mb-4">No Blogs Yet</h3>
                                 <p className="text-emerald-600 mb-8 max-w-md mx-auto">
                   You haven&apos;t posted any blogs yet. Start sharing your thoughts and insights with the community!
                 </p>
                <Link 
                  href="/blog/new" 
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Write Your First Blog
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedBlogs.map((post) => (
                  <div 
                    key={post.id} 
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-emerald-100 transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fade-in-up"
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-emerald-800 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {post.content.slice(0, 120)}...
                      </p>
                      <div className="text-xs text-emerald-500 font-medium mb-4">
                        Published on {new Date(post.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-emerald-100">
                      <Link 
                        href={`/blog/${post.id}`} 
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors duration-200"
                      >
                        Read More →
                      </Link>
                      <div className="flex items-center gap-2">
                        <Link 
                          href={`/blog/${post.id}/edit`} 
                          className="p-2 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                          title="Edit Blog"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <Link 
                          href={`/blog/${post.id}/delete`} 
                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          title="Delete Blog"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
} 