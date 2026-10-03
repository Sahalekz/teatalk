import React, { useEffect, useRef } from 'react';
import { Calendar, Store, MapPin, Coffee } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStats() {
  const { siteContent } = useCms();
  const statsContent = siteContent?.stats || {};
  const containerRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      icon: Calendar,
      number: statsContent.foundedYear || '2020',
      label: 'Founded in',
      detail: `Crafting tea moments since ${statsContent.foundedYear || '2020'}`,
    },
    {
      icon: Store,
      number: statsContent.outletsCount || '12',
      label: 'Operational Outlets',
      detail: 'Across India & Saudi Arabia',
    },
    {
      icon: MapPin,
      number: statsContent.regionsCount || '3 Regions',
      label: 'Presence in',
      detail: 'Kerala • Bangalore • Saudi Arabia',
    },
    {
      icon: Coffee,
      number: statsContent.varietiesCount || '20+',
      label: 'tea varieties & beverages',
      detail: 'Curated for every mood',
    },
  ];

  return (
    <section ref={containerRef} className="py-16 bg-[#FAF3E1] relative z-20">
      {/* Background Line Art Watermark */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none bg-[radial-gradient(#380B0E_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                ref={(el) => (statsRef.current[idx] = el)}
                className="bg-[#FFFDF6] hover:bg-white border-2 border-[#EAD5BF] hover:border-[#F5A623] rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#F5A623]/15 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-[#F5E7D5] rounded-bl-3xl group-hover:bg-[#F5A623] transition-colors" />

                <div className="w-12 h-12 rounded-2xl bg-[#F5E7D5] border border-[#E0CFB9] flex items-center justify-center mb-6 text-[#380B0E] group-hover:bg-[#F5A623] group-hover:scale-110 transition-transform shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="text-xs uppercase tracking-widest text-[#D98205] font-extrabold mb-1">
                  {stat.label}
                </div>

                <div className="font-['Bricolage_Grotesque'] font-extrabold text-3xl sm:text-4xl text-[#380B0E] tracking-tight group-hover:text-[#D98205] transition-colors">
                  {stat.number}
                </div>

                <p className="text-xs text-[#380B0E]/70 mt-2 font-medium">
                  {stat.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
