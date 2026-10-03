import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Utensils } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMenuPage = location.pathname === '/menu';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (sectionId === 'top') {
      if (isMenuPage) {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (sectionId === 'menu') {
      navigate('/menu');
      return;
    }

    if (isMenuPage) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { name: 'Home', id: 'top' },
    { name: 'Our Story', id: 'story' },
    { name: 'Why Tea Talk', id: 'why-tea-talk' },
    { name: 'Outlets', id: 'outlets' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || isMenuPage
          ? 'bg-[#2A080A]/95 backdrop-blur-md border-b border-[#F5A623]/20 py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-[#1F0607]/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo (Logo Only) */}
        <button
          onClick={(e) => handleNavClick('top', e)}
          className="flex items-center focus:outline-none cursor-pointer group"
          aria-label="Tea Talk Home"
        >
          <img
            src="/logo.png"
            alt="Tea Talk Logo"
            className="h-12 sm:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
          />
        </button>

        {/* Desktop Links (Clean Brand & Franchise Navigation) */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            return (
              <a
                key={item.name}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(item.id, e)}
                className="px-4 py-2 rounded-full text-sm font-['Bricolage_Grotesque'] font-bold text-[#FDF8F2]/85 hover:text-[#F5A623] hover:bg-[#361113] transition-all duration-300 relative group cursor-pointer"
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Right Desktop CTA (Highlighted EXPLORE MENU Button) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/menu"
            className="flex items-center gap-2.5 bg-[#F5A623] hover:bg-[#E09418] text-[#2A080A] px-6 py-2.5 rounded-full font-['Bricolage_Grotesque'] font-extrabold text-sm shadow-xl shadow-[#F5A623]/25 hover:scale-105 transition-all duration-300 group border border-[#F5A623]"
          >
            <Utensils className="w-4 h-4 text-[#2A080A] group-hover:rotate-12 transition-transform" />
            <span>EXPLORE MENU</span>
            <ArrowRight className="w-4 h-4 text-[#2A080A] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-[#361113] border border-[#F5A623]/40 text-[#F5A623] focus:outline-none shadow-md"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[70px] bg-[#2A080A]/98 backdrop-blur-xl z-40 p-6 flex flex-col justify-between border-b-2 border-[#F5A623]/30">
          <div className="space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(item.id, e)}
                className="block px-5 py-3.5 rounded-2xl text-lg font-['Bricolage_Grotesque'] font-bold text-[#FDF8F2] hover:bg-[#361113] hover:text-[#F5A623] transition-all"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-[#F5A623]/20 space-y-3">
            <Link
              to="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-[#F5A623] text-[#2A080A] py-4 rounded-full font-['Bricolage_Grotesque'] font-extrabold text-base shadow-xl"
            >
              <Utensils className="w-5 h-5" />
              <span>EXPLORE MENU</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
