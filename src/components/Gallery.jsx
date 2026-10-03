import React, { useState } from 'react';
import { Maximize2, X, Store, Camera, Building, MapPin } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function Gallery() {
  const { galleryItems } = useCms();
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section id="gallery" className="py-24 bg-[#2A080A] relative overflow-hidden border-t border-[#F5A623]/20">
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-4xl sm:text-6xl text-[#F7EBE1] tracking-tight">
            The Tea Talk <span className="text-[#F5A623]">Store Presence</span>
          </h2>
          <p className="mt-3 text-base text-[#D4B8A5] font-medium">
            Explore our standardized store designs, ambient interiors, and thriving franchise outlets.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[230px]">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className={`relative rounded-3xl rounded-br-sm overflow-hidden border-2 border-[#F5A623]/30 cursor-pointer group shadow-xl hover:border-[#F5A623] transition-all duration-300 ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A080A]/95 via-[#2A080A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between">
                <div className="self-end p-2.5 rounded-2xl bg-[#F5A623] text-[#2A080A] shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div>
                  <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-xl text-[#F7EBE1] leading-snug drop-shadow-md">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-[#1F0607]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-[#2A080A] border-4 border-[#F5A623]/40 rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-[#F5A623] text-[#2A080A] hover:scale-105 transition-transform shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={activeImage.src}
              alt={activeImage.title}
              className="w-full max-h-[75vh] object-contain bg-[#1F0607]"
            />

            <div className="p-5 bg-[#1F0607] text-[#F7EBE1] border-t border-[#F5A623]/20 text-center sm:text-left">
              <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-2xl text-[#F7EBE1]">
                {activeImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
