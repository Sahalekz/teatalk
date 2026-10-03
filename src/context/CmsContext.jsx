import React, { createContext, useContext, useState, useEffect } from 'react';
import { menuItems as defaultMenuItems, menuCategories as defaultCategories } from '../data/menu';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const CmsContext = createContext();

const defaultGalleryItems = [
  {
    id: 1,
    title: 'Modern Café Storefront Exterior',
    category: 'Outlet Design',
    src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
    span: 'col-span-1 md:col-span-2 row-span-2',
    desc: 'High-visibility store facade designed to attract daily footfall.'
  },
  {
    id: 2,
    title: 'Warm Community Interior & Seating',
    category: 'Ambiance',
    src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-1',
    desc: 'Comfortable seating optimized for conversations and gatherings.'
  },
  {
    id: 3,
    title: 'Efficient Counter & Order Fulfillment Zone',
    category: 'Store Layout',
    src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-1',
    desc: 'Ergonomic counter layout engineered for fast 1-2 minute dispatch.'
  },
  {
    id: 4,
    title: 'Urban Express Kiosk Format',
    category: 'Kiosk Format',
    src: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-1',
    desc: 'Compact high-density kiosk setup ideal for tech parks and malls.'
  },
  {
    id: 5,
    title: 'Evening Café Lighting & Vibe',
    category: 'Atmosphere',
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-1 md:col-span-2',
    desc: 'Cozy lighting atmosphere bringing people together every evening.'
  },
  {
    id: 6,
    title: 'Flagship Outlet Lounge',
    category: 'Flagship Lounge',
    src: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-1',
    desc: 'Spacious flagship seating layout for families and business meetings.'
  }
];

const defaultOutlets = [
  {
    id: 1,
    name: 'Kerala',
    subtitle: 'Original Flagship Roots',
    outlets: 'Multiple Outlets',
    tag: 'India',
    color: 'bg-[#F5A623] text-[#380B0E]',
  },
  {
    id: 2,
    name: 'Bangalore',
    subtitle: 'Tech Capital Hotspots',
    outlets: 'Metropolitan Presence',
    tag: 'India',
    color: 'bg-[#E65100] text-[#FFFFFF]',
  },
  {
    id: 3,
    name: 'Saudi Arabia',
    subtitle: 'International Expansion',
    outlets: 'GCC Operations',
    tag: 'International',
    color: 'bg-[#F5A623] text-[#380B0E]',
  },
];

const defaultSiteContent = {
  hero: {
    badge: "Building Kerala's Next Scalable Café Brand",
    headline1: "A Tea Café",
    headline2: "for Everyone, Everywhere.",
    subtext: "Tea, conversations, and affordable café experiences — bringing people together, one cup at a time.",
    primaryCtaText: "BECOME A FRANCHISE PARTNER",
    secondaryCtaText: "EXPLORE MENU"
  },
  stats: {
    foundedYear: "2020",
    outletsCount: "12",
    regionsCount: "3 Regions",
    varietiesCount: "20+"
  },
  story: {
    badge: "FOUNDED IN 2020",
    titleLine1: "More Than Tea.",
    titleLine2: "It's a Conversation.",
    desc1: "Tea Talk is a community-focused café chain creating spaces where people connect over tea, conversations, and affordable café experiences.",
    desc2: "Born from the vibrant tea drinking culture of Kerala, Tea Talk bridges authentic local warmth with modern, comfortable café aesthetics. We believe that tea is never just a drink — it's the catalyst for ideas, friendships, and memorable everyday moments.",
    image: "/tea-toast.png",
    visionQuote: '"Building Kerala\'s Next Scalable Café Brand."'
  },
  experience: {
    badge: "Café Experience",
    titleLine1: "Where",
    titleLine2: "Conversations Begin.",
    desc1: "At Tea Talk, our spaces are intentionally crafted to foster human connection. We design warm, welcoming environments with community-oriented seating that encourages people from all walks of life to gather, linger, and converse.",
    desc2: "Whether meeting old friends, closing business ideas over hot chai, or finding a cozy corner after a long day — Tea Talk provides an inviting, accessible space for everyone.",
    image: "/tea-talk-cafe-3d.jpg"
  },
  different: {
    image: "/tea-talk-barista.jpg"
  },
  contact: {
    phone: "+91 70346 14815",
    whatsappNumber: "917034614815",
    instagramHandle: "@TEATALK.IN",
    instagramUrl: "https://instagram.com/teatalk.in",
    instagramQr: "/instagram-qr.png",
    whatsappQr: "/whatsapp-qr.png"
  }
};

