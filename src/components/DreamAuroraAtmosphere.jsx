/**
 * DreamOS Dream Aurora Atmosphere Component
 * Renders ethereal floating aurora light blooms and dream color haze across the application.
 */

import React from 'react';
import { useDreamColor } from '../context/DreamColorContext.jsx';

export default function DreamAuroraAtmosphere() {
  const { theme, activeMoodOverride } = useDreamColor();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Primary Floating Aurora Nebula Orb */}
      <div
        className="absolute -top-[15%] left-[20%] w-[680px] h-[680px] rounded-full blur-[140px] opacity-25 animate-aurora-drift transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, var(--dream-primary) 0%, transparent 70%)`
        }}
      />

      {/* Secondary Ethereal Cyan/Sky Drift Orb */}
      <div
        className="absolute top-[40%] -right-[10%] w-[620px] h-[620px] rounded-full blur-[150px] opacity-20 animate-aurora-drift-reverse transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, var(--dream-secondary) 0%, transparent 70%)`
        }}
      />

      {/* Accent Dream Rose/Lavender Bottom Bloom */}
      <div
        className="absolute -bottom-[20%] left-[30%] w-[750px] h-[550px] rounded-full blur-[160px] opacity-20 animate-aurora-drift transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, var(--dream-accent) 0%, transparent 70%)`
        }}
      />

      {/* Subtle Dream Dust Texture */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
    </div>
  );
}
