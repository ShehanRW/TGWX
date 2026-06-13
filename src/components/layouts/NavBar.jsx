import React, { useState } from 'react';
import { useScroll } from '../../hooks/useScroll';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isScrolled } = useScroll();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/'},
    { name: 'Destinations', path: '/destinations' },
    { name: 'Tours & Itineraries', path: '/tours' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact Us', path: '/contact' }
  ];

  // Handle Book a Trip button click
  const handleBookTrip = () => {
    navigate('/booking');
    setIsMobileMenuOpen(false);
  };

  // Handle Itineraries button click
  const handleItineraries = () => {
    navigate('/itineraries');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_1px_0_#E5E7EB] py-4 font-sans">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 no-underline flex-shrink-0">
            <img
              src={logo}
              alt="Insi Tours"
              className="h-25 w-auto object-contain"  // adjust h-9 to h-8 or h-10 to resize
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className="px-4 py-2 rounded-lg text-sm font-bold text-gray-700
                           hover:text-primary-500 hover:bg-primary-50
                           transition-all duration-200 no-underline whitespace-nowrap
                           tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop action buttons */}
          <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
            <button 
              onClick={handleItineraries}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-700
                         border-2 border-gray-200 bg-transparent
                         hover:border-primary-500 hover:text-primary-500 hover:bg-primary-50
                         transition-all duration-200 cursor-pointer tracking-wide"
            >
              Itineraries
            </button>
            <button 
              onClick={handleBookTrip}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white
                         bg-primary-500 border-2 border-primary-500
                         hover:bg-primary-600 hover:border-primary-600 hover:-translate-y-px
                         hover:shadow-[0_6px_16px_rgba(0,170,108,0.35)]
                         transition-all duration-200 cursor-pointer flex items-center gap-1.5
                         tracking-wide"
            >
              Book a Trip
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] p-2
                       bg-transparent border-none cursor-pointer w-10 h-10 rounded-lg
                       hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(p => !p)}
            aria-label="Toggle navigation menu"
          >
            <span className={`block w-5 h-0.5 bg-gray-700 rounded-full origin-center
                              transition-all duration-300
                              ${isMobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 rounded-full
                              transition-all duration-300
                              ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 rounded-full origin-center
                              transition-all duration-300
                              ${isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown — solid white background */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          <div className="max-w-[1200px] mx-auto px-6 pt-3 pb-5 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-4 py-3 rounded-xl text-[15px] font-bold tracking-wide
                           text-gray-800 no-underline
                           hover:bg-primary-50 hover:text-primary-500
                           transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex gap-3 mt-3 pt-4 border-t border-gray-100">
              <button 
                onClick={handleItineraries}
                className="flex-1 py-3 rounded-xl text-sm font-bold tracking-wide
                           text-primary-500 border-2 border-primary-500 bg-white
                           hover:bg-primary-50 transition-colors duration-200 cursor-pointer"
              >
                Itineraries
              </button>
              <button 
                onClick={handleBookTrip}
                className="flex-1 py-3 rounded-xl text-sm font-bold tracking-wide
                           text-white bg-primary-500 border-2 border-primary-500
                           hover:bg-primary-600 transition-colors duration-200 cursor-pointer"
              >
                Book a Trip
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;