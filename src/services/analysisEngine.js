/**
 * DreamOS Local Intelligence & Analysis Engine
 * Deterministic semantic interpreter for dream narratives.
 * Transparent: "AI-style interpretation generated from your dream description"
 */

import { SYMBOL_DICTIONARY } from '../utils/constants.js';

// Keyword to thematic mood correlation
const MOOD_KEYWORDS = {
  Peaceful: ['calm', 'quiet', 'water', 'lake', 'gentle', 'soft', 'breathe', 'rest', 'sleep', 'ocean', 'float', 'sunlight', 'warm'],
  Mysterious: ['shadow', 'hidden', 'secret', 'crystal', 'mask', 'fog', 'veil', 'whisper', 'strange', 'tower', 'ancient', 'stars'],
  Happy: ['light', 'laugh', 'dance', 'fly', 'sun', 'bright', 'friend', 'joy', 'smile', 'flower', 'gold', 'celebrate'],
  Romantic: ['love', 'kiss', 'embrace', 'heart', 'rose', 'warmth', 'hold', 'beloved', 'tender', 'glow', 'candle'],
  Dark: ['abyss', 'fall', 'run', 'trap', 'black', 'chase', 'monster', 'storm', 'night', 'empty', 'fear', 'lost'],
  Surreal: ['melt', 'fly', 'impossible', 'mirror', 'clock', 'time', 'reverse', 'sky', 'colors', 'gravity', 'door', 'dream'],
  Adventurous: ['climb', 'mountain', 'journey', 'sword', 'castle', 'explore', 'ship', 'island', 'travel', 'discover', 'quest'],
  Nostalgic: ['childhood', 'house', 'old', 'mother', 'father', 'school', 'past', 'train', 'toy', 'remember', 'street', 'yesterday']
};

const ARCHETYPES = [
  { name: 'The Astral Architect', test: (text) => /city|tower|bridge|building|palace|construct/i.test(text) },
  { name: 'The Submerged Seeker', test: (text) => /water|ocean|sea|river|swim|dive|fish|depth/i.test(text) },
  { name: 'The Chrono Pilgrim', test: (text) => /train|clock|time|station|journey|track|road/i.test(text) },
  { name: 'The Forest Mystic', test: (text) => /forest|tree|wood|moss|leaf|grove|wild/i.test(text) },
  { name: 'The Sky Nomad', test: (text) => /fly|cloud|wind|wing|feather|sky|stars/i.test(text) },
  { name: 'The Threshold Weaver', test: () => true } // fallback
];

