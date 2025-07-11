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

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 px-4 py-12 animate-fade-in-up">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">My Profile</h1>
          <p className="text-emerald-700 italic">Manage your blogs and profile</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
            <Link href="/blog/new" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition">Add New Blog</Link>
            <Button type="button" onClick={logout} className="bg-red-600 hover:bg-red-700 w-auto px-6">Logout</Button>
          </div>
        </header>
        <div className="max-w-3xl mx-auto space-y-6">
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">You have not posted any blogs yet.</div>
          ) : (
            blogs.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg animate-fade-in-up">
                <h2 className="text-xl font-semibold text-emerald-800 mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-2 line-clamp-3">{post.content.slice(0, 120)}...</p>
                <div className="text-xs text-gray-500 mb-2">Posted on {new Date(post.created_at).toLocaleDateString()}</div>
                <Link href={`/blog/${post.id}`} className="text-emerald-700 hover:underline font-medium">Read more</Link>
                <Link href={`/blog/${post.id}/edit`} className="ml-4 text-emerald-500 hover:underline">Edit</Link>
                <Link href={`/blog/${post.id}/delete`} className="ml-2 text-red-500 hover:underline">Delete</Link>
              </div>
            ))
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
} 