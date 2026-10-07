# DreamOS — Turn Your Dreams Into Worlds

> **“Turn Your Dreams Into Worlds.”**
> An experimental AI-inspired platform for transforming dreams into interactive digital experiences.

---
<img width="1907" height="900" alt="image" src="https://github.com/user-attachments/assets/89bbac60-ef9b-426a-a109-7278e5769937" />

## 🌟 Overview & Product Vision

Every night, human subconscious minds generate vivid, surreal cities, oceans, and narratives that fade the moment we awake. **DreamOS** is a futuristic, publicly accessible web platform designed to immortalize those visions into explorable digital realities.

The core user experience follows a seamless lifecycle:
**WRITE YOUR DREAM → ANALYZE IT → BUILD YOUR DREAM WORLD → EXPLORE → SAVE → SHARE**

DreamOS is engineered with a dark, cinematic operating system aesthetic, featuring interactive cartography, deterministic action-driven exploration, personal dream constellations, subconscious pattern analytics, and local memory archiving.

---

## ✨ Features

- **Cinematic Dream Hero**: Lightweight canvas-based starry cosmos with ambient violet/indigo particle fields and 1-click demo launchers.
- **Dream Creation Terminal**: Intuitive dream editor with Title, Description, Emotional Mood selector, 1–10 Intensity slider, and Categories, accompanied by creative presets.
- **DreamOS Intelligence (Local Semantic Engine)**: Transparent local deterministic interpreter generating detected themes, primary mood, intensity rating, synthesized environment, atmosphere signature, subconscious archetypes, important relics, and narrative structures.
- **Dream World Generator**: Synthesizes custom worlds with distinct environmental atmospheres, subconscious characters/guides, and dynamic events.
- **Interactive Dream Cartography**: 2D interactive map with coordinate beacons, SVG constellation filaments, discovered memories, artifacts, and hidden meanings.
- **Immersive Exploration Mode**: Full-screen, minimalist interface where users explore using deterministic actions (*Explore, Look Around, Follow Light, Open Memory, Discover, Return*), monitor Dream Energy, and trigger unexpected events.
- **Subconscious Games Studio**: 3 interactive procedural mini-games integrated directly into the platform:
  - *Lucid Flight*: 2D starlight glide & obstacle avoidance with dream shards and local high scores.
  - *Constellation Weaver*: Celestial puzzle game connecting numbered star patterns.
  - *Subconscious Recall*: 16-card dream archetype matching game testing memory coherence.
  - *Synthesized Web Audio*: Procedural chimes, flap glides, and star collection tones powered by Web Audio API.
- **Subconscious Symbol Codex (Dream Lexicon)**: Comprehensive Jungian & archetypal symbol dictionary cross-referenced with your personal journal, featuring lucidity reality cues and dream triggers.
- **Morning Recall Oracle & Lucid Reality Check**: Sensory retrieval anchors for faint morning fragments and interactive reality check verification.
- **Ambient Dream Soundscape Machine**: Procedural Web Audio engine generating meditative Theta Waves (432Hz sleep drone), Lucid Rain, Astral Chimes, and Ocean Tides in real-time.
- **Dynamic Dream Color System**: 5 curated dream color spectrums (*Aurora Veil, Lunar Opal, Rose Quartz, Neon Amethyst, Solar Reverie*) with automatic subconscious mood color synchronization.
- **Dream Memory & Journal**: Filterable, searchable, and sortable archive with both grid and step-by-step visual timeline views (*Dream → Analysis → Exploration → Discovery*), with rename and deletion support.
- **Dream Constellation**: Cosmic canvas mapping saved dreams as glowing celestial nodes interconnected by shared moods, categories, and subconscious themes.
- **Dream Statistics & Patterns**: Interactive Recharts analytics illustrating mood distributions, intensity trajectories over time, and identified recurring motifs.
- **Dream Sharing**: Beautiful preview cards with native Web Share API integration and safe clipboard fallback.
- **Resilient Offline-First Storage**: Centralized localStorage engine with corrupt data detection and auto-recovery to ensure zero crashing.

