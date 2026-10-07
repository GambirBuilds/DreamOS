/**
 * DreamOS About & Architecture Page
 * Explains platform vision, local intelligence principles, and future decoupled AI architecture.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Layers,
  Cpu,
  ShieldCheck,
  ArrowRight,
  Code2,
  Workflow
} from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold font-mono-tabular">
          Philosophy & Architecture
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-white font-display">
          About DreamOS
        </h1>
        <p className="text-base text-slate-300 leading-relaxed text-balance">
          An experimental platform transforming written human dreams into interactive digital experiences.
        </p>
      </div>

      {/* Vision Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white font-display">
          The Product Vision
        </h2>
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            Dreams are the most vivid storytelling medium in existence. Yet historically, they have been confined to fleeting morning notes or lost forever upon waking.
          </p>
          <p>
            <strong>DreamOS</strong> was built to treat dreams as living worlds. By transcribing a dream, our semantic engine synthesizes its subconscious archetypes, extracts atmospheric signatures, and renders an explorable universe equipped with interactive cartography, unexpected narrative events, and memory constellations.
          </p>
        </div>
      </section>

      {/* Section 26: Transparency & Local Intelligence */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white font-display">
          Engine Transparency
        </h2>
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-3 text-sm text-slate-300 leading-relaxed">
          <p>
            DreamOS V1 is powered by <strong>DreamOS Intelligence</strong>, a deterministic local semantic engine that executes directly inside your web browser without sending your private dreams to any external servers or third-party cloud models.
          </p>
          <p className="text-xs text-slate-400">
            We do not make deceptive claims about black-box neural networks. All analysis is creative interpretation designed for artistic inspiration, contemplation, and immersive entertainment.
          </p>
        </div>
      </section>

      {/* Section 27: Future AI Roadmap Architecture */}
      <section className="space-y-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-violet-400 font-semibold font-mono-tabular">
            System Design
          </span>
          <h2 className="text-xl font-bold text-white font-display mt-1">
            Future AI Pipeline Architecture
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            DreamOS is architected so that advanced generative models can be plugged in seamlessly via serverless proxy adapters in future iterations:
          </p>
        </div>

        {/* Visual Pipeline Diagram */}
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-violet-500/30 space-y-4 font-mono-tabular text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-2 items-center text-center">
            <div className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white font-medium">
              User Dream Text
            </div>
            <div className="text-violet-400">↓</div>
            <div className="p-3 rounded-lg bg-slate-900 border border-white/10 text-violet-300 font-medium">
              Theme Extraction
            </div>
            <div className="text-violet-400">↓</div>
            <div className="p-3 rounded-lg bg-slate-900 border border-white/10 text-indigo-300 font-medium">
              World Generator
            </div>
            <div className="text-violet-400">↓</div>
            <div className="p-3 rounded-lg bg-violet-900/40 border border-violet-500 text-white font-bold">
              Interactive Dimension
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-white/[0.06]">
            <h4 className="font-semibold text-white mb-1">Decoupled Architecture</h4>
            <p className="text-slate-400 leading-relaxed">
              Clean separation of the analysis engine, world synthesis, and exploration layer enables rapid swaps of LLM inference layers.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-white/[0.06]">
            <h4 className="font-semibold text-white mb-1">Zero Key Exposure</h4>
            <p className="text-slate-400 leading-relaxed">
              No private API keys are ever bundled or exposed in client JavaScript bundles.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-white/[0.06]">
            <h4 className="font-semibold text-white mb-1">Vercel-First Deployment</h4>
            <p className="text-slate-400 leading-relaxed">
              Engineered as a clean, static frontend application ready for instant deployment to Vercel and modern CDNs.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="pt-6 text-center">
        <Link
          to="/create"
          className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all shadow-lg shadow-violet-950"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch DreamOS Now</span>
        </Link>
      </div>
    </div>
  );
}
