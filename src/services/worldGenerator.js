/**
 * DreamOS World Generator Engine
 * Transforms dream analysis into an explorable, interconnected interactive universe.
 */

const WORLD_PREFIXES = {
  Mysterious: ['Aethelgard', 'Noctis', 'Vespera', 'Kaelum', 'Onyx'],
  Peaceful: ['Thalassa', 'Arcadia', 'Solace', 'Elysium', 'Aura'],
  Happy: ['Solaris', 'Luminea', 'Aethel', 'Jovian', 'Valora'],
  Romantic: ['Amoria', 'Serenata', 'Rosalia', 'Cyrene', 'Velours'],
  Dark: ['Erebus', 'Umbral', 'Abyssia', 'Styx', 'Vortext'],
  Surreal: ['Mirabilia', 'Chrono-Shift', 'Kaleida', 'Axiom', 'Paradox'],
  Adventurous: ['Zephyros', 'Boreas', 'Ascendant', 'Vanguard', 'Pioneer'],
  Nostalgic: ['Astraea', 'Mementa', 'Veridian', 'Hesperus', 'Chronos'],
  Unknown: ['Nebula', 'Genesis', 'Cosmica', 'Void-Gate', 'Anima']
};

const WORLD_SUFFIXES = [
  'The Cloud Zenith',
  'The Silent Reach',
  'The Mirror Sanctuary',
  'The Starlit Basin',
  'The Echo Chamber',
  'The Eternal Archipelago',
  'The Luminous Verge',
  'The Hidden Axis'
];

export function generateDreamWorld(dream, analysis) {
  const mood = analysis.primaryMood || dream.mood || 'Mysterious';
  const prefixes = WORLD_PREFIXES[mood] || WORLD_PREFIXES.Mysterious;
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = WORLD_SUFFIXES[Math.floor(Math.random() * WORLD_SUFFIXES.length)];
  const worldName = `${prefix}: ${dream.title || suffix}`;

  // Tagline based on mood and themes
  const primaryTheme = analysis.themes[0] || 'Imagination';
  const tagline = `An explorable subconscious realm anchored by ${primaryTheme.toLowerCase()} and ${mood.toLowerCase()} resonance.`;

  // Generate interconnected locations
  const locations = buildLocations(dream, analysis, mood);

  // Characters
  const characters = buildCharacters(mood, analysis);

  // Dynamic events pool
  const dynamicEvents = [
    'A door of woven starlight materializes directly in your path.',
    'The horizon shifts color from deep violet to warm incandescent gold.',
    'A soft chime rings through the air, causing all ambient movement to pause.',
    'Gravity gently lessens; you can take steps that linger in the air.',
    'A mysterious silver key appears floating inches from your outstretched fingers.',
    'Whispers in a forgotten tongue ripple across the surfaces around you.',
    'A childhood memory you hadn’t recalled in years crystallizes in crystal clarity.',
    'The sky dissolves into a swirling nebula of constellations and thoughts.'
  ];

  return {
    worldName,
    tagline,
    environment: analysis.environment,
    atmosphere: analysis.atmosphere,
    dominantMood: mood,
    dreamEnergy: analysis.energySignature || 80,
    characters,
    dynamicEvents,
    locations
  };
}

