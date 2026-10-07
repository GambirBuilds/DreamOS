/**
 * DreamOS Cinematic Hero Section
 * Lightweight canvas-based starry cosmos + glowing dream atmosphere.
 */

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles, MapPin } from 'lucide-react';

export default function Hero({ onExploreClick, demoDreams = [] }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Subtle drifting stars with dreamy chromatic tints
    const starColors = [
      'rgba(224, 231, 255, ',
      'rgba(192, 132, 252, ',
      'rgba(56, 189, 248, ',
      'rgba(244, 114, 182, '
    ];

    const stars = Array.from({ length: 75 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.9 + 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulseVal: Math.random() * Math.PI,
      colorBase: starColors[Math.floor(Math.random() * starColors.length)]
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render gentle drifting stars
      for (const star of stars) {
        star.x += star.speedX;
        star.y += star.speedY;
        star.pulseVal += star.pulseSpeed;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const currentAlpha = Math.max(0.1, star.alpha + Math.sin(star.pulseVal) * 0.25);
        ctx.fillStyle = `${star.colorBase}${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-12 pb-16">
      {/* Background Canvas for Star Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Atmospheric Dream Color Radial Gradients */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] blur-[130px] rounded-full pointer-events-none transition-all duration-1000 opacity-60"
        style={{
          background: 'radial-gradient(ellipse at center, var(--dream-primary) 0%, transparent 70%)'
        }}
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 right-1/4 w-[450px] h-[320px] blur-[120px] rounded-full pointer-events-none transition-all duration-1000 opacity-50"
        style={{
          background: 'radial-gradient(ellipse at center, var(--dream-secondary) 0%, transparent 70%)'
        }}
        aria-hidden="true"
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        
        {/* Cinematic Headline */}
        <div className="space-y-3">
          <p 
            className="text-xs uppercase tracking-[0.3em] font-semibold font-mono-tabular transition-colors"
            style={{ color: 'var(--dream-primary)' }}
          >
            DreamOS Platform
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white font-display leading-[1.08] text-balance">
            Turn Your Dreams <br className="hidden sm:inline" />
            <span 
              className="bg-clip-text text-transparent transition-all duration-700"
              style={{
                backgroundImage: 'linear-gradient(135deg, var(--dream-primary) 0%, var(--dream-secondary) 50%, var(--dream-accent) 100%)'
              }}
            >
              Into Worlds.
            </span>
          </h1>
        </div>

        {/* Supporting Text */}
        <p className="max-w-xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
          Write a dream. DreamOS transforms your imagination into an interactive experience.
        </p>

        {/* CTA Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/create"
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 whitespace-nowrap shadow-lg"
            style={{
              background: 'linear-gradient(135deg, var(--dream-primary), var(--dream-secondary))',
              boxShadow: '0 8px 25px -4px var(--dream-glow)'
            }}
          >
            <span>Create Your Dream</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-900/70 hover:bg-slate-800/90 border border-white/10 hover:border-violet-400/40 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap backdrop-blur-sm"
          >
            <Compass className="w-4 h-4" style={{ color: 'var(--dream-primary)' }} />
            <span>Explore DreamOS</span>
          </button>
        </div>

        {/* Quick Demo Previews */}
        {demoDreams.length > 0 && (
          <div className="pt-12">
            <p className="text-xs text-slate-400 mb-4 font-medium uppercase tracking-wider">
              Or instantly jump into a demo dream world:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
              {demoDreams.slice(0, 4).map((d) => (
                <Link
                  key={d.id}
                  to={`/world/${d.id}`}
                  className="p-3 rounded-lg bg-slate-900/50 hover:bg-slate-800/70 border border-white/[0.08] hover:border-violet-500/40 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] text-violet-400 font-medium block mb-1">
                      {d.mood} · {d.intensity}/10
                    </span>
                    <h3 className="text-xs font-semibold text-white group-hover:text-violet-200 line-clamp-1">
                      {d.title}
                    </h3>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-slate-200">
                    <MapPin className="w-3 h-3 text-violet-400 shrink-0" />
                    <span className="truncate">Enter World</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
