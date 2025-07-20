"use client";
import React, { useState, useEffect } from 'react';


import Input from '../../components/Input';
import PDFCard from '../../components/PDFCard';


interface PDFBook {
  id: number;
  title: string;
  pdf: string;
  thumbnail?: string;
  uploaded_at: string;
}

export default function PDFBooksPage() {
  const [pdfBooks, setPdfBooks] = useState<PDFBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const fetchPDFBooks = async () => {
    try {
      // Use regular fetch for public access, no authentication required
      const response = await fetch(`${API_BASE_URL}/api/pdf-books/`);
      
      if (response.ok) {
        const data = await response.json();
        setPdfBooks(data.results || data);
      } else {
        console.error('Failed to fetch PDF books');
      }
    } catch (error) {
      console.error('Error fetching PDF books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch PDF books immediately for all users, no authentication required
    fetchPDFBooks();
  }, []);



  const filteredPDFBooks = pdfBooks.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading PDF books...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF Books</h1>
          <p className="text-gray-600">Browse and download Islamic literature and educational materials</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <Input
            type="text"
            label="Search"
            placeholder="Search PDF books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md"
          />
        </div>

        {/* PDF Books Grid */}
        {filteredPDFBooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No PDF books found</h3>
            <p className="text-gray-500">
              {searchQuery ? 'Try adjusting your search terms.' : 'No PDF books have been uploaded yet.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPDFBooks.map((book) => (
              <PDFCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 