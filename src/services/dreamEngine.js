/**
 * DreamOS Core Dream Engine
 * Handles exploration mechanics, action resolution, event triggers, and state progression.
 */

import { analyzeDream } from './analysisEngine.js';
import { generateDreamWorld } from './worldGenerator.js';
import { storageService } from './storageService.js';

export const ACTION_TYPES = [
  { id: 'explore', label: 'Explore', icon: 'Compass', cost: -4, desc: 'Venture deeper into the terrain' },
  { id: 'lookAround', label: 'Look Around', icon: 'Eye', cost: 6, desc: 'Observe ambient details and recharge energy' },
  { id: 'followLight', label: 'Follow Light', icon: 'Sparkles', cost: -5, desc: 'Track mysterious luminescent trails' },
  { id: 'openMemory', label: 'Open Memory', icon: 'BookOpen', cost: -6, desc: 'Unearth a hidden subconscious resonance' },
  { id: 'discover', label: 'Discover', icon: 'Search', cost: -5, desc: 'Search for hidden dream objects' }
];

export function createNewDream({ title, description, mood, intensity, category }) {
  const analysis = analyzeDream({ title, description, mood, intensity, category });
  const generatedWorld = generateDreamWorld({ title, description, mood, intensity, category }, analysis);

  const newDream = {
    id: `dream-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    isDemo: false,
    title: title.trim() || 'Untitled Dream',
    createdAt: new Date().toISOString(),
    date: new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date()),
    mood: analysis.primaryMood,
    intensity: analysis.intensity,
    category: category || 'Fantasy',
    description: description.trim(),
    analysis,
    generatedWorld,
    exploredLocations: [generatedWorld.locations[0]?.id].filter(Boolean),
    unlockedMemories: [],
    explorationCount: 0
  };

  return storageService.saveDream(newDream);
}

/**
 * Execute an exploration action within a location
 */
export function executeExplorationAction(dream, location, actionId, currentEnergy = 80) {
  if (!location) {
    return {
      narrative: 'You stand at the edge of the realm, waiting for the mists to clear.',
      newEnergy: currentEnergy,
      eventTriggered: null,
      memoryUnlocked: null,
      objectFound: null
    };
  }

  const action = ACTION_TYPES.find((a) => a.id === actionId) || ACTION_TYPES[0];
  let deltaEnergy = action.cost;
  let newEnergy = Math.min(100, Math.max(15, currentEnergy + deltaEnergy));

  let narrative = '';
  let memoryUnlocked = null;
  let objectFound = null;
  let eventTriggered = null;

  // 25% chance to trigger an unexpected dynamic event from the world
  if (Math.random() < 0.28 && dream.generatedWorld?.dynamicEvents?.length > 0) {
    const events = dream.generatedWorld.dynamicEvents;
    eventTriggered = events[Math.floor(Math.random() * events.length)];
  }

  switch (actionId) {
    case 'explore': {
      const paths = [
        `You tread softly through ${location.name}. The ground beneath you radiates a quiet pulse, and a pathway composed of geometric starlight opens toward the horizon.`,
        `Descending through the quiet perimeter of ${location.name}, you discover an undisturbed corridor where shadows take on the color of pale amethyst.`,
        `A gentle updraft carries you across the threshold. In the distance, the skyline ripples like a canvas stirred by a midnight wind.`
      ];
      narrative = paths[Math.floor(Math.random() * paths.length)];
      break;
    }

    case 'lookAround': {
      narrative = `You pause and breathe in the atmosphere of ${location.name} (${location.atmosphere}). Ambient vibrations settle your thoughts, restoring +6% dream energy. You notice how the ambient lighting mirrors the rhythm of your heartbeat.`;
      break;
    }

    case 'followLight': {
      const lights = [
        `A filament of golden radiance loops around your wrist like a silver thread, leading you toward an arched alcove you hadn't noticed before.`,
        `Bioluminescent particles scatter in your wake, revealing etched glyphs on the walls that glow softly before fading.`,
        `A beam of filtered starlight pierces the canopy, illuminating a floating dais inscribed with ancient astronomical diagrams.`
      ];
      narrative = lights[Math.floor(Math.random() * lights.length)];
      break;
    }

    case 'openMemory': {
      if (location.discoveredMemories && location.discoveredMemories.length > 0) {
        const mem = location.discoveredMemories[Math.floor(Math.random() * location.discoveredMemories.length)];
        memoryUnlocked = mem;
        narrative = `A ripple echoes through your subconscious. Memory Unlocked: “${mem}” The air warms with familiar nostalgia.`;
      } else {
        narrative = `You close your eyes and listen. A forgotten conversation from long ago whispers across the wind, leaving a lingering sense of peace.`;
      }
      break;
    }

    case 'discover': {
      if (location.dreamObjects && location.dreamObjects.length > 0) {
        const obj = location.dreamObjects[Math.floor(Math.random() * location.dreamObjects.length)];
        objectFound = obj;
        narrative = `Among the crystalline strata, you unearth a rare relic: [${obj}]. Its surface hums with the residual frequency of your dream.`;
      } else {
        narrative = `You discover a pocket of crystallized light, cool and reassuring against your palm.`;
      }
      break;
    }

    default: {
      narrative = `You navigate through ${location.name}, taking in its boundless scale.`;
    }
  }

  // Record exploration in storage
  if (dream.id) {
    storageService.recordExploration(dream.id, location.id, memoryUnlocked);
  }

  return {
    narrative,
    newEnergy,
    eventTriggered,
    memoryUnlocked,
    objectFound
  };
}
