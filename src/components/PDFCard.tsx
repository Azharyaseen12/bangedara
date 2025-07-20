"use client";

import React from 'react';
import Button from './Button';

interface PDFBook {
  id: number;
  title: string;
  pdf: string;
  thumbnail?: string;
  uploaded_at: string;
}

interface PDFCardProps {
  book: PDFBook;
}

export default function PDFCard({ book }: PDFCardProps) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  const handleViewPDF = () => {
    window.open(`${API_BASE_URL}${book.pdf}`, '_blank');
  };

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = `${API_BASE_URL}${book.pdf}`;
    link.download = book.title.replace(/[^a-zA-Z0-9]/g, '_') + '.pdf';
    link.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Thumbnail */}
      <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
        {book.thumbnail ? (
          <img
            src={`${book.thumbnail}`}
            alt={book.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Hide the image and show the default icon when image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`text-gray-400 ${book.thumbnail ? 'hidden' : ''} w-full h-full flex items-center justify-center`}>
          <img 
            src="/PDF.png" 
            alt="PDF Icon" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{book.title}</h3>
        <p className="text-sm text-gray-500 mb-4">
          Uploaded {new Date(book.uploaded_at).toLocaleDateString()}
        </p>
        
        <div className="flex gap-2">
          <Button
            onClick={handleViewPDF}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
          >
            View PDF
          </Button>
          <Button
            onClick={handleDownloadPDF}
            variant="ghost"
            className="text-emerald-600 hover:text-emerald-700 text-sm"
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
} 