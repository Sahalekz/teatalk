import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { menuItems as defaultMenuItems, menuCategories as defaultCategories } from '../data/menu';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const CmsContext = createContext();

const defaultGalleryItems = [
  {
    id: 1,
    title: 'Tea Talk Garden Café & Outdoor Lounge',
    category: 'Garden Café',
    src: '/gallery-3.jpg',
    span: 'col-span-1 md:col-span-2 row-span-2',
    desc: 'Spacious open-air garden café layout designed for community gatherings and evening tea.'
  },
  {
    id: 2,
    title: 'Two-Story Brick Flagship Outlet',
    category: 'Flagship Outlet',
    src: '/gallery-4.jpg',
    span: 'col-span-1',
    desc: 'Modern double-decker brick architecture featuring outdoor terrace seating.'
  },
  {
    id: 3,
    title: 'Evening Rooftop Terrace Vibe',
    category: 'Rooftop Lounge',
    src: '/gallery-2.jpg',
    span: 'col-span-1',
    desc: 'Ambient evening lighting & cozy rooftop seating experience.'
  },
  {
    id: 4,
    title: 'Lawn Seating & Tea Talk Signpost',
    category: 'Outdoor Seating',
    src: '/gallery-1.jpg',
    span: 'col-span-1 md:col-span-2',
    desc: 'Comfortable lawn seating surrounded by lush green landscapes.'
  }
];

const defaultOutlets = [
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
    outletsCount: "12 Outlets",
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

const isObsoleteOutlets = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) return true;
  return arr.some((o) => o?.name === 'Bangalore' || o?.name === 'Saudi Arabia' || (o?.name === 'Kerala' && arr.length === 1));
};

