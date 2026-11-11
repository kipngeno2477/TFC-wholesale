import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

// Real store images from /products-img/
const HERO_SLIDES = [
  {
    id: 1,
    image: '/products-img/2000 jkt.jpeg',
    badge: 'KENYA BESTSELLERS',
    title: 'TRENDY MEN\'S JACKETS',
    subtitle: '& STREETWEAR DEALS',
    tagline: 'Heavyweight hoodies, bomber jackets, executive khakis & raw denim from Nairobi & Eldoret.',
    buttonText: 'SHOP MEN\'S COLLECTION',
    buttonColor: 'bg-teal-600 hover:bg-teal-700 text-white',
    category: 'mens-wear',
  },
  {
    id: 2,
    image: '/products-img/smart dress.jpeg',
    badge: 'WOMEN\'S FASHION 2026',
    title: 'ELEGANT LADIES\' DRESSES',
    subtitle: '& VINTAGE MOM JEANS',
    tagline: 'Floral midi dresses, high-waist mom jeans, soft knitwear & tailored chic jumpsuits.',
    buttonText: 'SHOP WOMEN\'S LOOKS',
    buttonColor: 'bg-rose-600 hover:bg-rose-700 text-white',
    category: 'ladies-wear',
  },
  {
    id: 3,
    image: '/products-img/duvet.jpeg',
    badge: 'BEDDING & HOME LUXURY',
    title: '6X6 HEAVYWEIGHT DUVETS',
    subtitle: '& MAASAI SHUKAS',
    tagline: 'Siliconized microfiber reversible duvets, pure cotton bedsheets & original Maasai blankets.',
    buttonText: 'EXPLORE BEDDING & HOME',
    buttonColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    category: 'bedding-home',
  },
  {
    id: 4,
    image: '/products-img/arsenal jersry.jpeg',
    badge: 'SPORTSWEAR & JERSEYS',
    title: 'OFFICIAL MATCHDAY KITS',
    subtitle: 'ARSENAL, CHELSEA & CITY',
    tagline: 'Premium Thai-grade player edition jerseys & athletic performance tracksuits.',
    buttonText: 'SHOP SPORTSWEAR',
    buttonColor: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    category: 'sportswear',
  },
  {
    id: 5,
    image: '/products-img/duve bales.jpeg',
    badge: 'DIRECT FACTORY IMPORTS',
    title: 'BUY MORE. SAVE MORE.',
    subtitle: 'WHOLESALE EXPORT BALES',
    tagline: '50kg duvet bales, velvet drapes & 30-piece reseller starter packages with countrywide delivery.',
    buttonText: 'VIEW WHOLESALE BALES',
    buttonColor: 'bg-amber-600 hover:bg-amber-700 text-stone-950 font-black',
    category: 'bales',
  },
];

// 4 Category Showcase Cards using Real Store Images
const SHOWCASE_CARDS = [
  {
    id: 'new-releases',
    title: 'NEW RELEASES',
    subtitle: 'Vintage Biker Leather & Hoodies',
    image: '/products-img/leather jkt.jpeg',
    category: 'new-arrivals',
    bgColor: 'bg-[#F4EFEA]',
  },
  {
    id: 'womens-bestsellers',
    title: "WOMEN'S BESTSELLERS",
    subtitle: 'Chic Midi Dresses & Mom Jeans',
    image: '/products-img/smart dress.jpeg',
    category: 'ladies-wear',
    bgColor: 'bg-[#F2E8E8]',
  },
  {
    id: 'mens-collection',
    title: "MEN'S COLLECTION",
    subtitle: 'Executive Stretch Khakis & Denims',
    image: '/products-img/khaki.jpeg',
    category: 'mens-wear',
    bgColor: 'bg-[#EAEFF2]',
  },
  {
    id: 'sale-items',
    title: 'SALE & BALES',
    subtitle: '50kg Duvet & Tee Bales',
    image: '/products-img/duve bales.jpeg',
    category: 'bales',
    bgColor: 'bg-[#FAF0E6]',
  },
];

export default function Hero({ onShopClick, onWholesaleClick, onNavigateCategory }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { setSelectedCategory } = useProducts();

  // Auto-play slideshow every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handleCtaClick = (cat) => {
    setSelectedCategory(cat);
    if (onNavigateCategory) {
      onNavigateCategory(cat);
    } else {
      const target = document.getElementById('products');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section id="hero" className="w-full bg-white">
      {/* 1. Main Hero Image Slider Carousel with Real Store Images & Transitions */}
      <div 
        className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] bg-stone-900 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Animated Background Slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-0"
          >
            <img
              src={activeSlide.image}
              alt={activeSlide.title}
              className="w-full h-full object-cover object-center brightness-90"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-stone-950/30" />
          </motion.div>
        </AnimatePresence>

        {/* Content Box Overlay with high contrast */}
        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 sm:px-10 lg:px-12 flex items-center">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-xl text-left text-white space-y-4"
          >
            {/* Category / Collection Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md border border-white/30 px-3.5 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-black uppercase tracking-widest text-white">
                {activeSlide.badge}
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white uppercase leading-[1.05] drop-shadow-lg">
                {activeSlide.title}
                <span className="block mt-1 text-white">
                  {activeSlide.subtitle}
                </span>
              </h1>
              <p className="text-sm sm:text-base text-stone-200 font-medium max-w-md pt-2 drop-shadow">
                {activeSlide.tagline}
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-3">
              <button
                onClick={() => handleCtaClick(activeSlide.category)}
                className={`px-7 py-3.5 rounded-lg font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 flex items-center space-x-2 ${activeSlide.buttonColor}`}
              >
                <span>{activeSlide.buttonText}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Arrow Controls */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-stone-900 flex items-center justify-center transition shadow-lg backdrop-blur-sm"
          title="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-stone-900 flex items-center justify-center transition shadow-lg backdrop-blur-sm"
          title="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Dots at Bottom Center */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2.5">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === idx
                  ? 'w-8 h-2.5 bg-teal-400 shadow-md'
                  : 'w-2.5 h-2.5 bg-white/60 hover:bg-white'
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 2. 4 Promotional Showcase Cards (Directly Below Hero with Real Store Images) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SHOWCASE_CARDS.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCtaClick(card.category)}
              className="group cursor-pointer flex flex-col items-center text-center space-y-3"
            >
              {/* Card Image Container with Real Store Product Image */}
              <div className={`relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-sm border border-stone-200/90 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1.5 ${card.bgColor}`}>
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-stone-950/10 group-hover:bg-transparent transition-colors" />
                
                {/* Subtle overlay pill */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="block bg-white/95 backdrop-blur-md py-1.5 px-3 rounded-lg text-[10px] font-black uppercase tracking-wider text-stone-900 shadow-sm border border-stone-200">
                    {card.title}
                  </span>
                </div>
              </div>

              {/* Card Subtitle text */}
              <p className="text-xs text-stone-500 font-medium group-hover:text-teal-600 transition-colors">
                {card.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
