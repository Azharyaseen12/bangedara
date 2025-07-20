"use client";
import React, { useEffect, useState } from 'react';
import HeroCarousel from '../components/HeroCarousel';
import Button from '../components/Button';
import Card from '../components/Card';
import Link from 'next/link';

const heroSlides = [
  {
    id: 1,
    image: '/hero1.svg',
    headline: 'Discover Islamic Knowledge',
    subtitle: 'Join our community of learners and scholars',
    description: 'Access authentic Islamic content, connect with scholars, and grow your faith through our comprehensive platform.',
    cta: 'Get Started',
    ctaLink: '/login',
  },
  {
    id: 2,
    image: '/hero2.svg',
    headline: 'Read, Learn, Share',
    subtitle: 'Share your wisdom with the Ummah',
    description: 'Contribute to the global Islamic community by sharing your knowledge, insights, and spiritual experiences.',
    cta: 'Upload your PDF',
    ctaLink: '/blog/new',
  },
  {
    id: 3,
    image: '/hero3.svg',
    headline: 'Enlighten Your Mind',
    subtitle: 'Explore authentic Islamic content',
    description: 'Dive deep into Islamic studies with our curated collection of articles, books, and educational resources.',
    cta: 'Explore Now',
    ctaLink: '/blog',
  },
];

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Authentic Content',
    description: 'Access verified Islamic literature, articles, and educational materials from trusted sources.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Community Driven',
    description: 'Connect with fellow Muslims, share knowledge, and participate in meaningful discussions.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Secure Platform',
    description: 'Your data and privacy are protected with enterprise-grade security measures.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Fast & Reliable',
    description: 'Lightning-fast performance ensures you can access content anytime, anywhere.',
  },
];

const stats = [
  { number: '1000+', label: 'Active Users' },
  { number: '500+', label: 'Blog Posts' },
  { number: '50+', label: 'PDF Resources' },
  { number: '24/7', label: 'Community Support' }
];

const testimonials = [
  {
    name: 'Aisha Rahman',
    role: 'Student',
    content: 'Bangedara has been an incredible resource for my Islamic studies. The community is supportive and the content is authentic.',
    avatar: '👩‍🎓'
  },
  {
    name: 'Ahmed Hassan',
    role: 'Teacher',
    content: 'As an Islamic studies teacher, I find the platform invaluable for sharing knowledge and connecting with students worldwide.',
    avatar: '👨‍🏫'
  },
  {
    name: 'Fatima Ali',
    role: 'Researcher',
    content: 'The quality of content and the ease of sharing knowledge makes Bangedara my go-to platform for Islamic research.',
    avatar: '👩‍🔬'
  }
];

interface Blog {
  id: number;
  title: string;
  content: string;
  author_username: string;
  created_at: string;
}

