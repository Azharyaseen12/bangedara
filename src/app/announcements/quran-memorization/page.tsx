"use client";
import React from 'react';
import Link from 'next/link';
import Button from '../../../components/Button';

export default function QuranMemorizationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Quran Memorization</h1>
              <p className="text-xl text-gray-600">Hifz program with expert teachers</p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">About This Program</h2>
              <p className="text-gray-700 mb-6">
                Our Quran Memorization (Hifz) program is designed to help students memorize the entire Quran 
                with proper tajweed and understanding. This intensive program combines traditional memorization 
                techniques with modern learning methods, ensuring students develop a deep connection with the 
                Holy Quran while maintaining proper pronunciation and recitation.
              </p>
              
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">Program Structure</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-800 mb-2">Foundation</h4>
                  <p className="text-gray-700 text-sm">Basic tajweed rules, proper pronunciation, and memorization techniques</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-800 mb-2">Memorization</h4>
                  <p className="text-gray-700 text-sm">Systematic memorization of Quranic verses with regular testing</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-800 mb-2">Completion</h4>
                  <p className="text-gray-700 text-sm">Final review, certification, and guidance for continued practice</p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">What You&apos;ll Learn</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Proper Quranic recitation with tajweed</li>
                <li>Effective memorization techniques and strategies</li>
                <li>Understanding of Quranic meanings and context</li>
                <li>Regular testing and progress tracking</li>
                <li>Individual attention and personalized guidance</li>
                <li>Preparation for Quranic competitions and certifications</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">Class Schedule</h3>
              <div className="bg-emerald-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-emerald-800">Daily Classes</h4>
                    <p className="text-gray-700">Monday to Friday</p>
                    <p className="text-gray-700">5:00 PM - 7:00 PM (EST)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-800">Weekend Review</h4>
                    <p className="text-gray-700">Saturday and Sunday</p>
                    <p className="text-gray-700">10:00 AM - 12:00 PM (EST)</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">Instructor</h3>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-900">Qari Muhammad Abdullah</h4>
                <p className="text-gray-600">Certified Quran teacher with 20+ years of Hifz teaching experience</p>
                <p className="text-gray-600">Specialized in Tajweed and Quran Memorization</p>
              </div>
              
              <div className="text-center mt-8">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white mr-4">
                  Enroll Now
                </Button>
                <Link href="/">
                  <Button size="lg" variant="outline">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 