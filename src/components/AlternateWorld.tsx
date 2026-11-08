import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  X,
  ExternalLink,
  Github,
  ArrowLeft,
  Cpu,
  ShieldCheck,
  Orbit,
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Eye,
  EyeOff,
  Compass
} from 'lucide-react';

export interface CelestialDiamondData {
  id: string;
  orderIndex: number;
  symbol: string;
  name: string;
  code: string;
  category: string;
  discipline: string;
  headline: string;
  synopsis: string;
  highlights: string[];
  link?: string;
  icon: 'systems' | 'web' | 'data' | 'journey' | 'skills' | 'embedded';
  celestialType: 'sun-core' | 'terrestrial-diamond' | 'metallic-diamond' | 'habitable-diamond' | 'jovian-diamond' | 'ringed-diamond';
  orbitalDistance: number; // base distance from Central Sun in pixels
  orbitalSpeed: number;    // radians per second
  initialAngle: number;    // initial orbital angle
  diamondSize: number;     // diamond vertex radius in pixels
  spinSpeed: number;       // axial rotation speed
  primaryColor: string;    // border/accent color
  secondaryColor: string;  // facet tint
  glowColor: string;       // aura glow
  hasGeometricRings?: boolean;
  moons?: Array<{
    name: string;
    distance: number;
    size: number;
    speed: number;
    angle: number;
    color: string;
  }>;
  astronomyStats: {
    classification: string;
    semiMajorAxis: string;
    orbitalPeriod: string;
    orbitalVelocity: string;
    axialTilt: string;
    geometryType: string;
    satellites: string;
  };
}

