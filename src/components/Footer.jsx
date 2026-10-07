/**
 * DreamOS Quiet Footer
 * Uncluttered footer with product vision, navigation links, and health/legal disclaimer.
 */

import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-[#04060d] border-t border-white/[0.06] py-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
            <span className="text-lg font-bold text-white font-display tracking-tight">DreamOS</span>
          </div>
          <p className="text-slate-400 max-w-md leading-relaxed text-xs sm:text-sm">
            Turn Your Dreams Into Worlds. An experimental platform transforming written human dreams into explorable interactive environments, subconscious cartography, and living journals.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Navigation</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/" className="hover:text-slate-200 transition-colors">Home & Showcase</Link></li>
            <li><Link to="/create" className="hover:text-slate-200 transition-colors">Create Dream</Link></li>
            <li><Link to="/journal" className="hover:text-slate-200 transition-colors">Dream Journal</Link></li>
            <li><Link to="/constellation" className="hover:text-slate-200 transition-colors">Dream Constellation</Link></li>
            <li><Link to="/games" className="hover:text-slate-200 transition-colors">Subconscious Games</Link></li>
            <li><Link to="/insights" className="hover:text-slate-200 transition-colors">Dream Insights</Link></li>
            <li><Link to="/about" className="hover:text-slate-200 transition-colors">About & Architecture</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Philosophy</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Designed for mindful reflection, creative exploration, and imaginative immersion. All data is persisted privately within your browser.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>© {new Date().getFullYear()} DreamOS. Crafted with care for explorers of the subconscious.</p>
        <p className="text-center md:text-right max-w-xl text-[11px] leading-relaxed text-slate-400">
          Disclaimer: DreamOS provides creative interpretations for entertainment and self-reflection. It does not provide psychological or medical diagnoses.
        </p>
      </div>
    </footer>
  );
}
