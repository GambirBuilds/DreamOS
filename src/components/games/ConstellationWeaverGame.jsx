/**
 * DreamOS Constellation Weaver Puzzle Game
 * Connect celestial stars in sequence to reforge ancient subconscious constellations.
 */

import React, { useState } from 'react';
import { Sparkles, RotateCcw, CheckCircle2, ArrowRight, Trophy, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../../utils/soundFx.js';

const CONSTELLATION_LEVELS = [
  {
    id: 1,
    name: 'The Astral Key',
    desc: 'Unlocks dormant memory pathways in the subconscious.',
    stars: [
      { id: 1, x: 25, y: 70, label: '1' },
      { id: 2, x: 25, y: 30, label: '2' },
      { id: 3, x: 55, y: 30, label: '3' },
      { id: 4, x: 75, y: 50, label: '4' },
      { id: 5, x: 55, y: 70, label: '5' }
    ],
    targetSequence: [1, 2, 3, 4, 5, 1] // Closed loop or path
  },
  {
    id: 2,
    name: 'The Crescent Swan',
    desc: 'Emblem of graceful detachment and peaceful dreaming.',
    stars: [
      { id: 1, x: 20, y: 50, label: '1' },
      { id: 2, x: 38, y: 25, label: '2' },
      { id: 3, x: 60, y: 20, label: '3' },
      { id: 4, x: 80, y: 40, label: '4' },
      { id: 5, x: 65, y: 75, label: '5' },
      { id: 6, x: 40, y: 70, label: '6' }
    ],
    targetSequence: [1, 2, 3, 4, 5, 6]
  },
  {
    id: 3,
    name: 'The Lotus of Dreams',
    desc: 'The unfolding geometry of pure creative lucidity.',
    stars: [
      { id: 1, x: 50, y: 80, label: '1' },
      { id: 2, x: 25, y: 60, label: '2' },
      { id: 3, x: 20, y: 35, label: '3' },
      { id: 4, x: 50, y: 20, label: '4' },
      { id: 5, x: 80, y: 35, label: '5' },
      { id: 6, x: 75, y: 60, label: '6' },
      { id: 7, x: 50, y: 50, label: '7' }
    ],
    targetSequence: [1, 2, 3, 4, 5, 6, 1, 7]
  }
];

export default function ConstellationWeaverGame() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [currentPath, setCurrentPath] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const level = CONSTELLATION_LEVELS[levelIndex];

  const handleStarClick = (starId) => {
    if (isCompleted) return;

    soundFx.collectStar();
    const newPath = [...currentPath, starId];
    setCurrentPath(newPath);

    // Check if the current path matches the target sequence prefix
    const expected = level.targetSequence;
    const isPrefixValid = newPath.every((id, idx) => id === expected[idx]);

    if (!isPrefixValid) {
      // Wrong path, shake / reset after short delay
      setTimeout(() => {
        soundFx.hitObstacle();
        setCurrentPath([]);
      }, 350);
      return;
    }

    // Check if completed full sequence
    if (newPath.length === expected.length) {
      setIsCompleted(true);
      soundFx.levelClear();

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c084fc', '#38bdf8', '#f472b6']
        });
      } catch {
        // safe
      }
    }
  };

  const handleReset = () => {
    setCurrentPath([]);
    setIsCompleted(false);
    setShowHint(false);
  };

  const handleNextLevel = () => {
    const nextIdx = (levelIndex + 1) % CONSTELLATION_LEVELS.length;
    setLevelIndex(nextIdx);
    setCurrentPath([]);
    setIsCompleted(false);
    setShowHint(false);
  };

  // Convert path ids into connected line segments
  const linesToDraw = [];
  for (let i = 0; i < currentPath.length - 1; i++) {
    const startStar = level.stars.find((s) => s.id === currentPath[i]);
    const endStar = level.stars.find((s) => s.id === currentPath[i + 1]);
    if (startStar && endStar) {
      linesToDraw.push({ start: startStar, end: endStar });
    }
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/10 bg-[#060818] shadow-2xl flex flex-col">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-white/[0.08] flex items-center justify-between bg-slate-950/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-violet-400 font-semibold font-mono-tabular">
              Constellation Weaver
            </span>
            <span className="text-xs text-slate-400">· Level {levelIndex + 1} of {CONSTELLATION_LEVELS.length}</span>
          </div>
          <h4 className="text-sm font-bold text-white font-display mt-0.5">
            {level.name}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
            title="Toggle Hint"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
            title="Reset Pattern"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Celestial Puzzle Canvas */}
      <div className="relative w-full h-[360px] bg-radial from-[#120a2e]/60 via-[#070918] to-[#04050e] overflow-hidden select-none">
        
        {/* Subtle grid and ambient dust */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 20px 30px, #e2e8f0, rgba(0,0,0,0)), radial-gradient(1px 1px at 140px 180px, #a78bfa, rgba(0,0,0,0))`,
            backgroundSize: '240px 240px'
          }}
        />

        {/* Drawn SVG Filaments */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <linearGradient id="puzzleLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Connected User Lines */}
          {linesToDraw.map((line, idx) => (
            <line
              key={idx}
              x1={`${line.start.x}%`}
              y1={`${line.start.y}%`}
              x2={`${line.end.x}%`}
              y2={`${line.end.y}%`}
              stroke="url(#puzzleLineGrad)"
              strokeWidth="2.5"
              className="drop-shadow-[0_0_8px_#c084fc]"
            />
          ))}

          {/* Hint Overlay Lines if requested */}
          {showHint &&
            level.targetSequence.map((starId, i) => {
              if (i === level.targetSequence.length - 1) return null;
              const s1 = level.stars.find((s) => s.id === starId);
              const s2 = level.stars.find((s) => s.id === level.targetSequence[i + 1]);
              if (!s1 || !s2) return null;
              return (
                <line
                  key={`hint-${i}`}
                  x1={`${s1.x}%`}
                  y1={`${s1.y}%`}
                  x2={`${s2.x}%`}
                  y2={`${s2.y}%`}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              );
            })}
        </svg>

        {/* Star Nodes */}
        {level.stars.map((star) => {
          const isActivated = currentPath.includes(star.id);
          const isNextExpected =
            currentPath.length < level.targetSequence.length &&
            level.targetSequence[currentPath.length] === star.id;

          return (
            <div
              key={star.id}
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                type="button"
                onClick={() => handleStarClick(star.id)}
                className="group relative flex flex-col items-center focus:outline-none"
                aria-label={`Star ${star.label}`}
              >
                <div
                  className={`rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActivated
                      ? 'w-9 h-9 bg-violet-600/50 ring-2 ring-violet-300 shadow-[0_0_20px_#c084fc] scale-110'
                      : showHint && isNextExpected
                      ? 'w-8 h-8 ring-2 ring-sky-400/80 animate-pulse bg-slate-900/80'
                      : 'w-7 h-7 bg-slate-900/80 ring-1 ring-white/20 hover:scale-125 hover:ring-violet-400'
                  }`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      isActivated
                        ? 'bg-white shadow-[0_0_8px_#ffffff]'
                        : 'bg-violet-400 group-hover:bg-white'
                    }`}
                  />
                </div>
                <span className="mt-1 text-[10px] font-mono-tabular text-slate-400 group-hover:text-white pointer-events-none">
                  {star.label}
                </span>
              </button>
            </div>
          );
        })}

        {/* Level Complete Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-3 z-30 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center shadow-[0_0_20px_#10b981]">
              <CheckCircle2 className="w-6 h-6 text-emerald-300" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              Constellation Reforged!
            </h3>
            <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
              {level.desc}
            </p>
            <button
              type="button"
              onClick={handleNextLevel}
              className="mt-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-violet-600 hover:bg-violet-500 rounded-lg shadow-lg transition-all flex items-center gap-2"
            >
              <span>Next Constellation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-5 py-2.5 bg-slate-950/80 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
        <span>Click stars in numerical order (1 → 2 → 3...) to link the pattern</span>
        {showHint && <span className="text-sky-300">Dotted lines show target guide</span>}
      </div>
    </div>
  );
}
