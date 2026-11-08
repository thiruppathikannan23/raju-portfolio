import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { PortraitFrame } from './PortraitFrame';
import { ArrowDownRight, Mail, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onEnterUnknown: () => void;
  introCompleted?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onEnterUnknown, introCompleted = true }) => {
  return (
    <section id="top" className="hero-section" aria-label="Introduction and Overview">
      <div className="hero-backdrop-glow" />
      <div className="hero-grid-mesh" />

      <div className="site-container hero-container-grid">
        {/* Left Editorial & Action Column */}
        <div className="hero-content">
          {/* Availability Badge */}
          <div className="hero-header-badge">
            <div className="editorial-pill">
              <span className="status-beacon">
                <span className="status-beacon-ring" />
                <span className="status-beacon-dot" />
              </span>
              <span>{PORTFOLIO_DATA.personal.availabilityStatus}</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              · {PORTFOLIO_DATA.personal.location}
            </span>
          </div>

          {/* Typographic Headline with intentional break */}
          <h1 className="hero-headline">
            {PORTFOLIO_DATA.hero.headlineLine1}
            <span className="hero-headline-accent">
              {PORTFOLIO_DATA.hero.headlineLine2}
            </span>
          </h1>

          {/* Supporting Subline */}
          <p className="hero-subline">
            {PORTFOLIO_DATA.hero.subline}
          </p>

          {/* Primary, Secondary & Magical Alternate World Actions */}
          <div className="hero-cta-group">
            <a href="#work" className="btn-graphite-primary">
              <span>{PORTFOLIO_DATA.hero.primaryActionText}</span>
              <ArrowDownRight size={16} />
            </a>

            <a href="#contact" className="btn-graphite-secondary">
              <span>{PORTFOLIO_DATA.hero.secondaryActionText}</span>
              <Mail size={16} />
            </a>

            {/* Prominent "ENTER THE UNKNOWN ↗" Button */}
            <button
              onClick={onEnterUnknown}
              className="btn-enter-unknown"
              aria-label="Enter the Unknown — explore the interactive cosmic fantasy dimension"
            >
              <span className="cosmic-pulsar-dot" />
              <span>ENTER THE UNKNOWN ↗</span>
            </button>
          </div>

          {/* Hero Footer Bar */}
          <div className="hero-footer-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Sparkles size={13} style={{ color: 'var(--metallic-silver)' }} />
              <span>STUDENT DEVELOPER · LEARNING JOURNEY · 2026</span>
            </div>

            <a href="#arcane-orb" className="hero-scroll-indicator" aria-label="Scroll to Arcane Orb navigation">
              <span>ROTATE TO EXPLORE</span>
              <div className="scroll-line" />
            </a>
          </div>
        </div>

        {/* Right Portrait Column */}
        <div className="hero-portrait-column">
          <PortraitFrame introCompleted={introCompleted} />
        </div>
      </div>
    </section>
  );
};
