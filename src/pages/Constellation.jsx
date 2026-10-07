/**
 * DreamOS Dream Constellation Page
 * Interactive starry cosmic galaxy mapping saved dreams as glowing celestial nodes.
 * Lines connect dreams with shared moods, categories, or recurring themes.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Compass, MapPin, Layers, Info, ArrowRight } from 'lucide-react';
import { storageService } from '../services/storageService.js';
import { DREAM_MOODS } from '../utils/constants.js';
import { getMoodConfig } from '../utils/helpers.js';

export default function Constellation() {
  const navigate = useNavigate();
  const [dreams, setDreams] = useState([]);
  const [selectedMood, setSelectedMood] = useState('All');
  const [activeDream, setActiveDream] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setDreams(storageService.getDreams());
  }, []);

  // Filter dreams by mood
  const visibleDreams = dreams.filter(
    (d) => selectedMood === 'All' || d.mood === selectedMood
  );

  // Generate deterministic cosmic coordinates for each dream in the constellation
  const dreamNodes = visibleDreams.map((d, idx) => {
    // Generate pseudo-random, organic positions based on ID hash
    const hash = d.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const angle = (idx / Math.max(1, visibleDreams.length)) * Math.PI * 2 + (hash % 10) * 0.1;
    const radius = 28 + ((hash % 17) / 17) * 44; // 28% to 72% from center

    const x = Math.min(88, Math.max(12, 50 + Math.cos(angle) * (radius * 0.8)));
    const y = Math.min(88, Math.max(14, 50 + Math.sin(angle) * (radius * 0.7)));

    return {
      ...d,
      coordX: x,
      coordY: y
    };
  });

  // Calculate constellation connections (if dreams share mood or theme)
  const connections = [];
  for (let i = 0; i < dreamNodes.length; i++) {
    for (let j = i + 1; j < dreamNodes.length; j++) {
      const a = dreamNodes[i];
      const b = dreamNodes[j];
      const shareMood = a.mood === b.mood;
      const shareCategory = a.category === b.category;
      const shareThemes = a.analysis?.themes?.some((t) => b.analysis?.themes?.includes(t));

      if (shareMood || shareCategory || shareThemes) {
        connections.push({
          from: a,
          to: b,
          shared: shareMood ? 'Mood' : shareCategory ? 'Category' : 'Theme'
        });
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold font-mono-tabular">
            Cosmic Cartography
          </span>
          <h1 className="text-3xl font-bold text-white font-display mt-1">
            Dream Constellation
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Every recorded dream is a living celestial node. Constellation filaments trace shared themes and emotions.
          </p>
        </div>

        {/* Mood Filter Pill Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          <button
            type="button"
            onClick={() => setSelectedMood('All')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedMood === 'All'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            All Cosmic Nodes
          </button>
          {DREAM_MOODS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedMood(m.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedMood === m.id
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Constellation Canvas */}
      <div
        ref={containerRef}
        className="relative w-full h-[540px] sm:h-[640px] rounded-3xl bg-radial from-[#100d28]/70 via-[#070914] to-[#030408] border border-white/[0.08] overflow-hidden select-none shadow-2xl"
      >
        {/* Ambient Starlight Dots */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 20px 30px, #e2e8f0, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 150px 180px, #a78bfa, rgba(0,0,0,0)), radial-gradient(1px 1px at 280px 420px, #38bdf8, rgba(0,0,0,0))`,
            backgroundSize: '320px 320px'
          }}
        />

        {/* Constellation Filament SVG Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <linearGradient id="constGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {connections.map((c, idx) => (
            <line
              key={`${c.from.id}-${c.to.id}-${idx}`}
              x1={`${c.from.coordX}%`}
              y1={`${c.from.coordY}%`}
              x2={`${c.to.coordX}%`}
              y2={`${c.to.coordY}%`}
              stroke="url(#constGrad)"
              strokeWidth="1.2"
              strokeDasharray={c.shared === 'Mood' ? 'none' : '3 3'}
              className="opacity-60 transition-opacity"
            />
          ))}
        </svg>

        {/* Dream Nodes */}
        {dreamNodes.map((node) => {
          const isSelected = activeDream?.id === node.id;
          const nodeMoodConfig = getMoodConfig(node.mood);
          const nodeColor = nodeMoodConfig.color || 'var(--dream-primary)';

          return (
            <div
              key={node.id}
              style={{ left: `${node.coordX}%`, top: `${node.coordY}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                type="button"
                onClick={() => setActiveDream(node)}
                onDoubleClick={() => navigate(`/world/${node.id}`)}
                className="group relative flex flex-col items-center focus:outline-none"
                aria-label={`Select ${node.title}`}
              >
                {/* Glowing Star Body with exact dream color */}
                <div
                  className={`rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'w-10 h-10 scale-125'
                      : 'w-6 h-6 bg-slate-900/80 ring-1 ring-white/20 hover:scale-125'
                  }`}
                  style={isSelected ? {
                    backgroundColor: 'rgba(15, 12, 34, 0.85)',
                    border: `2px solid ${nodeColor}`,
                    boxShadow: `0 0 25px ${nodeColor}`
                  } : {}}
                >
                  <div
                    className={`rounded-full transition-colors ${
                      isSelected
                        ? 'w-3 h-3 bg-white shadow-[0_0_8px_#ffffff]'
                        : 'w-2 h-2 group-hover:scale-125'
                    }`}
                    style={{
                      backgroundColor: nodeColor,
                      boxShadow: `0 0 6px ${nodeColor}`
                    }}
                  />
                </div>

                {/* Node Title */}
                <span
                  className={`mt-1.5 px-2 py-0.5 text-[10px] font-medium rounded transition-colors whitespace-nowrap pointer-events-none ${
                    isSelected
                      ? 'text-white bg-slate-900/90 border shadow-md font-semibold'
                      : 'text-slate-300 bg-slate-950/70 border border-white/10 group-hover:text-white'
                  }`}
                  style={isSelected ? { borderColor: nodeColor } : {}}
                >
                  {node.title}
                </span>
              </button>
            </div>
          );
        })}

        {/* Selected Dream Details Overlay */}
        {activeDream && (
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-full max-w-sm z-30 bg-slate-900/95 border border-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-2xl animate-fade-in space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-violet-400 font-mono-tabular">
                  {activeDream.mood} · Intensity {activeDream.intensity}/10
                </span>
                <h3 className="text-base font-bold text-white font-display mt-0.5">
                  {activeDream.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDream(null)}
                className="text-slate-400 hover:text-white text-xs px-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 italic line-clamp-3 leading-relaxed">
              “{activeDream.description}”
            </p>

            <div className="pt-2 border-t border-white/[0.06] space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Archetype:</span>
                <span className="text-slate-200 font-medium">{activeDream.analysis?.archetype}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">World:</span>
                <span className="text-slate-200 font-medium truncate max-w-[180px]">
                  {activeDream.generatedWorld?.worldName}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => navigate(`/world/${activeDream.id}`)}
                className="w-full py-2 px-3 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Enter Dream World</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Helper bottom hint */}
        <div className="absolute bottom-4 left-6 z-20 pointer-events-none hidden sm:flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950/60 px-3 py-1.5 rounded-full border border-white/[0.06]">
          <Info className="w-3.5 h-3.5 text-violet-400" />
          <span>Click any star to inspect its dimension; double-click or use the overlay to enter.</span>
        </div>
      </div>
    </div>
  );
}
