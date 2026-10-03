import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowUp } from 'lucide-react';
import { useCms } from '../context/CmsContext';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  const { outlets } = useCms();
  const outletNames = Array.isArray(outlets) && outlets.length > 0
    ? outlets.map((o) => o.name).join(' • ')
    : 'Kerala • Bangalore • Saudi Arabia';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2C0C0D] border-t-4 border-[#F5A623] text-[#FAF5EF] pt-16 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#FAF5EF]/15">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#F5A623] rounded-2xl p-1.5 shadow-lg">
                <img src="/logo.png" alt="Tea Talk Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-['Bricolage_Grotesque'] font-extrabold text-2xl tracking-tight text-[#FAF5EF]">
                TEA TALK
              </span>
            </Link>

            <p className="text-sm text-[#FAF5EF]/80 max-w-sm leading-relaxed font-medium">
              "A Tea Café for Everyone, Everywhere" — Creating spaces where people connect over tea, conversations, and affordable café experiences.
            </p>

            <div className="text-xs font-bold text-[#F5A623] uppercase tracking-wider pt-2">
              {outletNames}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Bricolage_Grotesque'] font-extrabold text-sm text-[#F5A623] uppercase tracking-widest mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF5EF]/85 font-medium">
              <li>
                <Link to="/" className="hover:text-[#F5A623] transition-colors">Home</Link>
              </li>
              <li>
                <a href="/#story" className="hover:text-[#F5A623] transition-colors">Our Story</a>
              </li>
              <li>
                <a href="/#why-tea-talk" className="hover:text-[#F5A623] transition-colors">Why Tea Talk</a>
              </li>
              <li>
                <a href="/#tea-experience" className="hover:text-[#F5A623] transition-colors">Tea & Beverages</a>
              </li>
            </ul>
          </div>

          {/* Menu & Media */}
          <div>
            <h4 className="font-['Bricolage_Grotesque'] font-extrabold text-sm text-[#F5A623] uppercase tracking-widest mb-4">
              Menu & Media
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF5EF]/85 font-medium">
              <li>
                <Link to="/menu" className="text-[#F5A623] font-bold hover:underline">Digital Menu (/menu)</Link>
              </li>
              <li>
                <a href="/#gallery" className="hover:text-[#F5A623] transition-colors">Gallery</a>
              </li>
              <li>
                <a href="/#presence" className="hover:text-[#F5A623] transition-colors">Outlet Locations</a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-[#F5A623] transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Connect Details */}
          <div>
            <h4 className="font-['Bricolage_Grotesque'] font-extrabold text-sm text-[#F5A623] uppercase tracking-widest mb-4">
              Connect
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-[#FAF5EF]/90">
                <Phone className="w-4 h-4 text-[#F5A623]" />
                <a href="tel:+917034614815" className="hover:text-[#F5A623] font-bold transition-colors">
                  +91 70346 14815
                </a>
              </li>
              <li className="flex items-center gap-2 text-[#FAF5EF]/90">
                <InstagramIcon className="w-4 h-4 text-[#F5A623]" />
                <a href="https://instagram.com/teatalk.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#F5A623] font-bold transition-colors">
                  TEATALK.IN
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF5EF]/70 font-medium">
          <p>© 2026 Tea Talk. All rights reserved. Building Kerala's Next Scalable Café Brand.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 p-2.5 rounded-full bg-[#F5A623] text-[#2C0C0D] hover:scale-110 transition-transform shadow-md font-bold"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
