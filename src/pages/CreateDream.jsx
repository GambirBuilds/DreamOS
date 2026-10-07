/**
 * DreamOS Create Dream Page
 * Beautiful dream editor with real-time mood/intensity controls, sample prompts,
 * synthesis sequence, and seamless transition into the generated world.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Compass, Lightbulb, Sliders, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DREAM_MOODS, DREAM_CATEGORIES, SAMPLE_PROMPTS } from '../utils/constants.js';
import { getIntensityLabel } from '../utils/helpers.js';
import { createNewDream } from '../services/dreamEngine.js';
import DreamAnalyzer from '../components/DreamAnalyzer.jsx';
import RecallCoach from '../components/RecallCoach.jsx';

export default function CreateDream() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mood, setMood] = useState('Mysterious');
  const [intensity, setIntensity] = useState(7);
  const [category, setCategory] = useState('Fantasy');

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [createdDream, setCreatedDream] = useState(null);

  const handleApplyPrompt = (prompt) => {
    setTitle(prompt.title);
    setDescription(prompt.text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsGenerating(true);
    setGenerationStep('Synthesizing dream dimensions & atmospheres...');

    // Atmospheric sequence simulation
    setTimeout(() => {
      setGenerationStep('Extracting subconscious archetypes & symbols...');
    }, 600);

    setTimeout(() => {
      setGenerationStep('Constructing interactive cartography & coordinates...');
    }, 1200);

    setTimeout(() => {
      const dream = createNewDream({
        title: title || 'Untitled Dream Dimension',
        description,
        mood,
        intensity,
        category
      });

      // Fire subtle celebratory confetti
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#a78bfa', '#818cf8', '#38bdf8']
        });
      } catch (err) {
        // Safe fallback
      }

      setCreatedDream(dream);
      setIsGenerating(false);
    }, 1800);
  };

  const handleProceedToWorld = () => {
    if (createdDream) {
      navigate(`/world/${createdDream.id}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Title */}
      <div className="space-y-2 text-center max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold font-mono-tabular">
          Creation Terminal
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">
          Record Your Dream
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed text-balance">
          Transcribe your vision below. DreamOS will map its emotional landscape, construct an interactive world, and reveal hidden symbols.
        </p>
      </div>

      {/* Generation Overlay / Status */}
      {isGenerating && (
        <div className="p-12 rounded-2xl bg-slate-900/90 border border-violet-500/30 text-center space-y-4 backdrop-blur-xl animate-pulse">
          <div className="w-12 h-12 mx-auto rounded-full bg-violet-950 border border-violet-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-violet-300 animate-spin" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">
            Materializing Dream Dimension...
          </h3>
          <p className="text-xs sm:text-sm text-violet-300 font-mono-tabular">
            {generationStep}
          </p>
        </div>
      )}

      {/* If Dream Has Just Been Generated, Show Analyzer First */}
      {!isGenerating && createdDream && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Dream dimension successfully synthesized & saved to your journal!</span>
            </div>
            <button
              type="button"
              onClick={() => setCreatedDream(null)}
              className="text-emerald-400 hover:underline"
            >
              Record Another
            </button>
          </div>

          <DreamAnalyzer
            analysis={createdDream.analysis}
            title={createdDream.title}
            onContinueToWorld={handleProceedToWorld}
          />
        </div>
      )}

      {/* Dream Input Form */}
      {!isGenerating && !createdDream && (
        <form onSubmit={handleSubmit} className="bg-slate-900/60 border border-white/[0.08] rounded-2xl p-6 sm:p-10 space-y-8 backdrop-blur-sm">
          
          {/* Sample Presets Inspiration */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Prompt Inspiration (Click to load):</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_PROMPTS.map((p) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => handleApplyPrompt(p)}
                  className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-950/60 hover:bg-slate-800 border border-white/10 hover:border-violet-500/40 rounded-lg transition-colors text-left"
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* Dream Title */}
          <div className="space-y-2">
            <label htmlFor="dream-title" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Dream Title
            </label>
            <input
              id="dream-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The City Above the Clouds"
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors text-sm"
            />
          </div>

          {/* Dream Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="dream-description" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Dream Description <span className="text-violet-400">*</span>
              </label>
              <span className="text-xs text-slate-500 font-mono-tabular">
                {description.length} characters
              </span>
            </div>
            <textarea
              id="dream-description"
              required
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="I was walking through an immense city floating above the clouds. The streets were made of polished obsidian, and when I looked down..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors text-sm leading-relaxed"
            />
          </div>

          {/* Controls: Mood, Intensity, Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Mood Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="dream-mood" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Dream Mood
                </label>
                <span 
                  className="w-2.5 h-2.5 rounded-full transition-all"
                  style={{
                    backgroundColor: DREAM_MOODS.find(m => m.id === mood)?.color || 'var(--dream-primary)',
                    boxShadow: `0 0 10px ${DREAM_MOODS.find(m => m.id === mood)?.color || 'var(--dream-primary)'}`
                  }}
                />
              </div>
              <select
                id="dream-mood"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
              >
                {DREAM_MOODS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Selector */}
            <div className="space-y-2">
              <label htmlFor="dream-category" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Category
              </label>
              <select
                id="dream-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
              >
                {DREAM_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Intensity Slider (1-10) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="dream-intensity" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Intensity: <span className="font-mono-tabular" style={{ color: 'var(--dream-primary)' }}>{intensity}/10</span>
                </label>
                <span className="text-[11px] text-slate-400 font-medium">
                  {getIntensityLabel(intensity)}
                </span>
              </div>
              <input
                id="dream-intensity"
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg cursor-pointer"
                style={{ accentColor: 'var(--dream-primary)' }}
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={!description.trim()}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, var(--dream-primary), var(--dream-secondary))',
                boxShadow: '0 8px 25px -4px var(--dream-glow)'
              }}
            >
              <Sparkles className="w-4 h-4" />
              <span>ENTER DREAM</span>
            </button>
          </div>
        </form>
      )}

      {/* Subconscious Assistant & Lucid Reality Coach */}
      {!isGenerating && !createdDream && (
        <div className="pt-2">
          <RecallCoach
            onSelectPrompt={(prompt) => {
              setDescription((prev) => (prev ? `${prev} I recall that: ${prompt}` : `I recall that: ${prompt}`));
            }}
          />
        </div>
      )}
    </div>
  );
}
