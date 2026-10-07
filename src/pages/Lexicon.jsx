/**
 * DreamOS Subconscious Symbol Lexicon (The Dream Codex)
 * Comprehensive Jungian & archetypal symbol dictionary cross-referenced with the user's journal.
 */

import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, BookOpen, Sparkles, Filter, ArrowRight, Compass, Eye, Shield } from 'lucide-react';
import { storageService } from '../services/storageService.js';

const SYMBOL_DATABASE = [
  {
    id: 'water',
    name: 'Water & Oceans',
    category: 'Elements',
    icon: '🌊',
    theme: 'Emotional Depth & Unconscious',
    meaning: 'Signifies the raw currents of the emotional unconscious. Calm water indicates psychic balance; turbulent depths signify suppressed feelings demanding attention.',
    lucidTip: 'Notice when you are breathing effortlessly underwater—it is one of the most reliable lucid triggers.',
    archetype: 'The Submerged Soul'
  },
  {
    id: 'flying',
    name: 'Flight & Levitation',
    category: 'Journey',
    icon: '🦅',
    theme: 'Freedom & Transcendence',
    meaning: 'Reflects the desire to transcend mundane limitations and survey life dilemmas from a panoramic vantage point.',
    lucidTip: 'If your feet leave the earth or gravity weakens, immediately confirm you are in a dream.',
    archetype: 'The Astral Wanderer'
  },
  {
    id: 'door',
    name: 'Doors & Thresholds',
    category: 'Objects',
    icon: '🚪',
    theme: 'Transition & Untapped Potential',
    meaning: 'Represents pending life passages, secret opportunities, or boundaries separating your waking ego from hidden wisdom.',
    lucidTip: 'Opening an unfamiliar door in dreams is a classic portal technique to conjure any world you envision.',
    archetype: 'The Threshold Guardian'
  },
  {
    id: 'forest',
    name: 'Ancient Forests',
    category: 'Nature',
    icon: '🌲',
    theme: 'Untamed Instincts & Mystery',
    meaning: 'Symbolizes entering the deep labyrinth of instinct, ancestral memory, and unmapped facets of oneself.',
    lucidTip: 'Touch the bark of dreaming trees; feeling the vivid tactile texture stabilizes dream lucidity.',
    archetype: 'The Wild Self'
  },
  {
    id: 'clock',
    name: 'Clocks & Timepieces',
    category: 'Objects',
    icon: '⏳',
    theme: 'Transience & Mortality',
    meaning: 'Signals anxieties about passing deadlines or awakening to the irreplaceable beauty of the present moment.',
    lucidTip: 'Look at a clock, look away, and look back. In dreams, clock hands and digits almost always mutate.',
    archetype: 'The Chrono Sentinel'
  },
  {
    id: 'mirror',
    name: 'Mirrors & Reflections',
    category: 'Mystical',
    icon: '🪞',
    theme: 'True Identity & The Shadow',
    meaning: 'Confronts the dreamer with their hidden persona or suppressed shadow traits that the waking self conceals.',
    lucidTip: 'Looking into a dream mirror often shows shapeshifting faces—remain calm and ask who it represents.',
    archetype: 'The Shadow Reflection'
  },
  {
    id: 'tower',
    name: 'Crystalline Towers',
    category: 'Objects',
    icon: '🗼',
    theme: 'Perspective & Intellectual Isolation',
    meaning: 'Elevated structures show high intellectual clarity, but risk emotional isolation if disconnected from the ground.',
    lucidTip: 'Looking down from high dreaming spires can prompt lucid awe.',
    archetype: 'The High Architect'
  },
  {
    id: 'train',
    name: 'Endless Trains',
    category: 'Journey',
    icon: '🚂',
    theme: 'Destiny & Life Trajectories',
    meaning: 'Represents fixed collective journeys, nostalgia for departed companions, and momentum toward impending transitions.',
    lucidTip: 'Check the ticket or transit map in your hand; the destination is usually a subconscious message.',
    archetype: 'The Transitory Pilgrim'
  },
  {
    id: 'stars',
    name: 'Stars & Constellations',
    category: 'Mystical',
    icon: '✨',
    theme: 'Cosmic Purpose & Guidance',
    meaning: 'Innate intuition guiding you through uncertainty toward long-term destiny and spiritual grounding.',
    lucidTip: 'Reach up to touch the dreaming sky; pulling a star into your hands is a classic lucidity stabilizer.',
    archetype: 'The Astral Weaver'
  },
  {
    id: 'key',
    name: 'Keys & Locks',
    category: 'Objects',
    icon: '🗝️',
    theme: 'Access & Unlocking Truths',
    meaning: 'Signals that the dreamer already possesses the resolution or access needed to resolve an elusive waking situation.',
    lucidTip: 'Holding a dream key gives you the subconscious permission to unlock any barrier.',
    archetype: 'The Secret Keeper'
  },
  {
    id: 'bridge',
    name: 'Bridges over Voids',
    category: 'Journey',
    icon: '🌉',
    theme: 'Irreversible Reconciliation',
    meaning: 'Crossing from old grief or outdated habits into unmapped growth without falling into past regret.',
    lucidTip: 'Notice the middle of a bridge; looking down without fear triggers lucidity.',
    archetype: 'The Mediator'
  },
  {
    id: 'animals',
    name: 'Animals & Spirit Beasts',
    category: 'Nature',
    icon: '🦌',
    theme: 'Instinctual Wisdom',
    meaning: 'Embodied messengers representing primal gut intuition, vitality, or untamed desires.',
    lucidTip: 'Speak directly to the animal in the dream and listen for its guidance.',
    archetype: 'The Primal Guide'
  }
];

