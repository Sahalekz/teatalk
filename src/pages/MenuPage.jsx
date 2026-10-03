import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryFilter from '../components/menu/CategoryFilter';
import MenuCard from '../components/menu/MenuCard';
import ItemModal from '../components/menu/ItemModal';
import FullMenuLightbox from '../components/menu/FullMenuLightbox';
import { useCms } from '../context/CmsContext';
import { Search, Image as ImageIcon, Sparkles, Coffee } from 'lucide-react';

export default function MenuPage() {
  const { menuItems } = useCms();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#2A080A] text-[#F7EBE1] font-sans selection:bg-[#F5A623] selection:text-[#2A080A] relative">
      
      <Navbar />

      <main className="pt-32 pb-24 relative overflow-hidden z-10 bg-[#2A080A]">
        
        {/* Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-[#F5A623]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header Banner (Original Dark Espresso Theme) */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5A623] text-[#2A080A] text-xs font-['Bricolage_Grotesque'] font-extrabold uppercase tracking-widest mb-4 shadow-lg shadow-[#F5A623]/20">
              <Coffee className="w-3.5 h-3.5" />
              <span>TEA TALK DIGITAL MENU</span>
            </div>

            <h1 className="font-['Bricolage_Grotesque'] font-extrabold text-5xl sm:text-7xl text-[#F7EBE1] tracking-tight">
              Explore <span className="text-[#F5A623]">Our Menu</span>
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-[#D4B8A5] leading-relaxed font-medium">
              "Something for every mood. Something for every conversation."
            </p>

            {/* Quick Action Button */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setLightboxOpen(true)}
                className="flex items-center gap-2.5 bg-[#F5A623] hover:bg-[#E09418] text-[#2A080A] px-7 py-3.5 rounded-full font-['Bricolage_Grotesque'] font-extrabold text-base shadow-xl hover:scale-105 transition-all"
              >
                <ImageIcon className="w-5 h-5 text-[#2A080A]" />
                <span>VIEW FULL MENU BROCHURE (6 PAGES)</span>
              </button>
            </div>
          </div>

          {/* Search & Category Filters */}
          <div className="space-y-6 mb-12">
            
            {/* Search Input Bar */}
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search our menu (e.g. Chai, Burger, Shawarma, Momos)..."
                className="w-full bg-[#361113] border-2 border-[#F5A623]/30 focus:border-[#F5A623] rounded-full py-4 pl-12 pr-6 text-[#F7EBE1] placeholder-[#D4B8A5]/60 text-sm focus:outline-none transition-all shadow-xl font-medium"
              />
              <Search className="w-5 h-5 text-[#F5A623] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-extrabold text-[#2A080A] bg-[#F5A623] px-3 py-1 rounded-full border border-[#1F0607]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="flex justify-center">
              <CategoryFilter
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </div>

          </div>

          {/* Results Bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#F5A623]/20 text-xs text-[#D4B8A5] font-semibold">
            <span>Showing <strong className="text-[#F5A623] font-extrabold text-sm">{filteredItems.length}</strong> menu items</span>
            <span className="uppercase tracking-wider font-extrabold text-[#F5A623]">Category: {activeCategory.toUpperCase()}</span>
          </div>

          {/* Menu Items Grid */}
          {filteredItems.length > 0 ? (
            <div key={activeCategory + searchQuery} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item, idx) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  index={idx}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#361113] rounded-3xl border-2 border-[#F5A623]/30">
              <Sparkles className="w-10 h-10 text-[#F5A623] mx-auto mb-3" />
              <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-2xl text-[#F7EBE1]">
                No menu items found
              </h3>
              <p className="text-xs text-[#D4B8A5] mt-1 font-medium">
                Try searching for another keyword or choosing a different category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-4 px-6 py-3 rounded-full bg-[#F5A623] text-[#2A080A] font-['Bricolage_Grotesque'] font-extrabold text-xs shadow-md"
              >
                Reset Search Filters
              </button>
            </div>
          )}

        </div>
      </main>

      {/* Item Details Modal */}
      <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />

      {/* Full Menu Lightbox */}
      <FullMenuLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      <Footer />
    </div>
  );
}
