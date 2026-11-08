import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArcaneOrbCanvas } from './ArcaneOrbCanvas';
import { ArrowDownRight, RotateCw, CheckCircle2 } from 'lucide-react';
import '../styles/arcane-orb.css';

interface DestinationItem {
  id: string;
  name: string;
  targetId: string;
  quadrantAngle: number; // in radians
  sectorNum: string;
  title: string;
  tagline: string;
  category: string;
}

const DESTINATIONS: DestinationItem[] = [
  {
    id: 'projects',
    name: 'PROJECTS',
    targetId: 'work',
    quadrantAngle: 0,
    sectorNum: 'SECTOR 01',
    title: 'Featured Project Works',
    tagline: 'Practical project exploration: Agrinilo agricultural platform concept and 12th grade 1st-place Smart Irrigation System.',
    category: 'GENUINE PROJECTS',
  },
  {
    id: 'about',
    name: 'ABOUT',
    targetId: 'about',
    quadrantAngle: Math.PI / 2, // 90 deg
    sectorNum: 'SECTOR 02',
    title: 'Personal Journey & Milestones',
    tagline: 'Student developer journey: learning programming fundamentals, exploration, and building for the future.',
    category: 'MY JOURNEY',
  },
  {
    id: 'skills',
    name: 'SKILLS',
    targetId: 'skills',
    quadrantAngle: Math.PI, // 180 deg
    sectorNum: 'SECTOR 03',
    title: 'Current Learning Progression',
    tagline: 'C programming, Java basics, HTML & CSS fundamentals, and AI-assisted web exploration with Google Antigravity.',
    category: 'LEARNING PROGRESSION',
  },
  {
    id: 'contact',
    name: 'CONTACT',
    targetId: 'contact',
    quadrantAngle: (3 * Math.PI) / 2, // 270 deg
    sectorNum: 'SECTOR 04',
    title: 'Connect & Initiate Dialogue',
    tagline: 'Direct electronic mail and verified links for student opportunities, internships, and collaborations.',
    category: 'INITIATE DIALOGUE',
  },
];