export const DIAMOND_SANCTUARIES: CelestialDiamondData[] = [
  {
    id: 'astral-matrix',
    orderIndex: 0,
    symbol: '☉',
    name: 'Solis Astral Diamond Core',
    code: 'SOL-00',
    category: 'STUDENT DEVELOPER · CENTRAL CORE',
    discipline: 'Learning Foundations & Creative Exploration',
    celestialType: 'sun-core',
    orbitalDistance: 0,
    orbitalSpeed: 0,
    initialAngle: 0,
    diamondSize: 34,
    spinSpeed: 0.22,
    primaryColor: '#ffffff',
    secondaryColor: '#fef08a',
    glowColor: 'rgba(254, 240, 138, 0.45)',
    headline: 'Thiruppathi Raja: Student Developer & Creative Thinker',
    synopsis: 'The gravitational center of Thiruppathi Raja’s learning journey. Represents an aspiring developer exploring programming fundamentals, building practical projects, and working toward a future in web development.',
    highlights: [
      'Student Developer: Dedicated to understanding technology and computer fundamentals from the ground up.',
      'Creative Thinker: Motivated by creating practical solutions for real-world needs.',
      'Active Exploration: Learning C, Java basics, HTML, CSS, and modern AI-assisted web development.',
      'Future Vision: Working consistently toward professional growth and future entrepreneurship.'
    ],
    icon: 'skills',
    astronomyStats: {
      classification: 'Hyper-Luminous Stellar Monolith · Class G2V',
      semiMajorAxis: '0.00 AU (Gravitational Barycenter)',
      orbitalPeriod: 'Continuous Solar Core Fusion',
      orbitalVelocity: '220 km/s (Galactic Orbit)',
      axialTilt: '7.25° (Stellar Diamond Axis)',
      geometryType: 'Nested Rotating Octahedral Core',
      satellites: '5 Orbiting Milestone Sanctuaries'
    }
  },
  {
    id: 'irrigation-nexus',
    orderIndex: 1,
    symbol: '☿',
    name: 'The Irrigation Nexus',
    code: 'NEXUS-01',
    category: 'EARLY PROJECT · 1ST PLACE',
    discipline: '12th Grade Smart Irrigation Project',
    celestialType: 'terrestrial-diamond',
    orbitalDistance: 140,
    orbitalSpeed: 0.44,
    initialAngle: 0.6,
    diamondSize: 13,
    spinSpeed: 0.45,
    primaryColor: '#38bdf8',
    secondaryColor: '#0284c7',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    headline: 'Smart Irrigation System: 12th Grade 1st-Place Project',
    synopsis: 'Completed during 12th grade schooling, this Smart Irrigation System secured 1st place recognition. It represents an early milestone in practical technology, featuring dual-mode automated moisture-triggered watering and mobile control.',
    highlights: [
      'Automatic Mode: Continuously samples soil moisture sensors and activates the water pump when moisture is low.',
      'Manual Remote Mode: Intercepts mobile commands via Bluetooth to allow direct manual pump control.',
      'Dedicated Microcontroller: Built using Arduino Nano coordinating analog moisture sensors and digital power relays.',
      'Major Achievement: Secured 1st place recognition as an early schooling breakthrough.'
    ],
    icon: 'embedded',
    astronomyStats: {
      classification: 'Terrestrial Lithosphere Diamond · Orbit I',
      semiMajorAxis: '0.387 AU (Inner Warm Zone)',
      orbitalPeriod: '87.97 Earth Days (Swift Revolution)',
      orbitalVelocity: '47.36 km/s',
      axialTilt: '0.034°',
      geometryType: 'Faceted Rhombus with Cyan Circuit Veins',
      satellites: '1 Rapid Orbiting Photon Beacon'
    }
  },
  {
    id: 'systems-citadel',
    orderIndex: 2,
    symbol: '♀',
    name: 'The C Foundations Citadel',
    code: 'CITADEL-02',
    category: 'PROGRAMMING LEARNING',
    discipline: 'C Language Fundamentals',
    celestialType: 'metallic-diamond',
    orbitalDistance: 220,
    orbitalSpeed: 0.28,
    initialAngle: 2.2,
    diamondSize: 16,
    spinSpeed: -0.32,
    primaryColor: '#bfc2c7',
    secondaryColor: '#71717a',
    glowColor: 'rgba(191, 194, 199, 0.35)',
    headline: 'Learning Core Programming with C',
    synopsis: 'Represents Stage 2 of the learning journey: mastering core programming syntax, procedural logic, and problem-solving through C programming.',
    highlights: [
      'C Programming Foundations: Core syntax, variables, data types, and logical control flow.',
      'Structured Programming: Breaking problems into modular functions and algorithmic steps.',
      'Problem Solving: Practicing analytical thinking and structured code execution.',
      'Foundation for Growth: Preparing a strong base for future software and web development.'
    ],
    icon: 'systems',
    astronomyStats: {
      classification: 'Dense Metallic Basalt & Tungsten Diamond · Orbit II',
      semiMajorAxis: '0.723 AU',
      orbitalPeriod: '224.7 Earth Days',
      orbitalVelocity: '35.02 km/s',
      axialTilt: '177.3° (Retrograde Pointer Spin)',
      geometryType: 'Monolithic Faceted Titanium Rhombus',
      satellites: 'Core Syntax Processing Bus'
    }
  },
  {
    id: 'origin-spire',
    orderIndex: 3,
    symbol: '♁',
    name: 'The Exploration Spire',
    code: 'SPIRE-03',
    category: 'AI-ASSISTED DEVELOPMENT',
    discipline: 'Google Antigravity & Web Fundamentals',
    celestialType: 'habitable-diamond',
    orbitalDistance: 310,
    orbitalSpeed: 0.18,
    initialAngle: 4.4,
    diamondSize: 20,
    spinSpeed: 0.25,
    primaryColor: '#ffffff',
    secondaryColor: '#38bdf8',
    glowColor: 'rgba(255, 255, 255, 0.5)',
    headline: 'Exploring Google Antigravity & Web Fundamentals',
    synopsis: 'Represents the current stage of the learning journey: exploring modern AI-assisted website development using Google Antigravity, alongside learning HTML and CSS building blocks.',
    highlights: [
      'Google Antigravity: Exploring AI-assisted development workflows to build and iterate websites.',
      'HTML Basics: Learning page structure, semantic elements, and content organization.',
      'CSS Basics: Learning styling fundamentals, layout design, and typography.',
      'Active Learning: Continuously improving technical curiosity and creative development skills.'
    ],
    icon: 'journey',
    moons: [
      {
        name: 'The Learning Moon',
        distance: 30,
        size: 5,
        speed: 1.8,
        angle: 0.5,
        color: '#e2e8f0'
      }
    ],
    astronomyStats: {
      classification: 'Temperate Terran Diamond · Orbit III (Goldilocks Zone)',
      semiMajorAxis: '1.000 AU (Standard Astronomical Unit)',
      orbitalPeriod: '365.25 Earth Days (1.00 Year)',
      orbitalVelocity: '29.78 km/s',
      axialTilt: '23.44° (Dynamic Seasonality)',
      geometryType: 'Dual-Inscribed Specular Diamond Crystal',
      satellites: '1 Natural Satellite (Ongoing Exploration)'
    }
  },
  {
    id: 'agritech-realm',
    orderIndex: 4,
    symbol: '♃',
    name: 'The Agritech Citadel',
    code: 'AGRI-04',
    category: 'AGRICULTURAL PROJECT',
    discipline: 'Agrinilo Platform Concept',
    celestialType: 'jovian-diamond',
    orbitalDistance: 455,
    orbitalSpeed: 0.11,
    initialAngle: 1.5,
    diamondSize: 26,
    spinSpeed: 0.16,
    primaryColor: '#e2e4e8',
    secondaryColor: '#a1a1aa',
    glowColor: 'rgba(226, 228, 232, 0.4)',
    headline: 'Agrinilo: Agriculture-Focused Platform Project',
    synopsis: 'Developed as part of Thiruppathi Raja’s technology and innovation journey to explore how web interfaces can simplify communication and resources for regional farmers.',
    highlights: [
      'Implemented: Bilingual interface navigation supporting English and Tamil.',
      'Implemented: Structured dashboard layout organizing agricultural resources.',
      'Implemented: Mobile-friendly layout designed for clear outdoor visibility.',
      'Proposed Features: Crop advisory guidance, marketplace listings, and storage tracking.'
    ],
    link: 'https://github.com/thiruppathikannan23/agrinilo',
    icon: 'web',
    moons: [
      {
        name: 'Interface Design Node',
        distance: 42,
        size: 5.5,
        speed: 1.9,
        angle: 0.8,
        color: '#d1d5db'
      },
      {
        name: 'Farmer Workflow Node',
        distance: 56,
        size: 4.5,
        speed: 1.2,
        angle: 3.4,
        color: '#9ca3af'
      }
    ],
    astronomyStats: {
      classification: 'Jovian Diamond Colossus · Orbit IV',
      semiMajorAxis: '5.204 AU',
      orbitalPeriod: '11.86 Earth Years',
      orbitalVelocity: '13.07 km/s',
      axialTilt: '3.13°',
      geometryType: 'Tri-Segmented Colossal Diamond Monolith',
      satellites: '2 Dedicated Orbiting Prototype Nodes'
    }
  },
  {
    id: 'oop-sanctuary',
    orderIndex: 5,
    symbol: '♄',
    name: 'The Java Fundamentals Polyhedron',
    code: 'JAVA-05',
    category: 'PROGRAMMING BASICS',
    discipline: 'Java Object-Oriented Fundamentals',
    celestialType: 'ringed-diamond',
    orbitalDistance: 580,
    orbitalSpeed: 0.065,
    initialAngle: 3.8,
    diamondSize: 22,
    spinSpeed: 0.12,
    primaryColor: '#a3a3a8',
    secondaryColor: '#52525b',
    glowColor: 'rgba(163, 163, 168, 0.4)',
    headline: 'Learning the Basics of Java',
    synopsis: 'The outer ringed diamond sanctuary represents Stage 2 Java learning: exploring the fundamentals of object-oriented concepts, classes, and modular code organization.',
    highlights: [
      'Java Basics: Learning classes, objects, methods, and core language structure.',
      'Object-Oriented Concepts: Exploring encapsulation and reusable code principles.',
      'Practical Exercises: Building basic programs to solidify programming syntax.',
      'Ongoing Growth: Expanding software development knowledge alongside C and web tools.'
    ],
    icon: 'data',
    hasGeometricRings: true,
    astronomyStats: {
      classification: 'Geometric Ringed Diamond Sovereign · Orbit V',
      semiMajorAxis: '9.582 AU (Outer Majestic Realm)',
      orbitalPeriod: '29.45 Earth Years',
      orbitalVelocity: '9.69 km/s',
      axialTilt: '26.73° (Prominent Geometric Ring Plane)',
      geometryType: 'Symmetric Diamond with Double Concentric Rings',
      satellites: 'Concentric Diamond Ring System'
    }
  }
];

interface AlternateWorldProps {
  onReturnToReality: () => void;
}

