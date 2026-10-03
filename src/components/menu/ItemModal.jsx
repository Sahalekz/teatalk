import React from 'react';
import { X, Sparkles, Coffee } from 'lucide-react';

export default function ItemModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1F0607]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative max-w-lg w-full bg-[#2A080A] border-4 border-[#F5A623]/40 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#F5A623] text-[#2A080A] hover:scale-105 transition-transform shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <div className="relative h-64 sm:h-72 overflow-hidden bg-[#1F0607]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A080A] via-transparent to-transparent opacity-95" />
          
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {item.popular && (
              <span className="bg-[#F5A623] text-[#2A080A] px-3 py-1 rounded-full text-xs font-['Bricolage_Grotesque'] font-extrabold uppercase shadow-md flex items-center gap-1 border border-[#1F0607]">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                Popular Pick
              </span>
            )}
            <span className="bg-[#1F0607] text-[#F7EBE1] border border-[#F5A623]/40 px-3 py-1 rounded-full text-xs font-bold uppercase">
              {item.category}
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-4 text-[#F7EBE1]">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-3xl sm:text-4xl leading-tight text-[#F7EBE1]">
              {item.name}
            </h3>
            <div className="font-['Bricolage_Grotesque'] font-extrabold text-2xl text-[#2A080A] shrink-0 bg-[#F5A623] px-4 py-1.5 rounded-2xl border-2 border-[#1F0607] shadow-md">
              {item.price}
            </div>
          </div>

          <p className="text-base text-[#D4B8A5] leading-relaxed font-medium">
            {item.description}
          </p>

          {item.tags && (
            <div className="flex flex-wrap gap-2 pt-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-bold text-[#F7EBE1] bg-[#1F0607] px-3 py-1 rounded-full border border-[#F5A623]/30"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="pt-4 border-t border-[#F5A623]/20 flex items-center justify-between text-xs text-[#D4B8A5]">
            <span className="flex items-center gap-1.5 font-semibold">
              <Coffee className="w-4 h-4 text-[#F5A623]" />
              Freshly Prepared at Tea Talk
            </span>
            <span className="font-extrabold text-[#F5A623] uppercase font-['Bricolage_Grotesque']">Tea Talk Café</span>
          </div>
        </div>

      </div>
    </div>
  );
}
