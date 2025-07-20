"use client";
import React from 'react';
import Link from 'next/link';
import Button from '../../../components/Button';

export default function ArabicClassesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Arabic Classes</h1>
              <p className="text-xl text-gray-600">Master classical and modern Arabic</p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">About This Course</h2>
              <p className="text-gray-700 mb-6">
                Our Arabic language program offers comprehensive instruction in both classical and modern Arabic. 
                Students will learn to read, write, speak, and understand Arabic with a focus on Islamic texts 
                and contemporary communication. The course is designed for all levels, from complete beginners 
                to advanced learners.
              </p>
              
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">Course Levels</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-800 mb-2">Beginner</h4>
                  <p className="text-gray-700 text-sm">Learn the Arabic alphabet, basic grammar, and essential vocabulary</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-800 mb-2">Intermediate</h4>
                  <p className="text-gray-700 text-sm">Advanced grammar, reading comprehension, and conversational skills</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-800 mb-2">Advanced</h4>
                  <p className="text-gray-700 text-sm">Classical texts, poetry, and advanced Islamic literature</p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">What You&apos;ll Learn</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Arabic alphabet and pronunciation</li>
                <li>Basic grammar and sentence structure</li>
                <li>Reading and writing Arabic script</li>
                <li>Islamic vocabulary and terminology</li>
                <li>Quranic Arabic and classical texts</li>
                <li>Modern conversational Arabic</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">Class Schedule</h3>
              <div className="bg-emerald-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-emerald-800">Weekday Classes</h4>
                    <p className="text-gray-700">Monday, Wednesday, Friday</p>
                    <p className="text-gray-700">6:00 PM - 7:30 PM (EST)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-800">Weekend Classes</h4>
                    <p className="text-gray-700">Saturday and Sunday</p>
                    <p className="text-gray-700">2:00 PM - 4:00 PM (EST)</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">Instructor</h3>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-900">Ustadha Fatima Al-Zahra</h4>
                <p className="text-gray-600">Native Arabic speaker with 10+ years of teaching experience</p>
                <p className="text-gray-600">Specialized in Classical Arabic and Islamic Literature</p>
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