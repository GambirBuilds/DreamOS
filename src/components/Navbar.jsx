/**
 * DreamOS Top Navigation Bar
 * Implements strict 3-zone Top Bar Contract from Universal Frontend Design Constitution.
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, Compass } from 'lucide-react';
import DreamSpectrumPicker from './DreamSpectrumPicker.jsx';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Explore', path: '/' },
    { label: 'Create', path: '/create' },
    { label: 'Journal', path: '/journal' },
    { label: 'Constellation', path: '/constellation' },
    { label: 'Games', path: '/games' },
    { label: 'Codex', path: '/lexicon' },
    { label: 'Insights', path: '/insights' },
    { label: 'About', path: '/about' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050711]/85 backdrop-blur-md border-b border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single Wordmark Element */}
        <Link 
          to="/" 
          className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display hover:text-white transition-colors flex items-center gap-2 group"
        >
          <span 
            className="w-2.5 h-2.5 rounded-full transition-all duration-500" 
            style={{ 
              backgroundColor: 'var(--dream-primary)',
              boxShadow: '0 0 14px var(--dream-primary)'
            }} 
          />
          <span className="group-hover:opacity-90">DreamOS</span>
        </Link>

        {/* Zone 2: 4-6 Clean Text Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors whitespace-nowrap relative py-1 ${
                  active 
                    ? 'text-white font-semibold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
                {active && (
                  <span 
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300"
                    style={{ backgroundColor: 'var(--dream-primary)' }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions + Dream Spectrum Picker */}
        <div className="flex items-center gap-3">
          <DreamSpectrumPicker />

          <Link
            to="/create"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white rounded-lg shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            style={{
              background: 'linear-gradient(135deg, var(--dream-primary), var(--dream-secondary))',
              boxShadow: '0 4px 18px -4px var(--dream-glow)'
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enter Dream</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070a18] border-b border-white/[0.08] px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? 'bg-slate-900 text-white font-semibold border'
                  : 'text-slate-300 hover:bg-slate-900/50 hover:text-white'
              }`}
              style={isActive(item.path) ? { borderColor: 'var(--dream-border)' } : {}}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              to="/create"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white rounded-lg transition-colors"
              style={{
                background: 'linear-gradient(135deg, var(--dream-primary), var(--dream-secondary))'
              }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Enter Dream</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
