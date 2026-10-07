/**
 * DreamOS Share Modal Component
 * Shareable dream card preview with Web Share API and clipboard fallbacks.
 */

import React, { useState } from 'react';
import { X, Copy, Check, Share2, Sparkles } from 'lucide-react';
import { copyToClipboard, shareDreamSummary, truncateText } from '../utils/helpers.js';

export default function DreamShareModal({ dream, onClose }) {
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  if (!dream) return null;

  const handleCopy = async () => {
    const text = `DreamOS: ${dream.title}\nMood: ${dream.mood} · Intensity: ${dream.intensity}/10\nTheme: ${dream.analysis?.themes?.[0] || 'Imagination'}\n“${truncateText(dream.description, 160)}”\nTurn your dreams into worlds at DreamOS.`;
    const res = await copyToClipboard(text);
    if (res.success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleShare = async () => {
    const res = await shareDreamSummary(dream);
    if (res.success) {
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fade-in">
        
        {/* Modal Close */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <span className="text-xs uppercase tracking-widest text-violet-400 font-semibold font-mono-tabular">
            Share Dream Card
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The Visual Shareable Card */}
        <div className="p-6 rounded-xl bg-gradient-to-b from-slate-950 via-slate-900 to-violet-950/40 border border-violet-500/30 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-widest text-white uppercase font-display">
              DREAMOS
            </span>
            <span className="text-[10px] text-violet-400 font-mono-tabular">
              subconscious portal
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white font-display leading-tight">
              {dream.title}
            </h3>
            
            {/* Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1.5">
              <span className="text-violet-300 font-medium">Mood: {dream.mood}</span>
              <span aria-hidden="true">·</span>
              <span>Intensity: {dream.intensity}/10</span>
              {dream.analysis?.themes?.[0] && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Theme: {dream.analysis.themes[0]}</span>
                </>
              )}
            </div>
          </div>

          <blockquote className="text-xs sm:text-sm text-slate-300 italic border-l-2 border-violet-500/50 pl-3 leading-relaxed">
            “{truncateText(dream.description, 160)}”
          </blockquote>

          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/[0.06]">
            <span>Explore this dream on DreamOS</span>
            <span className="text-violet-400 font-mono-tabular">turn dreams into worlds</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 border border-white/10"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex-1 py-2.5 px-4 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            {shareSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
            <span>{shareSuccess ? 'Shared!' : 'Share Dream'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
