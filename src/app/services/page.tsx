"use client";
import React from 'react';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      {/* Header Section */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                  Our Services
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Discover our comprehensive range of Islamic educational services designed to enrich your spiritual journey. 
                  From Quranic studies to Islamic psychology, we offer expert guidance and structured learning programs 
                  to help you grow in your faith and knowledge.
                </p>
              </div>
            </div>

            {/* Announcements Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Announcements
                </h2>
                <div className="space-y-4">
                  <div className="border-2 border-emerald-600 rounded-lg p-4 bg-white">
                    <h3 className="font-semibold text-gray-900">Seerah Classes</h3>
                    <p className="text-sm text-gray-600 mt-1">Learn about the life of Prophet Muhammad (PBUH)</p>
                  </div>
                  <div className="border-2 border-emerald-600 rounded-lg p-4 bg-white">
                    <h3 className="font-semibold text-gray-900">Arabic Classes</h3>
                    <p className="text-sm text-gray-600 mt-1">Master classical and modern Arabic</p>
                  </div>
                  <div className="border-2 border-emerald-600 rounded-lg p-4 bg-white">
                    <h3 className="font-semibold text-gray-900">Psychology Classes</h3>
                    <p className="text-sm text-gray-600 mt-1">Islamic psychology and mental health</p>
                  </div>
                  <div className="border-2 border-emerald-600 rounded-lg p-4 bg-white">
                    <h3 className="font-semibold text-gray-900">Quran Memorization</h3>
                    <p className="text-sm text-gray-600 mt-1">Hifz program with expert teachers</p>
                  </div>
                  <div className="border-2 border-emerald-600 rounded-lg p-4 bg-white">
                    <h3 className="font-semibold text-gray-900">Islamic Finance</h3>
                    <p className="text-sm text-gray-600 mt-1">Understanding halal financial practices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-600 rounded-lg p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">Zahid Nawaz</h3>
              <p className="text-emerald-100">Founder & Visionary</p>
            </div>
            <div className="bg-emerald-600 rounded-lg p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">Azher Yaseen</h3>
              <p className="text-emerald-100">Lead Developer</p>
            </div>
            <div className="bg-emerald-600 rounded-lg p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">Kashif Nawaz</h3>
              <p className="text-emerald-100">Community Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 