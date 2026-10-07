/**
 * DreamOS Constants & Configuration
 */

export const DREAM_MOODS = [
  { id: 'Mysterious', label: 'Mysterious', color: '#a855f7', secondaryColor: '#6366f1', accent: 'violet', aura: 'rgba(168, 85, 247, 0.35)' },
  { id: 'Peaceful', label: 'Peaceful', color: '#06b6d4', secondaryColor: '#2dd4bf', accent: 'cyan', aura: 'rgba(6, 182, 212, 0.35)' },
  { id: 'Happy', label: 'Happy', color: '#f59e0b', secondaryColor: '#ec4899', accent: 'amber', aura: 'rgba(245, 158, 11, 0.35)' },
  { id: 'Romantic', label: 'Romantic', color: '#ec4899', secondaryColor: '#f43f5e', accent: 'pink', aura: 'rgba(236, 72, 153, 0.35)' },
  { id: 'Dark', label: 'Dark', color: '#6366f1', secondaryColor: '#475569', accent: 'indigo', aura: 'rgba(99, 102, 241, 0.35)' },
  { id: 'Surreal', label: 'Surreal', color: '#d946ef', secondaryColor: '#8b5cf6', accent: 'purple', aura: 'rgba(217, 70, 239, 0.35)' },
  { id: 'Adventurous', label: 'Adventurous', color: '#10b981', secondaryColor: '#06b6d4', accent: 'emerald', aura: 'rgba(16, 185, 129, 0.35)' },
  { id: 'Nostalgic', label: 'Nostalgic', color: '#f97316', secondaryColor: '#f59e0b', accent: 'orange', aura: 'rgba(249, 115, 22, 0.35)' },
  { id: 'Unknown', label: 'Unknown', color: '#3b82f6', secondaryColor: '#a855f7', accent: 'blue', aura: 'rgba(59, 130, 246, 0.35)' }
];

export const DREAM_COLOR_THEMES = [
  {
    id: 'aurora',
    name: 'Aurora Veil',
    tag: 'Ethereal',
    primary: '#c084fc', // soft lilac/violet
    secondary: '#38bdf8', // starlight sky
    accent: '#f472b6', // dream rose
    bgClass: 'from-[#080718] via-[#0d0926] to-[#12082b]',
    glowColor: 'rgba(192, 132, 252, 0.35)',
    secondaryGlow: 'rgba(56, 189, 248, 0.25)',
    btnGradient: 'from-violet-500 via-purple-500 to-pink-500',
    borderGradient: 'from-violet-400/40 via-fuchsia-400/30 to-sky-400/30'
  },
  {
    id: 'lunar',
    name: 'Lunar Opal',
    tag: 'Aquatic Calm',
    primary: '#2dd4bf', // teal/aquamarine
    secondary: '#38bdf8', // sky blue
    accent: '#a7f3d0', // pale mint starlight
    bgClass: 'from-[#030d17] via-[#051824] to-[#061521]',
    glowColor: 'rgba(45, 212, 191, 0.35)',
    secondaryGlow: 'rgba(56, 189, 248, 0.25)',
    btnGradient: 'from-teal-500 via-cyan-500 to-sky-500',
    borderGradient: 'from-teal-400/40 via-cyan-400/30 to-sky-400/30'
  },
  {
    id: 'rose-dawn',
    name: 'Rose Quartz',
    tag: 'Romantic',
    primary: '#f472b6', // soft pink
    secondary: '#fb923c', // sunset peach
    accent: '#fbcfe8', // blossom
    bgClass: 'from-[#140616] via-[#1c0822] to-[#16051c]',
    glowColor: 'rgba(244, 114, 182, 0.35)',
    secondaryGlow: 'rgba(251, 146, 60, 0.22)',
    btnGradient: 'from-pink-500 via-rose-500 to-amber-500',
    borderGradient: 'from-pink-400/40 via-rose-400/30 to-amber-400/30'
  },
  {
    id: 'amethyst',
    name: 'Neon Amethyst',
    tag: 'Mystic',
    primary: '#a855f7', // violet
    secondary: '#6366f1', // electric indigo
    accent: '#e879f9', // neon orchid
    bgClass: 'from-[#070519] via-[#0e072b] to-[#140632]',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    secondaryGlow: 'rgba(99, 102, 241, 0.25)',
    btnGradient: 'from-purple-600 via-indigo-600 to-fuchsia-600',
    borderGradient: 'from-purple-400/40 via-indigo-400/30 to-fuchsia-400/30'
  },
  {
    id: 'celestial-sun',
    name: 'Solar Reverie',
    tag: 'Golden Dawn',
    primary: '#f59e0b', // amber
    secondary: '#ec4899', // pink
    accent: '#fde68a', // pale gold
    bgClass: 'from-[#140b04] via-[#211109] to-[#19081e]',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    secondaryGlow: 'rgba(236, 72, 153, 0.25)',
    btnGradient: 'from-amber-500 via-orange-500 to-pink-500',
    borderGradient: 'from-amber-400/40 via-orange-400/30 to-pink-400/30'
  }
];

