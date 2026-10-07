/**
 * DreamOS Dream Card Component
 * Conforms to Zero-Pill & Metadata Discipline: unboxed metadata with typographic separators.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Compass, Share2, Trash2, Edit3, ArrowRight } from 'lucide-react';
import { formatDate, truncateText, getMoodConfig } from '../utils/helpers.js';

export default function DreamCard({
  dream,
  onShare,
  onDelete,
  onRename
}) {
  const { id, title, date, createdAt, mood, intensity, category, description, analysis, isDemo } = dream;
  const moodConfig = getMoodConfig(mood);
  const moodColor = moodConfig.color || '#a855f7';

  return (
    <div 
      className="relative group bg-slate-900/60 hover:bg-slate-900/90 border border-white/[0.08] rounded-xl p-6 transition-all duration-300 flex flex-col justify-between"
      style={{
        boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${moodColor}66`;
        e.currentTarget.style.boxShadow = `0 10px 30px -10px ${moodConfig.aura || 'rgba(168,85,247,0.3)'}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.boxShadow = '0 4px 20px -5px rgba(0,0,0,0.5)';
      }}
    >
      <div>
        {/* Unboxed Metadata with Typographic Separator */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span className="flex items-center gap-1.5 font-medium" style={{ color: moodColor }}>
            <span 
              className="w-1.5 h-1.5 rounded-full" 
              style={{ 
                backgroundColor: moodColor,
                boxShadow: `0 0 8px ${moodColor}`
              }} 
            />
            <span>{mood}</span>
          </span>
          <span aria-hidden="true">·</span>
          <span>Intensity {intensity}/10</span>
          <span aria-hidden="true">·</span>
          <span>{category}</span>
          {isDemo && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400/90 font-medium">Demo</span>
            </>
          )}
        </div>

        {/* Primary Title */}
        <h3 className="text-lg font-semibold text-white font-display group-hover:text-white transition-colors mb-2">
          <Link to={`/world/${id}`} className="focus:outline-none">
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4">
          “{truncateText(description, 140)}”
        </p>

        {/* Quiet Subconscious Archetype Insight */}
        {analysis?.archetype && (
          <div className="text-xs text-slate-400 mb-4 flex items-center gap-1.5">
            <span className="text-slate-400">Archetype:</span>
            <span className="text-slate-200 font-medium">{analysis.archetype}</span>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
        <span className="text-xs text-slate-400 font-mono-tabular">
          {formatDate(createdAt || date)}
        </span>

        {/* Action Affordances */}
        <div className="flex items-center gap-2">
          {onShare && (
            <button
              type="button"
              onClick={() => onShare(dream)}
              title="Share Dream"
              className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-white/[0.06] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          )}

          {onRename && !isDemo && (
            <button
              type="button"
              onClick={() => onRename(dream)}
              title="Rename Dream"
              className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-white/[0.06] transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          )}

          {onDelete && !isDemo && (
            <button
              type="button"
              onClick={() => onDelete(id)}
              title="Delete Dream"
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-md hover:bg-white/[0.06] transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          <Link
            to={`/world/${id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white rounded-lg transition-all whitespace-nowrap ml-1 hover:brightness-110"
            style={{
              background: `linear-gradient(135deg, ${moodColor}, ${moodConfig.secondaryColor || '#6366f1'})`,
              boxShadow: `0 3px 12px -3px ${moodColor}66`
            }}
          >
            <span>Enter World</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
