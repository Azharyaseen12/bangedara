"use client";
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';


interface Blog {
  id: number;
  title: string;
  content: string;
  language: string;
  author_username: string;
  created_at: string;
}

// Function to detect if text contains Urdu characters
const detectLanguage = (text: string): 'ltr' | 'rtl' => {
  if (!text) return 'ltr';
  const urduPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  return urduPattern.test(text) ? 'rtl' : 'ltr';
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const auth = useAuth();

  const loadBlogs = async (search = '', language = 'all') => {
    setIsLoading(true);
    try {
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/`;
      const params = new URLSearchParams();
      
      if (search) {
        params.append('search', search);
      }
      if (language !== 'all') {
        params.append('language', language);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      // Use regular fetch for public access
      const res = await fetch(url);
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (query: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          loadBlogs(query, selectedLanguage);
        }, 300); // 300ms delay
      };
    })(),
    [auth, selectedLanguage]
  );

  useEffect(() => {
    loadBlogs(searchQuery, selectedLanguage);
  }, [token, selectedLanguage]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  // Handle language filter change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedLanguage(value);
    loadBlogs(searchQuery, value);
  };

  return (
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
            {token ? (
              <Link 
                href="/blog/new" 
                className="inline-flex items-center px-8 py-3 bg-white text-emerald-700 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-emerald-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Post a Blog
              </Link>
            ) : (
              <Link 
                href="/login" 
                className="inline-flex items-center px-8 py-3 bg-white text-emerald-700 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-emerald-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-1H7v-1H5v-1H3v-1h2v-1h2v-1h2v-1h2.257A6 6 0 0121 9z" />
                </svg>
                Login to Post
              </Link>
            )}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="py-8 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search blogs by title..."
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {isLoading && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg className="animate-spin h-5 w-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Language Filter */}
              <div className="sm:w-48">
                <select
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                >
                  <option value="all">All Languages</option>
                  <option value="en">English</option>
                  <option value="ur">Urdu</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
              
              {(searchQuery || selectedLanguage !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedLanguage('all');
                    loadBlogs('', 'all');
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            {blogs.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {searchQuery || selectedLanguage !== 'all' ? (
                    <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  ) : (
                    <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )}
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  {searchQuery || selectedLanguage !== 'all' ? 'No Results Found' : 'No Posts Yet'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery || selectedLanguage !== 'all'
                    ? `No blogs found matching your criteria. Try adjusting your search or filters.`
                    : 'Be the first to share knowledge with the community'
                  }
                </p>
                {!searchQuery && selectedLanguage === 'all' && (
                  token ? (
                    <Link 
                      href="/blog/new" 
                      className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Create First Post
                    </Link>
                  ) : (
                    <Link 
                      href="/login" 
                      className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Login to Create First Post
                    </Link>
                  )
                )}
              </div>
            ) : (
              Array.isArray(blogs) ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {blogs.map((post) => {
                    const titleDirection = detectLanguage(post.title);
                    const contentDirection = detectLanguage(post.content);
                    
                    return (
                      <article 
                        key={post.id} 
                        className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
                      >
                        {/* Blog Card Content */}
                        <div className="p-8">
                          {/* Language Badge */}
                          <div className="mb-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              post.language === 'en' ? 'bg-blue-100 text-blue-800' :
                              post.language === 'ur' ? 'bg-green-100 text-green-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {post.language === 'en' ? 'English' : 
                               post.language === 'ur' ? 'Urdu' : 'Mixed'}
                            </span>
                          </div>
                          
                          {/* Title */}
                          <h2 
                            className="text-xl md:text-2xl font-serif font-semibold text-gray-900 mb-4 leading-tight group-hover:text-emerald-700 transition-colors"
                            dir={titleDirection}
                            style={{ textAlign: titleDirection === 'rtl' ? 'right' : 'left' }}
                          >
                            {post.title}
                          </h2>
                          
                          {/* Content Preview */}
                          {post.content ? (
                            <p 
                              className="text-gray-600 text-base leading-relaxed mb-6 line-clamp-3"
                              dir={contentDirection}
                              style={{ textAlign: contentDirection === 'rtl' ? 'right' : 'left' }}
                            >
                              {post.content.slice(0, 150)}...
                            </p>
                          ) : (
                            <p className="text-gray-500 text-base leading-relaxed mb-6 italic">
                              No content preview available
                            </p>
                          )}
                          
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
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 text-red-600 font-semibold">
                  Failed to load blogs. Please refresh the page or log in again.
                </div>
              )
            )}
          </div>
        </div>
      </main>
    );
} 