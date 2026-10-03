import React from 'react';
import { menuCategories } from '../../data/menu';

export default function CategoryFilter({ activeCategory, setActiveCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none scroll-smooth">
      {menuCategories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-6 py-3 rounded-full text-sm font-['Bricolage_Grotesque'] font-extrabold tracking-wide whitespace-nowrap transition-all duration-300 flex items-center gap-2 border-2 ${
              isActive
                ? 'bg-[#F5A623] text-[#2A080A] border-[#F5A623] shadow-xl shadow-[#F5A623]/20 scale-105'
                : 'bg-[#361113] text-[#F7EBE1] border-[#F5A623]/25 hover:border-[#F5A623] hover:bg-[#1F0607]'
            }`}
          >
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
