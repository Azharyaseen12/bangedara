"use client";

import React, { useState } from 'react';

const faqs = [
  { q: 'What is Bangedara?', a: 'Bangedara is an Islamic platform for sharing and discovering knowledge, PDFs, and resources.' },
  { q: 'How can I upload a PDF?', a: 'You can upload PDFs after creating an account and logging in. Use the "Upload your PDF" button on the homepage.' },
  { q: 'Is Bangedara free to use?', a: 'Yes, Bangedara is free for all users.' },
  { q: 'How do I contact support?', a: 'Use the contact page to send us a message or email info@bangedara.com.' },
  { q: 'Can I contribute blog posts?', a: 'Yes, registered users can submit blog posts for review.' },
];

export default function FAQsPage() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 px-4 py-12 animate-fade-in-up">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">Frequently Asked Questions</h1>
        <p className="text-emerald-700 italic">Your questions about Bangedara, answered</p>
      </header>
      <div className="max-w-2xl mx-auto w-full divide-y divide-gray-200">
        {faqs.map((faq, idx) => (
          <div key={idx} className="py-4">
            <button
              className="w-full text-left flex justify-between items-center text-emerald-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400 py-2 transition"
              aria-expanded={open === idx}
              aria-controls={`faq-${idx}`}
              onClick={() => setOpen(open === idx ? null : idx)}
            >
              <span className="text-base md:text-lg">{faq.q}</span>
              <span className={`ml-2 transition-transform ${open === idx ? 'rotate-180' : ''}`}>▼</span>
            </button>
            <div
              id={`faq-${idx}`}
              className={`overflow-hidden transition-all duration-300 text-gray-700 ${open === idx ? 'max-h-40 py-2' : 'max-h-0 py-0'}`}
              aria-hidden={open !== idx}
            >
              <p className="text-base leading-relaxed">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 