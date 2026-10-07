/**
 * DreamOS Intelligence Analyzer Component
 * Local deterministic dream interpretation engine.
 * Transparently labeled: "AI-style interpretation generated from your dream description."
 */

import React from 'react';
import { Sparkles, Compass, Eye, Shield, Layers, Radio } from 'lucide-react';

export default function DreamAnalyzer({ analysis, title, onContinueToWorld }) {
  if (!analysis) return null;

  const {
    primaryMood,
    intensity,
    themes = [],
    environment,
    atmosphere,
    importantObjects = [],
    possibleEmotions = [],
    recurringKeywords = [],
    archetype,
    narrativeStructure,
    energySignature
  } = analysis;

  return (
    <div 
      className="bg-slate-900/85 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-8 border transition-all"
      style={{
        borderColor: 'var(--dream-border)',
        boxShadow: '0 15px 40px -15px var(--dream-glow)'
      }}
    >
      {/* Engine Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Radio className="w-4 h-4 animate-pulse" style={{ color: 'var(--dream-primary)' }} />
            <h2 className="text-xl font-bold text-white font-display">
              DreamOS Intelligence
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            AI-style interpretation generated from your dream description.
          </p>
        </div>

        {/* Energy Signature */}
        <div 
          className="flex items-center gap-3 bg-slate-950/70 border rounded-xl px-4 py-2 self-start sm:self-auto"
          style={{ borderColor: 'var(--dream-border)' }}
        >
          <div className="text-right">
            <span className="block text-[10px] uppercase tracking-wider text-slate-400">Dream Energy</span>
            <span className="text-base font-bold font-mono-tabular" style={{ color: 'var(--dream-primary)' }}>
              {energySignature}%
            </span>
          </div>
          <div 
            className="w-10 h-10 rounded-full border flex items-center justify-center"
            style={{ 
              borderColor: 'var(--dream-primary)',
              backgroundColor: 'rgba(15, 12, 34, 0.6)'
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: 'var(--dream-primary)' }} />
          </div>
        </div>
      </div>

      {/* Grid of Synthesized Findings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Core Attributes */}
        <div className="space-y-4">
          <div>
            <span className="text-xs text-slate-400 block mb-1">Primary Mood</span>
            <p className="text-base font-semibold text-white flex items-center gap-2">
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ 
                  backgroundColor: 'var(--dream-primary)',
                  boxShadow: '0 0 8px var(--dream-primary)'
                }} 
              />
              <span>{primaryMood}</span>
            </p>
          </div>

          <div>
            <span className="text-xs text-slate-400 block mb-1">Dream Intensity</span>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(intensity / 10) * 100}%`,
                    background: 'linear-gradient(90deg, var(--dream-primary), var(--dream-secondary))'
                  }}
                />
              </div>
              <span className="text-xs font-mono-tabular text-slate-300">{intensity}/10</span>
            </div>
          </div>

          <div>
            <span className="text-xs text-slate-400 block mb-1">Subconscious Archetype</span>
            <p className="text-sm font-medium" style={{ color: 'var(--dream-primary)' }}>{archetype}</p>
          </div>
        </div>

        {/* Environment & Atmosphere */}
        <div className="space-y-4">
          <div>
            <span className="text-xs text-slate-400 block mb-1">Synthesized Environment</span>
            <p className="text-sm text-slate-200 leading-relaxed">{environment}</p>
          </div>

          <div>
            <span className="text-xs text-slate-400 block mb-1">Atmospheric Signature</span>
            <p className="text-sm text-slate-300 font-mono-tabular">{atmosphere}</p>
          </div>
        </div>

        {/* Themes & Resonances */}
        <div className="space-y-4">
          <div>
            <span className="text-xs text-slate-400 block mb-1">Detected Themes</span>
            <div className="flex items-center gap-2 text-sm text-slate-200 flex-wrap">
              {themes.map((t, i) => (
                <React.Fragment key={t}>
                  <span className="font-medium text-slate-200">{t}</span>
                  {i < themes.length - 1 && <span className="text-slate-500" aria-hidden="true">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs text-slate-400 block mb-1">Important Objects & Anchors</span>
            <div className="flex items-center gap-2 text-xs text-slate-300 flex-wrap">
              {importantObjects.map((obj, i) => (
                <React.Fragment key={obj}>
                  <span>{obj}</span>
                  {i < importantObjects.length - 1 && <span className="text-slate-500" aria-hidden="true">/</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs text-slate-400 block mb-1">Emotional Resonance</span>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 flex-wrap">
              {possibleEmotions.map((emo, i) => (
                <React.Fragment key={emo}>
                  <span>{emo}</span>
                  {i < possibleEmotions.length - 1 && <span className="text-slate-600" aria-hidden="true">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Narrative Flow */}
      <div className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.06] space-y-1.5">
        <span className="text-xs text-slate-400 uppercase tracking-wider block">Detected Narrative Structure</span>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {narrativeStructure}
        </p>
      </div>

      {/* Action to proceed to the Generated World */}
      {onContinueToWorld && (
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onContinueToWorld}
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, var(--dream-primary), var(--dream-secondary))',
              boxShadow: '0 8px 25px -4px var(--dream-glow)'
            }}
          >
            <span>Materialize Dream World</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
