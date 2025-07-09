"use client";

import React from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 px-4 py-12 animate-fade-in-up">
      <div className="max-w-3xl mx-auto w-full">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-3">About Bangedara</h1>
          <p className="text-lg text-emerald-700">Making Urdu literature and Islamic knowledge accessible for all</p>
        </header>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Our Story</h2>
          <p className="text-base text-gray-800 leading-relaxed mb-4">
            Bangedara is a modern platform dedicated to sharing, discovering, and preserving Urdu literature and Islamic resources. We believe in the power of knowledge and the importance of making it accessible to everyone, everywhere.
          </p>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Our Mission</h2>
          <p className="text-base text-gray-800 leading-relaxed mb-4">
            Our mission is simple: to make Urdu literature and Islamic knowledge accessible for all. We strive to provide a welcoming space for readers, writers, and learners to connect, share, and grow together.
          </p>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Our Team</h2>
          <p className="text-base text-gray-800 leading-relaxed mb-4">
            Bangedara is built by a passionate team of educators, developers, and community members who are dedicated to the cause of knowledge sharing. We are united by our love for Urdu, our respect for Islamic tradition, and our commitment to open access.
          </p>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Our Vision</h2>
          <p className="text-base text-gray-800 leading-relaxed mb-4">
            We envision a future where everyone can access, contribute to, and benefit from a rich library of Urdu and Islamic resources. We are constantly working to improve the platform, add new features, and expand our community.
          </p>
        </section>
        {/* Optionally, add a team image or illustration here */}
      </div>
    </main>
  );
} 