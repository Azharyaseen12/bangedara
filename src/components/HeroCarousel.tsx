"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import Button from './Button';
import Link from 'next/link';

interface HeroSlide {
  id: number;
  image: string;
  headline: string;
  subtitle: string;
  description?: string;
  cta: string;
  ctaLink: string;
  bgColor?: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  className?: string;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides, className = '' }) => {

  return (
    <section className={`relative w-full ${className}`}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}

        className="h-[600px] md:h-[700px] lg:h-[800px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                backgroundColor: slide.bgColor || 'rgba(5, 150, 105, 0.8)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
            </div>
            
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
                    {slide.headline}
                  </h1>
                  <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-200 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    {slide.subtitle}
                  </p>
                  {slide.description && (
                    <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                      {slide.description}
                    </p>
                  )}
                  <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <Link href={slide.ctaLink}>
                      <Button 
                        size="xl" 
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                      >
                        {slide.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="swiper-pagination"></div>
      </div>
      
      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
};

export default HeroCarousel; 