export function analyzeDream({ title = '', description = '', mood = '', intensity = 7, category = 'Fantasy' }) {
  const combinedText = `${title} ${description}`.toLowerCase();
  const words = combinedText.match(/\b[a-z]{3,}\b/g) || [];

  // 1. Detect or refine Mood
  let primaryMood = mood || 'Mysterious';
  if (!mood || mood === 'Unknown') {
    let topMood = 'Mysterious';
    let maxMatches = -1;
    for (const [mName, keywords] of Object.entries(MOOD_KEYWORDS)) {
      const matchCount = keywords.filter((kw) => combinedText.includes(kw)).length;
      if (matchCount > maxMatches) {
        maxMatches = matchCount;
        topMood = mName;
      }
    }
    primaryMood = topMood;
  }

  // 2. Extract Recurring Keywords (excluding common stop words)
  const stopWords = new Set([
    'the', 'and', 'was', 'that', 'with', 'for', 'this', 'were', 'from', 'they',
    'there', 'where', 'when', 'into', 'then', 'them', 'their', 'about', 'could',
    'would', 'some', 'what', 'have', 'been', 'which', 'through', 'felt', 'walked'
  ]);

  const frequency = {};
  for (const w of words) {
    if (!stopWords.has(w) && w.length > 3) {
      frequency[w] = (frequency[w] || 0) + 1;
    }
  }

  const recurringKeywords = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([w]) => w);

  // If few keywords detected, pull from title
  if (recurringKeywords.length < 3) {
    const titleWords = (title.toLowerCase().match(/\b[a-z]{4,}\b/g) || []).filter((w) => !stopWords.has(w));
    titleWords.forEach((tw) => {
      if (!recurringKeywords.includes(tw)) recurringKeywords.push(tw);
    });
    if (recurringKeywords.length === 0) recurringKeywords.push('horizon', 'wonder', 'memory');
  }

  // 3. Detect Symbols & Themes
  const themes = new Set();
  const detectedSymbols = [];

  for (const [key, val] of Object.entries(SYMBOL_DICTIONARY)) {
    if (combinedText.includes(key)) {
      themes.add(val.theme);
      detectedSymbols.push(key.charAt(0).toUpperCase() + key.slice(1));
    }
  }

  // Baseline themes if text had few matches
  if (themes.size === 0) {
    if (primaryMood === 'Peaceful') {
      themes.add('Stillness');
      themes.add('Harmony');
    } else if (primaryMood === 'Mysterious' || primaryMood === 'Surreal') {
      themes.add('Exploration');
      themes.add('Unseen Dimensions');
    } else if (primaryMood === 'Adventurous') {
      themes.add('Courage');
      themes.add('Discovery');
    } else if (primaryMood === 'Nostalgic') {
      themes.add('Memory');
      themes.add('Passage of Time');
    } else {
      themes.add('Transformation');
      themes.add('Curiosity');
    }
  }
  themes.add(category === 'Other' ? 'Transcendence' : category);

  // 4. Important Objects
  const importantObjects = detectedSymbols.length >= 2
    ? detectedSymbols.slice(0, 4)
    : [
        'Astral Compass',
        recurringKeywords[0] ? `${capitalize(recurringKeywords[0])} of Light` : 'Crystal Key',
        'Luminous Gateway',
        'Mirror of Whispers'
      ];

  // 5. Possible Emotions
  const emotionsMap = {
    Peaceful: ['Deep Serenity', 'Weightlessness', 'Gentle Solace', 'Quiet Wonder'],
    Mysterious: ['Intrigue', 'Sacred Reverence', 'Subtle Trepidation', 'Fascination'],
    Happy: ['Luminous Joy', 'Expansive Freedom', 'Warm Connection', 'Vitality'],
    Romantic: ['Tenderness', 'Poetic Longing', 'Intimacy', 'Euphoria'],
    Dark: ['Cathartic Tension', 'Vigilance', 'Shadow Integration', 'Awakening'],
    Surreal: ['Disorientation', 'Childlike Wonder', 'Perceptual Freedom', 'Astonishment'],
    Adventurous: ['Exhilaration', 'Audacity', 'Triumphant Resolve', 'Thrill'],
    Nostalgic: ['Bittersweet Warmth', 'Reverie', 'Gentle Yearning', 'Gratitude'],
    Unknown: ['Curiosity', 'Expectancy', 'Openness', 'Awe']
  };

  const possibleEmotions = emotionsMap[primaryMood] || ['Awe', 'Contemplation', 'Wonder', 'Release'];

  // 6. Dream Archetype
  const matchedArchetype = ARCHETYPES.find((a) => a.test(combinedText));
  const dreamArchetype = matchedArchetype ? matchedArchetype.name : 'The Astral Wanderer';

  // 7. Environment & Atmosphere synthesis
  let environment = '';
  if (/water|ocean|sea|lake|river/i.test(combinedText)) {
    environment = 'Luminous subterranean waters under a twilight celestial dome';
  } else if (/cloud|sky|fly|flying|air/i.test(combinedText)) {
    environment = 'Suspended crystalline architecture floating within perpetual sunset';
  } else if (/forest|tree|wood|jungle/i.test(combinedText)) {
    environment = 'Sentient bioluminescent canopy with whispering ancient roots';
  } else if (/train|station|rail|road|car/i.test(combinedText)) {
    environment = 'An antique transit line suspended above an infinite mirror basin';
  } else if (/city|street|building|tower/i.test(combinedText)) {
    environment = 'Prismatic metropolis humming with harmonic frequencies';
  } else {
    environment = `An ethereal dreamscape attuned to ${primaryMood.toLowerCase()} consciousness`;
  }

  const atmosphereAdjectives = {
    Peaceful: 'Still · Phosphorescent Cerulean · Weightless',
    Mysterious: 'Veiled · Amber & Violet · Resonant Silence',
    Happy: 'Sunlit · Radiant Amber · Weightless Euphoria',
    Romantic: 'Soft Rose · Velveteen Dusk · Intimate Glow',
    Dark: 'Deep Obsidian · Distant Lightning · Charged Silence',
    Surreal: 'Prismatic · Fluid Geometry · Dream Logic',
    Adventurous: 'Brisk Wind · Golden Dawn · Vast Horizons',
    Nostalgic: 'Warm Sepia · Rainy Twilight · Gentle Music',
    Unknown: 'Cosmic Indigo · Uncharted Coordinates · Infinite Potential'
  };

  const atmosphere = atmosphereAdjectives[primaryMood] || 'Surreal + cinematic';

  // 8. Narrative Structure
  const narrativeStructure = `${capitalize(recurringKeywords[0] || 'Vision')} Incites Journey → Crossing the Subconscious Threshold → Confronting the Core Archetype → Still Epiphany`;

  // 9. Intensity and Energy
  const parsedIntensity = Number(intensity) || 7;
  const energySignature = Math.min(99, Math.max(35, Math.round(parsedIntensity * 9.5 + Math.random() * 5)));

  return {
    primaryMood,
    intensity: parsedIntensity,
    themes: Array.from(themes).slice(0, 4),
    environment,
    atmosphere,
    importantObjects,
    possibleEmotions,
    recurringKeywords,
    archetype: dreamArchetype,
    narrativeStructure,
    energySignature
  };
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
