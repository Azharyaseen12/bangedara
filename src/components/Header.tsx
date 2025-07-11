"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from './Button';

interface HeaderProps {
  user?: { username?: string } | null;
  token?: string | null;
}

const Header: React.FC<HeaderProps> = ({ user, token }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQs', href: '/faqs' },
  ];

  // const handleComment = async (content: string) => {
  //   setPostingComment(true);
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}/comments/`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: token ? `Bearer ${token}` : '',
  //     },
  //     body: JSON.stringify({ content }),
  //   });
  //   if (!res.ok) {
  //     const error = await res.json();
  //     console.error('Comment error:', error);
  //     alert('Error posting comment: ' + JSON.stringify(error));
  //   }
  //   setPostingComment(false);
  //   fetchComments();
  // };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">ب</span>
            </div>
            <span className={`font-bold text-xl md:text-2xl transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              Bangedara
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors duration-200 hover:text-emerald-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
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
                  <Button variant="ghost" size="md" className={isScrolled ? 'text-gray-700 hover:text-emerald-600' : 'text-white hover:text-emerald-200'}>
                    {user.username || 'Profile'}
                  </Button>
                </Link>
                <Link href="/logout">
                  <Button size="md" className={isScrolled ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-white text-emerald-600 hover:bg-gray-100'}>
                    Logout
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button 
                    variant="ghost" 
                    size="md"
                    className={isScrolled ? 'text-gray-700 hover:text-emerald-600' : 'text-white hover:text-emerald-200'}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button 
                    size="md"
                    className={isScrolled ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-white text-emerald-600 hover:bg-gray-100'}
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
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
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
                        <Button variant="ghost" size="md" className="w-full justify-start text-gray-700 hover:text-emerald-600" onClick={() => setIsMobileMenuOpen(false)}>
                          {user.username || 'Profile'}
                        </Button>
                      </Link>
                      <Link href="/logout">
                        <Button size="md" className="w-full justify-start bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsMobileMenuOpen(false)}>
                          Logout
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <Button 
                          variant="ghost" 
                          size="md"
                          className="w-full justify-start text-gray-700 hover:text-emerald-600"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Login
                        </Button>
                      </Link>
                      <Link href="/signup">
                        <Button 
                          size="md"
                          className="w-full justify-start bg-emerald-600 hover:bg-emerald-700"
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
};

export default Header; 