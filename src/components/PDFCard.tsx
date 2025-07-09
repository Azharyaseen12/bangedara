"use client";

import React from 'react';
import Button from './Button';

interface PDFCardProps {
  title: string;
  description: string;
  link: string;
}

const PDFCard: React.FC<PDFCardProps> = ({ title, description, link }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl hover-lift group">
    <div>
      <div className="flex items-center mb-4">
        <div className="text-4xl mr-4">📄</div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-emerald-800 mb-3 group-hover:text-emerald-600 transition-colors">{title}</h3>
        </div>
      </div>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
    </div>
    <div className="mt-auto">
      <Button as="a" href={link} className="w-full bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg">
        <span className="flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Read / Download
        </span>
      </Button>
    </div>
  </div>
);

export default PDFCard; 