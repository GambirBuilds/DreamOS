/**
 * DreamOS Lucid Flight Mini-Game
 * Atmospheric 2D starlight glide game with dream particles and Web Audio chimes.
 */

import React, { useRef, useState, useEffect } from 'react';
import { Play, RotateCcw, Volume2, Trophy, Sparkles, ArrowRight } from 'lucide-react';
import { soundFx } from '../../utils/soundFx.js';

export default function LucidFlightGame() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('MENU'); // 'MENU' | 'PLAYING' | 'GAME_OVER'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return Number(localStorage.getItem('dreamos_lucid_highscore')) || 0;
    } catch {
      return 0;
    }
  });
  const [shardsCollected, setShardsCollected] = useState(0);

  // Mutable game state ref to avoid closure staleness in requestAnimationFrame
  const engineRef = useRef({
    birdY: 180,
    velocity: 0,
    gravity: 0.28,
    jumpPower: -5.6,
    pillars: [],
    shards: [],
    particles: [],
    frames: 0,
    currentScore: 0,
    currentShards: 0,
    animationId: null
  });

  const handleStartGame = () => {
    const engine = engineRef.current;
    engine.birdY = 180;
    engine.velocity = 0;
    engine.pillars = [];
    engine.shards = [];
    engine.particles = [];
    engine.frames = 0;
    engine.currentScore = 0;
    engine.currentShards = 0;

    setScore(0);
    setShardsCollected(0);
    setGameState('PLAYING');
  };

  const handleFlap = () => {
    if (gameState === 'PLAYING') {
      engineRef.current.velocity = engineRef.current.jumpPower;
      soundFx.glideJump();

      // Emit burst particles
      for (let i = 0; i < 5; i++) {
        engineRef.current.particles.push({
          x: 70,
          y: engineRef.current.birdY,
          vx: (Math.random() - 0.7) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          alpha: 1,
          color: '#c084fc'
        });
      }
    } else if (gameState === 'MENU' || gameState === 'GAME_OVER') {
      handleStartGame();
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        handleFlap();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Main game loop
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const engine = engineRef.current;

    const width = (canvas.width = 640);
    const height = (canvas.height = 360);

    let isRunning = true;

    const loop = () => {
      if (!isRunning) return;

      engine.frames++;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Starry Dream Background
      ctx.fillStyle = '#060818';
      ctx.fillRect(0, 0, width, height);

      // Subtle gradient haze
      const haze = ctx.createLinearGradient(0, 0, width, height);
      haze.addColorStop(0, 'rgba(168, 85, 247, 0.08)');
      haze.addColorStop(1, 'rgba(56, 189, 248, 0.06)');
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, width, height);

      // 2. Physics & Bird (Spirit Wisp)
      engine.velocity += engine.gravity;
      engine.birdY += engine.velocity;

      // Spawn Pillars & Shards every 100 frames
      if (engine.frames % 105 === 0) {
        const gap = 115;
        const minHeight = 45;
        const topHeight = Math.floor(Math.random() * (height - gap - minHeight * 2)) + minHeight;

        engine.pillars.push({
          x: width,
          top: topHeight,
          bottom: topHeight + gap,
          passed: false
        });

        // Spawn a collectible starlight shard in the gap
        engine.shards.push({
          x: width + 25,
          y: topHeight + gap / 2,
          size: 7,
          collected: false
        });
      }

      // 3. Move & Draw Pillars (Crystalline spires)
      for (let i = engine.pillars.length - 1; i >= 0; i--) {
        const p = engine.pillars[i];
        p.x -= 2.4;

        // Draw Top Crystal Spire
        const topGrad = ctx.createLinearGradient(p.x, 0, p.x + 48, p.top);
        topGrad.addColorStop(0, 'rgba(30, 27, 75, 0.9)');
        topGrad.addColorStop(1, 'rgba(147, 51, 234, 0.7)');
        ctx.fillStyle = topGrad;
        ctx.fillRect(p.x, 0, 48, p.top);

        ctx.strokeStyle = 'rgba(192, 132, 252, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(p.x, 0, 48, p.top);

        // Draw Bottom Crystal Spire
        const btmGrad = ctx.createLinearGradient(p.x, p.bottom, p.x + 48, height);
        btmGrad.addColorStop(0, 'rgba(147, 51, 234, 0.7)');
        btmGrad.addColorStop(1, 'rgba(30, 27, 75, 0.9)');
        ctx.fillStyle = btmGrad;
        ctx.fillRect(p.x, p.bottom, 48, height - p.bottom);

        ctx.strokeRect(p.x, p.bottom, 48, height - p.bottom);

        // Score check
        if (!p.passed && p.x + 48 < 70) {
          p.passed = true;
          engine.currentScore += 1;
          setScore(engine.currentScore);
        }

        // Collision Check (hitbox: bird at x=70, radius 12)
        const birdRadius = 10;
        if (70 + birdRadius > p.x && 70 - birdRadius < p.x + 48) {
          if (engine.birdY - birdRadius < p.top || engine.birdY + birdRadius > p.bottom) {
            triggerGameOver();
            return;
          }
        }

        if (p.x < -60) {
          engine.pillars.splice(i, 1);
        }
      }

      // 4. Move & Draw Shards
      for (let j = engine.shards.length - 1; j >= 0; j--) {
        const s = engine.shards[j];
        s.x -= 2.4;

        if (!s.collected) {
          // Floating diamond shard
          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(engine.frames * 0.04);
          ctx.fillStyle = '#38bdf8';
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.moveTo(0, -s.size);
          ctx.lineTo(s.size * 0.7, 0);
          ctx.lineTo(0, s.size);
          ctx.lineTo(-s.size * 0.7, 0);
          ctx.closePath();
          ctx.fill();
          ctx.restore();

          // Check Collision with bird
          const dist = Math.hypot(70 - s.x, engine.birdY - s.y);
          if (dist < 22) {
            s.collected = true;
            engine.currentShards += 1;
            engine.currentScore += 5; // Bonus for collecting shards
            setShardsCollected(engine.currentShards);
            setScore(engine.currentScore);
            soundFx.collectStar();

            // Emit sparkle burst
            for (let k = 0; k < 8; k++) {
              engine.particles.push({
                x: s.x,
                y: s.y,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                size: Math.random() * 3 + 1,
                alpha: 1,
                color: '#38bdf8'
              });
            }
          }
        }

        if (s.x < -30) {
          engine.shards.splice(j, 1);
        }
      }

      // 5. Draw Particle Trail
      engine.particles.push({
        x: 65,
        y: engine.birdY + (Math.random() - 0.5) * 4,
        vx: -1.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.5 + 1,
        alpha: 0.8,
        color: '#c084fc'
      });

      for (let pIdx = engine.particles.length - 1; pIdx >= 0; pIdx--) {
        const pt = engine.particles[pIdx];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= 0.025;

        if (pt.alpha <= 0) {
          engine.particles.splice(pIdx, 1);
        } else {
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = pt.alpha;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      }

      // 6. Draw Player Spirit Wisp
      ctx.save();
      ctx.shadowColor = 'rgba(192, 132, 252, 0.9)';
      ctx.shadowBlur = 18;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(70, engine.birdY, 11, 0, Math.PI * 2);
      ctx.fill();

      // Outer ethereal aura
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(70, engine.birdY, 15, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 7. Floor / Ceiling Bounds
      if (engine.birdY < 10 || engine.birdY > height - 10) {
        triggerGameOver();
        return;
      }

      engine.animationId = requestAnimationFrame(loop);
    };

    const triggerGameOver = () => {
      isRunning = false;
      soundFx.hitObstacle();
      setGameState('GAME_OVER');

      if (engine.currentScore > highScore) {
        setHighScore(engine.currentScore);
        try {
          localStorage.setItem('dreamos_lucid_highscore', engine.currentScore.toString());
        } catch {
          // safe
        }
      }
    };

    engine.animationId = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      cancelAnimationFrame(engine.animationId);
    };
  }, [gameState, highScore]);

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/10 bg-[#060818] shadow-2xl flex flex-col">
      {/* Top Game HUD */}
      <div className="px-5 py-3 border-b border-white/[0.08] flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-wider text-violet-400 font-semibold font-mono-tabular">
            Lucid Flight
          </span>
          <span className="text-xs text-slate-400">· Tap / Spacebar to Glide</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono-tabular">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Shards: {shardsCollected}</span>
          </div>
          <div className="flex items-center gap-1 text-white font-bold">
            <span>Score:</span>
            <span className="text-violet-300 text-sm">{score}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <Trophy className="w-3 h-3 text-amber-400" />
            <span>Best: {highScore}</span>
          </div>
        </div>
      </div>

      {/* Game Canvas Container */}
      <div
        className="relative w-full h-[360px] cursor-pointer select-none"
        onClick={handleFlap}
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Start Menu Overlay */}
        {gameState === 'MENU' && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-violet-950/80 border border-violet-500/40 flex items-center justify-center shadow-[0_0_20px_#a855f7]">
              <Sparkles className="w-6 h-6 text-violet-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">
                Lucid Flight
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mt-1 leading-relaxed">
                Guide your dream spirit through the crystalline spires. Collect starlight shards and stay afloat in the subconscious stream.
              </p>
            </div>
            <button
              type="button"
              onClick={handleStartGame}
              className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-violet-600 hover:bg-violet-500 rounded-lg shadow-lg shadow-violet-950 transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Begin Flight (Space / Click)</span>
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === 'GAME_OVER' && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fade-in">
            <span className="text-xs uppercase tracking-wider text-rose-400 font-mono-tabular font-semibold">
              Dream Stream Dissolved
            </span>
            <h3 className="text-2xl font-bold text-white font-display">
              Flight Concluded
            </h3>
            
            <div className="flex items-center gap-6 p-3 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono-tabular">
              <div>
                <span className="text-slate-400 block">Final Score</span>
                <span className="text-lg font-bold text-violet-300">{score}</span>
              </div>
              <div className="border-l border-white/10 pl-6">
                <span className="text-slate-400 block">Shards Collected</span>
                <span className="text-lg font-bold text-sky-300">{shardsCollected}</span>
              </div>
              <div className="border-l border-white/10 pl-6">
                <span className="text-slate-400 block">High Score</span>
                <span className="text-lg font-bold text-amber-300">{highScore}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartGame}
              className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-violet-600 hover:bg-violet-500 rounded-lg shadow-lg transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Fly Again</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Controls Bar */}
      <div className="px-5 py-2.5 bg-slate-950/80 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
        <span>Click screen or press [Spacebar] to stay aloft</span>
        <span className="text-[11px] text-violet-400 font-mono-tabular">+5 points per Starlight Shard</span>
      </div>
    </div>
  );
}
