import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Landmark, Sun, Moon, User, Lock, Settings, LogOut, Map } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { getEarnedStamps, getStampMotif } from '../utils/passport.js';
import { siteData } from '../data/siteData.js';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Profile dropdown and modal states
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRefMobile = useRef(null);

  // Retrieve earned stamps dynamically
  const earnedStamps = getEarnedStamps();

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      const clickedDesktop = dropdownRef.current && dropdownRef.current.contains(e.target);
      const clickedMobile = dropdownRefMobile.current && dropdownRefMobile.current.contains(e.target);
      if (!clickedDesktop && !clickedMobile) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showDropdown]);


  // Prevent background scroll when modal is active
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Sites', path: '/explore' },
    { name: 'AI Recommender', path: '/recommend' },
    { name: 'About', path: '/about' }
  ];

  // Calculations for Passport stats
  const sitesVisited = earnedStamps.length;
  const provincesExplored = new Set(earnedStamps.map(s => s.province)).size;
  const unescoSites = earnedStamps.filter(s => s.unescoListed).length;

  return (
    <header className={`${isHome ? 'fixed' : 'sticky'} top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2 select-none pointer-events-none`}>
      <div className={`max-w-7xl mx-auto w-full pointer-events-auto bg-white/30 dark:bg-[#23282D]/55 backdrop-blur-xl border border-white/30 dark:border-[#3D494F]/40 shadow-lg hover:shadow-xl transition-all duration-300 ${isOpen ? 'rounded-3xl' : 'rounded-full'}`}>
        <div className="px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-[#1D9E75] flex items-center justify-center">
              <Landmark className="w-5 h-5 text-[#EDE9DF]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl text-[#1A1E21] dark:text-[#EDE9DF] leading-none tracking-tight">
                HeritageAI
              </span>
              <span className="text-[10px] font-sans text-[#6B6560] dark:text-[#C8B89A] mt-0.5" style={{fontWeight: 500, letterSpacing: '0.08em'}}>
                PAKISTAN
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-sans transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#1D9E75] border-b-2 border-[#1D9E75] pb-1'
                      : 'text-[#1A1E21] dark:text-[#EDE9DF] hover:text-[#1D9E75]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right: Theme Toggle + Profile + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2.5 rounded-full hover:bg-[#3D494F]/30 dark:hover:bg-[#3D494F]/60 text-[#1A1E21] dark:text-[#EDE9DF] transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark'
                ? <Moon className="w-5 h-5 text-[#C8B89A]" />
                : <Sun className="w-5 h-5 text-[#6B6560]" />
              }
            </button>

            {/* PROFILE ICON & DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-[36px] h-[36px] rounded-full bg-[#23282D] border-[1.5px] border-[#3D494F] flex items-center justify-center cursor-pointer hover:border-[#1D9E75] group transition-all duration-200"
                title="Profile Menu"
              >
                <User className="w-[18px] h-[18px] text-[#C8B89A] group-hover:text-[#EDE9DF] transition-colors duration-200" />
              </button>

              {/* PROFILE DROPDOWN PANEL */}
              {showDropdown && (
                <div className="absolute right-0 mt-3.5 w-[280px] bg-[#23282D] border-[0.5px] border-[#3D494F] rounded-[16px] p-[20px] shadow-[0_16px_48px_rgba(0,0,0,0.4)] z-50 text-left">
                  {/* Top section */}
                  <div className="flex items-center gap-3">
                    <div className="w-[52px] h-[52px] rounded-full border-2 border-[#1D9E75] bg-[#3D494F]/40 flex items-center justify-center">
                      <User className="w-[24px] h-[24px] text-[#1D9E75]" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-[15px] text-[#EDE9DF] leading-tight">Muhammad Maizun</h4>
                      <p className="text-[12px] font-sans text-[#C8B89A] italic font-light mt-0.5">Heritage Explorer</p>
                    </div>
                  </div>

                  <div style={{ margin: '16px 0', backgroundColor: '#3D494F', height: '1px' }} />

                  {/* Passport Preview strip */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-sans uppercase text-[#1D9E75] tracking-[0.12em] block font-medium">
                      HERITAGE PASSPORT
                    </span>

                    {earnedStamps.length > 0 ? (
                      <div className="flex gap-2.5 flex-wrap">
                        {earnedStamps.slice(-3).map((stamp) => (
                          <div
                            key={stamp.siteId}
                            className="w-[32px] h-[32px] rounded-full bg-[#141618] border border-[#1D9E75] flex items-center justify-center text-[15px] shadow-inner"
                            title={stamp.siteName}
                          >
                            {stamp.emoji}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[12px] font-sans text-[#C8B89A] italic font-light">
                        No sites visited yet
                      </p>
                    )}

                    <button
                      onClick={() => {
                        setShowModal(true);
                        setShowDropdown(false);
                      }}
                      className="text-[13px] font-sans font-medium text-[#1D9E75] hover:text-[#1D9E75]/80 transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none mt-2 w-full text-left"
                    >
                      View Full Passport →
                    </button>
                  </div>

                  <div style={{ margin: '16px 0', backgroundColor: '#3D494F', height: '1px' }} />

                  {/* Menu Items */}
                  <div className="flex flex-col gap-1 w-full">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setShowDropdown(false);
                      }}
                      className="flex items-center gap-3 px-[8px] py-[10px] rounded-[10px] text-[14px] font-sans font-normal text-[#C8B89A] hover:bg-[#141618] hover:text-[#EDE9DF] transition-all cursor-pointer text-left w-full border-none bg-transparent"
                    >
                      <Landmark className="w-[16px] h-[16px] text-[#1D9E75]" />
                      <span>My Heritage Passport</span>
                    </button>

                    <button
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-[8px] py-[10px] rounded-[10px] text-[14px] font-sans font-normal text-[#C8B89A] hover:bg-[#141618] hover:text-[#EDE9DF] transition-all cursor-pointer text-left w-full border-none bg-transparent"
                    >
                      <Map className="w-[16px] h-[16px] text-[#1D9E75]" />
                      <span>My Booked Tours</span>
                    </button>

                    <button
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-[8px] py-[10px] rounded-[10px] text-[14px] font-sans font-normal text-[#C8B89A] hover:bg-[#141618] hover:text-[#EDE9DF] transition-all cursor-pointer text-left w-full border-none bg-transparent"
                    >
                      <Settings className="w-[16px] h-[16px] text-[#1D9E75]" />
                      <span>Preferences</span>
                    </button>

                    <button
                      onClick={() => {
                        localStorage.removeItem('heritage_passport_stamps');
                        setShowDropdown(false);
                        window.location.reload();
                      }}
                      className="flex items-center gap-3 px-[8px] py-[10px] rounded-[10px] text-[14px] font-sans font-normal text-[#C8B89A] hover:bg-[#141618] hover:text-[#EDE9DF] transition-all cursor-pointer text-left w-full border-none bg-transparent"
                    >
                      <LogOut className="w-[16px] h-[16px] text-[#1D9E75]" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/explore"
              className="px-6 py-2.5 rounded-full bg-[#1D9E75] hover:bg-[#1D9E75]/85 text-[#EDE9DF] font-sans text-sm shadow-md transition-all duration-300 active:scale-95 block hover:shadow-lg"
              style={{fontWeight: 500}}
            >
              Book a Tour
            </Link>
          </div>

          {/* Mobile Right Actions (Profile + Mobile Menu Toggle) */}
          <div className="flex md:hidden items-center gap-3">
            {/* PROFILE ICON & DROPDOWN FOR MOBILE */}
            <div className="relative" ref={dropdownRefMobile}>
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-[36px] h-[36px] rounded-full bg-[#23282D] border-[1.5px] border-[#3D494F] flex items-center justify-center cursor-pointer hover:border-[#1D9E75] group transition-all duration-200"
                title="Profile Menu"
              >
                <User className="w-[18px] h-[18px] text-[#C8B89A] group-hover:text-[#EDE9DF] transition-colors duration-200" />
              </button>

              {/* PROFILE DROPDOWN PANEL FOR MOBILE */}
              {showDropdown && (
                <div className="absolute right-0 mt-3.5 w-[280px] bg-[#23282D] border-[0.5px] border-[#3D494F] rounded-[16px] p-[20px] shadow-[0_16px_48px_rgba(0,0,0,0.4)] z-50 text-left">
                  {/* Top section */}
                  <div className="flex items-center gap-3">
                    <div className="w-[52px] h-[52px] rounded-full border-2 border-[#1D9E75] bg-[#3D494F]/40 flex items-center justify-center">
                      <User className="w-[24px] h-[24px] text-[#1D9E75]" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-[15px] text-[#EDE9DF] leading-tight">Muhammad Maizun</h4>
                      <p className="text-[12px] font-sans text-[#C8B89A] italic font-light mt-0.5">Heritage Explorer</p>
                    </div>
                  </div>

                  <div style={{ margin: '16px 0', backgroundColor: '#3D494F', height: '1px' }} />

                  {/* Passport Preview strip */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-sans uppercase text-[#1D9E75] tracking-[0.12em] block font-medium">
                      HERITAGE PASSPORT
                    </span>

                    {earnedStamps.length > 0 ? (
                      <div className="flex gap-2.5 flex-wrap">
                        {earnedStamps.slice(-3).map((stamp) => (
                          <div
                            key={stamp.siteId}
                            className="w-[32px] h-[32px] rounded-full bg-[#141618] border border-[#1D9E75] flex items-center justify-center text-[15px] shadow-inner"
                            title={stamp.siteName}
                          >
                            {stamp.emoji}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[12px] font-sans text-[#C8B89A] italic font-light">
                        No sites visited yet
                      </p>
                    )}

                    <button
                      onClick={() => {
                        setShowModal(true);
                        setShowDropdown(false);
                      }}
                      className="text-[13px] font-sans font-medium text-[#1D9E75] hover:text-[#1D9E75]/80 transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none mt-2 w-full text-left"
                    >
                      View Full Passport →
                    </button>
                  </div>

                  <div style={{ margin: '16px 0', backgroundColor: '#3D494F', height: '1px' }} />

                  {/* Menu Items */}
                  <div className="flex flex-col gap-1 w-full">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setShowDropdown(false);
                      }}
                      className="flex items-center gap-3 px-[8px] py-[10px] rounded-[10px] text-[14px] font-sans font-normal text-[#C8B89A] hover:bg-[#141618] hover:text-[#EDE9DF] transition-all cursor-pointer text-left w-full border-none bg-transparent"
                    >
                      <Landmark className="w-[16px] h-[16px] text-[#1D9E75]" />
                      <span>My Heritage Passport</span>
                    </button>

                    <button
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-[8px] py-[10px] rounded-[10px] text-[14px] font-sans font-normal text-[#C8B89A] hover:bg-[#141618] hover:text-[#EDE9DF] transition-all cursor-pointer text-left w-full border-none bg-transparent"
                    >
                      <Map className="w-[16px] h-[16px] text-[#1D9E75]" />
                      <span>My Booked Tours</span>
                    </button>

                    <button
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-[8px] py-[10px] rounded-[10px] text-[14px] font-sans font-normal text-[#C8B89A] hover:bg-[#141618] hover:text-[#EDE9DF] transition-all cursor-pointer text-left w-full border-none bg-transparent"
                    >
                      <Settings className="w-[16px] h-[16px] text-[#1D9E75]" />
                      <span>Preferences</span>
                    </button>

                    <button
                      onClick={() => {
                        localStorage.removeItem('heritage_passport_stamps');
                        setShowDropdown(false);
                        window.location.reload();
                      }}
                      className="flex items-center gap-3 px-[8px] py-[10px] rounded-[10px] text-[14px] font-sans font-normal text-[#C8B89A] hover:bg-[#141618] hover:text-[#EDE9DF] transition-all cursor-pointer text-left w-full border-none bg-transparent"
                    >
                      <LogOut className="w-[16px] h-[16px] text-[#1D9E75]" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="p-2 text-[#1A1E21] dark:text-[#EDE9DF] hover:text-[#1D9E75] rounded-lg transition-all cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-[#3D494F] px-6 pb-6 pt-4 flex flex-col gap-3 rounded-b-3xl">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-sans py-2 px-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#1D9E75]/15 text-[#1D9E75]'
                      : 'text-[#1A1E21] dark:text-[#EDE9DF] hover:bg-[#3D494F]/20 dark:hover:bg-[#3D494F]/50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Mobile Theme Toggle */}
            <div className="border-t border-[#3D494F] pt-3 mt-1 flex items-center justify-between">
              <span className="text-xs font-sans text-[#6B6560] dark:text-[#C8B89A]" style={{fontWeight: 500}}>Appearance</span>
              <button
                onClick={toggleTheme}
                type="button"
                className="p-2 rounded-full bg-[#3D494F]/20 dark:bg-[#3D494F]/40 text-[#1A1E21] dark:text-[#EDE9DF] transition-colors cursor-pointer"
              >
                {theme === 'dark'
                  ? <Moon className="w-5 h-5 text-[#C8B89A]" />
                  : <Sun className="w-5 h-5 text-[#6B6560]" />
                }
              </button>
            </div>

            <div className="border-t border-[#3D494F] pt-3 mt-1">
              <Link
                to="/explore"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-full bg-[#1D9E75] text-[#EDE9DF] font-sans text-sm text-center shadow-md block"
                style={{fontWeight: 500}}
              >
                Book a Tour
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ── HERITAGE PASSPORT — FULL MODAL ── */}
      {showModal && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 backdrop-blur-[4px] p-4 overflow-y-auto pointer-events-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          {/* Modal Container */}
          <div className="relative w-full h-full md:h-auto max-h-none md:max-h-[88vh] max-w-none md:max-w-[760px] bg-[#141618] border-none md:border border-none md:border-[#3D494F]/60 rounded-none md:rounded-[24px] p-6 md:p-[48px] shadow-2xl overflow-y-scroll no-scrollbar flex flex-col justify-between select-none">
            
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-3xl text-[#C8B89A] hover:text-[#EDE9DF] transition-colors cursor-pointer font-sans bg-transparent border-none outline-none leading-none"
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Modal Content */}
            <div className="w-full flex flex-col items-center">
              
              {/* Modal Header */}
              <div className="text-center flex flex-col items-center">
                <Landmark className="w-[28px] h-[28px] text-[#1D9E75]" />
                <h2 className="font-serif font-bold text-[32px] text-[#EDE9DF] mt-[12px] leading-tight">
                  Heritage Passport
                </h2>
                <p className="text-[13px] font-sans text-[#C8B89A] italic mt-1.5 font-light">
                  Muhammad Maizun · University of Sahiwal · 2026
                </p>
                {/* Thin decorative line */}
                <div style={{ width: '48px', height: '1px', backgroundColor: '#1D9E75', margin: '16px auto' }} />
              </div>

              {/* Passport Stats Row */}
              <div className="flex justify-center items-center gap-8 py-5 border-b border-[#3D494F]/20 max-w-md mx-auto w-full">
                <div className="text-center">
                  <div className="font-serif font-bold text-[28px] text-[#EDE9DF] leading-none">
                    {sitesVisited}
                  </div>
                  <div className="font-sans text-[12px] text-[#C8B89A] font-light mt-1">
                    Sites Visited
                  </div>
                </div>
                <div className="w-[1px] h-8 bg-[#3D494F]/40" />
                <div className="text-center">
                  <div className="font-serif font-bold text-[28px] text-[#EDE9DF] leading-none">
                    {provincesExplored}
                  </div>
                  <div className="font-sans text-[12px] text-[#C8B89A] font-light mt-1">
                    Provinces Explored
                  </div>
                </div>
                <div className="w-[1px] h-8 bg-[#3D494F]/40" />
                <div className="text-center">
                  <div className="font-serif font-bold text-[28px] text-[#EDE9DF] leading-none">
                    {unescoSites}
                  </div>
                  <div className="font-sans text-[12px] text-[#C8B89A] font-light mt-1">
                    UNESCO Sites
                  </div>
                </div>
              </div>

              {/* Passport Stamps Grid */}
              <div className="w-full mt-10">
                <span className="text-[11px] font-sans tracking-[0.12em] text-[#1D9E75] uppercase block mb-[24px] font-medium text-left">
                  YOUR STAMPS
                </span>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px]">
                  {siteData.map((site) => {
                    const stamp = earnedStamps.find(s => s.siteId === site.id);
                    const isEarned = !!stamp;
                    const motif = getStampMotif(site.civilizationEra, site.siteType);

                    if (isEarned) {
                      return (
                        <div
                          key={site.id}
                          className="bg-[#23282D] border-[0.5px] border-[#3D494F] rounded-[16px] p-[20px] flex flex-col items-center justify-center text-center relative aspect-square"
                          style={{ boxShadow: '0 0 20px rgba(29,158,117,0.15)' }}
                        >
                          <div 
                            className="w-[72px] h-[72px] rounded-full border-2 border-[#1D9E75] flex items-center justify-center text-[28px] shadow-md mx-auto"
                            style={{ background: 'linear-gradient(135deg, #1a3a30, #0f2420)' }}
                          >
                            {stamp.emoji || motif.emoji}
                          </div>
                          <h4 className="font-serif font-bold text-[13px] text-[#EDE9DF] mt-[12px] leading-tight truncate w-full">
                            {site.name}
                          </h4>
                          <span className="text-[10px] font-sans font-medium text-[#1D9E75] uppercase mt-1 tracking-wider">
                            {site.province}
                          </span>
                          <span className="text-[11px] font-sans text-[#C8B89A] italic font-light mt-0.5">
                            {stamp.dateEarned}
                          </span>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={site.id}
                          className="bg-[#23282D] border-[0.5px] border-[#3D494F]/40 rounded-[16px] p-[20px] flex flex-col items-center justify-center text-center opacity-45 relative aspect-square select-none group"
                        >
                          <div className="w-[72px] h-[72px] rounded-full bg-[#1e2428] border border-[#3D494F] flex items-center justify-center mx-auto">
                            <Lock className="w-[24px] h-[24px] text-[#3D494F]" />
                          </div>
                          <h4 className="font-serif font-bold text-[13px] text-[#3D494F] mt-[12px] leading-tight truncate w-full">
                            {site.name}
                          </h4>
                          <span className="text-[10px] font-sans font-medium text-[#3D494F] uppercase mt-1 tracking-wider">
                            {site.province}
                          </span>

                          {/* Minimal hover tooltip */}
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-[#141618] border border-[#3D494F] text-[#C8B89A] text-[10px] font-sans font-light italic px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10 shadow-lg">
                            Visit this site to unlock
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </header>
  );
}
