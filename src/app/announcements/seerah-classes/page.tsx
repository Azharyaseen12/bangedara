"use client";
import React from 'react';
import Link from 'next/link';
import Button from '../../../components/Button';

export default function SeerahClassesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Seerah Classes</h1>
              <p className="text-xl text-gray-600">Learn about the life of Prophet Muhammad (PBUH)</p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">About This Course</h2>
              <p className="text-gray-700 mb-6">
                Our comprehensive Seerah course covers the complete life story of Prophet Muhammad (PBUH) 
                from his birth in Makkah to his final days in Madinah. This course is designed to help 
                students understand the Prophet's character, teachings, and the historical context of his mission.
              </p>
              
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">Course Highlights</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Early life in Makkah and the pre-Islamic era</li>
                <li>The first revelation and the beginning of prophethood</li>
                <li>Migration to Madinah and establishment of the first Islamic state</li>
                <li>Major battles and treaties</li>
                <li>The Prophet's character, manners, and teachings</li>
                <li>Final years and the completion of the message</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">Course Schedule</h3>
              <div className="bg-emerald-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-emerald-800">Class Times</h4>
                    <p className="text-gray-700">Every Saturday and Sunday</p>
                    <p className="text-gray-700">10:00 AM - 12:00 PM (EST)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-800">Duration</h4>
                    <p className="text-gray-700">12 weeks</p>
                    <p className="text-gray-700">24 sessions total</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">Instructor</h3>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-900">Ustadh Ahmed Hassan</h4>
                <p className="text-gray-600">Islamic Scholar with 15+ years of teaching experience</p>
                <p className="text-gray-600">Specialized in Seerah and Islamic History</p>
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