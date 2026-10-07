/**
 * DreamOS Ambient Soundscape Player Component
 * Floating/docked procedural audio player for meditative dream writing & exploration.
 */

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Waves, CloudRain, Bell, Radio, ChevronUp, ChevronDown } from 'lucide-react';
import { ambientAudio } from '../services/ambientAudio.js';

export default function DreamSoundscapePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [preset, setPreset] = useState('theta');
  const [volume, setVolume] = useState(0.5);
  const [isExpanded, setIsExpanded] = useState(false);

  const presets = [
    { id: 'theta', label: 'Theta Waves', sub: '432Hz Sleep Drone', icon: Radio },
    { id: 'rain', label: 'Lucid Rain', sub: 'Misty Canopy', icon: CloudRain },
    { id: 'chimes', label: 'Astral Chimes', sub: 'Pentatonic Starlight', icon: Bell },
    { id: 'ocean', label: 'Ocean Tide', sub: 'Lunar Swell', icon: Waves }
  ];

  const handleTogglePlay = () => {
    if (isPlaying) {
      ambientAudio.stop();
      setIsPlaying(false);
    } else {
      ambientAudio.play(preset);
      setIsPlaying(true);
    }
  };

  const handleSelectPreset = (newPreset) => {
    setPreset(newPreset);
    if (isPlaying) {
      ambientAudio.play(newPreset);
    }
  };

  const handleVolumeChange = (e) => {
    const val = Number(e.target.value);
    setVolume(val);
    ambientAudio.setVolume(val);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      ambientAudio.stop();
    };
  }, []);

  const currentDef = presets.find((p) => p.id === preset) || presets[0];

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-xs transition-all duration-300">
      {/* Floating Minimized Pill */}
      {!isExpanded && (
        <div className="flex items-center gap-2 p-1.5 pl-3 rounded-full bg-slate-900/90 border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 text-xs">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            <span className="text-slate-300 font-medium truncate max-w-[100px]">
              {currentDef.label}
            </span>
          </div>

          <button
            type="button"
            onClick={handleTogglePlay}
            className="w-7 h-7 rounded-full flex items-center justify-center bg-violet-600/80 hover:bg-violet-600 text-white transition-all shadow-sm"
            aria-label={isPlaying ? 'Pause soundscape' : 'Play soundscape'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            title="Expand Soundscape Controls"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Expanded Sound Machine Panel */}
      {isExpanded && (
        <div className="w-72 p-4 rounded-2xl bg-slate-900/95 border border-white/10 shadow-2xl backdrop-blur-2xl space-y-3 animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-bold text-white font-display">
                Dream Soundscape
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-white p-1 rounded"
              title="Minimize"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Sound Presets */}
          <div className="grid grid-cols-2 gap-2">
            {presets.map((p) => {
              const isSelected = preset === p.id;
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPreset(p.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-violet-950/60 border-violet-500/50 text-white'
                      : 'bg-slate-950/40 border-white/[0.06] text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-violet-300' : 'text-slate-500'}`} />
                  <span className="block text-xs font-semibold leading-tight">{p.label}</span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">{p.sub}</span>
                </button>
              );
            })}
          </div>

          {/* Volume Control */}
          <div className="pt-2 flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 h-1.5 bg-slate-800 rounded-lg cursor-pointer accent-violet-500"
            />
            <span className="text-[10px] text-slate-400 font-mono-tabular w-7 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* Master Action Button */}
          <button
            type="button"
            onClick={handleTogglePlay}
            className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-white transition-all flex items-center justify-center gap-2 shadow-sm"
            style={{
              background: isPlaying
                ? 'linear-gradient(135deg, #475569, #334155)'
                : 'linear-gradient(135deg, var(--dream-primary), var(--dream-secondary))',
              boxShadow: isPlaying ? 'none' : '0 4px 15px -3px var(--dream-glow)'
            }}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Soundscape</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Start {currentDef.label}</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