export function CmsProvider({ children }) {
  const isCloudConfigured = isSupabaseConfigured();

  // 1. Menu Items State
  const [menuItems, setMenuItems] = useState(() => {
    try {
      const saved = localStorage.getItem('teatalk_cms_menu');
      return saved ? JSON.parse(saved) : defaultMenuItems;
    } catch {
      return defaultMenuItems;
    }
  });

  // 2. Menu Categories State
  const [categories, setCategories] = useState(defaultCategories);

  // 3. Gallery Items State
  const [galleryItems, setGalleryItems] = useState(() => {
    try {
      const saved = localStorage.getItem('teatalk_cms_gallery');
      return saved ? JSON.parse(saved) : defaultGalleryItems;
    } catch {
      return defaultGalleryItems;
    }
  });

  // 4. Site Sections Content State
  const [siteContent, setSiteContent] = useState(() => {
    try {
      const saved = localStorage.getItem('teatalk_cms_content');
      return saved ? JSON.parse(saved) : defaultSiteContent;
    } catch {
      return defaultSiteContent;
    }
  });

  // 5. Outlets / Locations State
  const [outlets, setOutlets] = useState(() => {
    try {
      const saved = localStorage.getItem('teatalk_cms_outlets');
      return saved ? JSON.parse(saved) : defaultOutlets;
    } catch {
      return defaultOutlets;
    }
  });

  const [syncStatus, setSyncStatus] = useState(isCloudConfigured ? 'connected' : 'local');

  // Load from Supabase Cloud on mount if connected
  useEffect(() => {
    if (!supabase) return;

    async function loadCloudData() {
      try {
        const { data, error } = await supabase
          .from('teatalk_cms_store')
          .select('*')
          .single();

        if (data && !error) {
          if (data.menuItems) setMenuItems(data.menuItems);
          if (data.galleryItems) setGalleryItems(data.galleryItems);
          if (data.siteContent) setSiteContent(data.siteContent);
          if (data.outlets) setOutlets(data.outlets);
          setSyncStatus('synced');
        }
      } catch (err) {
        console.warn('Cloud data sync fetch note:', err);
      }
    }

    loadCloudData();
  }, []);

  // Save to Supabase Cloud helper function
  const saveToCloud = async (overrideData = null) => {
    if (!supabase) return;
    try {
      setSyncStatus('syncing');
      const payload = overrideData || {
        id: 1,
        menuItems,
        galleryItems,
        siteContent,
        outlets,
        updated_at: new Date().toISOString()
      };

      await supabase
        .from('teatalk_cms_store')
        .upsert(payload, { onConflict: 'id' });

      setSyncStatus('synced');
    } catch (err) {
      console.warn('Cloud save error:', err);
      setSyncStatus('error');
    }
  };

  // Save to LocalStorage whenever data changes with try-catch protection against QuotaExceededError
  useEffect(() => {
    try {
      localStorage.setItem('teatalk_cms_menu', JSON.stringify(menuItems));
    } catch (err) {
      console.warn('Could not save menu items to storage:', err);
    }
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem('teatalk_cms_gallery', JSON.stringify(galleryItems));
    } catch (err) {
      console.warn('Could not save gallery items to storage:', err);
    }
  }, [galleryItems]);

  useEffect(() => {
    try {
      localStorage.setItem('teatalk_cms_content', JSON.stringify(siteContent));
    } catch (err) {
      console.warn('Could not save site content to storage:', err);
    }
  }, [siteContent]);

  useEffect(() => {
    try {
      localStorage.setItem('teatalk_cms_outlets', JSON.stringify(outlets));
    } catch (err) {
      console.warn('Could not save outlets to storage:', err);
    }
  }, [outlets]);

  // MENU ACTIONS
  const addMenuItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
      popular: item?.popular || false
    };
    setMenuItems((prev) => {
      const updated = [newItem, ...(Array.isArray(prev) ? prev : [])];
      saveToCloud({ id: 1, menuItems: updated, galleryItems, siteContent, outlets });
      return updated;
    });
  };

  const updateMenuItem = (id, updatedFields) => {
    setMenuItems((prev) => {
      const updated = (Array.isArray(prev) ? prev : []).map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
      saveToCloud({ id: 1, menuItems: updated, galleryItems, siteContent, outlets });
      return updated;
    });
  };

  const deleteMenuItem = (id) => {
    setMenuItems((prev) => {
      const updated = (Array.isArray(prev) ? prev : []).filter((item) => item.id !== id);
      saveToCloud({ id: 1, menuItems: updated, galleryItems, siteContent, outlets });
      return updated;
    });
  };

  const togglePopularItem = (id) => {
    setMenuItems((prev) => {
      const updated = (Array.isArray(prev) ? prev : []).map((item) => (item.id === id ? { ...item, popular: !item.popular } : item));
      saveToCloud({ id: 1, menuItems: updated, galleryItems, siteContent, outlets });
      return updated;
    });
  };

  // GALLERY ACTIONS
  const addGalleryItem = (item) => {
    const newItem = {
      title: item?.title || 'Tea Talk Outlet',
      category: item?.category || 'Outlet Design',
      src: item?.src || '/logo.png',
      desc: item?.desc || '',
      span: item?.span || 'col-span-1',
      id: Date.now()
    };
    setGalleryItems((prev) => {
      const updated = [newItem, ...(Array.isArray(prev) ? prev : [])];
      saveToCloud({ id: 1, menuItems, galleryItems: updated, siteContent, outlets });
      return updated;
    });
  };

  const updateGalleryItem = (id, updatedFields) => {
    setGalleryItems((prev) => {
      const updated = (Array.isArray(prev) ? prev : []).map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
      saveToCloud({ id: 1, menuItems, galleryItems: updated, siteContent, outlets });
      return updated;
    });
  };

  const deleteGalleryItem = (id) => {
    setGalleryItems((prev) => {
      const updated = (Array.isArray(prev) ? prev : []).filter((item) => item.id !== id);
      saveToCloud({ id: 1, menuItems, galleryItems: updated, siteContent, outlets });
      return updated;
    });
  };

  // OUTLETS ACTIONS
  const addOutlet = (outlet) => {
    const newOutlet = {
      name: outlet?.name || 'New Outlet',
      subtitle: outlet?.subtitle || 'Café Location',
      outlets: outlet?.outlets || 'Operational',
      tag: outlet?.tag || 'India',
      color: outlet?.color || 'bg-[#F5A623] text-[#380B0E]',
      id: Date.now()
    };
    setOutlets((prev) => {
      const updated = [...(Array.isArray(prev) ? prev : []), newOutlet];
      saveToCloud({ id: 1, menuItems, galleryItems, siteContent, outlets: updated });
      return updated;
    });
  };

  const updateOutlet = (id, updatedFields) => {
    setOutlets((prev) => {
      const updated = (Array.isArray(prev) ? prev : []).map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
      saveToCloud({ id: 1, menuItems, galleryItems, siteContent, outlets: updated });
      return updated;
    });
  };

  const deleteOutlet = (id) => {
    setOutlets((prev) => {
      const updated = (Array.isArray(prev) ? prev : []).filter((item) => item.id !== id);
      saveToCloud({ id: 1, menuItems, galleryItems, siteContent, outlets: updated });
      return updated;
    });
  };

  // SITE CONTENT ACTIONS
  const updateSiteContent = (sectionKey, newContent) => {
    setSiteContent((prev) => {
      const updated = {
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          ...newContent
        }
      };
      saveToCloud({ id: 1, menuItems, galleryItems, siteContent: updated, outlets });
      return updated;
    });
  };

  // RESET & BACKUP
  const resetToDefaults = () => {
    localStorage.removeItem('teatalk_cms_menu');
    localStorage.removeItem('teatalk_cms_gallery');
    localStorage.removeItem('teatalk_cms_content');
    localStorage.removeItem('teatalk_cms_outlets');
    setMenuItems(defaultMenuItems);
    setGalleryItems(defaultGalleryItems);
    setSiteContent(defaultSiteContent);
    setOutlets(defaultOutlets);
    saveToCloud({ id: 1, menuItems: defaultMenuItems, galleryItems: defaultGalleryItems, siteContent: defaultSiteContent, outlets: defaultOutlets });
  };

  const exportBackup = () => {
    const data = {
      menuItems,
      galleryItems,
      siteContent,
      outlets,
      exportDate: new Date().toISOString()
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `teatalk_cms_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <CmsContext.Provider
      value={{
        menuItems,
        categories,
        galleryItems,
        siteContent,
        outlets,
        isCloudConfigured,
        syncStatus,
        saveToCloud,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        togglePopularItem,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addOutlet,
        updateOutlet,
        deleteOutlet,
        updateSiteContent,
        resetToDefaults,
        exportBackup
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
}
