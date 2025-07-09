"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';

interface Blog {
  id: number;
  title: string;
  content: string;
  author_username: string;
  created_at: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { token, user } = useAuth();

  useEffect(() => {
    fetch('http://localhost:8000/api/blogs/', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, [token]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 px-4 py-12 animate-fade-in-up">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">Bangedara Blog</h1>
          <p className="text-emerald-700 italic">Reflections, knowledge, and inspiration for the Ummah</p>
          {token && (
            <Link href="/blog/new" className="inline-block mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition">Post a Blog</Link>
          )}
        </header>
        <div className="max-w-3xl mx-auto space-y-6">
          {blogs.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg animate-fade-in-up">
              <h2 className="text-xl font-semibold text-emerald-800 mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-2 line-clamp-3">{post.content.slice(0, 120)}...</p>
              <div className="text-xs text-gray-500 mb-2">By {post.author_username} on {new Date(post.created_at).toLocaleDateString()}</div>
              <Link href={`/blog/${post.id}`} className="text-emerald-700 hover:underline font-medium">Read more</Link>
              {user?.username === post.author_username && (
                <>
                  <Link href={`/blog/${post.id}/edit`} className="ml-4 text-emerald-500 hover:underline">Edit</Link>
                  <Link href={`/blog/${post.id}/delete`} className="ml-2 text-red-500 hover:underline">Delete</Link>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </ProtectedRoute>
  );
} 