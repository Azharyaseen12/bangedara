"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import Button from '../../components/Button';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useToaster } from '../../components/Toaster';

interface Blog {
  id: number;
  title: string;
  content: string;
  author_username: string;
  created_at: string;
}

export default function ProfilePage() {
  const { token, user, logout, updateProfile } = useAuth();
  const { showToast } = useToaster();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [updatingUsername, setUpdatingUsername] = useState(false);

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

  const handleUsernameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || newUsername === user?.username) {
      setIsEditingUsername(false);
      return;
    }

    setUpdatingUsername(true);
    try {
      await updateProfile(newUsername);
      showToast('Username updated successfully!', 'success');
      setIsEditingUsername(false);
      setNewUsername('');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to update username', 'error');
    } finally {
      setUpdatingUsername(false);
    }
  };

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
                  <Button 
                    type="button"
                    onClick={() => {
                      setIsEditingUsername(true);
                      setNewUsername(user?.username || '');
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Edit Username
                  </Button>
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

          {/* Username Edit Modal */}
          {isEditingUsername && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Update Username</h2>
                <form onSubmit={handleUsernameUpdate} className="space-y-4">
                  <div>
                    <label htmlFor="newUsername" className="block text-sm font-medium text-gray-700 mb-2">
                      New Username
                    </label>
                    <input
                      type="text"
                      id="newUsername"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                      placeholder="Enter new username"
                      required
                      minLength={3}
                      disabled={updatingUsername}
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      loading={updatingUsername}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                    >
                      {updatingUsername ? 'Updating...' : 'Update Username'}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setIsEditingUsername(false);
                        setNewUsername('');
                      }}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                      disabled={updatingUsername}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {sortedBlogs.map((blog) => (
                  <article key={blog.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-emerald-800 line-clamp-2">
                        {blog.title}
                      </h3>
                      <Link 
                        href={`/blog/${blog.id}`}
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1 group"
                      >
                        Read
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {blog.content || 'No content available'}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs">
                        {blog.content ? `${blog.content.length} chars` : 'PDF only'}
                      </span>
                    </div>
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