/**
 * DreamOS Immersive Dream Explorer Component
 * Minimalist, atmospheric full-screen exploration mode with deterministic action resolution.
 */

import React, { useState } from 'react';
import {
  Compass,
  Eye,
  Sparkles,
  BookOpen,
  Search,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Zap
} from 'lucide-react';
import { executeExplorationAction, ACTION_TYPES } from '../services/dreamEngine.js';

export default function DreamExplorer({
  dream,
  initialLocation,
  onExit,
  onLocationChange
}) {
  const locations = dream.generatedWorld?.locations || [];
  const [currentLocation, setCurrentLocation] = useState(
    initialLocation || locations[0] || null
  );

  const [dreamEnergy, setDreamEnergy] = useState(
    dream.generatedWorld?.dreamEnergy || 82
  );

  const [log, setLog] = useState([
    {
      id: 'initial',
      action: 'Entered Realm',
      text: `You awaken in ${currentLocation?.name || 'the dream center'}. Atmosphere: ${currentLocation?.atmosphere || 'Quiet and still'}.`,
      time: 'Just now'
    }
  ]);

  const [currentEvent, setCurrentEvent] = useState(null);
  const [discoveredMemories, setDiscoveredMemories] = useState([]);
  const [discoveredObjects, setDiscoveredObjects] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = (actionId) => {
    if (isProcessing || !currentLocation) return;
    setIsProcessing(true);

    const actionDef = ACTION_TYPES.find((a) => a.id === actionId);
    const result = executeExplorationAction(dream, currentLocation, actionId, dreamEnergy);

    setDreamEnergy(result.newEnergy);

    if (result.eventTriggered) {
      setCurrentEvent(result.eventTriggered);
    } else {
      setCurrentEvent(null);
    }

    if (result.memoryUnlocked && !discoveredMemories.includes(result.memoryUnlocked)) {
      setDiscoveredMemories((prev) => [result.memoryUnlocked, ...prev]);
    }

    if (result.objectFound && !discoveredObjects.includes(result.objectFound)) {
      setDiscoveredObjects((prev) => [result.objectFound, ...prev]);
    }

    setLog((prev) => [
      {
        id: `log-${Date.now()}`,
        action: actionDef?.label || 'Action',
        text: result.narrative,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      ...prev
    ]);

    setTimeout(() => {
      setIsProcessing(false);
    }, 200);
  };

  const handleSwitchLocation = (loc) => {
    setCurrentLocation(loc);
    if (onLocationChange) onLocationChange(loc);
    setCurrentEvent(null);
    setLog((prev) => [
      {
        id: `switch-${Date.now()}`,
        action: 'Transitioned',
        text: `You cross the ethereal boundary and enter ${loc.name}. The atmosphere shifts: ${loc.atmosphere}.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      ...prev
    ]);
  };

  return (
    <div className="min-h-[85vh] rounded-2xl bg-[#03050c] border border-white/[0.08] relative overflow-hidden flex flex-col justify-between p-6 sm:p-10 shadow-2xl">
      {/* Ambient background dream color glows */}
      <div 
        className="absolute top-0 right-0 w-[550px] h-[550px] blur-[140px] rounded-full pointer-events-none opacity-30 transition-all duration-1000"
        style={{ background: 'var(--dream-primary)' }}
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 left-0 w-[450px] h-[450px] blur-[130px] rounded-full pointer-events-none opacity-25 transition-all duration-1000"
        style={{ background: 'var(--dream-secondary)' }}
        aria-hidden="true" 
      />

      {/* Top Bar: Minimal Telemetry */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onExit}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
            title="Exit Exploration Mode"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span 
              className="text-[10px] uppercase tracking-widest font-semibold font-mono-tabular"
              style={{ color: 'var(--dream-primary)' }}
            >
              Dream Exploration Mode
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              {currentLocation?.name}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 font-mono-tabular">
              Atmosphere: {currentLocation?.atmosphere}
            </p>
          </div>
        </div>

        {/* Dream Energy Meter */}
        <div className="flex items-center gap-4 bg-slate-950/70 border border-white/[0.08] rounded-xl px-4 py-2 self-start sm:self-auto">
          <div className="text-right">
            <span className="block text-[10px] uppercase tracking-wider text-slate-400">Dream Energy</span>
            <span 
              className="text-base font-bold font-mono-tabular"
              style={{ color: 'var(--dream-primary)' }}
            >
              {dreamEnergy}%
            </span>
          </div>
          <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${dreamEnergy}%`,
                background: dreamEnergy > 40
                  ? 'linear-gradient(90deg, var(--dream-primary), var(--dream-secondary))'
                  : '#f43f5e'
              }}
            />
          </div>
        </div>
      </div>

      {/* Dynamic Surprise Event Banner (if triggered) */}
      {currentEvent && (
        <div 
          className="relative z-10 my-4 p-4 rounded-xl border flex items-start gap-3 animate-fade-in shadow-lg"
          style={{
            backgroundColor: 'rgba(15, 12, 34, 0.7)',
            borderColor: 'var(--dream-border)',
            boxShadow: '0 8px 30px -10px var(--dream-glow)'
          }}
        >
          <Sparkles className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--dream-primary)' }} />
          <div>
            <span 
              className="text-[11px] uppercase tracking-wider font-semibold block"
              style={{ color: 'var(--dream-primary)' }}
            >
              Subconscious Shift Event
            </span>
            <p className="text-sm text-slate-200 mt-0.5 leading-relaxed">
              {currentEvent}
            </p>
          </div>
        </div>
      )}

      {/* Central Narrative Window */}
      <div className="relative z-10 flex-1 my-6 overflow-y-auto max-h-[380px] space-y-4 pr-2">
        {log.map((entry, idx) => (
          <div
            key={entry.id}
            className={`p-4 rounded-xl transition-all ${
              idx === 0
                ? 'bg-slate-900/80 border border-violet-500/30 text-white shadow-lg'
                : 'bg-slate-950/40 border border-white/[0.04] text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] mb-1 font-mono-tabular text-violet-400">
              <span className="font-semibold uppercase tracking-wider">{entry.action}</span>
              <span className="text-slate-400">{entry.time}</span>
            </div>
            <p className={`text-sm leading-relaxed ${idx === 0 ? 'text-slate-200' : 'text-slate-300'}`}>
              {entry.text}
            </p>
          </div>
        ))}
      </div>

      {/* Discovered Items Drawer */}
      {(discoveredMemories.length > 0 || discoveredObjects.length > 0) && (
        <div className="relative z-10 mb-6 p-3 rounded-lg bg-slate-950/60 border border-white/[0.06] flex flex-wrap items-center gap-3 text-xs">
          <span className="text-slate-400 font-medium">Session Discoveries:</span>
          {discoveredObjects.map((obj) => (
            <span key={obj} className="text-violet-300 font-mono-tabular">
              [Artifact: {obj}]
            </span>
          ))}
          {discoveredMemories.length > 0 && (
            <span className="text-indigo-300 font-mono-tabular">
              [{discoveredMemories.length} Memories Unlocked]
            </span>
          )}
        </div>
      )}

      {/* Action Command Center */}
      <div className="relative z-10 space-y-4 pt-4 border-t border-white/[0.06]">
        {/* Available Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {ACTION_TYPES.map((action) => (
            <button
              key={action.id}
              type="button"
              disabled={isProcessing}
              onClick={() => handleAction(action.id)}
              className="px-3.5 py-3 rounded-xl bg-slate-900/70 hover:bg-slate-800/90 border border-white/[0.08] hover:border-violet-500/40 transition-all text-left group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-xs font-semibold text-white group-hover:text-violet-200 transition-colors">
                  {action.label}
                </span>
                <span className="text-[10px] text-slate-400 font-mono-tabular">
                  {action.cost > 0 ? `+${action.cost}%` : `${action.cost}%`}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 line-clamp-1">
                {action.desc}
              </span>
            </button>
          ))}
        </div>

        {/* Quick Travel to Connected Locations */}
        {locations.length > 1 && (
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400 font-medium">
              Travel to another location in this realm:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {locations.map((loc) => {
                if (loc.id === currentLocation?.id) return null;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => handleSwitchLocation(loc)}
                    className="px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 rounded-md border border-white/10 transition-colors"
                  >
                    {loc.name}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={onExit}
                className="px-2.5 py-1 text-xs text-slate-400 hover:text-white transition-colors ml-2"
              >
                Return to Overview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