---

## 🛠️ Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: JavaScript (ES Modules)
- **Routing**: React Router DOM (with Vercel SPA rewrites configured)
- **Styling**: Tailwind CSS v4 & Modern CSS
- **Visuals & Charts**: Recharts, Canvas Confetti
- **Icons**: Lucide React
- **Persistence**: Centralized `localStorage` with graceful recovery

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── Navbar.jsx               # Strict 3-zone Top Bar Contract navigation
│   ├── Hero.jsx                 # Starry animated cosmos & instant demo launchers
│   ├── DreamCard.jsx            # Unboxed metadata cards with typographic discipline
│   ├── DreamAnalyzer.jsx        # Transparent "DreamOS Intelligence" interpreter
│   ├── DreamMap.jsx             # Interactive 2D cartography with connected nodes
│   ├── DreamExplorer.jsx        # Minimalist immersive exploration mode
│   ├── DreamShareModal.jsx      # Shareable dream card with Web Share & clipboard
│   └── Footer.jsx               # Quiet footer with links and medical disclaimer
│
├── pages/
│   ├── Home.jsx                 # Public startup landing page & bento showcase
│   ├── CreateDream.jsx          # Dream transcription terminal & prompt presets
│   ├── DreamWorldPage.jsx       # Dream world overview, map, and explorer tabs
│   ├── Journal.jsx              # Personal archive with search, filters & timeline
│   ├── Constellation.jsx        # Glowing interconnected celestial dream map
│   ├── Insights.jsx             # Recharts statistics & recurring pattern detector
│   └── About.jsx                # Product philosophy & decoupled AI architecture
│
├── services/
│   ├── dreamEngine.js           # Action resolution, energy consumption & events
│   ├── analysisEngine.js        # Deterministic semantic dream interpreter
│   ├── worldGenerator.js        # Coordinates, locations, characters & relics generator
│   └── storageService.js        # Safe JSON parsing, CRUD, and fallback recovery
│
├── data/
│   └── dreamData.js             # Initial high-fidelity demo dreams
│
├── utils/
│   ├── constants.js             # Moods, categories, symbol lexicon & presets
│   └── helpers.js               # Formatting, sharing, and clipboard utilities
│
├── App.jsx                      # App root, routes, and modal management
├── main.jsx                     # Vite client entry point
└── index.css                    # Global design tokens, keyframes & glassmorphism
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/dreamos.git
cd dreamos
npm install
```

### Running Locally

```bash
npm run dev
```

Visit `http://localhost:3000` in your web browser.

### Production Build

```bash
npm run build
npm run preview
```

## 🌌 Demo Mode

DreamOS ships with four pre-configured demonstration dream worlds accessible immediately:

1. **The City Above the Clouds** *(Mood: Mysterious · Intensity: 8/10)*
2. **The Ocean Under the Moon** *(Mood: Peaceful · Intensity: 6/10)*
3. **The Endless Train** *(Mood: Nostalgic · Intensity: 7/10)*
4. **The Forest That Remembered Me** *(Mood: Surreal · Intensity: 9/10)*

Users can explore these instantly without entering any text.

---

## 🔮 Future AI Architecture Roadmap

DreamOS V1 uses local deterministic intelligence so it works everywhere without requiring API keys or incurring inference costs. The codebase is decoupled to support modern cloud LLMs and multi-modal models in future versions:

```text
User Dream Text
       ↓
Semantic Analysis (OpenAI / Google Gemini)
       ↓
Archetype & Symbol Extraction
       ↓
Procedural World Generation
       ↓
Dynamic Narrative Engine
       ↓
Visual Asset Generation (Imagen / Stable Diffusion)
       ↓
Interactive Living Dimension
```

---
---

## 📄 License

MIT License. Crafted with care for explorers of the subconscious.
