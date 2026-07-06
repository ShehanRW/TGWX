import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroMain from "../../../assets/hero-main.jpg";
import heroTop from "../../../assets/hero-top.jpg";
import heroBottom from "../../../assets/hero-bottom.jpg";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: heroMain, tag: "Untouched Paradises" },
    { image: heroTop, tag: "Cultural Landmarks" },
    { image: heroBottom, tag: "Breathtaking Journeys" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="h-screen w-full relative overflow-hidden bg-slate-950">
      
      {/* 1. Full-Bleed Background Carousel Layer */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.tag}
              className={`w-full h-full object-cover transition-transform duration-[4500ms] ease-out ${
                index === currentSlide ? "scale-105" : "scale-100"
              }`}
            />
            
            {/* 2. The Blending Mask: Master Cinematic Gradient Overlay */}
            {/* Creates a deep solid text mask on the left that beautifully dissolves into the image on the right */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 via-slate-900/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
            
            {/* Slide Meta Label */}
            <div className="absolute bottom-24 left-6 sm:left-12 lg:left-20 text-left z-30 hidden sm:block">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-400 bg-slate-950/60 backdrop-blur-md rounded-md border border-slate-800">
                {slide.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Floating Content Layer (Directly over the images) */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12">
          
          {/* Text wrapper sits inside the shadow grid area */}
          <div className="col-span-1 lg:col-span-7 text-left">

            <p className="text-base sm:text-lg text-slate-200/90 text-white leading-relaxed mb-10 max-w-md drop-shadow">
              Insi Tours is your gateway to the wonders of the pearl of the Indian Ocean.
            </p>

            <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-black leading-[1.05] tracking-tight text-white mb-6 drop-shadow-xl">
              Your Island Story <br />
              <span className="bg-gradient-to-r from-primary-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed mb-10 max-w-md drop-shadow">
              We craft unforgettable journeys that blend culture, nature, and adventure, ensuring every trip is a story worth telling.
            </p>

            {/* <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed mb-10 max-w-md drop-shadow">
              Honest organic reviews, unbeatable deals, and breathtaking destinations. We handle the details, you make the memories.
            </p> */}

            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-emerald-500/20 border border-primary-500/30 text-primary-300 px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              Trusted Sri Lankan Experts
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/booking" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-primary-500 to-emerald-500 hover:from-primary-600 hover:to-emerald-600 cursor-pointer border-none transition-all duration-300 shadow-[0_4px_20px_rgba(0,170,108,0.4)] hover:shadow-[0_6px_24px_rgba(0,170,108,0.5)] transform hover:-translate-y-0.5 active:translate-y-0">
                  Book a Trip
                </button>
              </Link>
              <Link to="/tours" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 rounded-xl text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0">
                  Explore Itineraries
                </button>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* 4. Carousel Control Dots */}
      <div className="absolute bottom-8 right-6 sm:right-12 lg:right-20 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentSlide ? "w-6 bg-primary-400" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
};

export default HeroSection;