export const DREAM_CATEGORIES = [
  'Adventure',
  'Fantasy',
  'Mystery',
  'Nature',
  'Future',
  'Childhood',
  'Travel',
  'Relationships',
  'Unknown',
  'Other'
];

export const SYMBOL_DICTIONARY = {
  water: { theme: 'Emotional Depth', interpretation: 'Subconscious currents and inner transitions' },
  clouds: { theme: 'Transcendence', interpretation: 'Elevation above worldly constraints' },
  flying: { theme: 'Freedom', interpretation: 'Desire for uninhibited self-determination' },
  falling: { theme: 'Vulnerability', interpretation: 'Releasing control over unpredictable outcomes' },
  door: { theme: 'Threshold', interpretation: 'An impending transition or unexplored potential' },
  train: { theme: 'Journey', interpretation: 'Fixed trajectories, passing moments, and nostalgia' },
  forest: { theme: 'The Unknown', interpretation: 'Untamed instincts and forgotten memories' },
  mirror: { theme: 'Self-Reflection', interpretation: 'Questions of personal identity and hidden facets' },
  city: { theme: 'Interconnection', interpretation: 'Collective human ambition and complex systems' },
  clock: { theme: 'Time & Transience', interpretation: 'Awareness of fleeting moments and urgency' },
  stars: { theme: 'Guidance', interpretation: 'Aspirations reaching into cosmic permanence' },
  tower: { theme: 'Perspective', interpretation: 'Seeking clarity from a detached vantage point' },
  bridge: { theme: 'Transition', interpretation: 'Crossing from familiar grounds to untested terrain' },
  ocean: { theme: 'Boundlessness', interpretation: 'Vast depths of emotion and creative potential' },
  book: { theme: 'Knowledge', interpretation: 'Unrecorded histories and innate wisdom' },
  key: { theme: 'Access', interpretation: 'Unlocking dormant answers within oneself' }
};

export const SAMPLE_PROMPTS = [
  {
    title: 'The City Above the Clouds',
    text: 'I was walking through an immense city floating above the clouds. Towers made of translucent glass hummed with quiet music, and sky bridges connected islands of ancient stone suspended in golden air.'
  },
  {
    title: 'The Ocean Under the Moon',
    text: 'I dove into a calm midnight ocean where bioluminescent whales drifted between sunken coral spires. The water felt completely weightless, and an underwater temple glowed softly in the deep.'
  },
  {
    title: 'The Endless Train',
    text: 'I was sitting in an ornate antique train carriage that traveled across an infinite calm sea. Outside the windows, constellations drifted just above the water, and friendly strangers spoke of forgotten towns.'
  },
  {
    title: 'The Forest That Remembered Me',
    text: 'I entered an ancient violet forest where the trees seemed to recognize my footsteps. Lanterns made of trapped starlight swung gently from mossy branches, whispering secrets from my childhood.'
  }
];
