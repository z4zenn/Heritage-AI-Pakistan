import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Landmark, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Sites', path: '/explore' },
    { name: 'AI Recommender', path: '/recommend' },
    { name: 'About', path: '/about' }
  ];

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

          {/* Desktop Right: Theme Toggle + CTA */}
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
            <Link
              to="/explore"
              className="px-6 py-2.5 rounded-full bg-[#1D9E75] hover:bg-[#1D9E75]/85 text-[#EDE9DF] font-sans text-sm shadow-md transition-all duration-300 active:scale-95 block hover:shadow-lg"
              style={{fontWeight: 500}}
            >
              Book a Tour
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden p-2 text-[#1A1E21] dark:text-[#EDE9DF] hover:text-[#1D9E75] rounded-lg transition-all cursor-pointer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
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
    </header>
  );
}
