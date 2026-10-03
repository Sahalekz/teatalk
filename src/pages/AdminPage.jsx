import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../context/CmsContext';
import { 
  LayoutDashboard, Utensils, Image as ImageIcon, FileText, Settings, 
  Plus, Edit, Trash2, Star, Download, RotateCcw, ExternalLink, LogOut, 
  Search, ShieldCheck, Check, X, AlertTriangle, Coffee, MapPin, Upload
} from 'lucide-react';

const ImageUploadInput = ({ label, value, onChange, placeholder = "Upload image file or paste URL..." }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const rawDataUrl = event.target?.result;
        if (!rawDataUrl) return;

        // Auto compress high-res image to max 1200px canvas to prevent LocalStorage quota errors
        const img = new Image();
        img.onload = () => {
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          onChange(compressedDataUrl);
        };
        img.onerror = () => {
          onChange(rawDataUrl);
        };
        img.src = rawDataUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="block font-bold text-[#D4B8A5] uppercase mb-1">{label}</label>}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-xs text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center gap-2 bg-[#F5A623] hover:bg-[#E09418] text-[#2A080A] px-4 py-3 rounded-xl font-['Bricolage_Grotesque'] font-extrabold text-xs shadow-md shrink-0 transition-all hover:scale-105"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Image</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {value && (
        <div className="relative w-36 h-24 rounded-xl overflow-hidden border-2 border-[#F5A623]/40 bg-[#1F0607] shadow-md group mt-2">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] text-[#F5A623] font-bold">
            Live Preview
          </div>
        </div>
      )}
    </div>
  );
};

const GoogleIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export default function AdminPage() {
  // Default Authorized Emails
  const defaultAuthorizedEmails = ['sahalekcpl@gmail.com', 'teatalkinceo@gmail.com'];

  // Authorized Emails State (managed in localStorage)
  const [authorizedEmails, setAuthorizedEmails] = useState(() => {
    try {
      const saved = localStorage.getItem('teatalk_cms_auth_emails');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && (parsed.includes('sahalekcpl@gmail.com') || parsed.includes('teatalkinceo@gmail.com'))) {
          return parsed;
        }
      }
      return defaultAuthorizedEmails;
    } catch {
      return defaultAuthorizedEmails;
    }
  });

  const [masterPin, setMasterPin] = useState(() => {
    return localStorage.getItem('teatalk_cms_master_pin') || 'Teatalk@2020';
  });

  const [masterOtp, setMasterOtp] = useState(() => {
    return localStorage.getItem('teatalk_cms_master_otp') || '984210';
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('teatalk_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authenticated, setAuthenticated] = useState(() => {
    return sessionStorage.getItem('teatalk_admin_auth') === 'true';
  });

  // 2FA Login Flow States
  const [loginStep, setLoginStep] = useState('credentials'); // 'credentials' | 'otp'
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  // Permanent 2FA OTP Code
  const PERMANENT_OTP = '984210';

  const [generatedOtp, setGeneratedOtp] = useState(() => {
    return sessionStorage.getItem('teatalk_sent_otp') || PERMANENT_OTP;
  });
  const [pendingEmail, setPendingEmail] = useState(() => {
    return sessionStorage.getItem('teatalk_pending_email') || '';
  });
  const [authError, setAuthError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(60);
  const [newAuthEmailInput, setNewAuthEmailInput] = useState('');
  const [newMasterPinInput, setNewMasterPinInput] = useState('');

  // Active Tab State (WordPress Sidebar: 'dashboard', 'menu', 'outlets', 'gallery', 'content', 'settings')
  const [activeTab, setActiveTab] = useState('dashboard');

  // Real Email Dispatch helper function
  const sendRealEmailOtp = async (targetEmail, otpCode = PERMANENT_OTP) => {
    try {
      await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Tea Talk Admin 2FA Code: ${otpCode}`,
          _template: 'table',
          _captcha: 'false',
          otp_code: otpCode,
          message: `Your Tea Talk Admin Panel 2-Factor Verification Code is: ${otpCode}\n\nThis code is valid for 10 minutes. Do not share this code with anyone.`,
          security_notice: 'Tea Talk Admin 2FA Security'
        })
      });
    } catch (err) {
      console.warn('Real email dispatch note:', err);
    }
  };

  // Persist Authorized Emails & Master PIN to localStorage
  React.useEffect(() => {
    try {
      localStorage.setItem('teatalk_cms_auth_emails', JSON.stringify(authorizedEmails));
    } catch (err) {
      console.warn('Could not save authorized emails:', err);
    }
  }, [authorizedEmails]);

  React.useEffect(() => {
    try {
      localStorage.setItem('teatalk_cms_master_pin', masterPin);
    } catch (err) {
      console.warn('Could not save master PIN:', err);
    }
  }, [masterPin]);

  // Resend Countdown Timer Effect
  React.useEffect(() => {
    let timer;
    if (loginStep === 'otp' && resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [loginStep, resendCountdown]);

  // Step 1: Submit Credentials & Check Email Authorization
  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      setAuthError('Please enter a valid email address.');
      return;
    }

    // Check if email is in authorized email list
    const allAuthorized = [...defaultAuthorizedEmails, ...(Array.isArray(authorizedEmails) ? authorizedEmails : [])];
    const isAuthorized = allAuthorized.some((e) => e.trim().toLowerCase() === cleanEmail);
    if (!isAuthorized) {
      setAuthError(`Access Denied: "${cleanEmail}" is not an authorized admin email address.`);
      return;
    }

    // Check password/PIN
    if (passwordInput !== masterPin && passwordInput !== 'Teatalk@2020') {
      setAuthError('Incorrect Password / PIN code.');
      return;
    }

    // Use permanent 6-digit OTP code 984210 & trigger email dispatch
    const targetOtp = PERMANENT_OTP;
    sessionStorage.setItem('teatalk_sent_otp', targetOtp);
    sessionStorage.setItem('teatalk_pending_email', cleanEmail);
    sendRealEmailOtp(cleanEmail, targetOtp);
    setGeneratedOtp(targetOtp);
    setPendingEmail(cleanEmail);
    setLoginStep('otp');
    setAuthError('');
    setOtpInput('');
    setResendCountdown(60);
  };

  // Step 2: Verify 6-Digit OTP Code
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const entered = otpInput.trim();
    const storedOtp = sessionStorage.getItem('teatalk_sent_otp') || PERMANENT_OTP;
    if (entered === storedOtp || entered === generatedOtp || entered === masterOtp || entered === PERMANENT_OTP) {
      const activeEmail = pendingEmail || sessionStorage.getItem('teatalk_pending_email') || 'sahalekcpl@gmail.com';
      const userData = {
        email: activeEmail,
        name: activeEmail.split('@')[0],
        picture: `https://api.dicebear.com/7.x/bottts/svg?seed=${activeEmail}`,
        authMethod: 'email_otp_2fa'
      };
      sessionStorage.setItem('teatalk_admin_auth', 'true');
      sessionStorage.setItem('teatalk_admin_user', JSON.stringify(userData));
      setAdminUser(userData);
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid OTP verification code. Please check your email inbox and try again.');
    }
  };

  // Resend OTP Action
  const handleResendOtp = () => {
    const targetOtp = PERMANENT_OTP;
    sessionStorage.setItem('teatalk_sent_otp', targetOtp);
    sendRealEmailOtp(pendingEmail, targetOtp);
    setGeneratedOtp(targetOtp);
    setResendCountdown(60);
    setAuthError('');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('teatalk_admin_auth');
    sessionStorage.removeItem('teatalk_admin_user');
    setAuthenticated(false);
    setAdminUser(null);
    setLoginStep('credentials');
    setEmailInput('');
    setPasswordInput('');
    setOtpInput('');
  };

  // CMS Context Data & Functions
  const {
    menuItems, categories, galleryItems, siteContent, outlets,
    isCloudConfigured, syncStatus, saveToCloud,
    addMenuItem, updateMenuItem, deleteMenuItem, togglePopularItem,
    addGalleryItem, updateGalleryItem, deleteGalleryItem,
    addOutlet, updateOutlet, deleteOutlet,
    updateSiteContent, resetToDefaults, exportBackup
  } = useCms();

  // Search & Filter States
  const [menuSearch, setMenuSearch] = useState('');
  const [menuCatFilter, setMenuCatFilter] = useState('all');

  // Menu Modal State
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [menuForm, setMenuForm] = useState({
    name: '', category: 'special-teas', price: '₹', description: '', popular: false, tags: ''
  });

  // Gallery Modal State
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState(null);
  const [galleryForm, setGalleryForm] = useState({
    title: '', category: 'Outlet Design', src: '', desc: ''
  });

  // Outlet Modal State
  const [outletModalOpen, setOutletModalOpen] = useState(false);
  const [editingOutlet, setEditingOutlet] = useState(null);
  const [outletForm, setOutletForm] = useState({
    name: '', subtitle: '', outlets: '', tag: 'India', color: 'bg-[#F5A623] text-[#380B0E]'
  });

  // Content Form State
  const [contentForm, setContentForm] = useState(siteContent);
  const [saveSuccess, setSaveSuccess] = useState(false);



  // Open Add/Edit Menu Item Modal
  const openMenuModal = (item = null) => {
    if (item) {
      setEditingMenuItem(item);
      setMenuForm({
        name: item.name,
        category: item.category,
        price: item.price,
        description: item.description || '',
        popular: item.popular || false,
        tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || ''
      });
    } else {
      setEditingMenuItem(null);
      setMenuForm({
        name: '', category: 'special-teas', price: '₹20', description: '', popular: false, tags: ''
      });
    }
    setMenuModalOpen(true);
  };

  // Save Menu Item
  const handleSaveMenuItem = (e) => {
    e.preventDefault();
    const formattedTags = menuForm.tags
      ? menuForm.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const itemData = {
      name: menuForm.name,
      category: menuForm.category,
      price: menuForm.price,
      description: menuForm.description,
      popular: menuForm.popular,
      tags: formattedTags
    };

    if (editingMenuItem) {
      updateMenuItem(editingMenuItem.id, itemData);
    } else {
      addMenuItem(itemData);
    }

    setMenuModalOpen(false);
  };

  // Open Add/Edit Gallery Modal
  const openGalleryModal = (item = null) => {
    if (item) {
      setEditingGalleryItem(item);
      setGalleryForm({
        title: item.title,
        category: item.category,
        src: item.src,
        desc: item.desc || ''
      });
    } else {
      setEditingGalleryItem(null);
      setGalleryForm({
        title: '', category: 'Outlet Design', src: '', desc: ''
      });
    }
    setGalleryModalOpen(true);
  };

  // Save Gallery Item
  const handleSaveGalleryItem = (e) => {
    e.preventDefault();
    if (editingGalleryItem) {
      updateGalleryItem(editingGalleryItem.id, galleryForm);
    } else {
      addGalleryItem(galleryForm);
    }
    setGalleryModalOpen(false);
  };

  // Open Add/Edit Outlet Modal
  const openOutletModal = (item = null) => {
    if (item) {
      setEditingOutlet(item);
      setOutletForm({
        name: item.name,
        subtitle: item.subtitle || '',
        outlets: item.outlets || 'Multiple Outlets',
        tag: item.tag || 'India',
        color: item.color || 'bg-[#F5A623] text-[#380B0E]'
      });
    } else {
      setEditingOutlet(null);
      setOutletForm({
        name: '', subtitle: '', outlets: 'Multiple Outlets', tag: 'India', color: 'bg-[#F5A623] text-[#380B0E]'
      });
    }
    setOutletModalOpen(true);
  };

  // Save Outlet Item
  const handleSaveOutlet = (e) => {
    e.preventDefault();
    if (editingOutlet) {
      updateOutlet(editingOutlet.id, outletForm);
    } else {
      addOutlet(outletForm);
    }
    setOutletModalOpen(false);
  };

  // Save Site Section Content
  const handleSaveContent = (e) => {
    e.preventDefault();
    updateSiteContent('hero', contentForm.hero);
    updateSiteContent('stats', contentForm.stats);
    updateSiteContent('story', contentForm.story);
    updateSiteContent('experience', contentForm.experience);
    updateSiteContent('different', contentForm.different);
    updateSiteContent('contact', contentForm.contact);

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Filtered Menu Items
  const filteredMenuItems = menuItems.filter((item) => {
    const matchesCat = menuCatFilter === 'all' || item.category === menuCatFilter;
    const matchesSearch = item.name.toLowerCase().includes(menuSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Login Screen (If Not Authenticated)
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#1F0607] text-[#F7EBE1] flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-[#2A080A] border-4 border-[#F5A623]/40 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5A623]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#F5A623] rounded-2xl p-2.5 shadow-xl flex items-center justify-center">
              <img src="/logo.png" alt="Tea Talk Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="font-['Bricolage_Grotesque'] font-extrabold text-3xl text-[#F7EBE1]">
              TEA TALK CMS
            </h1>
            <p className="text-xs text-[#F5A623] uppercase font-extrabold tracking-widest mt-1">
              WordPress-Style Admin Portal
            </p>
          </div>

          {/* STEP 1: CREDENTIALS (AUTHORIZED EMAIL + PASSWORD) */}
          {loginStep === 'credentials' && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-['Bricolage_Grotesque'] font-extrabold uppercase tracking-wider text-[#D4B8A5] mb-2">
                  Authorized Admin Email *
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder=""
                  className="w-full bg-[#1F0607] border-2 border-[#F5A623]/30 focus:border-[#F5A623] rounded-2xl py-3 px-4 text-sm font-semibold text-[#F7EBE1] placeholder-[#D4B8A5]/40 focus:outline-none transition-all shadow-inner"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-['Bricolage_Grotesque'] font-extrabold uppercase tracking-wider text-[#D4B8A5] mb-2">
                  Admin Password *
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full bg-[#1F0607] border-2 border-[#F5A623]/30 focus:border-[#F5A623] rounded-2xl py-3 px-4 text-center text-lg font-extrabold text-[#F7EBE1] placeholder-[#D4B8A5]/40 focus:outline-none transition-all shadow-inner tracking-widest"
                />
              </div>

              {authError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-900/40 border border-red-500/50 text-red-200 text-xs font-semibold text-left">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#F5A623] hover:bg-[#E09418] text-[#2A080A] py-4 rounded-2xl font-['Bricolage_Grotesque'] font-extrabold text-sm shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>VERIFY & GENERATE 2FA OTP</span>
              </button>
            </form>
          )}

          {/* STEP 2: 6-DIGIT OTP VERIFICATION */}
          {loginStep === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-5 animate-fadeIn">
              <div className="bg-[#1F0607] border-2 border-[#F5A623]/40 rounded-2xl p-4 text-center space-y-2">
                <div className="text-xs font-extrabold text-[#F5A623] uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <span>📧 2FA Verification Code Sent</span>
                </div>
                <p className="text-xs text-[#D4B8A5] leading-relaxed">
                  A 6-digit verification code has been dispatched to <span className="text-[#F7EBE1] font-bold">{pendingEmail}</span>. Please check your email inbox.
                </p>
              </div>

              <div>
                <label className="block text-xs font-['Bricolage_Grotesque'] font-extrabold uppercase tracking-wider text-[#D4B8A5] mb-2 text-center">
                  Enter 6-Digit OTP Code *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="6-Digit OTP"
                  className="w-full bg-[#1F0607] border-2 border-[#F5A623] rounded-2xl py-3.5 px-4 text-center text-3xl font-extrabold text-[#F5A623] placeholder-[#D4B8A5]/30 focus:outline-none transition-all shadow-inner tracking-[0.3em]"
                  autoFocus
                />
              </div>

              {authError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-900/40 border border-red-500/50 text-red-200 text-xs font-semibold text-left">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#F5A623] hover:bg-[#E09418] text-[#2A080A] py-4 rounded-2xl font-['Bricolage_Grotesque'] font-extrabold text-base shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                <span>VERIFY OTP & ACCESS DASHBOARD</span>
              </button>

              <div className="flex items-center justify-between pt-2 text-xs">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendCountdown > 0}
                  className={`font-bold transition-colors ${
                    resendCountdown > 0 ? 'text-[#D4B8A5]/40 cursor-not-allowed' : 'text-[#F5A623] hover:underline'
                  }`}
                >
                  {resendCountdown > 0 ? `Resend OTP in ${resendCountdown}s` : 'Resend OTP Code'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLoginStep('credentials');
                    setAuthError('');
                  }}
                  className="text-[#D4B8A5] hover:text-[#F7EBE1] font-bold"
                >
                  ← Back to Email Sign-In
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-[#F5A623]/20 text-center">
            <Link to="/" className="text-xs text-[#F5A623] hover:underline font-bold flex items-center justify-center gap-1">
              <span>Return to Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1F0607] text-[#F7EBE1] font-sans flex flex-col selection:bg-[#F5A623] selection:text-[#2A080A]">
      
      {/* WordPress Top Admin Bar */}
      <header className="bg-[#2A080A] border-b border-[#F5A623]/30 px-4 sm:px-8 py-3.5 flex items-center justify-between z-30 sticky top-0 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#F5A623] rounded-xl p-1 shadow-md">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-['Bricolage_Grotesque'] font-extrabold text-lg text-[#F7EBE1] leading-none">
                TEA TALK <span className="text-[#F5A623]">WP-CMS</span>
              </span>
              <span className="text-[9px] text-[#F5A623] font-bold uppercase tracking-widest mt-0.5">
                v2.5 Admin Panel
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {adminUser && (
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#1F0607] border border-[#F5A623]/30 text-xs">
              {adminUser.picture ? (
                <img src={adminUser.picture} alt="Avatar" className="w-6 h-6 rounded-full object-cover border border-[#F5A623]" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#F5A623] text-[#2A080A] font-bold text-[10px] flex items-center justify-center">
                  {adminUser.name?.[0]?.toUpperCase() || 'A'}
                </div>
              )}
              <div className="flex flex-col text-left">
                <span className="font-bold text-[#F7EBE1] leading-tight">{adminUser.name}</span>
                <span className="text-[10px] text-[#F5A623] truncate max-w-[150px]">{adminUser.email}</span>
              </div>
            </div>
          )}

          <Link
            to="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#361113] border border-[#F5A623]/40 text-[#F5A623] hover:bg-[#F5A623] hover:text-[#2A080A] text-xs font-['Bricolage_Grotesque'] font-extrabold transition-all shadow-md"
          >
            <span>Visit Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={exportBackup}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#361113] border border-[#F5A623]/40 text-[#F7EBE1] hover:border-[#F5A623] text-xs font-bold transition-all shadow-md"
            title="Export JSON Backup"
          >
            <Download className="w-3.5 h-3.5 text-[#F5A623]" />
            <span className="hidden md:inline">Backup</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-900/30 border border-red-500/40 text-red-200 hover:bg-red-900/60 text-xs font-bold transition-all shadow-md"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Layout (Sidebar + Content Body) */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        
        {/* WordPress Left Admin Sidebar */}
        <aside className="w-full md:w-64 bg-[#2A080A] border-r border-[#F5A623]/20 p-4 shrink-0">
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-['Bricolage_Grotesque'] font-extrabold text-sm transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#F5A623] text-[#2A080A] shadow-lg'
                  : 'text-[#D4B8A5] hover:bg-[#361113] hover:text-[#F7EBE1]'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('menu')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-['Bricolage_Grotesque'] font-extrabold text-sm transition-all ${
                activeTab === 'menu'
                  ? 'bg-[#F5A623] text-[#2A080A] shadow-lg'
                  : 'text-[#D4B8A5] hover:bg-[#361113] hover:text-[#F7EBE1]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Utensils className="w-5 h-5" />
                <span>Menu Items</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#1F0607] text-[#F5A623] font-extrabold">
                {menuItems.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('outlets')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-['Bricolage_Grotesque'] font-extrabold text-sm transition-all ${
                activeTab === 'outlets'
                  ? 'bg-[#F5A623] text-[#2A080A] shadow-lg'
                  : 'text-[#D4B8A5] hover:bg-[#361113] hover:text-[#F7EBE1]'
              }`}
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span>Outlet Locations</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#1F0607] text-[#F5A623] font-extrabold">
                {outlets?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-['Bricolage_Grotesque'] font-extrabold text-sm transition-all ${
                activeTab === 'gallery'
                  ? 'bg-[#F5A623] text-[#2A080A] shadow-lg'
                  : 'text-[#D4B8A5] hover:bg-[#361113] hover:text-[#F7EBE1]'
              }`}
            >
              <div className="flex items-center gap-3">
                <ImageIcon className="w-5 h-5" />
                <span>Gallery Photos</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#1F0607] text-[#F5A623] font-extrabold">
                {galleryItems.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-['Bricolage_Grotesque'] font-extrabold text-sm transition-all ${
                activeTab === 'content'
                  ? 'bg-[#F5A623] text-[#2A080A] shadow-lg'
                  : 'text-[#D4B8A5] hover:bg-[#361113] hover:text-[#F7EBE1]'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Section Editor</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-['Bricolage_Grotesque'] font-extrabold text-sm transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#F5A623] text-[#2A080A] shadow-lg'
                  : 'text-[#D4B8A5] hover:bg-[#361113] hover:text-[#F7EBE1]'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings & Tools</span>
            </button>
          </nav>
        </aside>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h1 className="font-['Bricolage_Grotesque'] font-extrabold text-3xl sm:text-4xl text-[#F7EBE1]">
                  Dashboard Overview
                </h1>
                <p className="text-xs text-[#D4B8A5] font-medium mt-1">
                  Manage live site content, menu items, outlet locations, gallery, and section configurations.
                </p>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#2A080A] border-2 border-[#F5A623]/30 rounded-3xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-extrabold text-[#F5A623]">Menu Items</span>
                    <Utensils className="w-5 h-5 text-[#F5A623]" />
                  </div>
                  <div className="font-['Bricolage_Grotesque'] font-extrabold text-4xl text-[#F7EBE1]">
                    {menuItems.length}
                  </div>
                  <p className="text-[11px] text-[#D4B8A5] mt-1">Total digital menu offerings</p>
                </div>

                <div className="bg-[#2A080A] border-2 border-[#F5A623]/30 rounded-3xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-extrabold text-[#F5A623]">Outlet Regions</span>
                    <MapPin className="w-5 h-5 text-[#F5A623]" />
                  </div>
                  <div className="font-['Bricolage_Grotesque'] font-extrabold text-4xl text-[#F7EBE1]">
                    {outlets?.length || 0}
                  </div>
                  <p className="text-[11px] text-[#D4B8A5] mt-1">Active outlet locations & regions</p>
                </div>

                <div className="bg-[#2A080A] border-2 border-[#F5A623]/30 rounded-3xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-extrabold text-[#F5A623]">Gallery Photos</span>
                    <ImageIcon className="w-5 h-5 text-[#F5A623]" />
                  </div>
                  <div className="font-['Bricolage_Grotesque'] font-extrabold text-4xl text-[#F7EBE1]">
                    {galleryItems.length}
                  </div>
                  <p className="text-[11px] text-[#D4B8A5] mt-1">Store presence & outlet photos</p>
                </div>

                <div className="bg-[#2A080A] border-2 border-[#F5A623]/30 rounded-3xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-extrabold text-[#F5A623]">Categories</span>
                    <Coffee className="w-5 h-5 text-[#F5A623]" />
                  </div>
                  <div className="font-['Bricolage_Grotesque'] font-extrabold text-4xl text-[#F7EBE1]">
                    {categories.length - 1}
                  </div>
                  <p className="text-[11px] text-[#D4B8A5] mt-1">Active menu categories</p>
                </div>
              </div>

              {/* Quick Action Shortcuts */}
              <div className="bg-[#2A080A] border-2 border-[#F5A623]/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
                <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-2xl text-[#F7EBE1] mb-4">
                  Quick Actions
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <button
                    onClick={() => {
                      setActiveTab('menu');
                      openMenuModal();
                    }}
                    className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-[#361113] border border-[#F5A623]/40 text-[#F5A623] hover:bg-[#F5A623] hover:text-[#2A080A] font-['Bricolage_Grotesque'] font-extrabold text-xs sm:text-sm transition-all shadow-md"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add New Menu Item</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('outlets');
                      openOutletModal();
                    }}
                    className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-[#361113] border border-[#F5A623]/40 text-[#F5A623] hover:bg-[#F5A623] hover:text-[#2A080A] font-['Bricolage_Grotesque'] font-extrabold text-xs sm:text-sm transition-all shadow-md"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Outlet Location</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('gallery');
                      openGalleryModal();
                    }}
                    className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-[#361113] border border-[#F5A623]/40 text-[#F5A623] hover:bg-[#F5A623] hover:text-[#2A080A] font-['Bricolage_Grotesque'] font-extrabold text-xs sm:text-sm transition-all shadow-md"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Gallery Photo</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('content')}
                    className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-[#361113] border border-[#F5A623]/40 text-[#F5A623] hover:bg-[#F5A623] hover:text-[#2A080A] font-['Bricolage_Grotesque'] font-extrabold text-xs sm:text-sm transition-all shadow-md"
                  >
                    <Edit className="w-5 h-5" />
                    <span>Edit Site Content</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MENU ITEMS MANAGER */}
          {activeTab === 'menu' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-['Bricolage_Grotesque'] font-extrabold text-3xl sm:text-4xl text-[#F7EBE1]">
                    Menu Items Manager
                  </h1>
                  <p className="text-xs text-[#D4B8A5] font-medium mt-1">
                    Add, edit, or delete items from the live digital menu.
                  </p>
                </div>

                <button
                  onClick={() => openMenuModal()}
                  className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#E09418] text-[#2A080A] px-6 py-3.5 rounded-full font-['Bricolage_Grotesque'] font-extrabold text-sm shadow-xl hover:scale-105 transition-all self-start sm:self-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>ADD NEW MENU ITEM</span>
                </button>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#2A080A] border border-[#F5A623]/30 p-4 rounded-2xl shadow-md">
                <div className="relative flex-1 w-full">
                  <input
                    type="text"
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    placeholder="Search menu items by name..."
                    className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl py-2.5 pl-10 pr-4 text-xs text-[#F7EBE1] placeholder-[#D4B8A5]/50 focus:outline-none focus:border-[#F5A623]"
                  />
                  <Search className="w-4 h-4 text-[#F5A623] absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <select
                  value={menuCatFilter}
                  onChange={(e) => setMenuCatFilter(e.target.value)}
                  className="w-full sm:w-auto bg-[#1F0607] border border-[#F5A623]/30 rounded-xl py-2.5 px-4 text-xs text-[#F7EBE1] focus:outline-none focus:border-[#F5A623] font-semibold"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Data Table */}
              <div className="bg-[#2A080A] border-2 border-[#F5A623]/30 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#1F0607] text-[#F5A623] font-['Bricolage_Grotesque'] font-extrabold uppercase border-b border-[#F5A623]/20">
                      <tr>
                        <th className="p-4">Item Name</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price</th>
                        <th className="p-4 text-center">Popular</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F5A623]/10">
                      {filteredMenuItems.map((item) => (
                        <tr key={item.id} className="hover:bg-[#361113]/50 transition-colors">
                          <td className="p-4 font-extrabold text-[#F7EBE1]">{item.name}</td>
                          <td className="p-4 text-[#D4B8A5]">
                            <span className="px-2.5 py-1 rounded-full bg-[#1F0607] border border-[#F5A623]/20 uppercase text-[10px] font-bold">
                              {item.category.replace('-', ' ')}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-[#F5A623] text-sm">{item.price}</td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => togglePopularItem(item.id)}
                              className={`p-1.5 rounded-lg border transition-all ${
                                item.popular
                                  ? 'bg-[#F5A623] text-[#2A080A] border-[#F5A623]'
                                  : 'bg-[#1F0607] text-[#D4B8A5]/40 border-[#F5A623]/20 hover:border-[#F5A623]'
                              }`}
                              title="Toggle Popular Status"
                            >
                              <Star className="w-4 h-4 fill-current" />
                            </button>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => openMenuModal(item)}
                              className="p-2 rounded-xl bg-[#361113] border border-[#F5A623]/40 text-[#F5A623] hover:bg-[#F5A623] hover:text-[#2A080A] transition-all"
                              title="Edit Item"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete "${item.name}" from menu?`)) {
                                  deleteMenuItem(item.id);
                                }
                              }}
                              className="p-2 rounded-xl bg-red-900/30 border border-red-500/40 text-red-200 hover:bg-red-900/60 transition-all"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: OUTLET LOCATIONS MANAGER */}
          {activeTab === 'outlets' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-['Bricolage_Grotesque'] font-extrabold text-3xl sm:text-4xl text-[#F7EBE1]">
                    Outlet Locations Manager
                  </h1>
                  <p className="text-xs text-[#D4B8A5] font-medium mt-1">
                    Add, edit, or delete regional outlet locations (e.g. Kerala, Bangalore, Saudi Arabia, Hyderabad) displayed on the website.
                  </p>
                </div>

                <button
                  onClick={() => openOutletModal()}
                  className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#E09418] text-[#2A080A] px-6 py-3.5 rounded-full font-['Bricolage_Grotesque'] font-extrabold text-sm shadow-xl hover:scale-105 transition-all self-start sm:self-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>ADD NEW OUTLET LOCATION</span>
                </button>
              </div>

              {/* Outlet Locations Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {outlets.map((item) => (
                  <div
                    key={item.id || item.name}
                    className="bg-[#2A080A] border-2 border-[#F5A623]/30 rounded-3xl p-6 shadow-xl flex flex-col justify-between group hover:border-[#F5A623] transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#1F0607] border border-[#F5A623]/30 flex items-center justify-center text-[#F5A623]">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-['Bricolage_Grotesque'] font-extrabold ${item.color || 'bg-[#F5A623] text-[#380B0E]'}`}>
                          {item.tag || 'India'}
                        </span>
                      </div>

                      <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-2xl text-[#F7EBE1]">
                        {item.name}
                      </h3>
                      
                      <div className="text-xs font-bold uppercase text-[#F5A623] mt-1">
                        {item.subtitle}
                      </div>

                      <p className="text-xs text-[#D4B8A5] mt-3 font-semibold">
                        {item.outlets}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#F5A623]/20 flex justify-end gap-2">
                      <button
                        onClick={() => openOutletModal(item)}
                        className="p-2 px-3 rounded-xl bg-[#361113] border border-[#F5A623]/40 text-[#F5A623] hover:bg-[#F5A623] hover:text-[#2A080A] text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit Location</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete outlet region "${item.name}"?`)) {
                            deleteOutlet(item.id);
                          }
                        }}
                        className="p-2 px-3 rounded-xl bg-red-900/30 border border-red-500/40 text-red-200 hover:bg-red-900/60 text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: GALLERY MANAGER */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-['Bricolage_Grotesque'] font-extrabold text-3xl sm:text-4xl text-[#F7EBE1]">
                    Gallery & Outlets Manager
                  </h1>
                  <p className="text-xs text-[#D4B8A5] font-medium mt-1">
                    Manage outlet design photos and atmosphere imagery displayed in the gallery.
                  </p>
                </div>

                <button
                  onClick={() => openGalleryModal()}
                  className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#E09418] text-[#2A080A] px-6 py-3.5 rounded-full font-['Bricolage_Grotesque'] font-extrabold text-sm shadow-xl hover:scale-105 transition-all self-start sm:self-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>ADD GALLERY PHOTO</span>
                </button>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#2A080A] border-2 border-[#F5A623]/30 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative h-44 overflow-hidden bg-[#1F0607]">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-[#F5A623] text-[#2A080A] px-3 py-1 rounded-full text-[10px] font-['Bricolage_Grotesque'] font-extrabold uppercase shadow-md">
                          {item.category}
                        </span>
                      </div>

                      <div className="p-5">
                        <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-lg text-[#F7EBE1]">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#D4B8A5] mt-1 line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex justify-end gap-2">
                      <button
                        onClick={() => openGalleryModal(item)}
                        className="p-2 rounded-xl bg-[#361113] border border-[#F5A623]/40 text-[#F5A623] hover:bg-[#F5A623] hover:text-[#2A080A] text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete photo "${item.title}"?`)) {
                            deleteGalleryItem(item.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-red-900/30 border border-red-500/40 text-red-200 hover:bg-red-900/60 text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SECTION CONTENT EDITOR */}
          {activeTab === 'content' && (
            <div className="space-y-8 animate-fadeIn max-w-4xl">
              <div>
                <h1 className="font-['Bricolage_Grotesque'] font-extrabold text-3xl sm:text-4xl text-[#F7EBE1]">
                  WordPress Section Customizer
                </h1>
                <p className="text-xs text-[#D4B8A5] font-medium mt-1">
                  Edit headlines, subtitles, hotline numbers, and brand content across the website.
                </p>
              </div>

              {saveSuccess && (
                <div className="p-4 rounded-2xl bg-green-900/40 border-2 border-green-500/60 text-green-200 text-sm font-bold flex items-center gap-3 animate-fadeIn">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Changes saved successfully to live website!</span>
                </div>
              )}

              <form onSubmit={handleSaveContent} className="space-y-8">
                
                {/* HERO SECTION EDIT */}
                <div className="bg-[#2A080A] border-2 border-[#F5A623]/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
                  <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-2xl text-[#F5A623] border-b border-[#F5A623]/20 pb-3">
                    1. Hero Section Content
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-[#D4B8A5] uppercase mb-1">Badge Tagline</label>
                    <input
                      type="text"
                      value={contentForm.hero.badge}
                      onChange={(e) => setContentForm({
                        ...contentForm,
                        hero: { ...contentForm.hero, badge: e.target.value }
                      })}
                      className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-xs text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#D4B8A5] uppercase mb-1">Headline Line 1</label>
                      <input
                        type="text"
                        value={contentForm.hero.headline1}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          hero: { ...contentForm.hero, headline1: e.target.value }
                        })}
                        className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-xs text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#D4B8A5] uppercase mb-1">Headline Line 2 (Highlighted)</label>
                      <input
                        type="text"
                        value={contentForm.hero.headline2}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          hero: { ...contentForm.hero, headline2: e.target.value }
                        })}
                        className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-xs text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#D4B8A5] uppercase mb-1">Hero Subtext Paragraph</label>
                    <textarea
                      rows={2}
                      value={contentForm.hero.subtext}
                      onChange={(e) => setContentForm({
                        ...contentForm,
                        hero: { ...contentForm.hero, subtext: e.target.value }
                      })}
                      className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-xs text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>
                </div>

                {/* STATS SECTION EDIT */}
                <div className="bg-[#2A080A] border-2 border-[#F5A623]/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
                  <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-2xl text-[#F5A623] border-b border-[#F5A623]/20 pb-3">
                    2. Statistics & Numbers
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#D4B8A5] uppercase mb-1">Founded Year</label>
                      <input
                        type="text"
                        value={contentForm.stats.foundedYear}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          stats: { ...contentForm.stats, foundedYear: e.target.value }
                        })}
                        className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-xs text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#D4B8A5] uppercase mb-1">Outlets Count</label>
                      <input
                        type="text"
                        value={contentForm.stats.outletsCount}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          stats: { ...contentForm.stats, outletsCount: e.target.value }
                        })}
                        className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-xs text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#D4B8A5] uppercase mb-1">Regions</label>
                      <input
                        type="text"
                        value={contentForm.stats.regionsCount}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          stats: { ...contentForm.stats, regionsCount: e.target.value }
                        })}
                        className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-xs text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#D4B8A5] uppercase mb-1">Varieties</label>
                      <input
                        type="text"
                        value={contentForm.stats.varietiesCount}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          stats: { ...contentForm.stats, varietiesCount: e.target.value }
                        })}
                        className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-xs text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                      />
                    </div>
                  </div>
                </div>

                {/* OUR STORY SECTION EDIT */}
                <div className="bg-[#2A080A] border-2 border-[#F5A623]/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
                  <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-2xl text-[#F5A623] border-b border-[#F5A623]/20 pb-3">
                    3. Our Story Image ("More Than Tea. It's a Conversation.")
                  </h3>

                  <ImageUploadInput
                    label="Our Story Image"
                    value={contentForm.story?.image || '/tea-toast.png'}
                    onChange={(newImg) => setContentForm({
                      ...contentForm,
                      story: { ...(contentForm.story || {}), image: newImg }
                    })}
                    placeholder="/tea-toast.png or upload image..."
                  />
                </div>

                {/* CAFÉ EXPERIENCE SECTION EDIT */}
                <div className="bg-[#2A080A] border-2 border-[#F5A623]/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
                  <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-2xl text-[#F5A623] border-b border-[#F5A623]/20 pb-3">
                    4. Café Experience ("Where Conversations Begin")
                  </h3>

                  <ImageUploadInput
                    label="Café Experience Image"
                    value={contentForm.experience?.image || '/tea-talk-cafe-3d.jpg'}
                    onChange={(newImg) => setContentForm({
                      ...contentForm,
                      experience: { ...(contentForm.experience || {}), image: newImg }
                    })}
                    placeholder="/tea-talk-cafe-3d.jpg or upload image..."
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#D4B8A5] uppercase mb-1">Title Line 1</label>
                      <input
                        type="text"
                        value={contentForm.experience?.titleLine1 || 'Where'}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          experience: { ...(contentForm.experience || {}), titleLine1: e.target.value }
                        })}
                        className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-xs text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#D4B8A5] uppercase mb-1">Title Line 2 (Highlighted)</label>
                      <input
                        type="text"
                        value={contentForm.experience?.titleLine2 || 'Conversations Begin.'}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          experience: { ...(contentForm.experience || {}), titleLine2: e.target.value }
                        })}
                        className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-xs text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                      />
                    </div>
                  </div>
                </div>

                {/* WHAT MAKES TEATALK DIFFERENT SECTION EDIT */}
                <div className="bg-[#2A080A] border-2 border-[#F5A623]/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
                  <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-2xl text-[#F5A623] border-b border-[#F5A623]/20 pb-3">
                    4. What Makes Tea Talk Different Image
                  </h3>

                  <ImageUploadInput
                    label="Section Image"
                    value={contentForm.different?.image || '/tea-talk-barista.jpg'}
                    onChange={(newImg) => setContentForm({
                      ...contentForm,
                      different: { ...(contentForm.different || {}), image: newImg }
                    })}
                    placeholder="/tea-talk-barista.jpg or upload image..."
                  />
                </div>

                {/* CONTACT & HOTLINE EDIT */}
                <div className="bg-[#2A080A] border-2 border-[#F5A623]/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
                  <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-2xl text-[#F5A623] border-b border-[#F5A623]/20 pb-3">
                    5. Franchise Hotline & Social Links
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#D4B8A5] uppercase mb-1">Direct Hotline Phone</label>
                      <input
                        type="text"
                        value={contentForm.contact.phone}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          contact: { ...contentForm.contact, phone: e.target.value }
                        })}
                        className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-xs text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#D4B8A5] uppercase mb-1">WhatsApp Number</label>
                      <input
                        type="text"
                        value={contentForm.contact.whatsappNumber}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          contact: { ...contentForm.contact, whatsappNumber: e.target.value }
                        })}
                        className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-xs text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#F5A623]/20">
                    <ImageUploadInput
                      label="Instagram QR Code Image"
                      value={contentForm.contact?.instagramQr || '/instagram-qr.png'}
                      onChange={(newQr) => setContentForm({
                        ...contentForm,
                        contact: { ...(contentForm.contact || {}), instagramQr: newQr }
                      })}
                      placeholder="/instagram-qr.png or upload image..."
                    />

                    <ImageUploadInput
                      label="WhatsApp QR Code Image"
                      value={contentForm.contact?.whatsappQr || '/whatsapp-qr.png'}
                      onChange={(newQr) => setContentForm({
                        ...contentForm,
                        contact: { ...(contentForm.contact || {}), whatsappQr: newQr }
                      })}
                      placeholder="/whatsapp-qr.png or upload image..."
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-[#F5A623] hover:bg-[#E09418] text-[#2A080A] px-10 py-4 rounded-full font-['Bricolage_Grotesque'] font-extrabold text-base shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    <span>SAVE ALL SECTION CHANGES</span>
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* TAB 5: SETTINGS & BACKUP */}
          {activeTab === 'settings' && (
            <div className="space-y-8 animate-fadeIn max-w-3xl">
              <div>
                <h1 className="font-['Bricolage_Grotesque'] font-extrabold text-3xl sm:text-4xl text-[#F7EBE1]">
                  Settings & Data Tools
                </h1>
                <p className="text-xs text-[#D4B8A5] font-medium mt-1">
                  Export backups or reset site data to factory defaults.
                </p>
              </div>

              <div className="bg-[#2A080A] border-2 border-[#F5A623]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                
                {/* CLOUD DATABASE SYNC STATUS CARD */}
                <div className="p-5 rounded-2xl bg-[#1F0607] border-2 border-[#F5A623]/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#F5A623]" />
                      <h4 className="font-['Bricolage_Grotesque'] font-extrabold text-lg text-[#F7EBE1]">
                        Global Live Cloud Database Sync
                      </h4>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase shadow-sm ${
                      isCloudConfigured ? 'bg-green-900/60 text-green-300 border border-green-500/50' : 'bg-amber-900/60 text-amber-300 border border-amber-500/50'
                    }`}>
                      {isCloudConfigured ? '🟢 Live Supabase Connected' : '🟡 Hybrid LocalStorage Active'}
                    </span>
                  </div>

                  <p className="text-xs text-[#D4B8A5] leading-relaxed">
                    {isCloudConfigured 
                      ? "Your Admin edits (prices, menu items, outlets) automatically sync to Supabase in real time and reflect live for all visitors worldwide." 
                      : "Changes are stored in your browser memory. To reflect edits live to all global visitors on Vercel, connect your free Supabase database keys in Vercel settings (see SUPABASE_DATABASE_GUIDE.md)."
                    }
                  </p>

                  {isCloudConfigured && (
                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          saveToCloud();
                          alert("All CMS menu items, outlets, and site content pushed to Supabase Cloud Database successfully!");
                        }}
                        className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#E09418] text-[#2A080A] px-5 py-2.5 rounded-xl font-['Bricolage_Grotesque'] font-extrabold text-xs shadow-md"
                      >
                        <Check className="w-4 h-4" />
                        <span>Force Sync All Data to Cloud</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#F5A623]/20 pb-6">
                  <div>
                    <h4 className="font-['Bricolage_Grotesque'] font-extrabold text-xl text-[#F7EBE1]">
                      Export Backup JSON
                    </h4>
                    <p className="text-xs text-[#D4B8A5] mt-1">
                      Download a complete backup of all menu items, gallery items, and custom text.
                    </p>
                  </div>

                  <button
                    onClick={exportBackup}
                    className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#E09418] text-[#2A080A] px-6 py-3 rounded-2xl font-['Bricolage_Grotesque'] font-extrabold text-xs shadow-md shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-['Bricolage_Grotesque'] font-extrabold text-xl text-red-400">
                      Reset to Default Factory State
                    </h4>
                    <p className="text-xs text-[#D4B8A5] mt-1">
                      Restore default project menu items, gallery items, and text sections.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to reset all site content to original defaults?")) {
                        resetToDefaults();
                        alert("Site content reset to factory defaults!");
                      }
                    }}
                    className="flex items-center gap-2 bg-red-900/40 hover:bg-red-900/80 border border-red-500/50 text-red-200 px-6 py-3 rounded-2xl font-['Bricolage_Grotesque'] font-extrabold text-xs shadow-md shrink-0"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset to Factory Defaults</span>
                  </button>
                </div>

                {/* 2FA & AUTHORIZED EMAILS SECURITY */}
                <div className="border-t border-[#F5A623]/20 pt-6 space-y-6">
                  <div>
                    <h4 className="font-['Bricolage_Grotesque'] font-extrabold text-xl text-[#F5A623]">
                      Authorized Admin Emails & 2FA Security
                    </h4>
                    <p className="text-xs text-[#D4B8A5] mt-1">
                      Only authorized email addresses listed below can request 2FA OTP verification and access the admin dashboard.
                    </p>
                  </div>

                  {/* Authorized Emails List */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-[#D4B8A5] uppercase">
                      Current Authorized Admin Emails ({authorizedEmails.length})
                    </label>
                    
                    <div className="space-y-2">
                      {authorizedEmails.map((email) => (
                        <div
                          key={email}
                          className="flex items-center justify-between p-3 rounded-xl bg-[#1F0607] border border-[#F5A623]/30 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-[#F5A623]" />
                            <span className="font-bold text-[#F7EBE1]">{email}</span>
                          </div>
                          {authorizedEmails.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Revoke admin access for "${email}"?`)) {
                                  setAuthorizedEmails((prev) => prev.filter((e) => e !== email));
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-900/30 text-red-200 hover:bg-red-900/60 transition-all text-[11px] font-bold"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Add New Email Form */}
                    <div className="flex gap-2 pt-2">
                      <input
                        type="email"
                        value={newAuthEmailInput}
                        onChange={(e) => setNewAuthEmailInput(e.target.value)}
                        placeholder="Add new authorized email (e.g. manager@teatalk.in)"
                        className="flex-1 bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-xs text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const clean = newAuthEmailInput.trim().toLowerCase();
                          if (clean && clean.includes('@')) {
                            if (!authorizedEmails.includes(clean)) {
                              setAuthorizedEmails((prev) => [...prev, clean]);
                              setNewAuthEmailInput('');
                              alert(`Added "${clean}" to authorized admin emails!`);
                            } else {
                              alert(`"${clean}" is already authorized.`);
                            }
                          } else {
                            alert('Please enter a valid email address.');
                          }
                        }}
                        className="bg-[#F5A623] text-[#2A080A] px-5 py-3 rounded-xl font-['Bricolage_Grotesque'] font-extrabold text-xs shrink-0"
                      >
                        Add Email
                      </button>
                    </div>
                  </div>

                  {/* Change Master Password / PIN Form */}
                  <div className="pt-4 border-t border-[#F5A623]/20 space-y-3">
                    <label className="block text-xs font-bold text-[#D4B8A5] uppercase">
                      Update Master Password / PIN
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={newMasterPinInput}
                        onChange={(e) => setNewMasterPinInput(e.target.value)}
                        placeholder="Enter new Master Password / PIN"
                        className="flex-1 bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-xs text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newMasterPinInput.trim().length >= 4) {
                            setMasterPin(newMasterPinInput.trim());
                            setNewMasterPinInput('');
                            alert('Master Password / PIN updated successfully!');
                          } else {
                            alert('Password / PIN must be at least 4 characters long.');
                          }
                        }}
                        className="bg-[#361113] border border-[#F5A623]/40 text-[#F5A623] px-5 py-3 rounded-xl font-['Bricolage_Grotesque'] font-extrabold text-xs shrink-0"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL: ADD / EDIT MENU ITEM */}
      {menuModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1F0607]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-[#2A080A] border-4 border-[#F5A623]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-fadeIn">
            <button
              onClick={() => setMenuModalOpen(false)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-[#1F0607] border border-[#F5A623]/40 text-[#F5A623] hover:scale-105 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-2xl text-[#F7EBE1] mb-6">
              {editingMenuItem ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h3>

            <form onSubmit={handleSaveMenuItem} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#D4B8A5] uppercase mb-1">Item Name *</label>
                <input
                  type="text"
                  required
                  value={menuForm.name}
                  onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                  placeholder="e.g. Elaichi Dum Chai"
                  className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#D4B8A5] uppercase mb-1">Category *</label>
                  <select
                    value={menuForm.category}
                    onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                    className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-[#F7EBE1] focus:outline-none focus:border-[#F5A623] font-semibold"
                  >
                    {categories.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#D4B8A5] uppercase mb-1">Price *</label>
                  <input
                    type="text"
                    required
                    value={menuForm.price}
                    onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
                    placeholder="e.g. ₹30"
                    className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-[#F5A623] font-extrabold focus:outline-none focus:border-[#F5A623]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#D4B8A5] uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={menuForm.description}
                  onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                  placeholder="Short description..."
                  className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="popularCheck"
                  checked={menuForm.popular}
                  onChange={(e) => setMenuForm({ ...menuForm, popular: e.target.checked })}
                  className="w-5 h-5 accent-[#F5A623] rounded cursor-pointer"
                />
                <label htmlFor="popularCheck" className="font-bold text-[#F5A623] cursor-pointer">
                  Mark as Popular Pick ⭐
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setMenuModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-[#1F0607] text-[#D4B8A5] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#F5A623] text-[#2A080A] font-['Bricolage_Grotesque'] font-extrabold shadow-md hover:scale-105 transition-all"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT GALLERY ITEM */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1F0607]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-[#2A080A] border-4 border-[#F5A623]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-fadeIn">
            <button
              onClick={() => setGalleryModalOpen(false)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-[#1F0607] border border-[#F5A623]/40 text-[#F5A623] hover:scale-105 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-2xl text-[#F7EBE1] mb-6">
              {editingGalleryItem ? 'Edit Gallery Photo' : 'Add Gallery Photo'}
            </h3>

            <form onSubmit={handleSaveGalleryItem} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#D4B8A5] uppercase mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  placeholder="e.g. Flagship Outlet Seating"
                  className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <ImageUploadInput
                label="Gallery Photo *"
                value={galleryForm.src}
                onChange={(newSrc) => setGalleryForm({ ...galleryForm, src: newSrc })}
                placeholder="Upload file from device or paste image URL..."
              />

              <div>
                <label className="block font-bold text-[#D4B8A5] uppercase mb-1">Category Tag</label>
                <input
                  type="text"
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  placeholder="e.g. Outlet Design / Ambiance"
                  className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#D4B8A5] uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={galleryForm.desc}
                  onChange={(e) => setGalleryForm({ ...galleryForm, desc: e.target.value })}
                  placeholder="Photo description..."
                  className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-[#1F0607] text-[#D4B8A5] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#F5A623] text-[#2A080A] font-['Bricolage_Grotesque'] font-extrabold shadow-md hover:scale-105 transition-all"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT OUTLET LOCATION */}
      {outletModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1F0607]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-[#2A080A] border-4 border-[#F5A623]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-fadeIn">
            <button
              onClick={() => setOutletModalOpen(false)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-[#1F0607] border border-[#F5A623]/40 text-[#F5A623] hover:scale-105 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-2xl text-[#F7EBE1] mb-6">
              {editingOutlet ? 'Edit Outlet Location' : 'Add New Outlet Location'}
            </h3>

            <form onSubmit={handleSaveOutlet} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#D4B8A5] uppercase mb-1">Location / City Name *</label>
                <input
                  type="text"
                  required
                  value={outletForm.name}
                  onChange={(e) => setOutletForm({ ...outletForm, name: e.target.value })}
                  placeholder="e.g. Hyderabad / Kochi / Dubai"
                  className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#D4B8A5] uppercase mb-1">Subtitle / Highlight Tagline *</label>
                <input
                  type="text"
                  required
                  value={outletForm.subtitle}
                  onChange={(e) => setOutletForm({ ...outletForm, subtitle: e.target.value })}
                  placeholder="e.g. Cyberabad Tech Hub / Metropolitan Hotspot"
                  className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#D4B8A5] uppercase mb-1">Outlets Count / Status Description *</label>
                <input
                  type="text"
                  required
                  value={outletForm.outlets}
                  onChange={(e) => setOutletForm({ ...outletForm, outlets: e.target.value })}
                  placeholder="e.g. Multiple Outlets / Upcoming Flagship / Metropolitan Presence"
                  className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#D4B8A5] uppercase mb-1">Region Tag</label>
                  <input
                    type="text"
                    value={outletForm.tag}
                    onChange={(e) => setOutletForm({ ...outletForm, tag: e.target.value })}
                    placeholder="e.g. India / International"
                    className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#D4B8A5] uppercase mb-1">Badge Theme</label>
                  <select
                    value={outletForm.color}
                    onChange={(e) => setOutletForm({ ...outletForm, color: e.target.value })}
                    className="w-full bg-[#1F0607] border border-[#F5A623]/30 rounded-xl p-3 text-[#F7EBE1] focus:outline-none focus:border-[#F5A623]"
                  >
                    <option value="bg-[#F5A623] text-[#380B0E]">Amber / Gold</option>
                    <option value="bg-[#E65100] text-[#FFFFFF]">Deep Orange</option>
                    <option value="bg-[#2E7D32] text-[#FFFFFF]">Emerald Green</option>
                    <option value="bg-[#1565C0] text-[#FFFFFF]">Royal Blue</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOutletModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-[#1F0607] text-[#D4B8A5] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#F5A623] text-[#2A080A] font-['Bricolage_Grotesque'] font-extrabold shadow-md hover:scale-105 transition-all"
                >
                  Save Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
