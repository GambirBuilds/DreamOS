/**
 * DreamOS Dream Statistics & Subconscious Insights
 * Visual analytics powered by Recharts + dynamic pattern recognition and ethical disclaimer.
 */

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import {
  PieChart as PieIcon,
  Sparkles,
  TrendingUp,
  Flame,
  Layers,
  Compass,
  AlertCircle,
  Hash
} from 'lucide-react';
import { storageService } from '../services/storageService.js';
import { DREAM_MOODS } from '../utils/constants.js';

export default function Insights() {
  const [dreams, setDreams] = useState([]);

  useEffect(() => {
    setDreams(storageService.getDreams());
  }, []);

  const totalDreams = dreams.length;

  // 1. Calculate Average Intensity
  const avgIntensity = totalDreams > 0
    ? (dreams.reduce((acc, d) => acc + (Number(d.intensity) || 0), 0) / totalDreams).toFixed(1)
    : 0;

  // 2. Calculate Mood Frequencies
  const moodCounts = {};
  dreams.forEach((d) => {
    const m = d.mood || 'Unknown';
    moodCounts[m] = (moodCounts[m] || 0) + 1;
  });

  const moodChartData = Object.entries(moodCounts).map(([mood, count]) => {
    const cfg = DREAM_MOODS.find((m) => m.id === mood);
    return {
      mood,
      count,
      color: cfg ? cfg.color : '#8b5cf6'
    };
  });

  const mostCommonMood = moodChartData.sort((a, b) => b.count - a.count)[0]?.mood || 'Mysterious';

  // 3. Calculate Recurring Themes
  const themeCounts = {};
  dreams.forEach((d) => {
    d.analysis?.themes?.forEach((t) => {
      themeCounts[t] = (themeCounts[t] || 0) + 1;
    });
  });

  const topThemes = Object.entries(themeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([theme, count]) => ({ theme, count }));

  const mostFrequentTheme = topThemes[0]?.theme || 'Exploration';

  // 4. Calculate Recurring Symbols
  const symbolCounts = {};
  dreams.forEach((d) => {
    d.analysis?.importantObjects?.forEach((obj) => {
      symbolCounts[obj] = (symbolCounts[obj] || 0) + 1;
    });
  });

  const topSymbols = Object.entries(symbolCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([symbol]) => symbol);

  // 5. Total Explorations
  const totalExplorations = dreams.reduce((acc, d) => acc + (d.explorationCount || 0), 0);

  // 6. Intensity timeline for area/line chart
  const intensityData = [...dreams]
    .reverse()
    .map((d, idx) => ({
      name: `D${idx + 1}`,
      title: d.title,
      intensity: d.intensity
    }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div>
        <span className="text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold font-mono-tabular">
          Subconscious Analytics
        </span>
        <h1 className="text-3xl font-bold text-white font-display mt-1">
          Dream Statistics & Patterns
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Aggregated quantitative metrics and qualitative patterns synthesized across your recorded dream journal.
        </p>
      </div>

      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-2">
          <span className="text-xs text-slate-400 block">Total Dreams</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white font-mono-tabular">{totalDreams}</span>
            <span className="text-xs text-violet-400">Dimensions</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-2">
          <span className="text-xs text-slate-400 block">Dominant Mood</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white truncate">{mostCommonMood}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-2">
          <span className="text-xs text-slate-400 block">Average Intensity</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white font-mono-tabular">{avgIntensity}</span>
            <span className="text-xs text-slate-400">/ 10</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-2">
          <span className="text-xs text-slate-400 block">Lead Archetype Motif</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-violet-300 truncate">{mostFrequentTheme}</span>
          </div>
        </div>
      </div>

      {/* Recharts Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mood Distribution Chart */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-4">
          <div>
            <h3 className="text-base font-semibold text-white font-display">
              Mood Distribution
            </h3>
            <p className="text-xs text-slate-400">
              Emotional frequency of your dream memories.
            </p>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moodChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="mood" stroke="#64748b" fontSize={11} interval={0} angle={-20} textAnchor="end" />
                <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]}>
                  {moodChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Intensity Progression */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-4">
          <div>
            <h3 className="text-base font-semibold text-white font-display">
              Lucidity & Intensity Sequence
            </h3>
            <p className="text-xs text-slate-400">
              Intensity trajectory across chronologically recorded dreams.
            </p>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={intensityData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" domain={[0, 10]} fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  formatter={(value, name, props) => [`${value}/10`, props.payload.title || 'Intensity']}
                />
                <Line
                  type="monotone"
                  dataKey="intensity"
                  stroke="var(--dream-primary)"
                  strokeWidth={2.5}
                  dot={{ fill: 'var(--dream-primary)', r: 4 }}
                  activeDot={{ r: 6, fill: 'var(--dream-secondary)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Section 14: Your Dream Patterns */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-violet-400 font-semibold font-mono-tabular">
            Synthesized Insights
          </span>
          <h2 className="text-2xl font-bold text-white font-display mt-1">
            Your Recurring Dream Patterns
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            These thematic motifs recur frequently across your subconscious archives:
          </p>
        </div>

        {/* Dynamic Pattern Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topThemes.map((t, idx) => (
            <div
              key={t.theme}
              className="p-5 rounded-2xl bg-slate-950/70 border border-white/[0.06] space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-violet-400 font-mono-tabular">
                  Pattern 0{idx + 1}
                </span>
                <span className="text-[11px] text-slate-400 font-mono-tabular">
                  {t.count} Occurrences
                </span>
              </div>
              <h4 className="text-base font-semibold text-white">
                {t.theme}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Appears as a central pillar across your dreams, reflecting deep subconscious resonance.
              </p>
            </div>
          ))}

          {/* Recurring Symbols Card */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-white/[0.06] space-y-1.5 sm:col-span-2 lg:col-span-1">
            <span className="text-[11px] text-violet-400 font-mono-tabular">
              Common Subconscious Relics
            </span>
            <h4 className="text-base font-semibold text-white">
              Recurring Objects
            </h4>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {topSymbols.length > 0 ? (
                topSymbols.map((sym) => (
                  <span
                    key={sym}
                    className="text-xs text-slate-300 font-mono-tabular"
                  >
                    • {sym}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400">Record more dreams to reveal recurring symbols.</span>
              )}
            </div>
          </div>
        </div>

        {/* Ethical Medical & Psychological Disclaimer (Mandatory) */}
        <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-500/20 flex items-start gap-3 text-xs text-slate-400 leading-relaxed">
          <AlertCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-300">Disclaimer:</strong> DreamOS provides creative interpretations for entertainment, artistic inspiration, and personal reflection. It does not provide psychological, neurological, or medical diagnoses.
          </p>
        </div>
      </div>
    </div>
  );
}