const isObsoleteGallery = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) return true;
  return arr.some((g) => g?.src?.includes('unsplash') || g?.title?.includes('Modern Café Storefront'));
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
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && !isObsoleteGallery(parsed)) {
          return parsed;
        }
      }
      return defaultGalleryItems;
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
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && !isObsoleteOutlets(parsed)) {
          return parsed;
        }
      }
      return defaultOutlets;
    } catch {
      return defaultOutlets;
    }
  });

  const [syncStatus, setSyncStatus] = useState(isCloudConfigured ? 'connected' : 'local');

  // Ref to store true live state for async cloud saves
  const latestStateRef = useRef({ menuItems, galleryItems, siteContent, outlets });

  useEffect(() => {
    latestStateRef.current = { menuItems, galleryItems, siteContent, outlets };
  }, [menuItems, galleryItems, siteContent, outlets]);

  // Load from Supabase Cloud on mount if connected
  useEffect(() => {
    if (!supabase) return;

    async function loadCloudData() {
      try {
        const { data, error } = await supabase
          .from('teatalk_cms_store')
          .select('*')
          .maybeSingle();

        if (data && !error) {
          const cloudMenu = data.menuItems || data.menuitems;
          const cloudGallery = data.galleryItems || data.galleryitems;
          const cloudContent = data.siteContent || data.sitecontent;
          const cloudOutlets = data.outlets;

          if (Array.isArray(cloudMenu) && cloudMenu.length > 0) {
            setMenuItems(cloudMenu);
            latestStateRef.current.menuItems = cloudMenu;
          }

          if (Array.isArray(cloudGallery) && !isObsoleteGallery(cloudGallery)) {
            setGalleryItems(cloudGallery);
            latestStateRef.current.galleryItems = cloudGallery;
          } else {
            setGalleryItems(defaultGalleryItems);
            latestStateRef.current.galleryItems = defaultGalleryItems;
            saveToCloud({ galleryItems: defaultGalleryItems });
          }

          if (cloudContent && typeof cloudContent === 'object' && Object.keys(cloudContent).length > 0) {
            setSiteContent(cloudContent);
            latestStateRef.current.siteContent = cloudContent;
          }

          if (Array.isArray(cloudOutlets) && !isObsoleteOutlets(cloudOutlets)) {
            setOutlets(cloudOutlets);
            latestStateRef.current.outlets = cloudOutlets;
          } else {
            setOutlets(defaultOutlets);
            latestStateRef.current.outlets = defaultOutlets;
            saveToCloud({ outlets: defaultOutlets });
          }

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
      const targetMenu = overrideData?.menuItems ?? latestStateRef.current.menuItems;
      const targetGallery = overrideData?.galleryItems ?? latestStateRef.current.galleryItems;
      const targetContent = overrideData?.siteContent ?? latestStateRef.current.siteContent;
      const targetOutlets = overrideData?.outlets ?? latestStateRef.current.outlets;

      const payload = {
        id: 1,
        menuItems: targetMenu,
        menuitems: targetMenu,
        galleryItems: targetGallery,
        galleryitems: targetGallery,
        siteContent: targetContent,
        sitecontent: targetContent,
        outlets: targetOutlets,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('teatalk_cms_store')
        .upsert(payload, { onConflict: 'id' });

      if (!error) {
        setSyncStatus('synced');
      } else {
        console.warn('Supabase upsert error note:', error);
        setSyncStatus('error');
      }
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
    const updated = [newItem, ...(Array.isArray(menuItems) ? menuItems : [])];
    setMenuItems(updated);
    latestStateRef.current.menuItems = updated;
    saveToCloud({ menuItems: updated });
  };

  const updateMenuItem = (id, updatedFields) => {
    const updated = (Array.isArray(menuItems) ? menuItems : []).map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
    setMenuItems(updated);
    latestStateRef.current.menuItems = updated;
    saveToCloud({ menuItems: updated });
  };

  const deleteMenuItem = (id) => {
    const updated = (Array.isArray(menuItems) ? menuItems : []).filter((item) => item.id !== id);
    setMenuItems(updated);
    latestStateRef.current.menuItems = updated;
    saveToCloud({ menuItems: updated });
  };

  const togglePopularItem = (id) => {
    const updated = (Array.isArray(menuItems) ? menuItems : []).map((item) => (item.id === id ? { ...item, popular: !item.popular } : item));
    setMenuItems(updated);
    latestStateRef.current.menuItems = updated;
    saveToCloud({ menuItems: updated });
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
    const updated = [newItem, ...(Array.isArray(galleryItems) ? galleryItems : [])];
    setGalleryItems(updated);
    latestStateRef.current.galleryItems = updated;
    saveToCloud({ galleryItems: updated });
  };

  const updateGalleryItem = (id, updatedFields) => {
    const updated = (Array.isArray(galleryItems) ? galleryItems : []).map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
    setGalleryItems(updated);
    latestStateRef.current.galleryItems = updated;
    saveToCloud({ galleryItems: updated });
  };

  const deleteGalleryItem = (id) => {
    const updated = (Array.isArray(galleryItems) ? galleryItems : []).filter((item) => item.id !== id);
    setGalleryItems(updated);
    latestStateRef.current.galleryItems = updated;
    saveToCloud({ galleryItems: updated });
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
    const updated = [...(Array.isArray(outlets) ? outlets : []), newOutlet];
    setOutlets(updated);
    latestStateRef.current.outlets = updated;
    saveToCloud({ outlets: updated });
  };

  const updateOutlet = (id, updatedFields) => {
    const updated = (Array.isArray(outlets) ? outlets : []).map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
    setOutlets(updated);
    latestStateRef.current.outlets = updated;
    saveToCloud({ outlets: updated });
  };

  const deleteOutlet = (id) => {
    const updated = (Array.isArray(outlets) ? outlets : []).filter((item) => item.id !== id);
    setOutlets(updated);
    latestStateRef.current.outlets = updated;
    saveToCloud({ outlets: updated });
  };

  // SITE CONTENT ACTIONS
  const updateSiteContent = (sectionKey, newContent) => {
    const updated = {
      ...siteContent,
      [sectionKey]: {
        ...siteContent[sectionKey],
        ...newContent
      }
    };
    setSiteContent(updated);
    latestStateRef.current.siteContent = updated;
    saveToCloud({ siteContent: updated });
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
    latestStateRef.current = {
      menuItems: defaultMenuItems,
      galleryItems: defaultGalleryItems,
      siteContent: defaultSiteContent,
      outlets: defaultOutlets
    };
    saveToCloud({ menuItems: defaultMenuItems, galleryItems: defaultGalleryItems, siteContent: defaultSiteContent, outlets: defaultOutlets });
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
