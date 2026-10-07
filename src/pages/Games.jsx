/**
 * DreamOS Interactive Games Studio Page
 * Subconscious mini-games: Lucid Flight, Constellation Weaver, and Subconscious Recall.
 */

import React, { useState } from 'react';
import { Gamepad2, Compass, Sparkles, Brain, Award, Play } from 'lucide-react';
import LucidFlightGame from '../components/games/LucidFlightGame.jsx';
import ConstellationWeaverGame from '../components/games/ConstellationWeaverGame.jsx';
import SubconsciousRecallGame from '../components/games/SubconsciousRecallGame.jsx';

export default function Games() {
  const [activeGame, setActiveGame] = useState('flight'); // 'flight' | 'constellation' | 'recall'

  const gameTabs = [
    {
      id: 'flight',
      title: 'Lucid Flight',
      tag: 'Action / Reflexes',
      desc: 'Glide through crystal dream spires and collect starlight shards.',
      icon: Sparkles
    },
    {
      id: 'constellation',
      title: 'Constellation Weaver',
      tag: 'Puzzle / Logic',
      desc: 'Connect the glowing stars to reforge ancient celestial dream myths.',
      icon: Compass
    },
    {
      id: 'recall',
      title: 'Subconscious Recall',
      tag: 'Memory / Cards',
      desc: 'Flip and match dream archetypes to restore subconscious coherence.',
      icon: Brain
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span 
          className="text-xs uppercase tracking-[0.25em] font-semibold font-mono-tabular"
          style={{ color: 'var(--dream-primary)' }}
        >
          Interactive Dream Studio
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-white font-display">
          Subconscious Games
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed text-balance">
          Interact directly with the dream realm. Test your reflexes, spatial memory, and subconscious intuition through procedural mini-games.
        </p>
      </div>

      {/* Game Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {gameTabs.map((tab) => {
          const isSelected = activeGame === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveGame(tab.id)}
              className={`p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900/95 border-violet-400/80 shadow-lg'
                  : 'bg-slate-900/40 hover:bg-slate-900/70 border-white/[0.08] hover:border-white/20'
              }`}
              style={isSelected ? {
                borderColor: 'var(--dream-primary)',
                boxShadow: '0 10px 30px -10px var(--dream-glow)'
              } : {}}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div 
                    className="w-9 h-9 rounded-xl border flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(15, 12, 34, 0.8)',
                      borderColor: isSelected ? 'var(--dream-primary)' : 'rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: isSelected ? 'var(--dream-primary)' : '#94a3b8' }} />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono-tabular uppercase tracking-wider">
                    {tab.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-display mb-1">
                  {tab.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {tab.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span 
                  className="font-semibold"
                  style={{ color: isSelected ? 'var(--dream-primary)' : '#64748b' }}
                >
                  {isSelected ? '● Currently Playing' : 'Select Game'}
                </span>
                <span className="text-slate-500">→</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Game Viewport */}
      <div className="pt-2">
        {activeGame === 'flight' && <LucidFlightGame />}
        {activeGame === 'constellation' && <ConstellationWeaverGame />}
        {activeGame === 'recall' && <SubconsciousRecallGame />}
      </div>
    </div>
  );
}
