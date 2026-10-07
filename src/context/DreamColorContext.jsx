/**
 * DreamOS Dream Color Context
 * Manages chromatic dream palettes, dynamic CSS variable injection, and mood synchronization.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DREAM_COLOR_THEMES, DREAM_MOODS } from '../utils/constants.js';

const DreamColorContext = createContext(null);

const STORAGE_THEME_KEY = 'dreamos_dream_color_theme_v1';

export function DreamColorProvider({ children }) {
  const [activeThemeId, setActiveThemeId] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_THEME_KEY) || 'aurora';
    } catch {
      return 'aurora';
    }
  });

  const [activeMoodOverride, setActiveMoodOverride] = useState(null);

  // Current theme object
  const currentTheme = DREAM_COLOR_THEMES.find((t) => t.id === activeThemeId) || DREAM_COLOR_THEMES[0];

  // Update CSS custom variables whenever theme or mood changes
  useEffect(() => {
    const root = document.documentElement;

    let primary = currentTheme.primary;
    let secondary = currentTheme.secondary;
    let accent = currentTheme.accent;
    let glow = currentTheme.glowColor;
    let subGlow = currentTheme.secondaryGlow;

    // If an active dream mood is overriding (e.g. inside a dream world)
    if (activeMoodOverride) {
      const moodConfig = DREAM_MOODS.find((m) => m.id === activeMoodOverride);
      if (moodConfig) {
        primary = moodConfig.color;
        secondary = moodConfig.secondaryColor || '#38bdf8';
        accent = moodConfig.color;
        glow = moodConfig.aura || 'rgba(168, 85, 247, 0.4)';
        subGlow = 'rgba(56, 189, 248, 0.25)';
      }
    }

    root.style.setProperty('--dream-primary', primary);
    root.style.setProperty('--dream-secondary', secondary);
    root.style.setProperty('--dream-accent', accent);
    root.style.setProperty('--dream-glow', glow);
    root.style.setProperty('--dream-subglow', subGlow);
    root.style.setProperty('--dream-border', `${primary}33`);
  }, [activeThemeId, activeMoodOverride, currentTheme]);

  const selectTheme = (themeId) => {
    setActiveMoodOverride(null); // Clear override
    setActiveThemeId(themeId);
    try {
      localStorage.setItem(STORAGE_THEME_KEY, themeId);
    } catch (e) {
      // safe fallback
    }
  };

  const syncWithDreamMood = (mood) => {
    if (mood) {
      setActiveMoodOverride(mood);
    } else {
      setActiveMoodOverride(null);
    }
  };

  return (
    <DreamColorContext.Provider
      value={{
        activeThemeId,
        theme: currentTheme,
        selectTheme,
        themes: DREAM_COLOR_THEMES,
        activeMoodOverride,
        syncWithDreamMood
      }}
    >
      {children}
    </DreamColorContext.Provider>
  );
}

export function useDreamColor() {
  const context = useContext(DreamColorContext);
  if (!context) {
    throw new Error('useDreamColor must be used within a DreamColorProvider');
  }
  return context;
}
