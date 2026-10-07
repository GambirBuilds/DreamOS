/**
 * DreamOS Interactive Dream Map
 * Visual interactive map of interconnected subconscious locations with constellation connections.
 */

import React, { useState } from 'react';
import { MapPin, Compass, Sparkles, Key, Eye, ArrowRight, X } from 'lucide-react';

export default function DreamMap({
  locations = [],
  currentLocationId,
  onSelectLocation,
  onEnterExplorationMode
}) {
  const [activeLocation, setActiveLocation] = useState(
    locations.find((l) => l.id === currentLocationId) || locations[0] || null
  );

  const handleNodeClick = (loc) => {
    setActiveLocation(loc);
    if (onSelectLocation) onSelectLocation(loc);
  };

  if (!locations || locations.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400">
        No map coordinates generated for this dream realm.
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-[#070914] shadow-2xl">
      {/* Top Map Header */}
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between bg-slate-950/40">
        <div>
          <h3 className="text-sm font-semibold text-white font-display flex items-center gap-2">
            <Compass className="w-4 h-4 text-violet-400" />
            <span>Interactive Dream Cartography</span>
          </h3>
          <p className="text-xs text-slate-400">
            Click any beacon to uncover hidden memories, dream artifacts, and connected trails.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onEnterExplorationMode && onEnterExplorationMode(activeLocation)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors whitespace-nowrap shadow-sm"
        >
          <span>Explore Selected</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Map Viewport */}
      <div className="relative w-full h-[460px] sm:h-[520px] bg-radial from-violet-950/20 via-slate-950/80 to-[#04060d] overflow-hidden select-none">
        {/* Subtle coordinate grid lines */}
        <div 
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #a78bfa 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Constellation SVG Lines connecting locations */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <linearGradient id="mapLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--dream-primary)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--dream-secondary)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {locations.map((loc) => {
            if (!loc.connectedLocations) return null;
            return loc.connectedLocations.map((targetId) => {
              const target = locations.find((l) => l.id === targetId);
              if (!target) return null;
              return (
                <line
                  key={`${loc.id}-${target.id}`}
                  x1={`${loc.x}%`}
                  y1={`${loc.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="url(#mapLineGrad)"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  className="transition-all duration-300"
                />
              );
            });
          })}
        </svg>

        {/* Location Beacon Nodes */}
        {locations.map((loc) => {
          const isSelected = activeLocation?.id === loc.id;
          return (
            <div
              key={loc.id}
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                type="button"
                onClick={() => handleNodeClick(loc)}
                className="group relative flex flex-col items-center focus:outline-none"
                aria-label={`View ${loc.name}`}
              >
                {/* Glowing beacon aura with dream colors */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'scale-125'
                      : 'bg-slate-900/80 ring-1 ring-white/20 hover:scale-110 hover:ring-white/40'
                  }`}
                  style={isSelected ? {
                    backgroundColor: 'rgba(15, 12, 34, 0.85)',
                    border: '2px solid var(--dream-primary)',
                    boxShadow: '0 0 24px var(--dream-glow)'
                  } : {}}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full transition-colors ${
                      isSelected
                        ? 'shadow-[0_0_10px_#fff]'
                        : 'bg-slate-400 group-hover:bg-white'
                    }`}
                    style={isSelected ? { backgroundColor: 'var(--dream-primary)' } : {}}
                  />
                </div>

                {/* Node Label */}
                <span
                  className={`mt-1.5 px-2 py-0.5 text-[11px] font-medium rounded whitespace-nowrap transition-colors pointer-events-none ${
                    isSelected
                      ? 'text-white bg-slate-900/90 border shadow-sm font-semibold'
                      : 'text-slate-300 bg-slate-950/70 border border-white/10 group-hover:text-white'
                  }`}
                  style={isSelected ? { borderColor: 'var(--dream-primary)' } : {}}
                >
                  {loc.name}
                </span>
              </button>
            </div>
          );
        })}

        {/* Bottom Drawer Overlay for Active Location Detail */}
        {activeLocation && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 sm:max-w-xl z-30 bg-slate-900/95 border border-white/10 backdrop-blur-xl rounded-xl p-5 shadow-2xl transition-all">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-violet-400 font-mono-tabular">
                  {activeLocation.atmosphere}
                </span>
                <h4 className="text-base font-bold text-white font-display">
                  {activeLocation.name}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveLocation(null)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
              {activeLocation.description}
            </p>

            {/* Hidden Meaning & Objects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-white/[0.06] mb-3">
              <div>
                <span className="text-slate-400 font-medium block">Hidden Meaning:</span>
                <p className="text-slate-300 leading-snug">{activeLocation.hiddenMeaning}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Dream Artifacts:</span>
                <div className="flex flex-wrap gap-1 mt-0.5 text-slate-300">
                  {activeLocation.dreamObjects?.map((obj) => (
                    <span key={obj} className="text-slate-200">
                      • {obj}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400">
                {activeLocation.connectedLocations?.length || 0} Connected Paths
              </span>
              <button
                type="button"
                onClick={() => onEnterExplorationMode && onEnterExplorationMode(activeLocation)}
                className="px-3.5 py-1.5 text-xs font-semibold text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-md"
                style={{
                  background: 'linear-gradient(135deg, var(--dream-primary), var(--dream-secondary))',
                  boxShadow: '0 4px 14px -3px var(--dream-glow)'
                }}
              >
                <span>Enter Exploration Mode</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
