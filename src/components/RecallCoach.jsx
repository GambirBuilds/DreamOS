/**
 * DreamOS Morning Recall Oracle & Lucid Reality Check Coach
 * Assists users in retrieving faint morning memories and practicing waking reality checks.
 */

import React, { useState } from 'react';
import { Eye, HelpCircle, Sparkles, CheckCircle2, RotateCw, Moon, Clock } from 'lucide-react';

export const RECALL_PROMPTS = [
  'What was the very first color or ambient light you witnessed before opening your eyes?',
  'Were you moving through air, water, or crossing an unfamiliar threshold?',
  'Who was standing with you, and what did their voice sound like?',
  'Did you hold a specific object, key, clock, or piece of paper in your hands?',
  'What emotion lingered on your skin the exact moment you woke up?'
];

export default function RecallCoach({ onSelectPrompt }) {
  const [activeTab, setActiveTab] = useState('recall'); // 'recall' | 'realityCheck'
  const [realityCheckCount, setRealityCheckCount] = useState(0);
  const [testResult, setTestResult] = useState(null);

  const handleRunRealityCheck = () => {
    // In waking reality, text and digits stay stable.
    setRealityCheckCount((c) => c + 1);
    setTestResult({
      status: 'STABLE',
      message: 'Digits and text remain invariant. You are currently in waking reality. Anchor this awareness so your subconscious performs this check inside dreams tonight!'
    });
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md space-y-4">
      {/* Tab Controls */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Moon className="w-4 h-4 text-violet-400" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
            Subconscious Assistant
          </h4>
        </div>

        <div className="flex items-center gap-1 p-0.5 bg-slate-950 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('recall')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeTab === 'recall' ? 'bg-violet-600 text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Morning Recall
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('realityCheck')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeTab === 'realityCheck' ? 'bg-violet-600 text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Reality Check
          </button>
        </div>
      </div>

      {/* Tab 1: Morning Recall Prompts */}
      {activeTab === 'recall' && (
        <div className="space-y-2">
          <p className="text-xs text-slate-400 leading-relaxed">
            Faint morning memories evaporate within minutes. Tap a sensory anchor below to stimulate subconscious retrieval:
          </p>
          <div className="space-y-1.5 pt-1">
            {RECALL_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectPrompt && onSelectPrompt(prompt)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-white/[0.04] hover:border-violet-500/40 text-xs text-slate-300 hover:text-white transition-all flex items-center justify-between group"
              >
                <span>“{prompt}”</span>
                <Sparkles className="w-3.5 h-3.5 text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Interactive Lucid Reality Check */}
      {activeTab === 'realityCheck' && (
        <div className="space-y-3">
          <p className="text-xs text-slate-400 leading-relaxed">
            Lucid dreaming occurs when you habitually question reality. In dreams, text, clocks, and finger counts constantly mutate.
          </p>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-white/[0.06] text-center space-y-3">
            <div className="flex items-center justify-center gap-2 font-mono-tabular text-sm text-slate-300">
              <Clock className="w-4 h-4 text-violet-400" />
              <span>Current Waking Time: {new Date().toLocaleTimeString()}</span>
            </div>

            <button
              type="button"
              onClick={handleRunRealityCheck}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-white/10 transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <Eye className="w-3.5 h-3.5 text-sky-400" />
              <span>Perform Reality Check ({realityCheckCount} today)</span>
            </button>

            {testResult && (
              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs text-left animate-fade-in flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                <p className="leading-snug">{testResult.message}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
