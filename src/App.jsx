/**
 * DreamOS Main Application Root
 * React Router configuration with global sharing modals and layout wrappers.
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import DreamShareModal from './components/DreamShareModal.jsx';
import DreamAuroraAtmosphere from './components/DreamAuroraAtmosphere.jsx';
import { DreamColorProvider } from './context/DreamColorContext.jsx';

import Home from './pages/Home.jsx';
import CreateDream from './pages/CreateDream.jsx';
import DreamWorldPage from './pages/DreamWorldPage.jsx';
import Journal from './pages/Journal.jsx';
import Constellation from './pages/Constellation.jsx';
import Insights from './pages/Insights.jsx';
import Games from './pages/Games.jsx';
import Lexicon from './pages/Lexicon.jsx';
import About from './pages/About.jsx';
import DreamSoundscapePlayer from './components/DreamSoundscapePlayer.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [sharingDream, setSharingDream] = useState(null);

  const handleOpenShare = (dream) => {
    setSharingDream(dream);
  };

  const handleCloseShare = () => {
    setSharingDream(null);
  };

  return (
    <DreamColorProvider>
      <Router>
        <ScrollToTop />
        <div className="relative min-h-screen flex flex-col bg-[#050614] text-slate-100 selection:bg-purple-600 selection:text-white transition-colors duration-700">
          {/* Ethereal Floating Dream Aurora Atmosphere */}
          <DreamAuroraAtmosphere />

          <Navbar />

          <main className="flex-1 relative z-10">
            <Routes>
              <Route path="/" element={<Home onShareDream={handleOpenShare} />} />
              <Route path="/create" element={<CreateDream />} />
              <Route path="/world/:id" element={<DreamWorldPage onShareDream={handleOpenShare} />} />
              <Route path="/journal" element={<Journal onShareDream={handleOpenShare} />} />
              <Route path="/constellation" element={<Constellation />} />
              <Route path="/games" element={<Games />} />
              <Route path="/lexicon" element={<Lexicon />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Home onShareDream={handleOpenShare} />} />
            </Routes>
          </main>

          <Footer />

          {/* Floating Ambient Dream Soundscape Player */}
          <DreamSoundscapePlayer />

          {/* Global Share Modal */}
          {sharingDream && (
            <DreamShareModal dream={sharingDream} onClose={handleCloseShare} />
          )}
        </div>
      </Router>
    </DreamColorProvider>
  );
}
