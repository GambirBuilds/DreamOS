/**
 * DreamOS Subconscious Recall Card Matching Game
 * Uncover matching dream archetypes and relics to restore subconscious coherence.
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, Trophy, CheckCircle2, Eye, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../../utils/soundFx.js';

const CARD_SYMBOLS = [
  { id: 'tower', name: 'Crystal Tower', icon: '💎', color: '#c084fc' },
  { id: 'pearl', name: 'Sunken Pearl', icon: '🌊', color: '#38bdf8' },
  { id: 'train', name: 'Twilight Express', icon: '🚂', color: '#fb923c' },
  { id: 'grove', name: 'Whispering Grove', icon: '🌲', color: '#a7f3d0' },
  { id: 'bridge', name: 'Moon Bridge', icon: '🌙', color: '#e879f9' },
  { id: 'key', name: 'Astral Key', icon: '🗝️', color: '#fde68a' },
  { id: 'leviathan', name: 'Luminous Whale', icon: '🐋', color: '#2dd4bf' },
  { id: 'mirror', name: 'Obsidian Mirror', icon: '🪞', color: '#f472b6' }
];

export default function SubconsciousRecallGame() {
  const [deck, setDeck] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isVictory, setIsVictory] = useState(false);

  // Initialize and shuffle deck
  const initGame = () => {
    const duplicated = [...CARD_SYMBOLS, ...CARD_SYMBOLS].map((item, idx) => ({
      ...item,
      uniqueId: `${item.id}-${idx}`,
      isFlipped: false
    }));

    // Fisher-Yates Shuffle
    for (let i = duplicated.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [duplicated[i], duplicated[j]] = [duplicated[j], duplicated[i]];
    }

    setDeck(duplicated);
    setFlippedIndices([]);
    setMatchedIds([]);
    setMoves(0);
    setIsVictory(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index) => {
    if (flippedIndices.length === 2) return;
    if (flippedIndices.includes(index)) return;
    if (matchedIds.includes(deck[index].id)) return;

    soundFx.cardFlip();
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      const card1 = deck[firstIdx];
      const card2 = deck[secondIdx];

      if (card1.id === card2.id) {
        // Matched!
        setTimeout(() => {
          soundFx.collectStar();
          const newMatched = [...matchedIds, card1.id];
          setMatchedIds(newMatched);
          setFlippedIndices([]);

          if (newMatched.length === CARD_SYMBOLS.length) {
            setIsVictory(true);
            soundFx.levelClear();
            try {
              confetti({
                particleCount: 60,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#c084fc', '#f472b6', '#38bdf8']
              });
            } catch {
              // safe
            }
          }
        }, 400);
      } else {
        // Not matched, flip back
        setTimeout(() => {
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/10 bg-[#060818] shadow-2xl flex flex-col">
      {/* HUD */}
      <div className="px-5 py-3.5 border-b border-white/[0.08] flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-violet-400 font-semibold font-mono-tabular">
            Subconscious Recall
          </span>
          <span className="text-xs text-slate-400">· Match Dream Relics</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono-tabular">
          <div className="text-slate-300">
            <span>Pairs: </span>
            <span className="text-violet-300 font-bold">{matchedIds.length} / {CARD_SYMBOLS.length}</span>
          </div>
          <div className="text-slate-300">
            <span>Moves: </span>
            <span className="text-white font-bold">{moves}</span>
          </div>
          <button
            type="button"
            onClick={initGame}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
            title="Restart Deck"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="p-5 sm:p-6 bg-radial from-[#100826]/60 via-[#070918] to-[#04050e] relative min-h-[360px] flex items-center justify-center">
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-md">
          {deck.map((card, index) => {
            const isFlipped = flippedIndices.includes(index) || matchedIds.includes(card.id);
            const isMatched = matchedIds.includes(card.id);

            return (
              <button
                key={card.uniqueId}
                type="button"
                onClick={() => handleCardClick(index)}
                className={`aspect-square rounded-xl p-2 flex flex-col items-center justify-center transition-all duration-300 transform perspective-1000 ${
                  isFlipped
                    ? isMatched
                      ? 'bg-violet-950/70 border-2 border-emerald-400/80 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-[0.98]'
                      : 'bg-slate-900 border-2 border-violet-400/80 shadow-[0_0_15px_rgba(192,132,252,0.4)] scale-100'
                    : 'bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-violet-500/40 hover:scale-105'
                }`}
              >
                {isFlipped ? (
                  <div className="flex flex-col items-center justify-center animate-fade-in">
                    <span className="text-2xl sm:text-3xl mb-1">{card.icon}</span>
                    <span className="text-[9px] sm:text-[10px] text-slate-200 font-medium leading-none text-center truncate max-w-[65px]">
                      {card.name}
                    </span>
                  </div>
                ) : (
                  <Sparkles className="w-5 h-5 text-violet-400/50" />
                )}
              </button>
            );
          })}
        </div>

        {/* Victory Modal */}
        {isVictory && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-3 z-30 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center shadow-[0_0_20px_#10b981]">
              <Trophy className="w-6 h-6 text-emerald-300" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              Subconscious Coherence Restored!
            </h3>
            <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
              All 8 dream relics successfully matched in <strong className="text-violet-300">{moves} moves</strong>.
            </p>
            <button
              type="button"
              onClick={initGame}
              className="mt-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-violet-600 hover:bg-violet-500 rounded-lg shadow-lg transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer Instructions */}
      <div className="px-5 py-2.5 bg-slate-950/80 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
        <span>Flip and match identical dream symbols to test your subconscious recall</span>
        <span className="text-[11px] text-violet-400 font-mono-tabular">16 cards · 8 pairs</span>
      </div>
    </div>
  );
}
