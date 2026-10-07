/**
 * DreamOS Dream World Page
 * Signature experience featuring World Overview, Interactive Cartography, and Immersive Full-Screen Exploration.
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Map,
  Sparkles,
  Share2,
  BookOpen,
  ArrowLeft,
  Users,
  Shield,
  Layers,
  Zap,
  Eye,
  Radio
} from 'lucide-react';
import { storageService } from '../services/storageService.js';
import { useDreamColor } from '../context/DreamColorContext.jsx';
import DreamMap from '../components/DreamMap.jsx';
import DreamExplorer from '../components/DreamExplorer.jsx';

export default function DreamWorldPage({ onShareDream }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { syncWithDreamMood } = useDreamColor();

  const [dream, setDream] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'map' | 'explorer'
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const found = storageService.getDreamById(id);
    if (found) {
      setDream(found);
      setSelectedLocation(found.generatedWorld?.locations?.[0] || null);
      syncWithDreamMood(found.mood);
    } else {
      // Fallback to first available dream or demo
      const all = storageService.getDreams();
      if (all.length > 0) {
        setDream(all[0]);
        setSelectedLocation(all[0].generatedWorld?.locations?.[0] || null);
        syncWithDreamMood(all[0].mood);
      }
    }

    return () => {
      syncWithDreamMood(null);
    };
  }, [id]);

  if (!dream) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white font-display">Dimension Not Found</h2>
        <p className="text-sm text-slate-400">
          The requested dream realm could not be localized in memory.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-violet-600 rounded-lg hover:bg-violet-500"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const { generatedWorld, analysis } = dream;
  const locations = generatedWorld?.locations || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <Link
            to="/journal"
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
            title="Back to Journal"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-0.5">
              <span>Dream Dimension</span>
              <span aria-hidden="true">·</span>
              <span className="text-violet-400 font-medium">{dream.mood}</span>
              <span aria-hidden="true">·</span>
              <span>Intensity {dream.intensity}/10</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">
              {generatedWorld?.worldName || dream.title}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onShareDream && onShareDream(dream)}
            className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-white/10 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5 text-violet-400" />
            <span>Share World</span>
          </button>

          <Link
            to="/create"
            className="px-3.5 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>New Dream</span>
          </Link>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-950/80 border border-white/[0.08] rounded-xl max-w-md">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'overview'
              ? 'text-white shadow-sm font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
          style={activeTab === 'overview' ? {
            background: 'linear-gradient(135deg, var(--dream-primary), var(--dream-secondary))',
            boxShadow: '0 2px 10px -2px var(--dream-glow)'
          } : {}}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>World Overview</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('map')}
          className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'map'
              ? 'text-white shadow-sm font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
          style={activeTab === 'map' ? {
            background: 'linear-gradient(135deg, var(--dream-primary), var(--dream-secondary))',
            boxShadow: '0 2px 10px -2px var(--dream-glow)'
          } : {}}
        >
          <Map className="w-3.5 h-3.5" />
          <span>Interactive Map</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('explorer')}
          className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'explorer'
              ? 'text-white shadow-sm font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
          style={activeTab === 'explorer' ? {
            background: 'linear-gradient(135deg, var(--dream-primary), var(--dream-secondary))',
            boxShadow: '0 2px 10px -2px var(--dream-glow)'
          } : {}}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Exploration Mode</span>
        </button>
      </div>

      {/* TAB 1: WORLD OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          {/* World Hero Banner */}
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-violet-950/40 via-slate-900/80 to-indigo-950/40 border border-violet-500/20 backdrop-blur-xl relative overflow-hidden space-y-6">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs uppercase tracking-widest text-violet-400 font-semibold font-mono-tabular">
                Domain Environment
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                {generatedWorld?.environment}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed italic">
                {generatedWorld?.tagline}
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.08] text-xs">
              <div>
                <span className="text-slate-400 block mb-1">Atmospheric Signature</span>
                <span className="text-slate-200 font-medium font-mono-tabular">{generatedWorld?.atmosphere}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Dominant Mood</span>
                <span className="text-violet-300 font-medium">{generatedWorld?.dominantMood}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Dream Energy</span>
                <span className="text-emerald-400 font-medium font-mono-tabular">{generatedWorld?.dreamEnergy}%</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Total Locations</span>
                <span className="text-slate-200 font-medium font-mono-tabular">{locations.length} Connected Beacons</span>
              </div>
            </div>
          </div>

          {/* Subconscious Characters & Guides */}
          {generatedWorld?.characters && generatedWorld.characters.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-violet-400" />
                <h3 className="text-lg font-bold text-white font-display">
                  Subconscious Entities & Guides
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedWorld.characters.map((char) => (
                  <div
                    key={char.name}
                    className="p-5 rounded-xl bg-slate-900/60 border border-white/[0.06] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-white">{char.name}</h4>
                      <span className="text-[11px] text-violet-400 font-mono-tabular">{char.role}</span>
                    </div>
                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      {char.dialogue}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Locations List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Map className="w-4 h-4 text-violet-400" />
                <h3 className="text-lg font-bold text-white font-display">
                  Important Locations
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('map')}
                className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
              >
                View on Interactive Map →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {locations.map((loc) => (
                <div
                  key={loc.id}
                  className="p-5 rounded-xl bg-slate-900/50 hover:bg-slate-900/80 border border-white/[0.06] hover:border-violet-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono-tabular">
                      <span className="text-violet-400 font-medium">{loc.atmosphere}</span>
                    </div>
                    <h4 className="text-base font-semibold text-white mb-2">{loc.name}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-3">
                      {loc.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      {loc.dreamObjects?.length || 0} Artifacts
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedLocation(loc);
                        setActiveTab('explorer');
                      }}
                      className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      Explore Here →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE MAP */}
      {activeTab === 'map' && (
        <div className="animate-fade-in space-y-4">
          <DreamMap
            locations={locations}
            currentLocationId={selectedLocation?.id}
            onSelectLocation={(loc) => setSelectedLocation(loc)}
            onEnterExplorationMode={(loc) => {
              setSelectedLocation(loc);
              setActiveTab('explorer');
            }}
          />
        </div>
      )}

      {/* TAB 3: IMMERSIVE EXPLORATION MODE */}
      {activeTab === 'explorer' && (
        <div className="animate-fade-in">
          <DreamExplorer
            dream={dream}
            initialLocation={selectedLocation || locations[0]}
            onExit={() => setActiveTab('overview')}
            onLocationChange={(loc) => setSelectedLocation(loc)}
          />
        </div>
      )}
    </div>
  );
}
