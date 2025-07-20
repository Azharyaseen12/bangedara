"use client";
import React from 'react';
import Link from 'next/link';
import Button from '../../../components/Button';

export default function PsychologyClassesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Psychology Classes</h1>
              <p className="text-xl text-gray-600">Islamic psychology and mental health</p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">About This Course</h2>
              <p className="text-gray-700 mb-6">
                Our Islamic Psychology course explores the intersection of Islamic teachings and modern psychology. 
                This unique program helps students understand mental health from an Islamic perspective while 
                incorporating contemporary psychological principles. Learn how to apply Islamic wisdom to 
                modern mental health challenges.
              </p>
              
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">Course Topics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-800 mb-2">Islamic Perspective</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Understanding the human psyche in Islam</li>
                    <li>• Spiritual health and mental well-being</li>
                    <li>• Islamic counseling principles</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-800 mb-2">Modern Psychology</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Cognitive behavioral therapy</li>
                    <li>• Stress and anxiety management</li>
                    <li>• Family and relationship counseling</li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">What You&apos;ll Learn</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Islamic understanding of human psychology</li>
                <li>Mental health from a spiritual perspective</li>
                <li>Counseling techniques rooted in Islamic values</li>
                <li>Stress management and emotional regulation</li>
                <li>Family dynamics in Islamic context</li>
                <li>Addressing modern mental health challenges</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">Class Schedule</h3>
              <div className="bg-emerald-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-emerald-800">Class Times</h4>
                    <p className="text-gray-700">Every Tuesday and Thursday</p>
                    <p className="text-gray-700">7:00 PM - 9:00 PM (EST)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-800">Duration</h4>
                    <p className="text-gray-700">16 weeks</p>
                    <p className="text-gray-700">32 sessions total</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">Instructor</h3>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-900">Dr. Aisha Rahman</h4>
                <p className="text-gray-600">Licensed Clinical Psychologist with Islamic Studies background</p>
                <p className="text-gray-600">Specialized in Islamic Psychology and Mental Health Counseling</p>
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