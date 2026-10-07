/**
 * DreamOS Centralized Storage Service
 * Provides resilient, safe localStorage access with auto-recovery on corruption.
 */

import { INITIAL_DEMO_DREAMS } from '../data/dreamData.js';

const STORAGE_KEY = 'dreamos_saved_dreams_v1';
const SETTINGS_KEY = 'dreamos_user_settings_v1';

export const storageService = {
  /**
   * Safely retrieve all saved dreams. If corrupt or missing, restores initial demo dreams.
   */
  getDreams: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        // Initialize with default demo dreams
        storageService.saveAll(INITIAL_DEMO_DREAMS);
        return INITIAL_DEMO_DREAMS;
      }

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        storageService.saveAll(INITIAL_DEMO_DREAMS);
        return INITIAL_DEMO_DREAMS;
      }

      return parsed;
    } catch (err) {
      console.warn('DreamOS Storage: Corrupted data detected. Recovering demo dreams.', err);
      try {
        storageService.saveAll(INITIAL_DEMO_DREAMS);
      } catch (innerErr) {
        console.error('DreamOS Storage: Failed to write initial data', innerErr);
      }
      return INITIAL_DEMO_DREAMS;
    }
  },

  /**
   * Save an entire array of dreams safely.
   */
  saveAll: (dreams) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dreams));
      return true;
    } catch (err) {
      console.error('DreamOS Storage: Quota exceeded or storage unavailable', err);
      return false;
    }
  },

  /**
   * Get a single dream by ID
   */
  getDreamById: (id) => {
    const dreams = storageService.getDreams();
    return dreams.find((d) => d.id === id) || null;
  },

  /**
   * Save or insert a new dream (prepending to front)
   */
  saveDream: (newDream) => {
    const dreams = storageService.getDreams();
    const existingIndex = dreams.findIndex((d) => d.id === newDream.id);

    let updated;
    if (existingIndex >= 0) {
      updated = [...dreams];
      updated[existingIndex] = { ...updated[existingIndex], ...newDream, updatedAt: new Date().toISOString() };
    } else {
      updated = [newDream, ...dreams];
    }

    storageService.saveAll(updated);
    return newDream;
  },

  /**
   * Rename or update fields of a dream
   */
  updateDream: (id, updates) => {
    const dreams = storageService.getDreams();
    const index = dreams.findIndex((d) => d.id === id);
    if (index === -1) return null;

    const updatedDream = {
      ...dreams[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    const newDreams = [...dreams];
    newDreams[index] = updatedDream;
    storageService.saveAll(newDreams);
    return updatedDream;
  },

  /**
   * Delete a dream by ID
   */
  deleteDream: (id) => {
    const dreams = storageService.getDreams();
    const filtered = dreams.filter((d) => d.id !== id);
    storageService.saveAll(filtered);
    return filtered;
  },

  /**
   * Update exploration state (e.g. visited locations, unlocked memories)
   */
  recordExploration: (dreamId, locationId, memoryDiscovered = null) => {
    const dream = storageService.getDreamById(dreamId);
    if (!dream) return null;

    const currentExplored = dream.exploredLocations || [];
    const newExplored = currentExplored.includes(locationId)
      ? currentExplored
      : [...currentExplored, locationId];

    const currentMemories = dream.unlockedMemories || [];
    const newMemories = memoryDiscovered && !currentMemories.includes(memoryDiscovered)
      ? [...currentMemories, memoryDiscovered]
      : currentMemories;

    const explorationCount = (dream.explorationCount || 0) + 1;

    return storageService.updateDream(dreamId, {
      exploredLocations: newExplored,
      unlockedMemories: newMemories,
      explorationCount
    });
  },

  /**
   * Factory reset back to original 4 demo dreams
   */
  resetToDefaults: () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_DREAMS));
      return INITIAL_DEMO_DREAMS;
    } catch (err) {
      console.error('DreamOS Storage: Reset failed', err);
      return INITIAL_DEMO_DREAMS;
    }
  }
};