export const AlternateWorld: React.FC<AlternateWorldProps> = ({ onReturnToReality }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Active modal inspection
  const [activeSanctuary, setActiveSanctuary] = useState<CelestialDiamondData | null>(null);
  const [hoveredSanctuary, setHoveredSanctuary] = useState<{
    sanctuary: CelestialDiamondData;
    screenX: number;
    screenY: number;
    isSun: boolean;
  } | null>(null);

  // Simulation controls state
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [timeMultiplier, setTimeMultiplier] = useState<number>(1.0);
  const [showOrbits, setShowOrbits] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);

  // 3D Camera Controls (Yaw, Pitch, Zoom, Pan)
  const camera = useRef({
    yaw: -0.42,
    pitch: 1.05,             // 3D tilt inclination (~60 degrees for solar system perspective)
    zoom: 1.0,
    targetZoom: 1.0,
    panX: 0,
    panY: 0,
    targetPanX: 0,
    targetPanY: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    startYaw: 0,
    startPitch: 0,
    startPanX: 0,
    startPanY: 0,
    dragMode: 'rotate' as 'rotate' | 'pan',
    mouseScreenX: 0,
    mouseScreenY: 0
  });

  const simTime = useRef(0);
  const lastFrameTime = useRef(performance.now());

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeSanctuary) {
          setActiveSanctuary(null);
        } else {
          onReturnToReality();
        }
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPaused(prev => !prev);
      } else if (e.key === '+' || e.key === '=') {
        camera.current.targetZoom = Math.min(2.2, camera.current.targetZoom + 0.15);
      } else if (e.key === '-' || e.key === '_') {
        camera.current.targetZoom = Math.max(0.5, camera.current.targetZoom - 0.15);
      } else if (e.key === '0') {
        camera.current.yaw = -0.42;
        camera.current.pitch = 1.05;
        camera.current.targetZoom = 1.0;
        camera.current.targetPanX = 0;
        camera.current.targetPanY = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSanctuary, onReturnToReality]);

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomDelta = -e.deltaY * 0.0012;
    camera.current.targetZoom = Math.max(0.5, Math.min(2.2, camera.current.targetZoom + zoomDelta));
  };

  // Mouse down handler
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || e.shiftKey) {
      camera.current.dragMode = 'pan';
    } else if (e.button === 0) {
      camera.current.dragMode = 'rotate';
    } else {
      return;
    }
    camera.current.isDragging = true;
    camera.current.dragStartX = e.clientX;
    camera.current.dragStartY = e.clientY;
    camera.current.startYaw = camera.current.yaw;
    camera.current.startPitch = camera.current.pitch;
    camera.current.startPanX = camera.current.panX;
    camera.current.startPanY = camera.current.panY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    camera.current.mouseScreenX = e.clientX;
    camera.current.mouseScreenY = e.clientY;

    if (camera.current.isDragging) {
      const dx = e.clientX - camera.current.dragStartX;
      const dy = e.clientY - camera.current.dragStartY;

      if (camera.current.dragMode === 'rotate') {
        camera.current.yaw = camera.current.startYaw + dx * 0.006;
        camera.current.pitch = Math.max(0.25, Math.min(1.48, camera.current.startPitch + dy * 0.005));
      } else {
        camera.current.targetPanX = camera.current.startPanX + dx;
        camera.current.targetPanY = camera.current.startPanY + dy;
      }
    }
  };

  const handleMouseUp = () => {
    camera.current.isDragging = false;
  };

  // Touch handlers for mobile
  const touchState = useRef<{ startX: number; startY: number; startDist: number }>({ startX: 0, startY: 0, startDist: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      camera.current.isDragging = true;
      camera.current.dragMode = 'rotate';
      touchState.current.startX = e.touches[0].clientX;
      touchState.current.startY = e.touches[0].clientY;
      camera.current.startYaw = camera.current.yaw;
      camera.current.startPitch = camera.current.pitch;
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchState.current.startDist = Math.hypot(dx, dy);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && camera.current.isDragging) {
      const dx = e.touches[0].clientX - touchState.current.startX;
      const dy = e.touches[0].clientY - touchState.current.startY;
      camera.current.yaw = camera.current.startYaw + dx * 0.007;
      camera.current.pitch = Math.max(0.25, Math.min(1.48, camera.current.startPitch + dy * 0.006));
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const ratio = dist / (touchState.current.startDist || dist);
      camera.current.targetZoom = Math.max(0.5, Math.min(2.2, camera.current.zoom * ratio));
      touchState.current.startDist = dist;
    }
  };

  const handleTouchEnd = () => {
    camera.current.isDragging = false;
  };

  const handleResetCamera = useCallback(() => {
    camera.current.yaw = -0.42;
    camera.current.pitch = 1.05;
    camera.current.targetZoom = 1.0;
    camera.current.targetPanX = 0;
    camera.current.targetPanY = 0;
  }, []);

  const handleSelectSanctuary = useCallback((sanctuary: CelestialDiamondData) => {
    setActiveSanctuary(sanctuary);
  }, []);

  // MAIN DIAMOND SOLAR SYSTEM ENGINE
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId: number;

    // 1. Deep Space Starfield (320 stars)
    const stars = Array.from({ length: 320 }, () => ({
      x: (Math.random() - 0.5) * 3200,
      y: (Math.random() - 0.5) * 3200,
      z: Math.random() * 0.85 + 0.15,
      radius: Math.random() * 1.4 + 0.4,
      twinkleSpeed: Math.random() * 0.0025 + 0.0008,
      twinklePhase: Math.random() * Math.PI * 2,
      tint: Math.random() > 0.8 ? 'rgba(191, 219, 254, ' : 'rgba(255, 255, 255, '
    }));

    // 2. Cosmic Nebulae Clouds
    const nebulae = [
      { x: -450, y: -260, r: 600, color: 'rgba(24, 28, 48, 0.22)' },
      { x: 520, y: 320, r: 680, color: 'rgba(20, 24, 40, 0.28)' },
      { x: -120, y: 480, r: 540, color: 'rgba(32, 34, 52, 0.18)' },
      { x: 280, y: -420, r: 520, color: 'rgba(28, 30, 46, 0.15)' }
    ];

    // 3. Asteroid Belt of Tumbling Diamond Shards (180 particles)
    const asteroidCount = 180;
    const asteroids = Array.from({ length: asteroidCount }, () => {
      const distance = 365 + (Math.random() - 0.5) * 46;
      return {
        distance,
        angle: Math.random() * Math.PI * 2,
        speed: (0.13 + Math.random() * 0.02) * (365 / distance),
        size: Math.random() * 1.8 + 0.8,
        spin: Math.random() * 0.05 - 0.025,
        verticalOffset: (Math.random() - 0.5) * 16,
        color: Math.random() > 0.4 ? 'rgba(191, 194, 199, 0.75)' : 'rgba(113, 113, 122, 0.55)'
      };
    });

    // 4. Periodic Comet
    const comet = {
      progress: 0,
      speed: 0.00045,
      semiMajor: 720,
      semiMinor: 240,
      angleOffset: 0.85
    };

    // Canvas click detection
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const width = canvas.width;
      const height = canvas.height;
      const dpr = window.devicePixelRatio || 1;

      const cx = (width / dpr) / 2 + camera.current.panX;
      const cy = (height / dpr) / 2 + camera.current.panY;

      const currentSimTime = simTime.current;
      const zoom = camera.current.zoom;
      const yaw = camera.current.yaw;
      const pitch = camera.current.pitch;

      let hitSanctuary: CelestialDiamondData | null = null;
      let minDistance = Infinity;

      DIAMOND_SANCTUARIES.forEach((sanctuary) => {
        let screenX: number;
        let screenY: number;

        if (sanctuary.orbitalDistance === 0) {
          screenX = cx;
          screenY = cy;
        } else {
          const currentAngle = sanctuary.initialAngle + sanctuary.orbitalSpeed * currentSimTime;
          const unrotX = sanctuary.orbitalDistance * Math.cos(currentAngle);
          const unrotY = sanctuary.orbitalDistance * Math.sin(currentAngle);

          const rx = unrotX * Math.cos(yaw) - unrotY * Math.sin(yaw);
          const ry = unrotX * Math.sin(yaw) + unrotY * Math.cos(yaw);

          screenX = cx + rx * zoom;
          screenY = cy + (ry * Math.cos(pitch)) * zoom;
        }

        const hitRadius = Math.max(30, (sanctuary.diamondSize * zoom) + 14);
        const dist = Math.hypot(clickX - screenX, clickY - screenY);

        if (dist <= hitRadius && dist < minDistance) {
          minDistance = dist;
          hitSanctuary = sanctuary;
        }
      });

      if (hitSanctuary) {
        setActiveSanctuary(hitSanctuary);
      }
    };

    canvas.addEventListener('click', handleCanvasClick);

    // Render loop
    const render = (now: number) => {
      const deltaMs = now - lastFrameTime.current;
      lastFrameTime.current = now;

      if (!isPaused) {
        simTime.current += (deltaMs * 0.001) * timeMultiplier;
      }

      // Smooth camera interpolation
      camera.current.zoom += (camera.current.targetZoom - camera.current.zoom) * 0.12;
      camera.current.panX += (camera.current.targetPanX - camera.current.panX) * 0.12;
      camera.current.panY += (camera.current.targetPanY - camera.current.panY) * 0.12;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const width = displayWidth;
      const height = displayHeight;
      const cx = width / 2 + camera.current.panX;
      const cy = height / 2 + camera.current.panY;

      const zoom = camera.current.zoom;
      const yaw = camera.current.yaw;
      const pitch = camera.current.pitch;
      const t = simTime.current;

      // 1. DEEP SPACE VOID BACKGROUND
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // 2. COSMIC NEBULAE
      nebulae.forEach(neb => {
        const nx = cx + neb.x * 0.3;
        const ny = cy + neb.y * 0.3;
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, neb.r * zoom);
        grad.addColorStop(0, neb.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(nx, ny, neb.r * zoom, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. MULTI-DEPTH TWINKLING STARFIELD
      stars.forEach(star => {
        const sx = cx + (star.x + camera.current.panX * 0.2 * star.z) % width;
        const sy = cy + (star.y + camera.current.panY * 0.2 * star.z) % height;
        const normSx = ((sx % width) + width) % width;
        const normSy = ((sy % height) + height) % height;

        const twinkle = 0.35 + 0.65 * Math.sin(now * star.twinkleSpeed + star.twinklePhase);
        ctx.fillStyle = `${star.tint}${twinkle * star.z})`;
        ctx.beginPath();
        ctx.arc(normSx, normSy, star.radius * star.z, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. PERIODIC COMET
      comet.progress = (comet.progress + comet.speed * (!isPaused ? timeMultiplier : 0)) % 1;
      const cometAngle = comet.progress * Math.PI * 2;
      const cometRawX = Math.cos(cometAngle) * comet.semiMajor;
      const cometRawY = Math.sin(cometAngle) * comet.semiMinor;
      const cometRotX = cometRawX * Math.cos(comet.angleOffset) - cometRawY * Math.sin(comet.angleOffset);
      const cometRotY = cometRawX * Math.sin(comet.angleOffset) + cometRawY * Math.cos(comet.angleOffset);

      const comet3dX = cometRotX * Math.cos(yaw) - cometRotY * Math.sin(yaw);
      const comet3dY = cometRotX * Math.sin(yaw) + cometRotY * Math.cos(yaw);
      const cometScreenX = cx + comet3dX * zoom;
      const cometScreenY = cy + (comet3dY * Math.cos(pitch)) * zoom;

      const distToSun = Math.hypot(comet3dX, comet3dY);
      if (distToSun < 650) {
        const tailAngleAwayFromSun = Math.atan2(cometScreenY - cy, cometScreenX - cx);
        const tailLength = Math.max(30, (700 - distToSun) * 0.16) * zoom;

        const ionGrad = ctx.createLinearGradient(
          cometScreenX,
          cometScreenY,
          cometScreenX + Math.cos(tailAngleAwayFromSun) * tailLength * 1.4,
          cometScreenY + Math.sin(tailAngleAwayFromSun) * tailLength * 1.4
        );
        ionGrad.addColorStop(0, 'rgba(56, 189, 248, 0.7)');
        ionGrad.addColorStop(1, 'transparent');
        ctx.strokeStyle = ionGrad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(cometScreenX, cometScreenY);
        ctx.lineTo(
          cometScreenX + Math.cos(tailAngleAwayFromSun) * tailLength * 1.4,
          cometScreenY + Math.sin(tailAngleAwayFromSun) * tailLength * 1.4
        );
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(cometScreenX, cometScreenY, 2.5 * zoom, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 5. DRAW 3D KEPLERIAN ORBITAL PATHS & TRAVELING PHOTONS
      if (showOrbits) {
        DIAMOND_SANCTUARIES.forEach((sanctuary, sIdx) => {
          if (sanctuary.orbitalDistance === 0) return;

          const segments = 90;

          ctx.beginPath();
          for (let i = 0; i <= segments; i++) {
            const a = (i / segments) * Math.PI * 2;
            const unrotX = sanctuary.orbitalDistance * Math.cos(a);
            const unrotY = sanctuary.orbitalDistance * Math.sin(a);

            const rx = unrotX * Math.cos(yaw) - unrotY * Math.sin(yaw);
            const ry = unrotX * Math.sin(yaw) + unrotY * Math.cos(yaw);

            const px = cx + rx * zoom;
            const py = cy + (ry * Math.cos(pitch)) * zoom;

            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }

          const isOrbitHovered = hoveredSanctuary?.sanctuary.id === sanctuary.id;
          ctx.strokeStyle = isOrbitHovered
            ? 'rgba(255, 255, 255, 0.6)'
            : 'rgba(191, 194, 199, 0.14)';
          ctx.lineWidth = isOrbitHovered ? 1.6 : 1.0;
          if (!isOrbitHovered) {
            ctx.setLineDash([4, 6]);
          } else {
            ctx.setLineDash([]);
          }
          ctx.stroke();
          ctx.setLineDash([]);

          // Luminous traveling energy pulse along the orbit
          const pulseT = ((t * 0.25 + sIdx * 0.35) % 1);
          const pulseAngle = pulseT * Math.PI * 2;
          const pUnrotX = sanctuary.orbitalDistance * Math.cos(pulseAngle);
          const pUnrotY = sanctuary.orbitalDistance * Math.sin(pulseAngle);
          const pRx = pUnrotX * Math.cos(yaw) - pUnrotY * Math.sin(yaw);
          const pRy = pUnrotX * Math.sin(yaw) + pUnrotY * Math.cos(yaw);
          const pulseX = cx + pRx * zoom;
          const pulseY = cy + (pRy * Math.cos(pitch)) * zoom;

          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 2.0 * zoom, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      // 6. DRAW THE ASTEROID BELT OF TUMBLING DIAMOND SHARDS
      asteroids.forEach(ast => {
        const currentAngle = ast.angle + ast.speed * t;
        const unrotX = ast.distance * Math.cos(currentAngle);
        const unrotY = ast.distance * Math.sin(currentAngle);

        const rx = unrotX * Math.cos(yaw) - unrotY * Math.sin(yaw);
        const ry = unrotX * Math.sin(yaw) + unrotY * Math.cos(yaw);
        const depthZ = ry * Math.sin(pitch) + ast.verticalOffset;

        const px = cx + rx * zoom;
        const py = cy + (ry * Math.cos(pitch) - ast.verticalOffset * Math.sin(pitch)) * zoom;

        const depthAlpha = Math.max(0.2, Math.min(0.85, 0.55 + depthZ * 0.001));
        const shardSize = Math.max(0.8, ast.size * zoom);

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(ast.angle + t * 0.8);
        ctx.fillStyle = ast.color.replace('0.75', depthAlpha.toFixed(2));
        ctx.beginPath();
        ctx.moveTo(0, -shardSize);
        ctx.lineTo(shardSize * 0.8, 0);
        ctx.lineTo(0, shardSize);
        ctx.lineTo(-shardSize * 0.8, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      // 7. PROJECT ALL DIAMOND SANCTUARIES (With Z-Depth Sorting)
      interface ProjectedDiamond {
        data: CelestialDiamondData;
        screenX: number;
        screenY: number;
        depthZ: number;
        size: number;
        currentAngle: number;
      }

      const projectedSanctuaries: ProjectedDiamond[] = DIAMOND_SANCTUARIES.map(s => {
        if (s.orbitalDistance === 0) {
          return {
            data: s,
            screenX: cx,
            screenY: cy,
            depthZ: 0,
            size: s.diamondSize * zoom,
            currentAngle: 0
          };
        }

        const currentAngle = s.initialAngle + s.orbitalSpeed * t;
        const unrotX = s.orbitalDistance * Math.cos(currentAngle);
        const unrotY = s.orbitalDistance * Math.sin(currentAngle);

        const rx = unrotX * Math.cos(yaw) - unrotY * Math.sin(yaw);
        const ry = unrotX * Math.sin(yaw) + unrotY * Math.cos(yaw);
        const depthZ = ry * Math.sin(pitch);

        const px = cx + rx * zoom;
        const py = cy + (ry * Math.cos(pitch)) * zoom;

        return {
          data: s,
          screenX: px,
          screenY: py,
          depthZ,
          size: Math.max(6, s.diamondSize * zoom),
          currentAngle
        };
      });

      // Z-Depth sort
      projectedSanctuaries.sort((a, b) => a.depthZ - b.depthZ);

      // Track hovered sanctuary
      let currentHovered: {
        sanctuary: CelestialDiamondData;
        screenX: number;
        screenY: number;
        isSun: boolean;
      } | null = null;

      const mouseX = camera.current.mouseScreenX;
      const mouseY = camera.current.mouseScreenY;

      // 8. RENDER EACH DIAMOND SANCTUARY WITH FACETED 3D GEOMETRY
      projectedSanctuaries.forEach(p => {
        const sanctuary = p.data;
        const px = p.screenX;
        const py = p.screenY;
        const s = p.size;
        const isSun = sanctuary.orbitalDistance === 0;

        const hoverDist = Math.hypot(mouseX - px, mouseY - py);
        const isTargetHovered = hoverDist <= Math.max(32, s + 16);

        if (isTargetHovered && (!currentHovered || hoverDist < Math.hypot(mouseX - currentHovered.screenX, mouseY - currentHovered.screenY))) {
          currentHovered = {
            sanctuary,
            screenX: px,
            screenY: py,
            isSun
          };
        }

        const axialRotation = t * sanctuary.spinSpeed;

        ctx.save();
        ctx.translate(px, py);

        // 1. Floating Diamond Shadow Beneath
        const shadowGrad = ctx.createRadialGradient(0, s * 1.5, 0, 0, s * 1.5, s * 1.6);
        shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
        shadowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = shadowGrad;
        ctx.beginPath();
        ctx.ellipse(0, s * 1.5, s * 1.4, s * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();

        // 2. Outer Diamond Aura Glow
        const auraRadius = s * (isTargetHovered ? 2.5 : (isSun ? 2.8 : 1.8));
        const auraGrad = ctx.createRadialGradient(0, 0, s * 0.2, 0, 0, auraRadius);
        auraGrad.addColorStop(0, isTargetHovered ? 'rgba(255, 255, 255, 0.55)' : sanctuary.glowColor);
        auraGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(0, 0, auraRadius, 0, Math.PI * 2);
        ctx.fill();

        // 3. For Central Sun Diamond: Multi-Tier Radiant Rays & Outer Diamond Wireframes
        if (isSun) {
          const rayLength = s * (2.8 + Math.sin(now * 0.003) * 0.25);
          ctx.save();
          ctx.rotate(now * 0.0003);

          // 4 Cardinal Star Rays
          const rayGrad = ctx.createLinearGradient(-rayLength, 0, rayLength, 0);
          rayGrad.addColorStop(0, 'transparent');
          rayGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.6)');
          rayGrad.addColorStop(1, 'transparent');
          ctx.strokeStyle = rayGrad;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(-rayLength, 0);
          ctx.lineTo(rayLength, 0);
          ctx.moveTo(0, -rayLength);
          ctx.lineTo(0, rayLength);
          ctx.stroke();

          // 4 Diagonal Rays
          const diagLength = rayLength * 0.62;
          ctx.strokeStyle = 'rgba(254, 240, 138, 0.28)';
          ctx.beginPath();
          ctx.moveTo(-diagLength, -diagLength);
          ctx.lineTo(diagLength, diagLength);
          ctx.moveTo(-diagLength, diagLength);
          ctx.lineTo(diagLength, -diagLength);
          ctx.stroke();
          ctx.restore();

          // Outer Counter-Rotating Wireframe Diamond
          ctx.save();
          ctx.rotate(-axialRotation * 0.8);
          const outerDiamond = s * 1.55;
          ctx.strokeStyle = 'rgba(254, 240, 138, 0.45)';
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.moveTo(0, -outerDiamond);
          ctx.lineTo(outerDiamond * 0.88, 0);
          ctx.lineTo(0, outerDiamond);
          ctx.lineTo(-outerDiamond * 0.88, 0);
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        }

        // 4. For OOP Polyhedron: Concentric Geometric Diamond Rings (Saturnian Diamond Rings)
        if (sanctuary.hasGeometricRings) {
          ctx.save();
          ctx.rotate(0.38); // tilted diamond ring plane

          // Inner Diamond Ring
          const ring1W = s * 2.3;
          const ring1H = s * 1.5;
          ctx.strokeStyle = 'rgba(212, 212, 216, 0.45)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(0, -ring1H);
          ctx.lineTo(ring1W, 0);
          ctx.lineTo(0, ring1H);
          ctx.lineTo(-ring1W, 0);
          ctx.closePath();
          ctx.stroke();

          // Outer Diamond Ring (Cassini Gap)
          const ring2W = s * 2.9;
          const ring2H = s * 1.9;
          ctx.strokeStyle = 'rgba(212, 212, 216, 0.25)';
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.moveTo(0, -ring2H);
          ctx.lineTo(ring2W, 0);
          ctx.lineTo(0, ring2H);
          ctx.lineTo(-ring2W, 0);
          ctx.closePath();
          ctx.stroke();

          ctx.restore();
        }

        // 5. AXIAL ROTATION OF THE DIAMOND MONOLITH
        ctx.rotate(axialRotation);

        const dw = s * 0.88; // half width
        const dh = s;        // half height

        // 6. FOUR 3D FACETS (Carved Gem Light & Shadow Geometry)
        // Top-Left Facet (Bright specular face)
        ctx.fillStyle = isTargetHovered ? '#2a2a35' : (isSun ? '#ffffff' : '#1c1c24');
        ctx.beginPath();
        ctx.moveTo(0, -dh);
        ctx.lineTo(-dw, 0);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fill();

        // Top-Right Facet (Mid-light face)
        ctx.fillStyle = isTargetHovered ? '#22222c' : (isSun ? '#fef08a' : '#17171d');
        ctx.beginPath();
        ctx.moveTo(0, -dh);
        ctx.lineTo(dw, 0);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fill();

        // Bottom-Left Facet (Mid-shadow face)
        ctx.fillStyle = isTargetHovered ? '#1a1a22' : (isSun ? '#fde047' : '#121216');
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-dw, 0);
        ctx.lineTo(0, dh);
        ctx.closePath();
        ctx.fill();

        // Bottom-Right Facet (Deep shadow face)
        ctx.fillStyle = isTargetHovered ? '#14141a' : (isSun ? '#ca8a04' : '#0c0c10');
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(dw, 0);
        ctx.lineTo(0, dh);
        ctx.closePath();
        ctx.fill();

        // 7. Outer Diamond Perimeter Stroke
        ctx.strokeStyle = isTargetHovered ? '#ffffff' : (isSun ? '#ffffff' : sanctuary.primaryColor);
        ctx.lineWidth = isTargetHovered ? 2.0 : 1.2;
        ctx.beginPath();
        ctx.moveTo(0, -dh);
        ctx.lineTo(dw, 0);
        ctx.lineTo(0, dh);
        ctx.lineTo(-dw, 0);
        ctx.closePath();
        ctx.stroke();

        // 8. Internal Facet Cut Lines
        ctx.strokeStyle = isTargetHovered ? 'rgba(255, 255, 255, 0.55)' : (isSun ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.22)');
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(-dw, 0);
        ctx.lineTo(dw, 0);
        ctx.moveTo(0, -dh);
        ctx.lineTo(0, dh);
        ctx.stroke();

        // 9. Nested Inscribed Inner Diamond
        const inW = dw * 0.46;
        const inH = dh * 0.46;
        ctx.strokeStyle = isTargetHovered ? 'rgba(255, 255, 255, 0.75)' : (isSun ? 'rgba(255, 255, 255, 0.85)' : 'rgba(191, 194, 199, 0.35)');
        ctx.beginPath();
        ctx.moveTo(0, -inH);
        ctx.lineTo(inW, 0);
        ctx.lineTo(0, inH);
        ctx.lineTo(-inW, 0);
        ctx.closePath();
        ctx.stroke();

        // 10. Central Glowing Singularity Core Orb
        ctx.fillStyle = isSun ? '#ffffff' : (isTargetHovered ? '#ffffff' : sanctuary.primaryColor);
        ctx.shadowColor = isSun ? '#fef08a' : sanctuary.primaryColor;
        ctx.shadowBlur = isTargetHovered ? 14 : 7;
        ctx.beginPath();
        ctx.arc(0, 0, isTargetHovered ? 4.5 : (isSun ? 5.5 : 3.0), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // 11. Orbiting Beacon Particle
        const beaconAngle = t * 2.2 + sanctuary.orderIndex;
        const beaconDistX = Math.cos(beaconAngle) * (s * 1.55);
        const beaconDistY = Math.sin(beaconAngle) * (s * 0.8);
        ctx.fillStyle = isTargetHovered ? '#ffffff' : 'rgba(191, 194, 199, 0.85)';
        ctx.beginPath();
        ctx.arc(beaconDistX, beaconDistY, 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // 12. NATURAL SATELLITE DIAMOND MOONS (e.g. Honors Moon on Origin Spire, Telemetry nodes on Agritech)
        if (sanctuary.moons && sanctuary.moons.length > 0) {
          sanctuary.moons.forEach(moon => {
            const moonAngle = moon.angle + moon.speed * t;
            const moonDist = moon.distance * zoom;
            const moonX = px + Math.cos(moonAngle) * moonDist;
            const moonY = py + Math.sin(moonAngle) * (moonDist * 0.58);
            const mSize = Math.max(2.5, moon.size * zoom);

            // Sub-orbit track
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.09)';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.ellipse(px, py, moonDist, moonDist * 0.58, 0, 0, Math.PI * 2);
            ctx.stroke();

            // Diamond Moon
            ctx.save();
            ctx.translate(moonX, moonY);
            ctx.rotate(t * 1.5);
            ctx.fillStyle = moon.color;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(0, -mSize);
            ctx.lineTo(mSize * 0.85, 0);
            ctx.lineTo(0, mSize);
            ctx.lineTo(-mSize * 0.85, 0);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
          });
        }

        // 13. MONOSPACE SANCTUARY LABELS
        if (showLabels) {
          const isSelected = activeSanctuary?.id === sanctuary.id;
          const isHov = isTargetHovered;

          ctx.font = isHov ? '700 11px "JetBrains Mono", monospace' : '600 10px "JetBrains Mono", monospace';
          ctx.fillStyle = isHov || isSelected ? '#ffffff' : 'rgba(191, 194, 199, 0.75)';
          ctx.textAlign = 'center';
          ctx.fillText(
            `${sanctuary.symbol} ${sanctuary.name.toUpperCase()}`,
            px,
            py + s + (18 * zoom)
          );

          ctx.font = '8px "JetBrains Mono", monospace';
          ctx.fillStyle = isHov ? 'rgba(255, 255, 255, 0.9)' : 'rgba(163, 163, 168, 0.55)';
          ctx.fillText(
            `${sanctuary.code} · ${sanctuary.category}`,
            px,
            py + s + (30 * zoom)
          );
        }

        // 14. DIAMOND TARGETING RETICLE ON HOVER
        if (isTargetHovered) {
          const reticleW = (dw + 14) * 1.15;
          const reticleH = (dh + 14) * 1.15;

          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(now * 0.0008);

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.lineWidth = 1.2;

          // Diamond targeting frame
          ctx.beginPath();
          ctx.moveTo(0, -reticleH);
          ctx.lineTo(reticleW, 0);
          ctx.lineTo(0, reticleH);
          ctx.lineTo(-reticleW, 0);
          ctx.closePath();
          ctx.stroke();

          // Outer faint circular reticle
          ctx.strokeStyle = 'rgba(191, 194, 199, 0.35)';
          ctx.setLineDash([2, 4]);
          ctx.beginPath();
          ctx.arc(0, 0, reticleH * 1.25, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.restore();
        }
      });

      setHoveredSanctuary(currentHovered);
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [isPaused, timeMultiplier, showOrbits, showLabels, activeSanctuary]);

  return (
    <div
      className="alternate-world-viewport"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Solar System Architectural Dimension with Diamond Sanctuaries"
      style={{ cursor: camera.current.isDragging ? 'grabbing' : 'crosshair' }}
    >
      {/* High-Precision Celestial Canvas */}
      <canvas ref={canvasRef} className="alternate-world-canvas" />

      {/* Atmospheric Vignette Overlay */}
      <div className="alternate-world-vignette" />

      {/* Top Header Bar */}
      <header className="alternate-world-header">
        <div className="alternate-brand-group">
          <div className="alternate-monogram-box">
            {PORTFOLIO_DATA.personal.monogram}
          </div>
          <div className="alternate-title-meta">
            <span className="alternate-title-name">ASTRAL SOLAR SYSTEM</span>
            <span className="alternate-title-sub">DIAMOND ARCHITECTURE · KEPLERIAN HARMONY</span>
          </div>
        </div>

        {/* Quick Sanctuary Navigator */}
        <nav className="alternate-island-nav" aria-label="Sanctuary Navigator">
          {DIAMOND_SANCTUARIES.map(sanctuary => (
            <button
              key={sanctuary.id}
              onClick={() => handleSelectSanctuary(sanctuary)}
              className={`island-nav-dot-btn ${activeSanctuary?.id === sanctuary.id ? 'active' : ''}`}
              title={`${sanctuary.symbol} ${sanctuary.name}`}
              aria-label={`Inspect ${sanctuary.name}`}
            >
              <span>{sanctuary.symbol}</span>
              <span className="island-nav-label">{sanctuary.code.split('-')[0]}</span>
            </button>
          ))}
        </nav>

        {/* Return to Reality Button */}
        <button
          onClick={onReturnToReality}
          className="btn-return-reality"
          aria-label="Return to reality and collapse alternate dimension"
        >
          <ArrowLeft size={14} />
          <span>Return to Reality</span>
          <kbd>ESC</kbd>
        </button>
      </header>

      {/* Floating Astronomical Telemetry Tooltip */}
      {hoveredSanctuary && !activeSanctuary && (
        <div
          className="island-hover-tooltip solar-telemetry-tooltip"
          style={{
            left: `${hoveredSanctuary.screenX}px`,
            top: `${hoveredSanctuary.screenY}px`,
          }}
        >
          <div className="tooltip-category">
            {hoveredSanctuary.sanctuary.symbol} {hoveredSanctuary.sanctuary.code} · {hoveredSanctuary.sanctuary.category}
          </div>
          <div className="tooltip-title">{hoveredSanctuary.sanctuary.name}</div>
          <div className="tooltip-stats-row">
            <span>{hoveredSanctuary.sanctuary.astronomyStats.semiMajorAxis}</span>
            <span>·</span>
            <span>{hoveredSanctuary.sanctuary.astronomyStats.orbitalPeriod}</span>
          </div>
          <div className="tooltip-hint">Click diamond sanctuary to unveil architectural codex ↗</div>
        </div>
      )}

      {/* Solar System Simulation Control Toolbar (Bottom-Left) */}
      <aside className="solar-controls-dock" aria-label="Solar System Simulation Controls">
        <div className="controls-group">
          <button
            onClick={() => setIsPaused(p => !p)}
            className={`solar-ctrl-btn ${isPaused ? 'active' : ''}`}
            title={isPaused ? "Resume Orbit Simulation (Space)" : "Pause Orbit Simulation (Space)"}
            aria-label={isPaused ? "Resume Orbit Simulation" : "Pause Orbit Simulation"}
          >
            {isPaused ? <Play size={13} /> : <Pause size={13} />}
            <span>{isPaused ? "RESUME" : "PAUSE"}</span>
          </button>

          <div className="solar-speed-selector">
            {[0.5, 1.0, 2.0].map(speed => (
              <button
                key={speed}
                onClick={() => setTimeMultiplier(speed)}
                className={`speed-btn ${timeMultiplier === speed ? 'active' : ''}`}
                title={`Set Simulation Speed to ${speed}x`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        <div className="controls-divider" />

        <div className="controls-group">
          <button
            onClick={() => setShowOrbits(o => !o)}
            className={`solar-ctrl-btn ${showOrbits ? 'active' : ''}`}
            title="Toggle Keplerian Orbit Lines"
            aria-label="Toggle Orbit Lines"
          >
            <Orbit size={13} />
            <span>ORBITS</span>
          </button>

          <button
            onClick={() => setShowLabels(l => !l)}
            className={`solar-ctrl-btn ${showLabels ? 'active' : ''}`}
            title="Toggle Celestial Labels"
            aria-label="Toggle Labels"
          >
            {showLabels ? <Eye size={13} /> : <EyeOff size={13} />}
            <span>LABELS</span>
          </button>

          <button
            onClick={handleResetCamera}
            className="solar-ctrl-btn"
            title="Reset 3D Perspective & Zoom (0)"
            aria-label="Reset Camera"
          >
            <RotateCcw size={13} />
            <span>RESET</span>
          </button>
        </div>

        <div className="controls-divider" />

        <div className="controls-group">
          <button
            onClick={() => {
              camera.current.targetZoom = Math.min(2.2, camera.current.targetZoom + 0.2);
            }}
            className="solar-ctrl-btn icon-only"
            title="Zoom In (+)"
            aria-label="Zoom In"
          >
            <ZoomIn size={14} />
          </button>
          <button
            onClick={() => {
              camera.current.targetZoom = Math.max(0.5, camera.current.targetZoom - 0.2);
            }}
            className="solar-ctrl-btn icon-only"
            title="Zoom Out (-)"
            aria-label="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
        </div>
      </aside>

      {/* Bottom HUD Telemetry Guide */}
      <footer className="alternate-world-footer-hud" aria-hidden="true">
        <div className="hud-instructions">
          <div className="hud-item">
            <span className="hud-dot" />
            <span>DRAG TO ROTATE 3D PERSPECTIVE</span>
          </div>
          <div className="hud-item">
            <span className="hud-dot" />
            <span>SCROLL TO ZOOM</span>
          </div>
          <div className="hud-item">
            <span className="hud-dot" />
            <span>CLICK DIAMONDS TO INSPECT CODEX</span>
          </div>
        </div>
        <div className="hud-instructions">
          <div className="hud-item">
            <Compass size={13} style={{ color: 'var(--metallic-silver)' }} />
            <span>DIAMOND HARMONY · DETERMINISTIC ARCHITECTURE</span>
          </div>
        </div>
      </footer>

      {/* The Celestial Codex Modal */}
      {activeSanctuary && (
        <div
          className="celestial-codex-overlay"
          onClick={() => setActiveSanctuary(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="codex-title"
        >
          <div
            className="celestial-codex-card solar-codex-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveSanctuary(null)}
              className="codex-close-btn"
              aria-label="Close celestial sanctuary details"
            >
              <X size={18} />
            </button>

            {/* Astronomical Designation Eyebrow */}
            <div className="editorial-eyebrow" style={{ color: 'var(--metallic-silver)' }}>
              <span>{activeSanctuary.symbol} {activeSanctuary.code} · {activeSanctuary.category}</span>
            </div>

            <h2 id="codex-title" className="project-title" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.4rem)', color: '#ffffff' }}>
              {activeSanctuary.name}
            </h2>

            <p className="project-tagline" style={{ color: 'var(--metallic-silver)', marginBottom: '1.25rem' }}>
              {activeSanctuary.headline}
            </p>

            {/* Planetary Telemetry Data Card */}
            <div className="solar-telemetry-grid">
              <div className="telemetry-cell">
                <span className="telemetry-label">CLASSIFICATION</span>
                <span className="telemetry-val">{activeSanctuary.astronomyStats.classification}</span>
              </div>
              <div className="telemetry-cell">
                <span className="telemetry-label">SEMI-MAJOR AXIS</span>
                <span className="telemetry-val">{activeSanctuary.astronomyStats.semiMajorAxis}</span>
              </div>
              <div className="telemetry-cell">
                <span className="telemetry-label">ORBITAL PERIOD</span>
                <span className="telemetry-val">{activeSanctuary.astronomyStats.orbitalPeriod}</span>
              </div>
              <div className="telemetry-cell">
                <span className="telemetry-label">ORBITAL VELOCITY</span>
                <span className="telemetry-val">{activeSanctuary.astronomyStats.orbitalVelocity}</span>
              </div>
              <div className="telemetry-cell">
                <span className="telemetry-label">GEOMETRIC FORM</span>
                <span className="telemetry-val">{activeSanctuary.astronomyStats.geometryType}</span>
              </div>
              <div className="telemetry-cell">
                <span className="telemetry-label">SATELLITES & NODES</span>
                <span className="telemetry-val">{activeSanctuary.astronomyStats.satellites}</span>
              </div>
            </div>

            <div className="hairline-divider" style={{ margin: '1.5rem 0' }} />

            {/* Architectural Synopsis */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h3 className="editorial-eyebrow" style={{ color: '#ffffff', marginBottom: '0.65rem' }}>
                <Cpu size={14} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                Architectural Synopsis & Computational Foundation
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.7' }}>
                {activeSanctuary.synopsis}
              </p>
            </div>

            {/* Verified Principles & Highlights */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 className="editorial-eyebrow" style={{ color: '#ffffff', marginBottom: '0.85rem' }}>
                <ShieldCheck size={14} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                Verified Principles & Engineering Highlights
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {activeSanctuary.highlights.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      color: 'var(--text-secondary)',
                      fontSize: '0.88rem',
                      lineHeight: '1.6',
                    }}
                  >
                    <span style={{ color: 'var(--metallic-silver)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', marginTop: '2px' }}>
                      0{idx + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hairline-divider" style={{ marginBottom: '1.5rem' }} />

            {/* Modal Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              {activeSanctuary.link && (
                <a
                  href={activeSanctuary.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-graphite-secondary"
                  style={{ padding: '0.75rem 1.4rem', fontSize: '0.75rem' }}
                >
                  <Github size={15} />
                  <span>Inspect Verified Source</span>
                  <ExternalLink size={13} />
                </a>
              )}
              <button
                onClick={() => setActiveSanctuary(null)}
                className="btn-graphite-primary"
                style={{ padding: '0.75rem 1.4rem', fontSize: '0.75rem', marginLeft: 'auto' }}
              >
                Dismiss Celestial Codex
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
