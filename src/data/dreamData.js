/**
 * Initial Demo Dreams & World Templates for DreamOS
 */

export const INITIAL_DEMO_DREAMS = [
  {
    id: 'demo-city-clouds',
    isDemo: true,
    title: 'The City Above the Clouds',
    createdAt: '2026-09-28T14:20:00.000Z',
    date: 'September 28, 2026',
    mood: 'Mysterious',
    intensity: 8,
    category: 'Fantasy',
    description: 'I was walking through an immense city floating above the clouds. Towers made of translucent crystal hummed with quiet resonance, and luminous bridges connected islands of ancient stone suspended in golden air. Shadows drifted upward, and time moved like slow water.',
    analysis: {
      primaryMood: 'Mysterious',
      intensity: 8,
      themes: ['Freedom', 'Exploration', 'Transcendence', 'Discovery'],
      environment: 'Floating crystalline metropolis suspended in perpetual dusk',
      atmosphere: 'Weightless · Quiet Resonance · Amber & Violet Horizon',
      importantObjects: ['Crystal Spire', 'Moon Bridge', 'Ascending Shadows', 'Clockwork Observatory'],
      possibleEmotions: ['Awe', 'Detachment', 'Yearning', 'Quiet Courage'],
      recurringKeywords: ['clouds', 'floating', 'crystal', 'bridges', 'towers'],
      archetype: 'The Astral Architect',
      narrativeStructure: 'Ascent → Crossing the Threshold → Contemplation from the Heights',
      energySignature: 84
    },
    generatedWorld: {
      worldName: 'Aethelgard: The Cloud Zenith',
      tagline: 'A silent aerial sanctuary where memory floats like vapor',
      environment: 'Suspended crystalline architecture over an endless sea of vapor',
      atmosphere: 'Quiet · Azure & Amber · Weightless',
      dominantMood: 'Mysterious',
      dreamEnergy: 84,
      characters: [
        { name: 'The Cloud Cartographer', role: 'Keeper of drifting horizons', dialogue: '“The sky has no borders, only memories waiting to precipitate.”' },
        { name: 'A Flute Player of Glass', role: 'Resonance weaver', dialogue: '“Listen closely; the stones remember yesterday’s wind.”' }
      ],
      dynamicEvents: [
        'A staircase of solid light crystallizes beneath the cloud terrace.',
        'The amber horizon suddenly pulses with a deep harmonic chime.',
        'Gravity reverses for a gentle moment; fallen feathers drift skyward.',
        'An ancient copper compass spins counterclockwise in your palm.'
      ],
      locations: [
        {
          id: 'loc-cloud-city',
          name: 'Cloud City Plaza',
          x: 25,
          y: 40,
          atmosphere: 'Spacious · Cool Breeze · Pale Gold',
          description: 'A grand open pavilion tiled with polished obsidian and pearl, hanging effortlessly above billowing cumulonimbus formations.',
          discoveredMemories: [
            'A faint memory of running across an open field before the world had ceilings.',
            'The scent of ozone and morning mist just before the sun breaks through.'
          ],
          dreamObjects: ['Prismatic Sun Dial', 'Feather of White Quartz'],
          hiddenMeaning: 'A longing to escape suffocating routines and view problems from supreme height.',
          connectedLocations: ['loc-crystal-tower', 'loc-moon-bridge']
        },
        {
          id: 'loc-crystal-tower',
          name: 'Crystal Tower',
          x: 55,
          y: 25,
          atmosphere: 'Quiet · Blue · Weightless',
          description: 'A needle-thin spire carved from a single hexagonal sapphire monolith that hums gently with subterranean echoes.',
          discoveredMemories: [
            'Whispers of forgotten promises spoken into cold evening air.',
            'A book whose pages turned by themselves to reveal empty starlight.'
          ],
          dreamObjects: ['Resonating Tuning Fork', 'Starlight Prism'],
          hiddenMeaning: 'The search for absolute mental clarity amid overwhelming noise.',
          connectedLocations: ['loc-cloud-city', 'loc-forgotten-station']
        },
        {
          id: 'loc-moon-bridge',
          name: 'Moon Bridge',
          x: 45,
          y: 70,
          atmosphere: 'Soft Luminescence · Silver Mist',
          description: 'An arched span forged from solid moonlight that arches between two floating basalt islands.',
          discoveredMemories: [
            'The sensation of crossing an irreversible threshold with peaceful acceptance.',
            'Footsteps that made no sound as the horizon dissolved.'
          ],
          dreamObjects: ['Silver Handrail Dust', 'Floating Lantern'],
          hiddenMeaning: 'Reconciliation between past regrets and future anticipations.',
          connectedLocations: ['loc-cloud-city', 'loc-ocean-stars']
        },
        {
          id: 'loc-forgotten-station',
          name: 'Forgotten Sky Station',
          x: 80,
          y: 45,
          atmosphere: 'Antique Rust · Amber Lanterns · Echoes',
          description: 'An aerial platform where brass gondolas once anchored. Vintage route timetables flicker with constellations.',
          discoveredMemories: [
            'Waiting for a departure that never happened, yet feeling no sorrow.',
            'The clatter of mechanical departure boards ticking into silence.'
          ],
          dreamObjects: ['Pocket Chronometer', 'Blank Transit Pass'],
          hiddenMeaning: 'Acknowledging missed junctions in life without self-reproach.',
          connectedLocations: ['loc-crystal-tower', 'loc-ocean-stars']
        },
        {
          id: 'loc-ocean-stars',
          name: 'Ocean of Stars',
          x: 75,
          y: 80,
          atmosphere: 'Deep Indigo · Infinite · Serene',
          description: 'The bottomless abyss beneath the cloud layers where distant galaxies shimmer like phosphorescent plankton.',
          discoveredMemories: [
            'Realizing that falling into the infinite feels identical to flying.',
            'A sudden overwhelming sense of belonging to the cosmos.'
          ],
          dreamObjects: ['Fallen Meteorite Seed', 'Mirror of Dark Nebula'],
          hiddenMeaning: 'Trusting the vast unknown rather than fearing lack of certainty.',
          connectedLocations: ['loc-moon-bridge', 'loc-forgotten-station']
        }
      ]
    }
  },
  {
    id: 'demo-ocean-moon',
    isDemo: true,
    title: 'The Ocean Under the Moon',
    createdAt: '2026-09-24T22:15:00.000Z',
    date: 'September 24, 2026',
    mood: 'Peaceful',
    intensity: 6,
    category: 'Nature',
    description: 'I was floating weightlessly beneath the surface of a warm midnight ocean. Above, a giant pale moon cast silver shafts through the water. Bioluminescent manta rays glided past sunken coral temples, and breathing underwater felt as natural as taking a calm breath.',
    analysis: {
      primaryMood: 'Peaceful',
      intensity: 6,
      themes: ['Emotional Healing', 'Weightlessness', 'Rebirth', 'Stillness'],
      environment: 'Subterranean lunar ocean with bioluminescent coral architecture',
      atmosphere: 'Muted Hydro-Acoustics · Phosphorescent Indigo · Total Calm',
      importantObjects: ['Sunken Pearl Temple', 'Lunar Shafts', 'Bioluminescent Manta Ray', 'Coral Archway'],
      possibleEmotions: ['Serenity', 'Deep Comfort', 'Restoration', 'Awe'],
      recurringKeywords: ['ocean', 'moon', 'floating', 'water', 'temple'],
      archetype: 'The Submerged Seeker',
      narrativeStructure: 'Descent → Unconditional Surrender → Deep Illumination',
      energySignature: 68
    },
    generatedWorld: {
      worldName: 'Thalassa: The Lunar Deep',
      tagline: 'A nocturnal underwater cradle where worries dissolve into liquid light',
      environment: 'Luminous oceanic depths illuminated by filtered lunar shafts',
      atmosphere: 'Quiet · Deep Cerulean · Weightless',
      dominantMood: 'Peaceful',
      dreamEnergy: 76,
      characters: [
        { name: 'The Bioluminescent Leviathan', role: 'Guardian of the deep currents', dialogue: '“Breathe here. The weight of the world cannot penetrate this depth.”' },
        { name: 'A Chorus of Glass Jellies', role: 'Living lanterns', dialogue: '“Follow the tide that flows inward.”' }
      ],
      dynamicEvents: [
        'A school of glowing silver fish forms the shape of a constellation around you.',
        'The water warms by several degrees, carrying the scent of sea salt and jasmine.',
        'A forgotten underwater bell chimes gently from deep beneath the sand.',
        'Lunar light condenses into floating spheres you can hold.'
      ],
      locations: [
        {
          id: 'loc-silver-surface',
          name: 'The Mirror Surface',
          x: 50,
          y: 15,
          atmosphere: 'Rippling Silver · Night Sky Reflection',
          description: 'The boundary between water and open sky, undulating like liquid mercury beneath the full moon.',
          discoveredMemories: ['Looking up through clear water at a sky full of stars.'],
          dreamObjects: ['Liquid Moonbeam Fragment', 'Conch Shell of Whispers'],
          hiddenMeaning: 'The thin barrier between waking logic and dream surrender.',
          connectedLocations: ['loc-coral-cathedral', 'loc-abyssal-garden']
        },
        {
          id: 'loc-coral-cathedral',
          name: 'Bioluminescent Coral Cathedral',
          x: 30,
          y: 45,
          atmosphere: 'Phosphorescent Teal · Silent Resonance',
          description: 'Spires of living coral pulsing with calm cyan and emerald light, forming archways as tall as cliffs.',
          discoveredMemories: ['A long-forgotten feeling of complete safety in childhood.'],
          dreamObjects: ['Phosphor Polyps', 'Emerald Sea Glass'],
          hiddenMeaning: 'A sacred inner sanctuary that remains intact despite external life chaos.',
          connectedLocations: ['loc-silver-surface', 'loc-sunken-shrine']
        },
        {
          id: 'loc-abyssal-garden',
          name: 'The Weightless Kelp Forest',
          x: 70,
          y: 50,
          atmosphere: 'Golden Green · Drifting Current',
          description: 'Ribbons of golden kelp that drift in perpetual rhythm, parting gently as you pass without friction.',
          discoveredMemories: ['The release of heavy burdens carried for months without need.'],
          dreamObjects: ['Strand of Golden Silk', 'Amber Sea Pebble'],
          hiddenMeaning: 'Learning to flow with life circumstances rather than resisting currents.',
          connectedLocations: ['loc-silver-surface', 'loc-sunken-shrine']
        },
        {
          id: 'loc-sunken-shrine',
          name: 'The Sunken Pearl Temple',
          x: 50,
          y: 85,
          atmosphere: 'Deep Indigo · Stillness · Sacred',
          description: 'Ancient stone temple rests on pure white sand, guarded by gentle light and unhurried ocean creatures.',
          discoveredMemories: ['An unspoken forgiveness offered to someone long absent.'],
          dreamObjects: ['Black Pearl of Stillness', 'Inscribed Slate'],
          hiddenMeaning: 'Deep emotional integration and radical self-compassion.',
          connectedLocations: ['loc-coral-cathedral', 'loc-abyssal-garden']
        }
      ]
    }
  },
  {
    id: 'demo-endless-train',
    isDemo: true,
    title: 'The Endless Train',
    createdAt: '2026-09-18T19:40:00.000Z',
    date: 'September 18, 2026',
    mood: 'Nostalgic',
    intensity: 7,
    category: 'Travel',
    description: 'I was sitting in an ornate antique train carriage with mahogany panels and brass lamps. The train was traveling endlessly across a mirror-calm twilight sea. Outside the windows, constellations drifted just above the water surface, and familiar strangers held conversations in languages I somehow understood.',
    analysis: {
      primaryMood: 'Nostalgic',
      intensity: 7,
      themes: ['Journey of Life', 'Passing Moments', 'Reconnection', 'Acceptance'],
      environment: 'Vintage locomotive traversing aquatic rails across an endless twilight ocean',
      atmosphere: 'Warm Amber Lamp Light · Rhythmic Click-Clack · Violet Dusk',
      importantObjects: ['Brass Ticket Punch', 'Tea Cup with Rising Steam', 'Antique Window Latch', 'Leather Suitcase'],
      possibleEmotions: ['Warmth', 'Bittersweet Longing', 'Solace', 'Quiet Gratitude'],
      recurringKeywords: ['train', 'carriage', 'sea', 'windows', 'strangers', 'tracks'],
      archetype: 'The Transitory Pilgrim',
      narrativeStructure: 'Boarding → The Long Passage Through Twilight → Shared Silence',
      energySignature: 72
    },
    generatedWorld: {
      worldName: 'Astraea: The Twilight Express',
      tagline: 'An infinite passage connecting memories of who you once were',
      environment: 'Art-Deco train car advancing along starlit tracks hovering millimeters over calm water',
      atmosphere: 'Cozy Mahogany · Steam · Starlit Horizon',
      dominantMood: 'Nostalgic',
      dreamEnergy: 79,
      characters: [
        { name: 'The Blind Conductor', role: 'Time ticket inspector', dialogue: '“Every stop is both a departure and a reunion, if you listen closely.”' },
        { name: 'The Passenger in Wool', role: 'A friendly ghost of memory', dialogue: '“You don’t have to remember everything to carry its warmth.”' }
      ],
      dynamicEvents: [
        'Rain begins tapping against the carriage window, each drop reflecting a childhood home.',
        'The train glides through a field of floating water lilies that glow pale pink.',
        'A brass phonograph in the dining car starts playing a song you forgot you loved.',
        'The ocean outside turns completely glass-clear, showing submerged cities below.'
      ],
      locations: [
        {
          id: 'loc-car-saloon',
          name: 'The Observation Saloon',
          x: 20,
          y: 50,
          atmosphere: 'Velvet Green · Curved Panorama · Starlight',
          description: 'A round glass car at the train’s tail where the watery wake disappears into the violet horizon.',
          discoveredMemories: ['Watching taillights disappear down a rainy highway years ago.'],
          dreamObjects: ['Opera Glasses of Memory', 'Torn Railway Map'],
          hiddenMeaning: 'A bittersweet habit of looking backward to gauge one’s progress.',
          connectedLocations: ['loc-dining-car', 'loc-starlight-tracks']
        },
        {
          id: 'loc-dining-car',
          name: 'The Mahogany Dining Car',
          x: 50,
          y: 40,
          atmosphere: 'Amber Brass · Warm Cinnamon · Soft Chatter',
          description: 'Linen tables set with silver tableware and steaming porcelain cups that never turn cold.',
          discoveredMemories: ['Family dinners from a decade ago when everyone was still present.'],
          dreamObjects: ['Silver Pocket Knife', 'Sugar Cube with Star Motif'],
          hiddenMeaning: 'Deep hunger for community and genuine, unhurried presence.',
          connectedLocations: ['loc-car-saloon', 'loc-sleeping-compartment']
        },
        {
          id: 'loc-sleeping-compartment',
          name: 'The Sleeper Berth #7',
          x: 75,
          y: 35,
          atmosphere: 'Linen · Rain on Glass · Quiet Rest',
          description: 'A quiet compartment with bunk beds and heavy velvet drapes that shut out all worry.',
          discoveredMemories: ['Falling asleep in the back seat of a car while adults drove into the night.'],
          dreamObjects: ['Woolen Traveler Plaid', 'Unsent Postcard'],
          hiddenMeaning: 'Craving total permission to rest without earning it through exhaustion.',
          connectedLocations: ['loc-dining-car', 'loc-starlight-tracks']
        },
        {
          id: 'loc-starlight-tracks',
          name: 'The Starlight Causeways',
          x: 60,
          y: 75,
          atmosphere: 'Open Night · Infinite Calm · Phosphor Water',
          description: 'The rails themselves, made of polished steel humming over shimmering bioluminescent waves.',
          discoveredMemories: ['Realizing that the journey was never about reaching an end.'],
          dreamObjects: ['Spike of Silver Steel', 'Sparks of Starlight'],
          hiddenMeaning: 'Accepting life as an unfolding continuum rather than a destination.',
          connectedLocations: ['loc-car-saloon', 'loc-sleeping-compartment']
        }
      ]
    }
  },
  {
    id: 'demo-forest-remembered',
    isDemo: true,
    title: 'The Forest That Remembered Me',
    createdAt: '2026-09-12T04:10:00.000Z',
    date: 'September 12, 2026',
    mood: 'Surreal',
    intensity: 9,
    category: 'Mystery',
    description: 'I entered an ancient violet forest where the trees seemed to recognize my footsteps. Lanterns made of trapped starlight swung gently from mossy branches. At the center was a mirror pond with no bottom, where reflections showed people I used to know waving from beneath the surface.',
    analysis: {
      primaryMood: 'Surreal',
      intensity: 9,
      themes: ['Ancestral Memory', 'Subconscious Secrets', 'Identity', 'Nature Sentience'],
      environment: 'Sentient bioluminescent arboretum with reflective silver ponds and hanging astral lanterns',
      atmosphere: 'Deep Violet · Whispering Leaves · Damp Moss & Cedar',
      importantObjects: ['Hanging Star Lantern', 'Mirror Pool', 'Hollow Oak Door', 'Silver Key'],
      possibleEmotions: ['Spiritual Mystery', 'Haunting Beauty', 'Introspection', 'Revelation'],
      recurringKeywords: ['forest', 'trees', 'lanterns', 'mirror', 'footsteps', 'branches'],
      archetype: 'The Forest Mystic',
      narrativeStructure: 'Wandering the Brambles → Recognition by the Canopy → The Central Mirror',
      energySignature: 91
    },
    generatedWorld: {
      worldName: 'Silvanox: The Whispering Grove',
      tagline: 'An ancient living woodland that stores every lost thought ever breathed',
      environment: 'Luminous canopy of violet and emerald trees breathing in collective rhythm',
      atmosphere: 'Enchanted · Damp Cedar · Electric Violet',
      dominantMood: 'Surreal',
      dreamEnergy: 91,
      characters: [
        { name: 'The Stag of Constellations', role: 'Silent herald', dialogue: '“You walked here before you had a name; the roots have kept your path clear.”' },
        { name: 'The Moss Oracle', role: 'Subterranean voice', dialogue: '“What was buried was not lost, only germinating.”' }
      ],
      dynamicEvents: [
        'The trees gently lean inward, forming a cathedral of glowing leaves overhead.',
        'A hollow door inside a cedar trunk clicks unlocked on its own.',
        'Sparks of harmless cold fire drift like fireflies and land on your shoulders.',
        'The mirror pond surfaces a letter written in your own childhood handwriting.'
      ],
      locations: [
        {
          id: 'loc-grove-entrance',
          name: 'The Gateway of Twisted Boughs',
          x: 20,
          y: 35,
          atmosphere: 'Twilight Mist · Violet Brambles',
          description: 'Two massive weeping willows woven together into a living triumphal arch that shivers with greeting.',
          discoveredMemories: ['The excitement of exploring a forbidden backyard woods as a child.'],
          dreamObjects: ['Woven Twig Crown', 'Jar of Luminescent Moss'],
          hiddenMeaning: 'Crossing from modern intellectual cynicism into raw imagination.',
          connectedLocations: ['loc-lantern-path', 'loc-mirror-pond']
        },
        {
          id: 'loc-lantern-path',
          name: 'The Trail of Starlight Lanterns',
          x: 45,
          y: 20,
          atmosphere: 'Warm Amber · Whispering Cedar',
          description: 'A winding moss pathway flanked by blown-glass globes containing trapped falling stars.',
          discoveredMemories: ['A grandfather’s lantern swinging on a stormy porch.'],
          dreamObjects: ['Blown Glass Vessel', 'Star Core Spark'],
          hiddenMeaning: 'Guidance provided by past mentors that lives on in intuition.',
          connectedLocations: ['loc-grove-entrance', 'loc-ancient-oak']
        },
        {
          id: 'loc-mirror-pond',
          name: 'The Bottomless Mirror Pond',
          x: 55,
          y: 65,
          atmosphere: 'Still Water · Glass Reflection · Deep Violet',
          description: 'A black water basin as calm as obsidian, showing not the sky above but forgotten faces smiling with affection.',
          discoveredMemories: ['A promise made to oneself at age seven that has not yet been broken.'],
          dreamObjects: ['Water Lily of Obsidian', 'Silver Mirror Shard'],
          hiddenMeaning: 'True self-recognition beneath the protective personas we build for society.',
          connectedLocations: ['loc-grove-entrance', 'loc-ancient-oak']
        },
        {
          id: 'loc-ancient-oak',
          name: 'The Hollow Heartwood Oak',
          x: 80,
          y: 45,
          atmosphere: 'Deep Resonance · Ancient Woodcraft',
          description: 'A titan oak tree inside whose hollow trunk a spiral staircase leads downward into the earth’s heartbeat.',
          discoveredMemories: ['A feeling of infinite groundedness and ancient belonging.'],
          dreamObjects: ['Acorn of Solid Bronze', 'Key to the Bark Door'],
          hiddenMeaning: 'Connecting with primal roots and enduring emotional resilience.',
          connectedLocations: ['loc-lantern-path', 'loc-mirror-pond']
        }
      ]
    }
  }
];
