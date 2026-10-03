import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FullMenuLightbox({ isOpen, onClose }) {
  const [scale, setScale] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const menuPages = [
    { title: 'Cover Page', src: '/menu-pages/page1.png' },
    { title: 'Special Teas & Black Teas', src: '/menu-pages/page2.png' },
    { title: 'Coffees, Fresh Juices & Shakes', src: '/menu-pages/page3.png' },
    { title: 'Mojitos, Faloodas & Starters', src: '/menu-pages/page4.png' },
    { title: 'Rolls, Wraps, Bunnies & Combos', src: '/menu-pages/page5.png' },
    { title: 'Burgers, Sandwiches, Momos & Salads', src: '/menu-pages/page6.png' },
  ];

  if (!isOpen) return null;

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.3, 0.7));
  const handleResetZoom = () => setScale(1);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % menuPages.length);
    setScale(1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + menuPages.length) % menuPages.length);
    setScale(1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1F0607]/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-6 animate-fadeIn">
      
      {/* Lightbox Header Toolbar */}
      <div className="w-full max-w-5xl flex items-center justify-between z-20 pb-4 border-b border-[#F5A623]/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#F5A623] text-[#2A080A]">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-xl text-[#F7EBE1]">
              Official Tea Talk Menu Brochure
            </h3>
            <p className="text-xs text-[#F5A623] font-bold">
              Page {currentPage + 1} of {menuPages.length}: {menuPages[currentPage].title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <button
            onClick={handleZoomOut}
            className="p-2.5 rounded-2xl bg-[#361113] text-[#F7EBE1] border border-[#F5A623]/30 hover:bg-[#F5A623] hover:text-[#2A080A] transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>

          <span className="text-xs font-bold text-[#F7EBE1] px-2">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={handleZoomIn}
            className="p-2.5 rounded-2xl bg-[#361113] text-[#F7EBE1] border border-[#F5A623]/30 hover:bg-[#F5A623] hover:text-[#2A080A] transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>

          <button
            onClick={handleResetZoom}
            className="p-2.5 rounded-2xl bg-[#361113] text-[#F7EBE1] border border-[#F5A623]/30 hover:bg-[#F5A623] hover:text-[#2A080A] transition-colors hidden sm:block"
            title="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="ml-4 p-3 rounded-full bg-[#F5A623] text-[#2A080A] font-bold shadow-lg hover:scale-105 transition-transform"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Image Viewing Area */}
      <div className="w-full flex-1 flex items-center justify-center relative overflow-hidden my-4 z-10">
        
        {/* Previous Page Button */}
        <button
          onClick={prevPage}
          className="absolute left-2 sm:left-6 z-30 p-3 rounded-full bg-[#F5A623] text-[#2A080A] hover:bg-[#E09418] shadow-2xl transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div
          className="transition-transform duration-300 ease-out max-w-3xl max-h-full p-2"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="bg-[#361113] border-4 border-[#F5A623]/40 rounded-3xl p-3 shadow-2xl overflow-hidden text-center text-[#F7EBE1]">
            <img
              src={menuPages[currentPage].src}
              alt={menuPages[currentPage].title}
              className="max-h-[68vh] w-auto mx-auto object-contain rounded-2xl shadow-md"
            />
          </div>
        </div>

        {/* Next Page Button */}
        <button
          onClick={nextPage}
          className="absolute right-2 sm:right-6 z-30 p-3 rounded-full bg-[#F5A623] text-[#2A080A] hover:bg-[#E09418] shadow-2xl transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Footer Page Selector Bar */}
      <div className="z-20 flex flex-wrap justify-center items-center gap-2 pt-2">
        {menuPages.map((page, idx) => (
          <button
            key={page.title}
            onClick={() => {
              setCurrentPage(idx);
              setScale(1);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-['Bricolage_Grotesque'] font-bold transition-all ${
              currentPage === idx
                ? 'bg-[#F5A623] text-[#2A080A] shadow-md scale-105'
                : 'bg-[#361113] text-[#D4B8A5] border border-[#F5A623]/20 hover:border-[#F5A623]'
            }`}
          >
            Page {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
