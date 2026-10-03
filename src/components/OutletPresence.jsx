import React, { useEffect, useRef } from 'react';
import { MapPin, Navigation, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCms } from '../context/CmsContext';

gsap.registerPlugin(ScrollTrigger);

export default function OutletPresence() {
  const sectionRef = useRef(null);
  const pinsRef = useRef([]);
  const { outlets } = useCms();

  const locationsList = Array.isArray(outlets) && outlets.length > 0 ? outlets : [
    {
      id: 1,
      name: 'Areekode',
      subtitle: 'Areekode, Kerala',
      outlets: 'Dine-in • Drive-through • Delivery',
      tag: '4.5 ★ (59)',
      color: 'bg-[#F5A623] text-[#380B0E]',
    },
    {
      id: 2,
      name: 'Pazhamparamb',
      subtitle: 'Mukkam, Kerala',
      outlets: 'Dine-in • Takeaway',
      tag: '4.0 ★ (127)',
      color: 'bg-[#E65100] text-[#FFFFFF]',
    },
    {
      id: 3,
      name: 'Pookkottur',
      subtitle: 'Pookkottur, Kerala',
      outlets: 'Dine-in Experience',
      tag: '4.6 ★ (87)',
      color: 'bg-[#F5A623] text-[#380B0E]',
    },
    {
      id: 4,
      name: 'Kottakkal',
      subtitle: 'Kottakkal, Kerala',
      outlets: 'Dine-in Experience',
      tag: '4.7 ★ (44)',
      color: 'bg-[#E65100] text-[#FFFFFF]',
    },
    {
      id: 5,
      name: 'Manjeri',
      subtitle: 'Manjeri, Kerala',
      outlets: 'Dine-in & Takeaway',
      tag: 'Kerala',
      color: 'bg-[#F5A623] text-[#380B0E]',
    },
    {
      id: 6,
      name: 'Omassery',
      subtitle: 'Puthur, Keralam',
      outlets: 'Café',
      tag: '4.3 ★ (230)',
      color: 'bg-[#E65100] text-[#FFFFFF]',
    },
  ];

  return (
    <section ref={sectionRef} id="outlets" className="py-24 bg-[#FAF3E1] relative overflow-hidden text-[#380B0E]">
      {/* Background Line Art Watermark */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none bg-[radial-gradient(#380B0E_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Soft Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#F5A623]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-4xl sm:text-6xl text-[#380B0E] tracking-tight">
            Our Thriving <br />
            <span className="text-[#D98205]">Outlet Locations</span>
          </h2>
          <p className="mt-3 text-base text-[#380B0E]/80 font-medium">
            Discover Tea Talk outlets serving authentic tea, snacks, and community experiences across Kerala.
          </p>
        </div>

        {/* Map Showcase Card */}
        <div className="bg-[#FFFDF6] border-4 border-[#EAD5BF] rounded-[45px] rounded-br-[12px] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 relative z-10 border-b-2 border-[#EAD5BF] pb-8">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#D98205]">
                Total Network Size
              </span>
              <div className="font-['Bricolage_Grotesque'] font-extrabold text-4xl sm:text-6xl text-[#380B0E]">
                {locationsList.length} <span className="text-xl sm:text-2xl text-[#D98205] font-bold">Featured Outlets</span>
              </div>
            </div>
            
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#FAF3E1] border-2 border-[#EAD5BF] text-[#380B0E] font-['Bricolage_Grotesque'] font-extrabold text-sm shadow-md">
              <Navigation className="w-4 h-4 text-[#D98205] animate-bounce" />
              <span>Expanding Rapidly</span>
            </div>
          </div>

          {/* Location Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {locationsList.map((loc, idx) => (
              <div
                key={loc.id || loc.name}
                ref={(el) => (pinsRef.current[idx] = el)}
                className="bg-[#FAF3E1] border-2 border-[#EAD5BF] hover:border-[#F5A623] rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 group shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F5E7D5] border border-[#E0CFB9] flex items-center justify-center text-[#380B0E] group-hover:bg-[#F5A623] transition-colors shadow-sm">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-['Bricolage_Grotesque'] font-extrabold ${loc.color || 'bg-[#F5A623] text-[#380B0E]'}`}>
                      {loc.tag || 'Kerala'}
                    </span>
                  </div>

                  <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-2xl text-[#380B0E] group-hover:text-[#D98205] transition-colors">
                    {loc.name}
                  </h3>
                  
                  <div className="text-xs font-extrabold uppercase text-[#D98205] mt-1">
                    {loc.subtitle}
                  </div>
                </div>

                <p className="text-xs text-[#380B0E]/80 mt-4 font-bold border-t border-[#EAD5BF]/60 pt-3">
                  {loc.outlets}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Smooth Wavy Seam Transition to Gallery Section */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg 
          className="relative block w-full h-12 sm:h-20 text-[#2A080A]" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 C150,80 350,-30 500,45 C650,120 900,10 1200,50 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