function buildLocations(dream, analysis, mood) {
  const baseKeyword = analysis.recurringKeywords[0] || 'horizon';
  const secondKeyword = analysis.recurringKeywords[1] || 'sanctuary';

  const locTemplates = [
    {
      name: `${capitalize(baseKeyword)} Gateway`,
      x: 22,
      y: 35,
      atmosphere: 'Veiled Entrance · Cool Air',
      description: `The grand entrance to this realm where the boundaries of waking reality dissolve into ${mood.toLowerCase()} stillness.`,
      discoveredMemories: [
        `The sensation of crossing an ancient bridge into uncharted territory.`,
        `A forgotten feeling that anything imagined could instantly become tangible.`
      ],
      dreamObjects: ['Threshold Key', 'Vessel of Pale Light'],
      hiddenMeaning: 'Readiness to leave behind familiar constraints in pursuit of inner clarity.',
      connectedIndices: [1, 2]
    },
    {
      name: `Sanctuary of ${capitalize(secondKeyword)}`,
      x: 52,
      y: 20,
      atmosphere: 'Luminous · Resonant Hums',
      description: 'An elevated sanctum crafted from translucent geometric stone, humming with vibrations that align your pulse.',
      discoveredMemories: [
        'A moment in time when all noise ceased and you were completely at peace.',
        'Words spoken by someone dear whose voice still echoes in dreams.'
      ],
      dreamObjects: ['Prism of Still Thoughts', 'Ancient Sundial Needle'],
      hiddenMeaning: 'An inner safehouse of wisdom that remains unaffected by daily stress.',
      connectedIndices: [0, 2, 3]
    },
    {
      name: 'The Mirror Bridge',
      x: 48,
      y: 65,
      atmosphere: 'Weightless · Star Reflections',
      description: 'A delicate span constructed of solid liquid light, suspended over a bottomless expanse of shimmering memories.',
      discoveredMemories: [
        'Seeing your reflection wave back with eyes full of quiet understanding.',
        'The realization that past mistakes were merely stepping stones.'
      ],
      dreamObjects: ['Silver Shard of Reflection', 'Feather of Azure Fog'],
      hiddenMeaning: 'Integration between who you were yesterday and who you are becoming.',
      connectedIndices: [0, 1, 4]
    },
    {
      name: 'The Clockwork Observatory',
      x: 78,
      y: 32,
      atmosphere: 'Antique Brass · Ticking Stars',
      description: 'An astronomical tower where giant brass gears chart the orbits of your private hopes and desires.',
      discoveredMemories: [
        'A childhood obsession with stargazing through a small bedroom window.',
        'The desire to halt time during a perfect, fleeting afternoon.'
      ],
      dreamObjects: ['Perpetual Chronometer', 'Star Map on Silk'],
      hiddenMeaning: 'Coming to terms with the inevitable flow of time and cherishing the present.',
      connectedIndices: [1, 4]
    },
    {
      name: 'The Infinite Abyss of Light',
      x: 75,
      y: 78,
      atmosphere: 'Deep Indigo · Vast Horizon',
      description: 'The outermost rim of the dream world, where the landscape dissolves into infinite cosmic potential.',
      discoveredMemories: [
        'The exhilarating terror and freedom of letting go completely.',
        'A flash of intuitive insight that solves an unresolved waking dilemma.'
      ],
      dreamObjects: ['Core of a Fallen Comet', 'Tear of Pure Aurora'],
      hiddenMeaning: 'Unbounded creative potential waiting to be brought back into conscious life.',
      connectedIndices: [2, 3]
    }
  ];

  return locTemplates.map((loc, idx) => ({
    id: `loc-gen-${idx + 1}`,
    name: loc.name,
    x: loc.x,
    y: loc.y,
    atmosphere: loc.atmosphere,
    description: loc.description,
    discoveredMemories: loc.discoveredMemories,
    dreamObjects: loc.dreamObjects,
    hiddenMeaning: loc.hiddenMeaning,
    connectedLocations: loc.connectedIndices.map((i) => `loc-gen-${i + 1}`)
  }));
}

function buildCharacters(mood, analysis) {
  const primaryTheme = analysis.themes[0] || 'Discovery';

  return [
    {
      name: `The Guardian of ${primaryTheme}`,
      role: 'Subconscious Guide',
      dialogue: `“Every stone you touch in this place has waited for your return. Look beneath the surface.”`
    },
    {
      name: 'The Drifting Chronicler',
      role: 'Keeper of Echoes',
      dialogue: `“What you write in dreams is never forgotten; it merely changes shape in the waking world.”`
    }
  ];
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
