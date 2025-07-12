"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import Link from 'next/link';
import ProtectedRoute from '../../../components/ProtectedRoute';
import CommentForm from '../../../components/CommentForm';
import CommentList from '../../../components/CommentList';
import { fetchWithAuth } from '../../../fetchWithAuth';

interface Blog {
  id: number;
  title: string;
  content: string;
  language: string;
  author_username: string;
  created_at: string;
  pdf?: string;
}

interface Comment {
  id: number;
  blog: number;
  user: number;
  user_username: string;
  content: string;
  created_at: string;
  replies: Reply[];
}

interface Reply {
  id: number;
  comment: number;
  user: number;
  user_username: string;
  content: string;
  created_at: string;
}

// Function to detect if text contains Urdu characters
const detectLanguage = (text: string): 'ltr' | 'rtl' => {
  if (!text) return 'ltr';
  const urduPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  return urduPattern.test(text) ? 'rtl' : 'ltr';
};

function getInitials(name: string) {
  if (!name) return '';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export default function BlogDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { token, user } = useAuth();
  const auth = useAuth();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [postingComment, setPostingComment] = useState(false);
  const [postingReply, setPostingReply] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function loadBlog() {
      const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}/`, {}, auth);
      const data = await res.json();
      setBlog(data);
    }
    loadBlog();
  }, [id, token]);

  // Fetch comments
  const fetchComments = async () => {
    setLoadingComments(true);
    const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}/comments/`, {}, auth);
    const data = await res.json();
    setComments(data);
    setLoadingComments(false);
  };
  useEffect(() => {
    if (id) fetchComments();
  }, [id]);

  // Post comment
  const handleComment = async (content: string) => {
    setPostingComment(true);
    await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}/comments/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    }, auth);
    setPostingComment(false);
    fetchComments();
  };

  // Post reply
  const handleReply = async (commentId: number, content: string) => {
    setPostingReply(true);
    await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/comments/${commentId}/replies/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    }, auth);
    setPostingReply(false);
    fetchComments();
  };

  if (!blog) return <div className="text-center py-12">Loading...</div>;

  const pdfUrl = blog.pdf
    ? blog.pdf.startsWith('http')
      ? blog.pdf
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}${blog.pdf}`
    : null;

  const titleDirection = detectLanguage(blog.title);
  const contentDirection = detectLanguage(blog.content);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 px-2 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Blog Post Section */}
          <article className="pt-8 pb-6 border-b border-gray-200">
            {/* Post Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg">
                {getInitials(blog.author_username)}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-emerald-800 text-base">{blog.author_username}</span>
                <span className="text-xs text-gray-400">{new Date(blog.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
            
            {/* Language Badge */}
            <div className="mb-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                blog.language === 'en' ? 'bg-blue-100 text-blue-800' :
                blog.language === 'ur' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {blog.language === 'en' ? 'English' : 
                 blog.language === 'ur' ? 'Urdu' : 'Mixed'}
              </span>
            </div>
            
            {/* Post Title */}
            <h1 
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight tracking-tight"
              dir={titleDirection}
              style={{ textAlign: titleDirection === 'rtl' ? 'right' : 'left' }}
            >
              {blog.title}
            </h1>
            
            {/* Post Content */}
            {blog.content ? (
              <div 
                className="text-lg font-sans text-gray-800 leading-relaxed mb-4 whitespace-pre-line"
                dir={contentDirection}
                style={{ textAlign: contentDirection === 'rtl' ? 'right' : 'left' }}
              >
                {blog.content}
              </div>
            ) : (
              <div className="text-gray-500 text-lg italic mb-4">
                No content available for this blog post.
              </div>
            )}
            
            {/* PDF Actions */}
            {pdfUrl && (
              <div className="flex flex-wrap gap-3 mb-4">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-emerald-600 text-emerald-700 font-semibold px-4 py-2 hover:bg-emerald-50 transition btn-hover"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="4" y="2" width="16" height="20" rx="2" fill="#fff" stroke="#e3342f" strokeWidth="2" />
                    <path d="M8 6h8M8 10h8M8 14h4" stroke="#e3342f" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span>View PDF</span>
                </a>
                <a
                  href={pdfUrl}
                  download
                  className="inline-flex items-center gap-2 border border-emerald-600 text-emerald-700 font-semibold px-4 py-2 hover:bg-emerald-50 transition btn-hover"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                  </svg>
                  <span>Download</span>
                </a>
              </div>
            )}
            
            <div className="flex flex-wrap gap-4 items-center mt-2">
              <Link href="/blog" className="text-emerald-600 hover:underline font-medium text-sm">
                ← Back to Blog
              </Link>
              {user?.username === blog.author_username && (
                <>
                  <Link href={`/blog/${blog.id}/edit`} className="text-emerald-500 hover:underline text-sm">Edit</Link>
                  <Link href={`/blog/${blog.id}/delete`} className="text-red-500 hover:underline text-sm">Delete</Link>
                </>
              )}
            </div>
          </article>

          {/* Comments Section */}
          <section className="pt-8 pb-12 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-emerald-800 mb-4">Comments</h2>
            {token ? (
              <div className="mb-6">
                <CommentForm onSubmit={handleComment} loading={postingComment} />
              </div>
            ) : (
              <div className="mb-6 text-gray-500">Please log in to comment.</div>
            )}
            {loadingComments ? (
              <div className="text-center text-emerald-600">Loading comments...</div>
            ) : (
              <CommentList
                comments={comments}
                onReply={handleReply}
                canReply={!!token}
                loadingReply={postingReply}
              />
            )}
          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
}