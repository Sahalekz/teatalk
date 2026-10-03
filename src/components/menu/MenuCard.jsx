import React from 'react';
import { Sparkles } from 'lucide-react';

export default function MenuCard({ item, index = 0 }) {
  return (
    <div
      className="group relative bg-[#361113]/90 hover:bg-[#441619] border border-[#F5A623]/25 hover:border-[#F5A623] rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:translate-x-2 hover:shadow-xl hover:shadow-[#F5A623]/15 flex items-center justify-between gap-4 overflow-hidden transform opacity-0 animate-fadeInUp"
      style={{
        animationDelay: `${Math.min(index * 0.03, 0.5)}s`,
        animationFillMode: 'forwards'
      }}
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5A623]/5 rounded-full blur-xl pointer-events-none group-hover:bg-[#F5A623]/15 transition-all" />

      {/* Left Content Area (Pure Text & Indicator - No Images) */}
      <div className="flex items-center gap-3 sm:gap-4 relative z-10 flex-1 min-w-0">
        <div className="w-2.5 h-2.5 rounded-full bg-[#F5A623]/60 group-hover:bg-[#F5A623] group-hover:scale-150 transition-all shrink-0 ml-1" />

        {/* Item Name & Badges */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-base sm:text-lg text-[#F7EBE1] group-hover:text-[#F5A623] transition-colors truncate">
              {item.name}
            </h3>

            {item.popular && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F5A623] text-[#2A080A] text-[9px] font-['Bricolage_Grotesque'] font-extrabold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-2.5 h-2.5 fill-current" />
                Popular Pick
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4B8A5]/70 group-hover:text-[#D4B8A5]">
              {item.category.replace('-', ' ')}
            </span>
          </div>
        </div>
      </div>

      {/* Right Price Tag */}
      <div className="relative z-10 shrink-0 text-right">
        <span className="font-['Bricolage_Grotesque'] font-extrabold text-lg sm:text-xl text-[#F5A623] group-hover:scale-110 inline-block transition-transform drop-shadow-md">
          {item.price}
        </span>
      </div>
    </div>
  );
}