export const ArcaneOrbSection: React.FC = () => {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [pitch, setPitch] = useState(0.12);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [srAnnouncement, setSrAnnouncement] = useState('Selected: PROJECTS. Rotate the orb to explore.');

  const angleRef = useRef(0);
  const pitchRef = useRef(0.12);
  const snapAnimId = useRef<number | null>(null);
  const autoNavTimer = useRef<number | null>(null);

  // Compute active destination index from an angle
  const getIndexFromAngle = (ang: number) => {
    const twoPi = Math.PI * 2;
    const normalized = ((ang % twoPi) + twoPi) % twoPi;
    const step = Math.PI / 2;
    return Math.round(normalized / step) % 4;
  };

  // Navigate to target section smoothly
  const navigateToSection = useCallback((targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Smooth snapping animation to target angle
  const smoothSnapToAngle = useCallback((targetAngle: number, autoNavigate = false) => {
    if (snapAnimId.current) cancelAnimationFrame(snapAnimId.current);

    const stepSnap = () => {
      const diff = targetAngle - angleRef.current;
      if (Math.abs(diff) > 0.003) {
        angleRef.current += diff * 0.16;
        setCurrentAngle(angleRef.current);
        snapAnimId.current = requestAnimationFrame(stepSnap);
      } else {
        angleRef.current = targetAngle;
        setCurrentAngle(targetAngle);
        snapAnimId.current = null;

        const idx = getIndexFromAngle(targetAngle);
        setSelectedIndex(idx);
        setSrAnnouncement(`Aligned with destination: ${DESTINATIONS[idx].name}`);

        if (autoNavigate) {
          if (autoNavTimer.current) clearTimeout(autoNavTimer.current);
          autoNavTimer.current = window.setTimeout(() => {
            navigateToSection(DESTINATIONS[idx].targetId);
          }, 500);
        }
      }
    };

    snapAnimId.current = requestAnimationFrame(stepSnap);
  }, [navigateToSection]);

  // Drag handlers from canvas
  const handleDrag = (deltaYaw: number, deltaPitch: number) => {
    if (snapAnimId.current) {
      cancelAnimationFrame(snapAnimId.current);
      snapAnimId.current = null;
    }
    if (autoNavTimer.current) {
      clearTimeout(autoNavTimer.current);
      autoNavTimer.current = null;
    }

    angleRef.current += deltaYaw;
    pitchRef.current = Math.max(-0.35, Math.min(0.35, pitchRef.current + deltaPitch));

    setCurrentAngle(angleRef.current);
    setPitch(pitchRef.current);

    const idx = getIndexFromAngle(angleRef.current);
    if (idx !== selectedIndex) {
      setSelectedIndex(idx);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
    if (autoNavTimer.current) {
      clearTimeout(autoNavTimer.current);
      autoNavTimer.current = null;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    // Compute nearest quadrant angle
    const step = Math.PI / 2;
    const targetQuadrantAngle = Math.round(angleRef.current / step) * step;

    smoothSnapToAngle(targetQuadrantAngle, true);
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (selectedIndex + 1) % 4;
      const targetAngle = Math.round(angleRef.current / (Math.PI / 2)) * (Math.PI / 2) + Math.PI / 2;
      smoothSnapToAngle(targetAngle, false);
      setSelectedIndex(nextIndex);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (selectedIndex + 3) % 4;
      const targetAngle = Math.round(angleRef.current / (Math.PI / 2)) * (Math.PI / 2) - Math.PI / 2;
      smoothSnapToAngle(targetAngle, false);
      setSelectedIndex(prevIndex);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigateToSection(DESTINATIONS[selectedIndex].targetId);
    }
  };

  // Direct quadrant button select
  const handleQuadrantClick = (index: number) => {
    const targetAngle = Math.round(angleRef.current / (Math.PI * 2)) * (Math.PI * 2) + DESTINATIONS[index].quadrantAngle;
    smoothSnapToAngle(targetAngle, true);
    setSelectedIndex(index);
  };

  const activeDestination = DESTINATIONS[selectedIndex];

  useEffect(() => {
    return () => {
      if (snapAnimId.current) cancelAnimationFrame(snapAnimId.current);
      if (autoNavTimer.current) clearTimeout(autoNavTimer.current);
    };
  }, []);

  return (
    <section
      id="arcane-nav"
      className="arcane-orb-section"
      aria-label="Arcane Orb Navigation Gateway"
    >
      <div className="arcane-orb-backdrop" />

      {/* Screen Reader Live Region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {srAnnouncement}
      </div>

      <div className="site-container">
        <div className="arcane-orb-layout">
          {/* Left Column: Editorial Readout & Destination Preview */}
          <div className="arcane-info-column">
            <div className="arcane-eyebrow">
              <span className="arcane-eyebrow-pulsar" />
              <span>ARTIFACT NAVIGATION · ROTATIONAL GATEWAY</span>
            </div>

            <h2 className="arcane-main-headline">
              ARCANE ORB
            </h2>

            <div className="arcane-instructions-box">
              <span className="arcane-instruction-badge">TACTILE INTERACTION</span>
              <span>Rotate the orb to explore · Snaps to nearest quadrant</span>
            </div>

            {/* Active Destination Card Preview */}
            <div className="destination-preview-card" aria-label={`Selected destination preview: ${activeDestination.name}`}>
              <div className="destination-card-header">
                <span className="destination-sector-num">{activeDestination.sectorNum}</span>
                <span className="destination-align-status">
                  <CheckCircle2 size={13} />
                  <span>ALIGNED · 0{selectedIndex + 1}</span>
                </span>
              </div>

              <h3 className="destination-title">
                {activeDestination.name}
              </h3>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--metallic-silver)', marginBottom: '0.65rem' }}>
                {activeDestination.category}
              </div>

              <p className="destination-tagline">
                {activeDestination.tagline}
              </p>

              <div className="destination-action-group">
                <button
                  onClick={() => navigateToSection(activeDestination.targetId)}
                  className="btn-engage-destination"
                  aria-label={`Enter ${activeDestination.name} section`}
                >
                  <span>Engage Sector · Enter {activeDestination.name}</span>
                  <ArrowDownRight size={15} />
                </button>
              </div>
            </div>

            {/* Accessible Destination Quadrant Buttons */}
            <div className="destination-quadrant-buttons" role="tablist" aria-label="Direct Destination Selectors">
              {DESTINATIONS.map((dest, idx) => (
                <button
                  key={dest.id}
                  role="tab"
                  aria-selected={selectedIndex === idx}
                  onClick={() => handleQuadrantClick(idx)}
                  className={`quadrant-select-btn ${selectedIndex === idx ? 'active' : ''}`}
                >
                  0{idx + 1} · {dest.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Arcane Orb Interactive Canvas Container */}
          <div className="arcane-canvas-column">
            <div
              className="arcane-orb-frame"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              role="slider"
              aria-label="Arcane Orb 3D rotational controller. Use arrow keys to select destinations, Enter to jump."
              aria-valuemin={0}
              aria-valuemax={3}
              aria-valuenow={selectedIndex}
              aria-valuetext={activeDestination.name}
            >
              {/* The 3D Armillary Canvas Engine */}
              <ArcaneOrbCanvas
                currentAngle={currentAngle}
                pitch={pitch}
                onDrag={handleDrag}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                isDragging={isDragging}
              />

              {/* Cardinal Ring Overlay Markers */}
              <div className="arcane-cardinal-overlay" aria-hidden="true">
                <span className={`cardinal-marker cardinal-top ${selectedIndex === 0 ? 'active' : ''}`}>
                  PROJECTS [0°]
                </span>
                <span className={`cardinal-marker cardinal-right ${selectedIndex === 1 ? 'active' : ''}`}>
                  ABOUT [90°]
                </span>
                <span className={`cardinal-marker cardinal-bottom ${selectedIndex === 2 ? 'active' : ''}`}>
                  SKILLS [180°]
                </span>
                <span className={`cardinal-marker cardinal-left ${selectedIndex === 3 ? 'active' : ''}`}>
                  CONTACT [270°]
                </span>
              </div>

              {/* Subtle Drag Guidance */}
              <div className="arcane-drag-guidance">
                <RotateCw size={11} style={{ color: 'var(--metallic-silver)' }} />
                <span>DRAG TO ROTATE · ENTER TO ENGAGE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
