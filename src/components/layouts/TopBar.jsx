import React from 'react';
import {
  Mail,
  Phone,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronDown,
} from "lucide-react";
import { useScroll } from '../../hooks/useScroll';

const TopBar = () => {
  const { topBarHidden, isScrolled } = useScroll();
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div
      className={`
        fixed top-0 left-0 right-0 z-[50]
        bg-white border-b border-gray-200
        text-black text-xs font-medium
        transition-transform duration-300 ease-in-out
        ${topBarHidden ? "-translate-y-full" : "translate-y-0"}
      `}
    >
      <div className="w-full px-3 md:px-6 lg:px-12">
        {/* Mobile view - collapsible */}
        <div className="md:hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full h-9 flex items-center justify-between text-black hover:text-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Phone size={14} className="text-black" />
              <span className="text-[11px] text-black">+94 77 146 8477</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400">Contact</span>
              <ChevronDown 
                size={14} 
                className={`text-black transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              />
            </div>
          </button>
          
          {/* Mobile expanded content */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-96 opacity-100 py-3' : 'max-h-0 opacity-0'
          }`}>
            <div className="flex flex-col gap-2.5 pb-2 text-black">
              <a
                href="mailto:insitours@gmail.com"
                className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors no-underline text-[11px]"
              >
                <Mail size={14} className="text-black" />
                insitours@gmail.com
              </a>
              
              <a
                href="tel:+94771468477"
                className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors no-underline text-[11px]"
              >
                <Phone size={14} className="text-black" />
                +94 77 146 8477
              </a>
              
              <a
                href="https://wa.me/94771468477"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-black hover:text-green-600 transition-colors no-underline text-[11px]"
              >
                <MessageCircle size={14} className="text-black" />
                WhatsApp
              </a>
              
              <div className="flex items-center gap-3 pt-1.5 border-t border-gray-200">
                <span className="text-gray-400 text-[10px]">Follow us:</span>
                {[
                  { icon: <Facebook size={13} />, href: "#" },
                  { icon: <Twitter size={13} />, href: "#" },
                  { icon: <Instagram size={13} />, href: "#" },
                  { icon: <Linkedin size={13} />, href: "#" },
                ].map(({ icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="text-gray-600 hover:text-black transition-colors no-underline"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop view - full content */}
        <div className="hidden md:flex h-9 items-center justify-between">
          {/* Left — contact details */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:insitours@gmail.com"
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 transition-colors duration-200 no-underline"
            >
              <Mail size={12} className="text-gray-500" />
              insitours@gmail.com
            </a>

            <span className="text-gray-300">|</span>

            <a
              href="tel:+94771468477"
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 transition-colors duration-200 no-underline"
            >
              <Phone size={12} className="text-gray-500" />
              +94 77 146 8477
            </a>

            <span className="text-gray-300">|</span>

            <a
              href="https://wa.me/94771468477"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 transition-colors duration-200 no-underline"
            >
              <MessageCircle size={12} className="text-gray-500" />
              WhatsApp
            </a>
          </div>

          {/* Right — social icons */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-[11px]">Follow us:</span>
            {[
              { icon: <Facebook size={12} />, href: "#" },
              { icon: <Twitter size={12} />, href: "#" },
              { icon: <Instagram size={12} />, href: "#" },
              { icon: <Linkedin size={12} />, href: "#" },
            ].map(({ icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="text-gray-600 hover:text-black transition-colors duration-200 no-underline"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;