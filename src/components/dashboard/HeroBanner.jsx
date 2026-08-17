import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiShoppingBag, FiArrowRight } from 'react-icons/fi';

const HERO_SLIDES = [
  {
    id: 1,
    title: "Welcome to AuraMart",
    subtitle: "Browse top quality electronics, fine jewelry, and stylish apparel at affordable prices.",
    badge: "Special Season Sale",
    buttonText: "Shop Products",
    bgGradient: "from-blue-600 via-indigo-600 to-blue-700",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    fallbackImage: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"
  },
  {
    id: 2,
    title: "Fashion & Jewelry Collection",
    subtitle: "Explore our latest arrivals in men's apparel, women's fashion, and accessories.",
    badge: "Trending Now",
    buttonText: "Browse Collection",
    bgGradient: "from-indigo-600 via-purple-600 to-indigo-700",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
    fallbackImage: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
  },
  {
    id: 3,
    title: "Electronics & Gadgets",
    subtitle: "High-speed SSDs, external hard drives, and gadgets with official warranty.",
    badge: "Best Sellers",
    buttonText: "Shop Electronics",
    bgGradient: "from-blue-700 via-sky-600 to-indigo-700",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    fallbackImage: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg"
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageError, setImageError] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  const handleImageError = (id) => {
    setImageError((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r text-white shadow-md my-6">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} transition-all duration-700`} />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Text */}
        <div className="lg:col-span-7 space-y-4">
          <span className="inline-block bg-white/20 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            {slide.badge}
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            {slide.title}
          </h1>

          <p className="text-sm sm:text-base text-blue-100 font-normal leading-relaxed max-w-lg">
            {slide.subtitle}
          </p>

          <div className="pt-2">
            <a
              href="#products-section"
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-bold text-sm px-6 py-3 rounded-lg shadow transition-all"
            >
              <FiShoppingBag size={16} />
              <span>{slide.buttonText}</span>
              <FiArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="w-56 sm:w-72 h-56 sm:h-72 bg-white rounded-xl p-4 shadow-lg flex items-center justify-center overflow-hidden">
            {!imageError[slide.id] ? (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.title}
                onError={() => handleImageError(slide.id)}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <img
                src={slide.fallbackImage}
                alt={slide.title}
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>

      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
          className="p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all"
          aria-label="Previous Slide"
        >
          <FiChevronLeft size={16} />
        </button>
        <div className="flex gap-1.5">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentSlide ? 'w-5 bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
          className="p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all"
          aria-label="Next Slide"
        >
          <FiChevronRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
