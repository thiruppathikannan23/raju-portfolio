import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Compass, Terminal, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { about, personal } = PORTFOLIO_DATA;

  return (
    <section id="about" className="section-wrapper" aria-label="About and Working Philosophy">
      <div className="site-container">
        <div className="hairline-divider" style={{ marginBottom: '5rem' }} />

        <div className="about-grid">
          {/* Left Column: Manifesto & Narrative */}
          <div>
            <span className="editorial-eyebrow">
              {about.eyebrow}
            </span>

            <h2 className="about-manifesto-headline">
              {about.manifestoHeadline}
            </h2>

            <div className="about-paragraphs">
              {about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Academic Credentials Box */}
            <div
              style={{
                marginTop: '2.5rem',
                padding: '1.75rem',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-graphite)',
                borderRadius: '2px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                <Award size={16} style={{ color: 'var(--metallic-silver)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--metallic-silver)', letterSpacing: '0.1em' }}>
                  ACADEMIC FOUNDATION & INSTITUTION
                </span>
              </div>
              <p style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '1rem', marginBottom: '0.35rem' }}>
                {personal.academicField}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                {personal.institution} &bull; {personal.location}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className="editorial-pill" style={{ borderColor: 'var(--border-bright)' }}>
                  Undergraduate Student
                </span>
                <span className="editorial-pill">
                  Aspiring Developer
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Learning Journey Stages & Exploration */}
          <div className="about-pillars-column">
            <div className="editorial-eyebrow" style={{ marginBottom: '0.5rem' }}>
              <Compass size={14} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
              MY LEARNING JOURNEY
            </div>

            {about.pillars.map((pillar) => (
              <div key={pillar.number} className="pillar-card">
                <div className="pillar-number">
                  {pillar.title.includes('Current') ? 'CURRENT STAGE' : `STAGE ${pillar.number}`}
                </div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-summary">{pillar.summary}</p>
              </div>
            ))}

            {/* Current Exploration Card */}
            <div
              className="pillar-card"
              style={{
                borderColor: 'var(--border-graphite)',
                background: 'linear-gradient(145deg, #18181c 0%, #111114 100%)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Terminal size={14} style={{ color: 'var(--metallic-silver)' }} />
                <span className="pillar-number" style={{ color: 'var(--metallic-chrome)', marginBottom: 0 }}>
                  CURRENT EXPLORATION
                </span>
              </div>
              <h3 className="pillar-title">{about.currentFocus.title}</h3>
              <p className="pillar-summary" style={{ marginBottom: '1.25rem' }}>
                {about.currentFocus.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {about.currentFocus.tags.map((tag) => (
                  <span key={tag} className="tech-tag" style={{ borderColor: 'var(--border-graphite)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
