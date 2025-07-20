"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Button from './Button';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { token, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Blog', href: '/blog' },
    { name: 'PDF Books', href: '/pdf-books' },
  ];
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">ب</span>
            </div>
            <span className="font-bold text-xl md:text-2xl text-gray-900">
              Bangedara
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-medium transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-700 hover:text-white hover:bg-emerald-600"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth/User Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {token && user ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" size="md" className="text-emerald-700 hover:text-white hover:bg-emerald-600">
                    {user.username || 'Profile'}
                  </Button>
                </Link>
                <Button size="md" className={'bg-emerald-600 hover:bg-emerald-700 text-white'} onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button 
                    variant="ghost" 
                    size="md"
                    className="text-emerald-700 hover:text-white hover:bg-emerald-600"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button 
                    size="md"
                    className='bg-emerald-600 hover:bg-emerald-700 text-white'
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
            <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white rounded-lg shadow-lg mt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-emerald-700 hover:text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex flex-col space-y-2">
                  {token && user ? (
                    <>
                      <Link href="/profile">
                        <Button variant="ghost" size="md" className="w-full justify-start text-emerald-700 hover:text-white hover:bg-emerald-600" onClick={() => setIsMobileMenuOpen(false)}>
                          {user.username || 'Profile'}
                        </Button>
                      </Link>
                      <Button size="md" className="w-full justify-start bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => { setIsMobileMenuOpen(false); logout(); }}>
              Logout
                      </Button>
          </>
        ) : (
                    <>
                      <Link href="/login">
                        <Button 
                          variant="ghost" 
                          size="md"
                          className="w-full justify-start text-emerald-700 hover:text-white hover:bg-emerald-600"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
              Login
                        </Button>
                      </Link>
                      <Link href="/signup">
                        <Button 
                          size="md"
                          className="w-full justify-start bg-emerald-600 hover:bg-emerald-700 text-white"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Sign Up
                        </Button>
            </Link>
          </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 