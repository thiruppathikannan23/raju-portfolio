import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowDownRight, RotateCw, CheckCircle2 } from 'lucide-react';
import '../styles/arcane-orb.css';

interface DestinationItem {
  id: string;
  name: 'PROJECTS' | 'ABOUT' | 'SKILLS' | 'CONTACT';
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

export const ArcaneOrb: React.FC = () => {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [pitch, setPitch] = useState(0.12);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [srAnnouncement, setSrAnnouncement] = useState('Selected: PROJECTS. Rotate orb to explore.');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef = useRef(0);
  const pitchRef = useRef(0.12);
  const isDraggingRef = useRef(false);
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);
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
    // Both 'work' and 'projects' map to the projects section
    const targetElement = document.getElementById(targetId) || document.getElementById('work') || document.getElementById('projects');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Smooth spring-lerp snapping to the nearest quadrant
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

        if (autoNavigate && !isDraggingRef.current) {
          if (autoNavTimer.current) clearTimeout(autoNavTimer.current);
          autoNavTimer.current = window.setTimeout(() => {
            if (!isDraggingRef.current) {
              navigateToSection(DESTINATIONS[idx].targetId);
            }
          }, 500);
        }
      }
    };

    snapAnimId.current = requestAnimationFrame(stepSnap);
  }, [navigateToSection]);

  // Pointer drag listeners with pointer capture
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Safe fallback
    }
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    isDraggingRef.current = true;
    setIsDragging(true);

    if (snapAnimId.current) {
      cancelAnimationFrame(snapAnimId.current);
      snapAnimId.current = null;
    }
    if (autoNavTimer.current) {
      clearTimeout(autoNavTimer.current);
      autoNavTimer.current = null;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragStartPos.current || !isDraggingRef.current) return;
    const dx = e.clientX - dragStartPos.current.x;
    const dy = e.clientY - dragStartPos.current.y;

    const deltaYaw = (dx / 170) * Math.PI;
    const deltaPitch = (-dy / 220) * Math.PI;

    angleRef.current += deltaYaw;
    pitchRef.current = Math.max(-0.35, Math.min(0.35, pitchRef.current + deltaPitch));

    setCurrentAngle(angleRef.current);
    setPitch(pitchRef.current);

    const idx = getIndexFromAngle(angleRef.current);
    if (idx !== selectedIndex) {
      setSelectedIndex(idx);
    }

    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (dragStartPos.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
      dragStartPos.current = null;
      isDraggingRef.current = false;
      setIsDragging(false);

      // Snap to nearest 90-degree quadrant
      const step = Math.PI / 2;
      const targetQuadrantAngle = Math.round(angleRef.current / step) * step;
      smoothSnapToAngle(targetQuadrantAngle, true);
    }
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

  // Canvas 3D Rendering Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const startTime = performance.now();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Generate orbiting energy motes
    const particleCount = 38;
    const particles = Array.from({ length: particleCount }, () => ({
      orbitRadius: Math.random() * 55 + 75,
      angle: Math.random() * Math.PI * 2,
      speed: (Math.random() * 0.008 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
      elevation: (Math.random() - 0.5) * 60,
      size: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.6 + 0.3,
    }));

    const render = (now: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const elapsed = (now - startTime) * 0.001;

      // Idle spin when not actively dragging
      const idleSpin = prefersReducedMotion ? 0 : elapsed * 0.15;
      const totalYaw = currentAngle;
      const totalPitch = pitch;

      // 3D Point Projection Helper
      const projectPoint = (x: number, y: number, z: number) => {
        const cosY = Math.cos(totalYaw);
        const sinY = Math.sin(totalYaw);
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;

        const cosX = Math.cos(totalPitch);
        const sinX = Math.sin(totalPitch);
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const fov = 380;
        const scale = fov / (fov + z2);
        return {
          px: cx + x1 * scale,
          py: cy + y2 * scale,
          depth: z2,
          scale,
        };
      };

      // 1. Draw Ring 1 (Back Segment of Horizontal Navigation Ring)
      const ring1Radius = 120;
      const segments = 48;
      const ring1Points = [];

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const x = Math.cos(theta) * ring1Radius;
        const y = 0;
        const z = Math.sin(theta) * ring1Radius;
        ring1Points.push(projectPoint(x, y, z));
      }

      ctx.lineWidth = 2.5;
      for (let i = 0; i < ring1Points.length - 1; i++) {
        const p1 = ring1Points[i];
        const p2 = ring1Points[i + 1];
        if (p1.depth > 0 || p2.depth > 0) {
          ctx.strokeStyle = 'rgba(191, 194, 199, 0.25)';
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.stroke();
        }
      }

      // 2. Draw Ring 2 (Tilted Meridian Ring - Back)
      const ring2Radius = 138;
      const ring2Points = [];
      const tiltAngle = Math.PI * 0.32; // ~58 deg

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const rx = Math.cos(theta) * ring2Radius;
        const ry = Math.sin(theta) * ring2Radius * Math.sin(tiltAngle);
        const rz = Math.sin(theta) * ring2Radius * Math.cos(tiltAngle);

        const cosSpin = Math.cos(-idleSpin * 0.8);
        const sinSpin = Math.sin(-idleSpin * 0.8);
        const xSpin = rx * cosSpin - rz * sinSpin;
        const zSpin = rx * sinSpin + rz * cosSpin;

        ring2Points.push(projectPoint(xSpin, ry, zSpin));
      }

      for (let i = 0; i < ring2Points.length - 1; i++) {
        const p1 = ring2Points[i];
        const p2 = ring2Points[i + 1];
        if (p1.depth > 0 || p2.depth > 0) {
          ctx.strokeStyle = 'rgba(163, 163, 168, 0.2)';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.stroke();
        }
      }

      // 3. Central Obsidian Sphere & Luminous Icy Core
      const sphereRadius = 66;

      // Ambient Core Aura Glow behind sphere
      const auraPulse = Math.sin(elapsed * 2.5) * 4;
      const auraGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, sphereRadius + 30 + auraPulse);
      auraGrad.addColorStop(0, 'rgba(224, 242, 254, 0.45)');
      auraGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.18)');
      auraGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius + 30 + auraPulse, 0, Math.PI * 2);
      ctx.fill();

      // Outer Dark Obsidian Sphere Body
      const sphereGrad = ctx.createRadialGradient(
        cx - sphereRadius * 0.35,
        cy - sphereRadius * 0.35,
        5,
        cx,
        cy,
        sphereRadius
      );
      sphereGrad.addColorStop(0, '#1c1c22');
      sphereGrad.addColorStop(0.5, '#101014');
      sphereGrad.addColorStop(0.9, '#08080a');
      sphereGrad.addColorStop(1, '#050506');

      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
      ctx.fill();

      // Obsidian Surface Specular Rim Light
      ctx.strokeStyle = 'rgba(191, 194, 199, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Carved Equatorial Aperture Slots exposing glowing energy
      for (let s = 0; s < 4; s++) {
        const slotAngle = (s * Math.PI) / 2 + totalYaw;
        const sx = Math.cos(slotAngle) * (sphereRadius * 0.75);
        const sz = Math.sin(slotAngle) * (sphereRadius * 0.75);
        const sp = projectPoint(sx, 0, sz);

        if (sp.depth < 0) {
          const slotGrad = ctx.createRadialGradient(sp.px, sp.py, 1, sp.px, sp.py, 18);
          slotGrad.addColorStop(0, '#ffffff');
          slotGrad.addColorStop(0.4, '#bae6fd');
          slotGrad.addColorStop(1, 'transparent');

          ctx.fillStyle = slotGrad;
          ctx.beginPath();
          ctx.arc(sp.px, sp.py, 18, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Luminous Inner Core Center
      const corePulse = Math.sin(elapsed * 3) * 2;
      const coreRadius = 26 + corePulse;
      const coreGrad = ctx.createRadialGradient(
        cx - 3,
        cy - 3,
        2,
        cx,
        cy,
        coreRadius
      );
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.35, '#e0f2fe');
      coreGrad.addColorStop(0.7, '#38bdf8');
      coreGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      // Inner Core Geometric Lattice
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx - 8, cy);
      ctx.lineTo(cx + 8, cy);
      ctx.moveTo(cx, cy - 8);
      ctx.lineTo(cx, cy + 8);
      ctx.stroke();

      // 4. Draw Ring 1 (Front Segment of Horizontal Navigation Ring)
      for (let i = 0; i < ring1Points.length - 1; i++) {
        const p1 = ring1Points[i];
        const p2 = ring1Points[i + 1];
        if (p1.depth <= 0 && p2.depth <= 0) {
          const sheen = Math.max(0, 1 - Math.abs(p1.depth) / ring1Radius);
          ctx.strokeStyle = `rgba(235, 238, 242, ${0.45 + sheen * 0.55})`;
          ctx.lineWidth = 3.2;
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.stroke();
        }
      }

      // 5. Draw 4 Cardinal Navigation Nodes on Ring 1
      DESTINATIONS.forEach((_, idx) => {
        const nodeAngle = idx * (Math.PI / 2);
        const nx = Math.cos(nodeAngle) * ring1Radius;
        const nz = Math.sin(nodeAngle) * ring1Radius;
        const np = projectPoint(nx, 0, nz);

        const isFront = np.depth <= 0;
        const isSelected = Math.abs(np.depth + ring1Radius) < 35;

        ctx.save();
        ctx.translate(np.px, np.py);

        if (isFront) {
          const nodeGlow = ctx.createRadialGradient(0, 0, 1, 0, 0, isSelected ? 16 : 9);
          nodeGlow.addColorStop(0, isSelected ? '#ffffff' : '#e0f2fe');
          nodeGlow.addColorStop(0.5, isSelected ? '#38bdf8' : 'rgba(191, 194, 199, 0.4)');
          nodeGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = nodeGlow;
          ctx.beginPath();
          ctx.arc(0, 0, isSelected ? 16 : 9, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = isSelected ? '#ffffff' : '#bfc2c7';
          ctx.beginPath();
          ctx.arc(0, 0, isSelected ? 4.5 : 3, 0, Math.PI * 2);
          ctx.fill();

          if (isSelected) {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(0, 0, 7.5, 0, Math.PI * 2);
            ctx.stroke();
          }
        } else {
          ctx.fillStyle = 'rgba(191, 194, 199, 0.35)';
          ctx.beginPath();
          ctx.arc(0, 0, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      // 6. Draw Ring 2 (Front Segment of Meridian Ring)
      for (let i = 0; i < ring2Points.length - 1; i++) {
        const p1 = ring2Points[i];
        const p2 = ring2Points[i + 1];
        if (p1.depth <= 0 && p2.depth <= 0) {
          ctx.strokeStyle = 'rgba(235, 238, 242, 0.85)';
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.stroke();
        }
      }

      // 7. Draw Floating Energy Particles
      particles.forEach((pt) => {
        pt.angle += pt.speed;
        const px = Math.cos(pt.angle) * pt.orbitRadius;
        const py = pt.elevation + Math.sin(elapsed * 1.5 + pt.angle) * 8;
        const pz = Math.sin(pt.angle) * pt.orbitRadius;

        const proj = projectPoint(px, py, pz);

        const particleAlpha = proj.depth < 0 ? pt.alpha : pt.alpha * 0.3;
        ctx.fillStyle = `rgba(224, 242, 254, ${particleAlpha})`;
        ctx.beginPath();
        ctx.arc(proj.px, proj.py, pt.size * proj.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animId);
  }, [currentAngle, pitch]);

  const activeDestination = DESTINATIONS[selectedIndex];

  useEffect(() => {
    return () => {
      if (snapAnimId.current) cancelAnimationFrame(snapAnimId.current);
      if (autoNavTimer.current) clearTimeout(autoNavTimer.current);
    };
  }, []);

  return (
    <section
      id="arcane-orb"
      className="arcane-orb-section"
      aria-label="Arcane Orb Rotational Navigation"
    >
      <div className="arcane-orb-backdrop" />

      {/* Screen Reader Live Region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {srAnnouncement}
      </div>

      <div className="site-container">
        <div className="arcane-orb-layout">
          {/* Left Column: Editorial Information & Destination Preview */}
          <div className="arcane-info-column">
            <div className="arcane-eyebrow">
              <span className="arcane-eyebrow-pulsar" />
              <span>ARTIFACT NAVIGATION · ROTATIONAL GATEWAY</span>
            </div>

            <h2 className="arcane-main-headline">
              ARCANE ORB
            </h2>

            {/* Instruction: Explicitly "ROTATE TO EXPLORE" */}
            <div className="arcane-instructions-box">
              <span className="arcane-instruction-badge">ROTATE TO EXPLORE</span>
              <span>Drag orb horizontally · Snaps to nearest destination</span>
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
              {/* Canvas 3D Armillary Orb */}
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className={`arcane-canvas-element ${isDragging ? 'dragging' : ''}`}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  touchAction: 'none',
                }}
                aria-label="Interactive Arcane Orb. Drag horizontally to rotate rings and align destinations."
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

              {/* Explicit Instruction Badge */}
              <div className="arcane-drag-guidance">
                <RotateCw size={11} style={{ color: 'var(--metallic-silver)' }} />
                <span>ROTATE TO EXPLORE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArcaneOrb;
