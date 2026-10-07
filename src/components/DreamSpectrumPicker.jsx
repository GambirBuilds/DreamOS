/**
 * DreamOS Dream Spectrum Palette Selector
 * Allows users to easily switch between ethereal dream color spectrums.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sparkles } from 'lucide-react';
import { useDreamColor } from '../context/DreamColorContext.jsx';

export default function DreamSpectrumPicker() {
  const { themes, activeThemeId, selectTheme, activeMoodOverride } = useDreamColor();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = themes.find((t) => t.id === activeThemeId) || themes[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 hover:border-violet-400/40 transition-colors text-xs text-slate-300 hover:text-white"
        title="Change Dream Color Atmosphere"
        aria-label="Dream Color Spectrum"
      >
        {/* Glowing chromatic indicator dot */}
        <span
          className="w-3 h-3 rounded-full shadow-[0_0_8px_var(--dream-primary)] transition-all"
          style={{
            background: `linear-gradient(135deg, var(--dream-primary), var(--dream-secondary))`
          }}
        />
        <span className="hidden sm:inline font-medium">
          {activeMoodOverride ? `${activeMoodOverride} Aura` : current.name}
        </span>
      </button>

      {/* Palette Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 p-2 rounded-xl bg-slate-900/95 border border-white/10 shadow-2xl backdrop-blur-xl z-50 animate-fade-in space-y-1">
          <div className="px-2.5 py-1.5 border-b border-white/[0.06] mb-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold font-mono-tabular">
              Dream Color Spectrum
            </span>
          </div>

          {themes.map((t) => {
            const isSelected = activeThemeId === t.id && !activeMoodOverride;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  selectTheme(t.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors ${
                  isSelected
                    ? 'bg-violet-950/60 text-white font-medium border border-violet-500/30'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`
                    }}
                  />
                  <div className="text-left">
                    <span className="block leading-tight">{t.name}</span>
                    <span className="text-[10px] text-slate-400 block">{t.tag}</span>
                  </div>
                </div>

                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
