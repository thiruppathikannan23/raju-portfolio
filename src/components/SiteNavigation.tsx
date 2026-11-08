import React, { ugit initseState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Play, Menu, X, Zap, ArrowUpRight } from 'lucide-react';

interface SiteNavigationProps {
  onReplayIntro: () => void;
  onEnterUnknown?: () => void;
}

export const SiteNavigation: React.FC<SiteNavigationProps> = ({ onReplayIntro, onEnterUnknown }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['work', 'arcane-orb', 'about', 'skills', 'career-goals', 'contact'];
      const scrollY = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and listen for ESC key when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { href: '#work', label: 'Work', fullLabel: 'Selected Work', idx: '01' },
    { href: '#arcane-orb', label: 'Orb', fullLabel: 'Arcane Orb Navigation', idx: '02' },
    { href: '#about', label: 'About', fullLabel: 'Philosophy & About', idx: '03' },
    { href: '#skills', label: 'Skills', fullLabel: 'Capabilities & Skills', idx: '04' },
    { href: '#career-goals', label: 'Goals', fullLabel: 'Career Goals & Progress', idx: '05' },
    { href: '#contact', label: 'Contact', fullLabel: 'Initiate Dialogue', idx: '06' },
  ];

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="site-container nav-container">

          {/* Brand */}
          <a href="#top" className="brand-monogram-link" aria-label="Return to top">
            <div className="brand-monogram-box">{PORTFOLIO_DATA.personal.monogram}</div>
            <div className="brand-meta">
              <span className="brand-name">{PORTFOLIO_DATA.personal.name}</span>
              <span className="brand-title">{PORTFOLIO_DATA.personal.title}</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav aria-label="Primary navigation">
            <ul className="nav-desktop-links">
              {navLinks.map(({ href, label }) => {
                const sectionId = href.replace('#', '');
                return (
                  <li key={href}>
                    <a
                      href={href}
                      className={`nav-link${activeSection === sectionId ? ' nav-link--active' : ''}`}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Action Pills */}
          <div className="nav-actions">
            {onEnterUnknown && (
              <button
                onClick={onEnterUnknown}
                className="nav-btn-unknown"
                aria-label="Enter the Unknown alternate dimension"
              >
                <Zap size={10} className="nav-btn-zap" />
                <span>Unknown</span>
              </button>
            )}

            <button
              onClick={onReplayIntro}
              className="nav-btn-replay"
              aria-label="Replay cinematic intro"
            >
              <Play size={9} fill="currentColor" />
              <span>Intro</span>
            </button>

            {/* Hamburger / Menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="nav-mobile-toggle"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer — Placed OUTSIDE <header> to avoid backdrop-filter stacking trap */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Full navigation menu"
        >
          {/* Top bar inside drawer for consistent layout */}
          <div className="mobile-nav-header">
            <div className="brand-monogram-link">
              <div className="brand-monogram-box">{PORTFOLIO_DATA.personal.monogram}</div>
              <div className="brand-meta">
                <span className="brand-name">{PORTFOLIO_DATA.personal.name}</span>
                <span className="brand-title">Navigation Directory</span>
              </div>
            </div>

            <button
              onClick={closeMobileMenu}
              className="mobile-nav-close-btn"
              aria-label="Close navigation menu"
            >
              <X size={18} />
              <span>CLOSE</span>
            </button>
          </div>

          <div className="mobile-nav-content">
            <div className="mobile-nav-eyebrow">DIRECTORY INDEX</div>

            <ul className="mobile-nav-links">
              {navLinks.map(({ href, fullLabel, idx }) => (
                <li key={href} className="mobile-nav-item">
                  <a
                    href={href}
                    onClick={closeMobileMenu}
                    className="mobile-nav-link"
                  >
                    <span className="mobile-nav-idx">{idx}</span>
                    <span className="mobile-nav-text">{fullLabel}</span>
                    <ArrowUpRight size={18} className="mobile-nav-arrow" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mobile-nav-divider" />

            {/* Action buttons inside drawer */}
            <div className="mobile-nav-actions">
              {onEnterUnknown && (
                <button
                  onClick={() => {
                    closeMobileMenu();
                    onEnterUnknown();
                  }}
                  className="btn-enter-unknown mobile-action-btn"
                >
                  <span className="cosmic-pulsar-dot" />
                  <span>ENTER THE UNKNOWN ↗</span>
                </button>
              )}

              <button
                onClick={() => {
                  closeMobileMenu();
                  onReplayIntro();
                }}
                className="btn-graphite-secondary mobile-action-btn"
              >
                <Play size={12} fill="currentColor" />
                <span>Replay Cinematic Intro</span>
              </button>
            </div>

            {/* Footer metadata */}
            <div className="mobile-nav-footer">
              <div className="mobile-nav-status">
                <span className="status-indicator-dot" />
                <span>{PORTFOLIO_DATA.personal.availabilityStatus}</span>
              </div>
              <div className="mobile-nav-meta">
                <span>{PORTFOLIO_DATA.personal.location}</span>
                <span className="meta-sep">&bull;</span>
                <span>{PORTFOLIO_DATA.personal.email}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
