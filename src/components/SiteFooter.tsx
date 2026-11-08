import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowUp, Play } from 'lucide-react';

interface SiteFooterProps {
  onReplayIntro: () => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onReplayIntro }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-container">
        <div className="footer-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="brand-monogram-box">
              {PORTFOLIO_DATA.personal.monogram}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                {PORTFOLIO_DATA.personal.name}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {PORTFOLIO_DATA.personal.title}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={onReplayIntro}
              className="btn-replay-intro"
              aria-label="Replay cinematic portfolio introduction"
            >
              <Play size={11} fill="currentColor" />
              <span>Replay Intro</span>
            </button>

            <button
              onClick={scrollToTop}
              className="btn-graphite-secondary"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.72rem' }}
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
              <span>Top</span>
            </button>
          </div>
        </div>

        <div className="hairline-divider" style={{ marginBottom: '2rem' }} />

        <div className="footer-bottom">
          <div>
            &copy; {currentYear} {PORTFOLIO_DATA.personal.name}. Student Developer Portfolio.
          </div>
          <div>
            Graphite Luxury Visual Identity &bull; Engineered with React, TypeScript &amp; Procedural Shaders
          </div>
        </div>
      </div>
    </footer>
  );
};
