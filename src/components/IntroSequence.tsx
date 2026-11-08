import React, { useEffect, useState, useCallback, useRef } from 'react';
import { MetallicCanvas } from './MetallicCanvas';
import { IntroSphere } from './IntroSphere';
import { IntroSwirlCanvas } from './IntroSwirlCanvas';
import '../styles/intro.css';

interface IntroSequenceProps {
  onComplete: () => void;
}

type IntroCanvasPhase = 'darkness' | 'reveal' | 'typography' | 'transition';

type MasterTimelinePhase =
  | 'orbital-entrance' // 0.0s - 0.9s: metallic orbital object appears
  | 'tr-visible'       // 0.9s - 2.8s: TR fades in at centre (0.9s-1.9s), holds (1.9s-2.8s)
  | 'name-revealing'   // 2.8s - 4.9s: TR dissolves softly while name characters reveal left-to-right
  | 'name-settled'     // 4.9s - 5.5s: full name settles and rests still
  | 'tagline-revealing'// 5.5s - 7.3s: tagline rises into place, divider expands, sphere reveals
  | 'composition-hold' // 7.3s - 8.3s: hold final balanced composition
  | 'settled';         // 8.3s+: settled state, free GPU memory

const FIRST_NAME = 'THIRUPPATHI';
const LAST_NAME = 'RAJA';

const FIRST_NAME_CHARS = FIRST_NAME.split(''); // ['T', 'H', 'I', 'R', 'U', 'P', 'P', 'A', 'T', 'H', 'I']
const LAST_NAME_CHARS = LAST_NAME.split('');   // ['R', 'A', 'J', 'A']

