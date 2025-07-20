"use client";
import React from 'react';
import Link from 'next/link';
import Button from '../../../components/Button';

export default function IslamicFinancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Islamic Finance</h1>
              <p className="text-xl text-gray-600">Understanding halal financial practices</p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">About This Course</h2>
              <p className="text-gray-700 mb-6">
                Our Islamic Finance course provides comprehensive knowledge of halal financial practices, 
                Islamic banking principles, and Shariah-compliant investment strategies. Learn how to 
                manage your finances according to Islamic principles while understanding modern financial 
                instruments and their Islamic alternatives.
              </p>
              
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">Course Modules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-800 mb-2">Islamic Banking</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Principles of Islamic banking</li>
                    <li>• Murabaha and Ijara contracts</li>
                    <li>• Islamic savings and investment accounts</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-800 mb-2">Investment & Insurance</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Halal investment strategies</li>
                    <li>• Islamic mutual funds and ETFs</li>
                    <li>• Takaful (Islamic insurance)</li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">What You&apos;ll Learn</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Fundamental principles of Islamic finance</li>
                <li>Understanding riba (interest) and its alternatives</li>
                <li>Islamic banking products and services</li>
                <li>Shariah-compliant investment opportunities</li>
                <li>Islamic insurance (Takaful) principles</li>
                <li>Personal financial planning in Islamic context</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">Class Schedule</h3>
              <div className="bg-emerald-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-emerald-800">Class Times</h4>
                    <p className="text-gray-700">Every Monday and Wednesday</p>
                    <p className="text-gray-700">8:00 PM - 10:00 PM (EST)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-800">Duration</h4>
                    <p className="text-gray-700">8 weeks</p>
                    <p className="text-gray-700">16 sessions total</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">Instructor</h3>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-900">Dr. Omar Khalil</h4>
                <p className="text-gray-600">Islamic Finance Expert with 15+ years in Islamic banking</p>
                <p className="text-gray-600">Certified Islamic Finance Professional (CIFP)</p>
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