// Public landing page component
function PublicLandingPage() {
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    // Fetch featured blogs (limit to 3)
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFeaturedBlogs(data.slice(0, 3));
        }
      })
      .catch(() => {
        // Fallback data if API fails
        setFeaturedBlogs([
          {
            id: 1,
            title: 'The Importance of Seeking Knowledge in Islam',
            content: 'Knowledge is highly valued in Islam. The Prophet Muhammad (PBUH) emphasized the importance of seeking knowledge throughout one\'s life...',
            author_username: 'Islamic Scholar',
            created_at: '2024-01-15T10:00:00Z'
          },
          {
            id: 2,
            title: 'Understanding the Five Pillars of Islam',
            content: 'The Five Pillars of Islam are the foundation of Muslim life. They are the testimony of faith, prayer, giving zakat, fasting during Ramadan...',
            author_username: 'Ustadh Ahmed',
            created_at: '2024-01-10T14:30:00Z'
          },
          {
            id: 3,
            title: 'The Beauty of Islamic Architecture',
            content: 'Islamic architecture is known for its intricate geometric patterns, calligraphy, and emphasis on creating spaces that inspire contemplation...',
            author_username: 'Architect Fatima',
            created_at: '2024-01-08T09:15:00Z'
          }
        ]);
      });
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section with Welcome Message */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-emerald-50 to-green-100">
        <div className="w-full p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                  Welcome to Bangedara
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Discover and share Islamic knowledge through our vibrant community platform. 
                  Join thousands of users in learning, growing, and connecting with fellow Muslims worldwide.
                </p>
                
                {/* Vision Statement */}
                <div className="bg-emerald-50 rounded-lg p-6 border-l-4 border-emerald-600">
                  <h2 className="text-2xl font-bold text-emerald-800 mb-3">Our Vision</h2>
                  <p className="text-gray-700 leading-relaxed">
                    To become the leading global platform for Islamic knowledge sharing, fostering a connected Ummah 
                    where every Muslim can access authentic Islamic education, connect with scholars and fellow believers, 
                    and contribute to the preservation and propagation of Islamic wisdom for future generations.
                  </p>
                </div>
              </div>
            </div>

            {/* Announcements Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Announcements
                </h2>
                <div className="space-y-4">
                  <Link href="/announcements/seerah-classes" className="block">
                    <div className="border-2 border-emerald-600 rounded-lg p-4 bg-white hover:bg-emerald-50 transition-colors duration-200 cursor-pointer">
                      <h3 className="font-semibold text-gray-900">Seerah Classes</h3>
                      <p className="text-sm text-gray-600 mt-1">Learn about the life of Prophet Muhammad (PBUH)</p>
                    </div>
                  </Link>
                  <Link href="/announcements/arabic-classes" className="block">
                    <div className="border-2 border-emerald-600 rounded-lg p-4 bg-white hover:bg-emerald-50 transition-colors duration-200 cursor-pointer">
                      <h3 className="font-semibold text-gray-900">Arabic Classes</h3>
                      <p className="text-sm text-gray-600 mt-1">Master classical and modern Arabic</p>
                    </div>
                  </Link>
                  <Link href="/announcements/psychology-classes" className="block">
                    <div className="border-2 border-emerald-600 rounded-lg p-4 bg-white hover:bg-emerald-50 transition-colors duration-200 cursor-pointer">
                      <h3 className="font-semibold text-gray-900">Psychology Classes</h3>
                      <p className="text-sm text-gray-600 mt-1">Islamic psychology and mental health</p>
                    </div>
                  </Link>
                  <Link href="/announcements/quran-memorization" className="block">
                    <div className="border-2 border-emerald-600 rounded-lg p-4 bg-white hover:bg-emerald-50 transition-colors duration-200 cursor-pointer">
                      <h3 className="font-semibold text-gray-900">Quran Memorization</h3>
                      <p className="text-sm text-gray-600 mt-1">Hifz program with expert teachers</p>
                    </div>
                  </Link>
                  <Link href="/announcements/islamic-finance" className="block">
                    <div className="border-2 border-emerald-600 rounded-lg p-4 bg-white hover:bg-emerald-50 transition-colors duration-200 cursor-pointer">
                      <h3 className="font-semibold text-gray-900">Islamic Finance</h3>
                      <p className="text-sm text-gray-600 mt-1">Understanding halal financial practices</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
        <div className="w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6">Welcome to Bangedara</h2>
            <p className="text-xl text-emerald-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover and share Islamic knowledge through our vibrant community platform. 
              Join thousands of users in learning, growing, and connecting with fellow Muslims worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/login">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  Login to Access
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Vision Statement Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-emerald-800 mb-6">Our Vision</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                To become the leading global platform for Islamic knowledge sharing, fostering a connected Ummah 
                where every Muslim can access authentic Islamic education, connect with scholars and fellow believers, 
                and contribute to the preservation and propagation of Islamic wisdom for future generations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-emerald-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-emerald-800 mb-3">Education</h3>
                  <p className="text-gray-600">Providing accessible, authentic Islamic education to Muslims worldwide through modern technology.</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-emerald-800 mb-3">Community</h3>
                  <p className="text-gray-600">Building a vibrant, supportive community where Muslims can connect, learn, and grow together.</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-emerald-800 mb-3">Innovation</h3>
                  <p className="text-gray-600">Leveraging cutting-edge technology to preserve and share Islamic knowledge for the digital age.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      
      {/* Statistics Section */}
      {/* <section className="py-16 bg-white">
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Bangedara?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed to provide the best Islamic learning experience with modern technology and authentic content.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} variant="elevated" className="text-center p-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-emerald-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6">Meet the Team</h2>
            <p className="text-xl text-emerald-700 max-w-3xl mx-auto">Our dedicated team is passionate about sharing knowledge and serving the Ummah.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card variant="elevated" className="flex flex-col items-center text-center p-8">
              <div className="w-32 h-32 rounded-full mb-6 border-4 border-emerald-100 shadow-md bg-emerald-100 flex items-center justify-center text-5xl font-bold text-emerald-700">
                Z
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">Zahid Nawaz</h3>
              <p className="text-gray-600">Founder & Visionary</p>
            </Card>
            <Card variant="elevated" className="flex flex-col items-center text-center p-8">
              <div className="w-32 h-32 rounded-full mb-6 border-4 border-emerald-100 shadow-md bg-emerald-100 flex items-center justify-center text-5xl font-bold text-emerald-700">
                A
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">Azhar Yaseen</h3>
              <p className="text-gray-600">Lead Developer</p>
            </Card>
            <Card variant="elevated" className="flex flex-col items-center text-center p-8">
              <div className="w-32 h-32 rounded-full mb-6 border-4 border-emerald-100 shadow-md bg-emerald-100 flex items-center justify-center text-5xl font-bold text-emerald-700">
                K
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">Kashif Nawaz</h3>
              <p className="text-gray-600">Community Manager</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Welcome Section */}


      {/* Featured Blogs Section */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Articles</h2>
            <p className="text-xl text-gray-600">Discover insightful content from our community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((blog) => (
              <Card key={blog.id} variant="elevated" className="h-full">
                <div className="h-full flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                    {blog.content}
                  </p>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>By {blog.author_username}</span>
                      <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                </div>
                    <Link href={`/blog/${blog.id}`}>
                      <Button variant="ghost" size="sm" className="w-full">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/blog">
              <Button size="lg" variant="outline">
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied users worldwide</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} variant="elevated" className="text-center p-8">
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className="text-gray-600 mb-6 italic">&quot;{testimonial.content}&quot;</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Join our community today and begin your path to deeper Islamic knowledge and spiritual growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/signup">
              <Button size="xl" className="text-emerald-600 hover:bg-gray-100">
                Get Started Free
              </Button>
            </Link>
            <Link href="/login">
              <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


// Main landing page component
export default function LandingPage() {
  // const { token } = useAuth();
  
  return(
    <PublicLandingPage />
  );
} 