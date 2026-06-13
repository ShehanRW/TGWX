import React, { useState } from 'react';
import { useScroll } from '../../hooks/useScroll';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isScrolled } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/'},
    { name: 'Destinations', path: '/destinations' },
    { name: 'Tours & Itineraries', path: '/tours' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact Us', path: '/contact' }
  ];

  // Check if a link is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

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
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 font-sans transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-gray-100/80 py-3' 
          : 'bg-white py-5'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 no-underline flex-shrink-0 transition-transform duration-300 hover:scale-[1.02]">
            <img
              src={logo}
              alt="Insi Tours"
              className={`w-auto object-contain transition-all duration-500 ${
                isScrolled ? 'h-20' : 'h-25'
              }`}
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-full text-[14px] font-medium 
                             transition-all duration-300 no-underline whitespace-nowrap
                             tracking-wide group
                             ${active 
                               ? 'text-primary-600 bg-primary-50/30' 
                               : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50/50'
                             }`}
                >
                  {link.name}
                  {/* Premium subtle underline accent */}
                  <span className={`absolute bottom-1.5 left-4 right-4 h-[1.5px] bg-primary-500 
                                   transition-transform duration-300 origin-left
                                   ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} 
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop action buttons */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <button 
              onClick={handleItineraries}
              className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-700
                         border border-gray-200 bg-white/50 backdrop-blur-sm
                         hover:border-primary-500 hover:text-primary-500 hover:bg-primary-50/30
                         transition-all duration-300 cursor-pointer tracking-wide active:scale-[0.98]"
            >
              Itineraries
            </button>
            <button 
              onClick={handleBookTrip}
              className="px-[22px] py-2.5 rounded-full text-sm font-medium text-white
                         bg-primary-500 border border-primary-500
                         hover:bg-primary-600 hover:border-primary-600 hover:-translate-y-[1px]
                         shadow-[0_4px_14px_rgba(0,170,108,0.2)] hover:shadow-[0_6px_20px_rgba(0,170,108,0.3)]
                         transition-all duration-300 cursor-pointer flex items-center gap-1.5
                         tracking-wide active:scale-[0.98]"
            >
              Book a Trip
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] p-2
                       bg-gray-50/80 backdrop-blur-sm border border-gray-100 cursor-pointer w-10 h-10 rounded-full
                       hover:bg-gray-100 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(p => !p)}
            aria-label="Toggle navigation menu"
          >
            <span className={`block w-5 h-[1.5px] bg-gray-700 rounded-full origin-center
                              transition-all duration-300
                              ${isMobileMenuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
            <span className={`block w-4 h-[1.5px] bg-gray-700 rounded-full
                              transition-all duration-300 self-start ml-2
                              ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-gray-700 rounded-full origin-center
                              transition-all duration-300
                              ${isMobileMenuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown — premium glassmorphism overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full absolute top-full left-0 bg-white/95 backdrop-blur-lg shadow-[0_12px_40px_rgba(0,0,0,0.06)] border-b border-gray-100 animate-fadeInSlide">
          <div className="max-w-[1200px] mx-auto px-6 pt-3 pb-6 flex flex-col gap-1.5">
            {navLinks.map(link => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-4 py-3 rounded-xl text-[15px] font-medium tracking-wide
                             no-underline transition-all duration-200
                             ${active 
                               ? 'bg-primary-50/60 text-primary-600' 
                               : 'text-gray-700 hover:bg-primary-50/60 hover:text-primary-600'
                             }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100/80">
              <button 
                onClick={handleItineraries}
                className="flex-1 py-3 rounded-full text-sm font-medium tracking-wide
                           text-primary-600 border border-primary-200 bg-white
                           hover:bg-primary-50/40 transition-colors duration-200 cursor-pointer active:scale-[0.98]"
              >
                Itineraries
              </button>
              <button 
                onClick={handleBookTrip}
                className="flex-1 py-3 rounded-full text-sm font-medium tracking-wide
                           text-white bg-primary-500 border border-primary-500
                           hover:bg-primary-600 transition-colors duration-200 cursor-pointer active:scale-[0.98]
                           shadow-[0_4px_12px_rgba(0,170,108,0.15)]"
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