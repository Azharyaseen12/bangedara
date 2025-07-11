"use client";

import React, { useState } from 'react';

const faqs = [
  { 
    q: 'What is Bangedara?', 
    a: 'Bangedara is an Islamic platform for sharing and discovering knowledge, PDFs, and resources. We focus on making Urdu literature and Islamic knowledge accessible for everyone.' 
  },
  { 
    q: 'How can I upload a PDF?', 
    a: 'You can upload PDFs after creating an account and logging in. Use the "Upload your PDF" button on the homepage. We support various formats and ensure your content is properly categorized.' 
  },
  { 
    q: 'Is Bangedara free to use?', 
    a: 'Yes, Bangedara is completely free for all users. We believe in making knowledge accessible to everyone without any barriers.' 
  },
  { 
    q: 'How do I contact support?', 
    a: 'You can use our contact page to send us a message, email us directly at info@bangedara.com, or call us during business hours. We typically respond within 24 hours.' 
  },
  { 
    q: 'Can I contribute blog posts?', 
    a: 'Yes, registered users can submit blog posts for review. We welcome contributions that align with our mission of sharing Islamic knowledge and Urdu literature.' 
  },
  { 
    q: 'What types of content can I find?', 
    a: 'You can find a wide variety of content including Islamic books, Urdu literature, educational PDFs, research papers, and community-contributed resources. All content is carefully curated for quality and relevance.' 
  },
  { 
    q: 'How do I search for specific content?', 
    a: 'Use our search functionality to find specific topics, authors, or content types. You can filter by categories, tags, and publication dates to find exactly what you\'re looking for.' 
  },
  { 
    q: 'Is my personal information secure?', 
    a: 'Absolutely. We take your privacy seriously and follow strict security protocols to protect your personal information. Your data is never shared with third parties without your explicit consent.' 
  },
];

export default function FAQsPage() {
  const [open, setOpen] = useState<number | null>(null);
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <header className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4 leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-emerald-700 mb-3 font-medium">
              Everything you need to know about Bangedara
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full"></div>
            <p className="text-lg text-emerald-600 mt-4 italic font-serif">
              &quot;Knowledge is power, and we&apos;re here to help you find it.&quot;
            </p>
          </header>

          {/* FAQs Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 overflow-hidden">
            <div className="p-8">
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
                    <button
                      className="w-full text-left flex justify-between items-center p-6 bg-gray-50 hover:bg-emerald-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      aria-expanded={open === idx}
                      aria-controls={`faq-${idx}`}
                      onClick={() => setOpen(open === idx ? null : idx)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-lg font-semibold text-gray-800 leading-relaxed">{faq.q}</span>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <svg 
                          className={`w-6 h-6 text-emerald-600 transition-transform duration-300 ${open === idx ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    <div
                      id={`faq-${idx}`}
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        open === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                      aria-hidden={open !== idx}
                    >
                      <div className="px-6 pb-6 pt-2">
                        <div className="pl-12">
                          <p className="text-gray-700 leading-relaxed text-base">{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-4">
                Still Have Questions?
              </h3>
              <p className="text-emerald-100 text-lg mb-6">
                Can&apos;t find what you&apos;re looking for? We&apos;re here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors duration-200 shadow-md inline-flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact Us
                </a>
                <a 
                  href="/about" 
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors duration-200 inline-flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 