export default function Lexicon() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const dreams = storageService.getDreams();

  const categories = ['All', 'Elements', 'Journey', 'Objects', 'Nature', 'Mystical'];

  const filteredSymbols = useMemo(() => {
    return SYMBOL_DATABASE.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.theme.toLowerCase().includes(search.toLowerCase()) ||
        item.meaning.toLowerCase().includes(search.toLowerCase()) ||
        item.archetype.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, selectedCategory]);

  // Count how many user dreams contain references to each symbol
  const getMatchingDreamsCount = (symbolName, symbolId) => {
    const key = symbolId.toLowerCase();
    return dreams.filter(
      (d) =>
        d.description.toLowerCase().includes(key) ||
        d.title.toLowerCase().includes(key) ||
        (d.analysis?.importantObjects || []).some((obj) => obj.toLowerCase().includes(key))
    ).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span 
          className="text-xs uppercase tracking-[0.25em] font-semibold font-mono-tabular"
          style={{ color: 'var(--dream-primary)' }}
        >
          Subconscious Codex
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-white font-display">
          Dream Symbol Lexicon
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed text-balance">
          Decipher the archetypal language of your dreams. Explore Jungian themes, psychological resonance, and lucidity induction cues cross-referenced with your saved memories.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search symbols, archetypes, or themes..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Symbols Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSymbols.map((item) => {
          const matchCount = getMatchingDreamsCount(item.name, item.id);

          return (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-slate-900/50 hover:bg-slate-900/90 border border-white/[0.08] hover:border-violet-500/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-3xl p-2 rounded-xl bg-slate-950/60 border border-white/[0.06] block">
                    {item.icon}
                  </span>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-mono-tabular uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <span 
                      className="text-xs font-semibold font-mono-tabular"
                      style={{ color: 'var(--dream-primary)' }}
                    >
                      {item.archetype}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white font-display mb-1 group-hover:text-violet-200 transition-colors">
                  {item.name}
                </h3>
                <span className="text-xs text-violet-400/90 font-medium block mb-2 font-mono-tabular">
                  Theme: {item.theme}
                </span>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {item.meaning}
                </p>

                {/* Lucidity induction tip */}
                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.04] text-[11px] text-slate-400 space-y-1 mb-4">
                  <div className="flex items-center gap-1.5 text-sky-300 font-medium">
                    <Sparkles className="w-3 h-3" />
                    <span>Lucid Reality Trigger</span>
                  </div>
                  <p className="leading-snug text-slate-300">
                    {item.lucidTip}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-mono-tabular">
                  {matchCount > 0 ? (
                    <span className="text-emerald-400 font-medium">
                      In {matchCount} of your dreams
                    </span>
                  ) : (
                    'Not yet recorded in journal'
                  )}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    navigate('/create');
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                >
                  <span>Dream of this</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
