"use client";

import React from 'react';

export default function AboutPage() {
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
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.94 5.5c.944-.945 2.56-.276 2.56 1.06V14a1 1 0 001 1h2.5a1 1 0 001-1V6.56c0-1.336 1.616-2.005 2.56-1.06l1.5 1.5a1 1 0 010 1.414l-1.5 1.5c-.944.945-2.56.276-2.56-1.06V14a1 1 0 01-1-1H9.5a1 1 0 01-1 1H6a1 1 0 01-1-1V6.56c0-1.336-1.616-2.005-2.56-1.06l-1.5-1.5a1 1 0 010-1.414l1.5-1.5z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4 leading-tight">
              About Bangedara
            </h1>
            <p className="text-xl text-emerald-700 mb-3 font-medium">
              Making Urdu literature and Islamic knowledge accessible for all
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full"></div>
            <p className="text-lg text-emerald-600 mt-4 italic font-serif">
              &quot;Rooted in tradition. Designed for the future.&quot;
            </p>
          </header>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Our Story Section */}
            <section className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-emerald-800 mb-4 border-l-4 border-emerald-500 pl-4">
                    Our Story
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Bangedara is a modern platform dedicated to sharing, discovering, and preserving Urdu literature and Islamic resources. We believe in the power of knowledge and the importance of making it accessible to everyone, everywhere.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Mission Section */}
            <section className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-emerald-800 mb-4 border-l-4 border-emerald-500 pl-4">
                    Our Mission
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Our mission is simple: to make Urdu literature and Islamic knowledge accessible for all. We strive to provide a welcoming space for readers, writers, and learners to connect, share, and grow together.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Team Section */}
            <section className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-emerald-800 mb-4 border-l-4 border-emerald-500 pl-4">
                    Our Team
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Bangedara is built by a passionate team of educators, developers, and community members who are dedicated to the cause of knowledge sharing. We are united by our love for Urdu, our respect for Islamic tradition, and our commitment to open access.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Vision Section */}
            <section className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-emerald-800 mb-4 border-l-4 border-emerald-500 pl-4">
                    Our Vision
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    We envision a future where everyone can access, contribute to, and benefit from a rich library of Urdu and Islamic resources. We are constantly working to improve the platform, add new features, and expand our community.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-4">
                Join Our Community
              </h3>
              <p className="text-emerald-100 text-lg mb-6">
                Be part of our mission to preserve and share Islamic knowledge and Urdu literature.
              </p>
              <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors duration-200 shadow-md">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 