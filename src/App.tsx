import React, { useState } from 'react';
import { IntroSequence } from './components/IntroSequence';
import { SiteNavigation } from './components/SiteNavigation';
import { HeroSection } from './components/HeroSection';
import { SelectedWork } from './components/SelectedWork';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { CareerGoalsSection } from './components/CareerGoalsSection';
import { ContactSection } from './components/ContactSection';
import { SiteFooter } from './components/SiteFooter';
import { ArcaneOrb } from './components/ArcaneOrb';
import { PortalTransition } from './components/PortalTransition';
import { AlternateWorld } from './components/AlternateWorld';
import './styles/index.css';
import './styles/components.css';
import './styles/alternate-world.css';
import './styles/arcane-orb.css';

type ExperienceMode = 'reality' | 'entering-portal' | 'alternate-world' | 'exiting-portal';

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    // If reduced motion is requested, do not force intro
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return false;

      try {
        const hasSeen = sessionStorage.getItem('graphite_luxury_intro_seen');
        return !hasSeen;
      } catch {
        return true;
      }
    }
    return true;
  });

  const [experienceMode, setExperienceMode] = useState<ExperienceMode>('reality');

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnterUnknown = () => {
    setExperienceMode('entering-portal');
  };

  const handlePortalEnterComplete = () => {
    setExperienceMode('alternate-world');
  };

  const handleReturnToReality = () => {
    setExperienceMode('exiting-portal');
  };

  const handlePortalExitComplete = () => {
    setExperienceMode('reality');
  };

  return (
    <div className="portfolio-app-root">
      {/* 35mm Subtle Film Grain Overlay */}
      <div className="film-grain-overlay" aria-hidden="true" />

      {/* Accessible Skip Navigation Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Cinematic Intro Sequence */}
      {showIntro && (
        <IntroSequence onComplete={handleIntroComplete} />
      )}

      {/* Persistent Site Navigation */}
      <SiteNavigation
        onReplayIntro={handleReplayIntro}
        onEnterUnknown={handleEnterUnknown}
      />

      {/* Main Landmark (Graphite Reality) */}
      <main id="main-content">
        <HeroSection onEnterUnknown={handleEnterUnknown} introCompleted={!showIntro} />
        <ArcaneOrb />
        <SelectedWork />
        <AboutSection />
        <SkillsSection />
        <CareerGoalsSection />
        <ContactSection />
      </main>

      {/* Site Footer */}
      <SiteFooter onReplayIntro={handleReplayIntro} />

      {/* Portal Transition: Entering the Unknown */}
      {experienceMode === 'entering-portal' && (
        <PortalTransition
          mode="entering"
          onComplete={handlePortalEnterComplete}
        />
      )}

      {/* The Magical Alternate Cosmic World */}
      {experienceMode === 'alternate-world' && (
        <AlternateWorld
          onReturnToReality={handleReturnToReality}
        />
      )}

      {/* Portal Transition: Collapsing Singularity & Returning */}
      {experienceMode === 'exiting-portal' && (
        <PortalTransition
          mode="exiting"
          onComplete={handlePortalExitComplete}
        />
      )}
    </div>
  );
};

export default App;