const TAGLINE_PHRASES = [
  'STUDENT',
  'ASPIRING DEVELOPER',
  'CREATIVE THINKER',
  'FUTURE ENTREPRENEUR',
];

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<MasterTimelinePhase>('orbital-entrance');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSwirling, setIsSwirling] = useState(false);
  const [swirlOrigin, setSwirlOrigin] = useState<{ x: number; y: number } | undefined>();

  const completedRef = useRef(false);
  const sphereRef = useRef<HTMLDivElement>(null);

  const handleFinish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsTransitioning(true);

    try {
      sessionStorage.setItem('graphite_luxury_intro_seen', 'true');
    } catch {
      // Ignore storage errors in restricted private contexts
    }

    setTimeout(() => {
      onComplete();
    }, 600);
  }, [onComplete]);

  // Handle clicking the small 3D sphere to trigger the SWIRL EFFECT & ENTER
  const handleSphereClick = useCallback(() => {
    if (completedRef.current || isSwirling) return;

    if (sphereRef.current) {
      const rect = sphereRef.current.getBoundingClientRect();
      setSwirlOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + 60,
      });
    }

    setIsSwirling(true);
  }, [isSwirling]);

  // Reduced motion detection
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      handleFinish();
    }
  }, [handleFinish]);

  // Keyboard shortcut listener (Escape or Space to skip, Enter to start)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Space') {
        e.preventDefault();
        handleFinish();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleSphereClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish, handleSphereClick]);

  // Handle back/forward cache restore (pageshow)
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        // If restored from bfcache, preserve graceful state
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  // Coordinated Master Timeline Controller (Total ~7.3s to 8.3s)
  useEffect(() => {
    let isMounted = true;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const startMasterTimeline = () => {
      if (!isMounted) return;

      // Check reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setPhase('settled');
        return;
      }

      // Phase 2: 0.9s -> TR fades in at exact center (0.9s - 1.9s), holds until 2.8s
      timers.push(
        setTimeout(() => {
          if (isMounted) setPhase('tr-visible');
        }, 900)
      );

      // Phase 3: 2.8s -> TR softly dissolves over 0.6s while 15 name characters reveal left-to-right
      timers.push(
        setTimeout(() => {
          if (isMounted) setPhase('name-revealing');
        }, 2800)
      );

      // Phase 4: 4.9s -> Name settles and stays completely still (0.6s hold)
      timers.push(
        setTimeout(() => {
          if (isMounted) setPhase('name-settled');
        }, 4900)
      );

      // Phase 5: 5.5s -> Tagline rises slowly from below over 1.6s; divider and sphere reveal
      timers.push(
        setTimeout(() => {
          if (isMounted) setPhase('tagline-revealing');
        }, 5500)
      );

      // Phase 6: 7.3s -> Hold final balanced composition
      timers.push(
        setTimeout(() => {
          if (isMounted) setPhase('composition-hold');
        }, 7300)
      );

      // Settled: 8.3s -> Transitions settled, free GPU memory hints
      timers.push(
        setTimeout(() => {
          if (isMounted) setPhase('settled');
        }, 8300)
      );
    };

    // Wait for document.fonts.ready before starting timeline so typography layout is 100% final
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(startMasterTimeline);
    } else {
      startMasterTimeline();
    }

    return () => {
      isMounted = false;
      timers.forEach(clearTimeout);
    };
  }, []);

  // Map to MetallicCanvas introPhase
  const canvasPhase: IntroCanvasPhase =
    phase === 'orbital-entrance'
      ? 'reveal'
      : isTransitioning
      ? 'transition'
      : 'typography';

  // TR Monogram element visual state
  const trStateClass =
    phase === 'orbital-entrance'
      ? ''
      : phase === 'tr-visible'
      ? 'visible'
      : phase === 'name-revealing'
      ? 'dissolve'
      : 'hidden';

  // Full Name reveal trigger
  const isNameRevealed =
    phase === 'name-revealing' ||
    phase === 'name-settled' ||
    phase === 'tagline-revealing' ||
    phase === 'composition-hold' ||
    phase === 'settled';

  // Tagline reveal trigger
  const isTaglineVisible =
    phase === 'tagline-revealing' ||
    phase === 'composition-hold' ||
    phase === 'settled';

  const isSettled = phase === 'settled';

  return (
    <div
      className={`intro-viewport ${isTransitioning ? 'transitioning' : ''} ${isSettled ? 'settled' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Cinematic portfolio introduction"
    >
      {/* Interactive WebGL / Canvas Procedural Metallic Ribbon */}
      <div className="intro-canvas-backdrop">
        <MetallicCanvas isIntro={true} introPhase={canvasPhase} interactive={!isSwirling} />
      </div>

      {/* Atmospheric Vignette */}
      <div className="intro-vignette" />

      {/* Full-Screen Swirl Vortex Effect Canvas when Sphere is Clicked */}
      {isSwirling && (
        <IntroSwirlCanvas
          onComplete={handleFinish}
          originX={swirlOrigin?.x}
          originY={swirlOrigin?.y}
        />
      )}

      {/* Intro Top Controls */}
      <div className="intro-controls">
        <button
          onClick={handleFinish}
          className="btn-skip-intro"
          aria-label="Skip cinematic introduction and proceed to portfolio"
        >
          <span>Skip Experience</span>
          <kbd>ESC</kbd>
        </button>
      </div>

      {/* Central Editorial Content */}
      <div className={`intro-content ${isSwirling ? 'swirling' : ''}`}>
        <div className="intro-title-wrapper">
          {/* Subtle Contrast Scrim behind text */}
          <div className="intro-text-scrim" aria-hidden="true" />

          {/* Dedicated Centered TR Element (Fixed over name area, no layout shift) */}
          <div className={`intro-tr-center ${trStateClass}`} aria-hidden="true">
            <span className="intro-tr-text">TR</span>
          </div>

          {/* Full Name in its 100% stable, final layout from Frame 1 */}
          <h1
            className={`intro-title ${isNameRevealed ? 'revealed' : ''}`}
            aria-label="THIRUPPATHI RAJA"
          >
            {/* First Word: THIRUPPATHI */}
            <span className="intro-name-word intro-word-first" aria-hidden="true">
              {FIRST_NAME_CHARS.map((char, index) => (
                <span
                  key={`first-${index}`}
                  className="intro-char"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  {char}
                </span>
              ))}
            </span>

            {/* Word spacing */}
            <span className="intro-name-space" aria-hidden="true">&nbsp;</span>

            {/* Second Word: RAJA */}
            <span className="intro-name-word intro-word-second" aria-hidden="true">
              {LAST_NAME_CHARS.map((char, index) => (
                <span
                  key={`second-${index}`}
                  className="intro-char"
                  style={{ animationDelay: `${(FIRST_NAME_CHARS.length + index) * 75}ms` }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Minimal Divider Rule */}
        <div className={`intro-divider ${isTaglineVisible ? 'visible' : ''}`} />

        {/* Tagline Animation */}
        <p className={`intro-descriptor ${isTaglineVisible ? 'visible' : ''}`}>
          {TAGLINE_PHRASES.map((phrase, idx) => (
            <React.Fragment key={phrase}>
              {idx > 0 && <span className="intro-tagline-dot" aria-hidden="true"> · </span>}
              <span className="intro-tagline-phrase">{phrase}</span>
            </React.Fragment>
          ))}
        </p>

        {/* Small 3D Sphere Interactive Element */}
        <div
          ref={sphereRef}
          className={`intro-sphere-wrapper ${isTaglineVisible ? 'visible' : ''}`}
        >
          <IntroSphere
            onClick={handleSphereClick}
            isSwirling={isSwirling}
            disabled={isTransitioning}
          />
        </div>
      </div>

      {/* Ambient Starlight Rule */}
      <div className="intro-progress-bar" aria-hidden="true">
        <div className="intro-progress-fill" style={{ width: '100%', opacity: 0.4 }} />
      </div>
    </div>
  );
};
