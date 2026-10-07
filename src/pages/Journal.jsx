/**
 * DreamOS Personal Dream Journal & Memory System
 * Search, mood & category filtering, sorting, grid/timeline toggle, rename & delete operations.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  Clock,
  Sparkles,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Calendar,
  Layers,
  ArrowRight,
  Download,
  Upload,
  Printer,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { storageService } from '../services/storageService.js';
import { exportService } from '../services/exportService.js';
import { DREAM_MOODS, DREAM_CATEGORIES } from '../utils/constants.js';
import DreamCard from '../components/DreamCard.jsx';

export default function Journal({ onShareDream }) {
  const [dreams, setDreams] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'intensity_desc' | 'intensity_asc'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'timeline'
  const [feedback, setFeedback] = useState(null);
  const fileInputRef = useRef(null);
  
  // Rename Modal state
  const [renamingDream, setRenamingDream] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const loadDreams = () => {
    setDreams(storageService.getDreams());
  };

  useEffect(() => {
    loadDreams();
  }, []);

  const handleExportJson = () => {
    exportService.exportToJson(dreams);
    showNotice('Exported full dream vault JSON backup!');
  };

  const handleExportMarkdown = () => {
    exportService.exportToMarkdown(dreams);
    showNotice('Exported Markdown journal for Obsidian/Notion!');
  };

  const handlePrintDossier = () => {
    window.print();
  };

  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const res = await exportService.importFromJson(file);
    if (res.success) {
      loadDreams();
      showNotice(`Successfully imported ${res.count} new dream dimensions!`);
    } else {
      showNotice(res.error || 'Failed to import backup.', true);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const showNotice = (msg, isError = false) => {
    setFeedback({ msg, isError });
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you wish to dissolve this dream from your journal?')) {
      storageService.deleteDream(id);
      loadDreams();
    }
  };

  const handleStartRename = (dream) => {
    setRenamingDream(dream);
    setNewTitle(dream.title);
  };

  const handleSaveRename = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !renamingDream) return;
    storageService.updateDream(renamingDream.id, { title: newTitle.trim() });
    setRenamingDream(null);
    loadDreams();
  };

  // Filter & Sort Pipeline
  const filteredDreams = dreams
    .filter((d) => {
      const matchesSearch =
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.analysis?.archetype || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesMood = selectedMood === 'All' || d.mood === selectedMood;
      const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;

      return matchesSearch && matchesMood && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }
      if (sortBy === 'intensity_desc') {
        return (b.intensity || 0) - (a.intensity || 0);
      }
      if (sortBy === 'intensity_asc') {
        return (a.intensity || 0) - (b.intensity || 0);
      }
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold font-mono-tabular">
            Subconscious Archives
          </span>
          <h1 className="text-3xl font-bold text-white font-display mt-1">
            Dream Journal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {dreams.length} recorded dimensions stored safely in your local browser memory.
          </p>
        </div>

        {/* Action Controls & Vault Tools */}
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportFile}
            accept=".json"
            className="hidden"
          />

          <button
            type="button"
            onClick={handleExportJson}
            className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/70 hover:bg-slate-800 border border-white/10 rounded-lg transition-colors flex items-center gap-1.5"
            title="Export full JSON backup"
          >
            <Download className="w-3.5 h-3.5 text-violet-400" />
            <span>Export JSON</span>
          </button>

          <button
            type="button"
            onClick={handleExportMarkdown}
            className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/70 hover:bg-slate-800 border border-white/10 rounded-lg transition-colors flex items-center gap-1.5"
            title="Export Markdown journal"
          >
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>Export .MD</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/70 hover:bg-slate-800 border border-white/10 rounded-lg transition-colors flex items-center gap-1.5"
            title="Import JSON backup"
          >
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span>Import Vault</span>
          </button>

          <button
            type="button"
            onClick={handlePrintDossier}
            className="p-2 text-slate-400 hover:text-white bg-slate-900/70 hover:bg-slate-800 border border-white/10 rounded-lg transition-colors"
            title="Print Journal Dossier"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>

          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors shadow-sm ml-1"
          >
            <Plus className="w-4 h-4" />
            <span>Record Dream</span>
          </Link>
        </div>
      </div>

      {/* Vault Feedback Notification */}
      {feedback && (
        <div
          className={`p-3 rounded-xl border text-xs flex items-center gap-2 animate-fade-in ${
            feedback.isError
              ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{feedback.msg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search Input */}
        <div className="lg:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dreams by title, text, or archetype..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
        </div>

        {/* Mood Filter */}
        <div>
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900/80 border border-white/10 text-white focus:outline-none focus:border-violet-500"
          >
            <option value="All">All Moods</option>
            {DREAM_MOODS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900/80 border border-white/10 text-white focus:outline-none focus:border-violet-500"
          >
            <option value="All">All Categories</option>
            {DREAM_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort & View Options */}
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-900/80 border border-white/10 text-white focus:outline-none focus:border-violet-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="intensity_desc">Highest Intensity</option>
            <option value="intensity_asc">Lowest Intensity</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-slate-900/80 border border-white/10 rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('timeline')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'timeline' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Timeline View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Dreams Display */}
      {filteredDreams.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-white/[0.06] space-y-4">
          <p className="text-sm text-slate-400">
            No dreams matched your active filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedMood('All');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredDreams.map((dream) => (
            <DreamCard
              key={dream.id}
              dream={dream}
              onShare={onShareDream}
              onDelete={handleDelete}
              onRename={handleStartRename}
            />
          ))}
        </div>
      ) : (
        /* Visual Timeline View: Dream → Analysis → Exploration → Discovery */
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-violet-900/40 animate-fade-in">
          {filteredDreams.map((dream) => (
            <div key={dream.id} className="relative group">
              {/* Timeline beacon dot */}
              <div className="absolute -left-6 sm:-left-8 top-4 w-3 h-3 rounded-full bg-violet-500 ring-4 ring-[#050711] shadow-[0_0_8px_#8b5cf6]" />

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-violet-500/30 transition-all space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-violet-400 font-medium">{dream.mood}</span>
                    <span aria-hidden="true">·</span>
                    <span>Intensity {dream.intensity}/10</span>
                    <span aria-hidden="true">·</span>
                    <span>{dream.category}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono-tabular">
                    {dream.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white font-display">
                  <Link to={`/world/${dream.id}`} className="hover:text-violet-200">
                    {dream.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  “{dream.description}”
                </p>

                {/* Subconscious Progression Pathway */}
                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.04] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-slate-500 block">01. Emotion</span>
                    <span className="text-slate-300 font-medium">{dream.mood}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-500 block">02. Archetype</span>
                    <span className="text-violet-300 font-medium">{dream.analysis?.archetype || 'Seeker'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-500 block">03. World Realm</span>
                    <span className="text-slate-300 font-medium truncate block">{dream.generatedWorld?.worldName || 'Realm'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-500 block">04. Locations</span>
                    <span className="text-emerald-400 font-medium font-mono-tabular">
                      {dream.generatedWorld?.locations?.length || 0} Beacons
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-400">
                    {dream.unlockedMemories?.length || 0} Memories Discovered
                  </span>
                  <Link
                    to={`/world/${dream.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors"
                  >
                    <span>Enter World</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rename Dream Modal */}
      {renamingDream && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleSaveRename}
            className="w-full max-w-sm p-6 rounded-2xl bg-slate-900 border border-white/10 space-y-4 shadow-2xl"
          >
            <h3 className="text-base font-bold text-white font-display">
              Rename Dream
            </h3>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-violet-500"
              autoFocus
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRenamingDream(null)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-violet-600 rounded-lg hover:bg-violet-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
