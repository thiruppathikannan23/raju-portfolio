import React, { useEffect, useRef, useState } from 'react';

interface IntroSphereProps {
  onClick: () => void;
  isSwirling: boolean;
  disabled?: boolean;
}

export const IntroSphere: React.FC<IntroSphereProps> = ({ onClick, isSwirling, disabled }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const startTime = performance.now();

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Orbital stardust particles
    const particleCount = 24;
    const particles = Array.from({ length: particleCount }, () => ({
      angle: Math.random() * Math.PI * 2,
      orbitRadius: Math.random() * 24 + 40,
      speed: (Math.random() * 0.025 + 0.012) * (Math.random() > 0.5 ? 1 : -1),
      elevation: (Math.random() - 0.5) * 28,
      size: Math.random() * 1.6 + 0.8,
      alpha: Math.random() * 0.6 + 0.4,
    }));

    let currentRotation = 0;
    let currentSpeed = 0.018;

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

      // Accelerate rotation on hover or swirl
      const targetSpeed = isSwirling ? 0.16 : isHovered ? 0.055 : 0.02;
      currentSpeed += (targetSpeed - currentSpeed) * 0.1;
      currentRotation += prefersReducedMotion ? 0 : currentSpeed;

      // 3D Point Projection Helper
      const projectPoint = (x: number, y: number, z: number, pitch = 0.35) => {
        const cosY = Math.cos(currentRotation);
        const sinY = Math.sin(currentRotation);
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;

        const cosX = Math.cos(pitch);
        const sinX = Math.sin(pitch);
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const fov = 220;
        const scale = fov / (fov + z2);
        return {
          px: cx + x1 * scale,
          py: cy + y2 * scale,
          depth: z2,
          scale,
        };
      };

      // 1. Ambient Core Glow Aura
      const auraPulse = Math.sin(elapsed * 3.2) * 4;
      const auraRadius = isHovered ? 48 + auraPulse : 38 + auraPulse;
      const auraGrad = ctx.createRadialGradient(cx, cy, 6, cx, cy, auraRadius);
      auraGrad.addColorStop(0, 'rgba(224, 242, 254, 0.85)');
      auraGrad.addColorStop(0.35, isHovered ? 'rgba(56, 189, 248, 0.5)' : 'rgba(56, 189, 248, 0.28)');
      auraGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, auraRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Ring 1 (Horizontal Ring - Back half)
      const ring1Radius = 42;
      const segments = 36;
      const ring1Points = [];

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const x = Math.cos(theta) * ring1Radius;
        const y = 0;
        const z = Math.sin(theta) * ring1Radius;
        ring1Points.push(projectPoint(x, y, z, 0.42));
      }

      ctx.lineWidth = 1.8;
      for (let i = 0; i < ring1Points.length - 1; i++) {
        const p1 = ring1Points[i];
        const p2 = ring1Points[i + 1];
        if (p1.depth > 0 || p2.depth > 0) {
          ctx.strokeStyle = 'rgba(191, 194, 199, 0.35)';
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.stroke();
        }
      }

      // 3. Ring 2 (Tilted Ring - Back half)
      const ring2Radius = 48;
      const ring2Points = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const rx = Math.cos(theta) * ring2Radius;
        const ry = Math.sin(theta) * ring2Radius * 0.85;
        const rz = Math.sin(theta) * ring2Radius * 0.52;
        ring2Points.push(projectPoint(rx, ry, rz, -0.28));
      }

      for (let i = 0; i < ring2Points.length - 1; i++) {
        const p1 = ring2Points[i];
        const p2 = ring2Points[i + 1];
        if (p1.depth > 0 || p2.depth > 0) {
          ctx.strokeStyle = 'rgba(163, 163, 168, 0.25)';
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.stroke();
        }
      }

      // 4. Central Obsidian Sphere Body
      const sphereRadius = 24;
      const sphereGrad = ctx.createRadialGradient(
        cx - sphereRadius * 0.35,
        cy - sphereRadius * 0.35,
        2,
        cx,
        cy,
        sphereRadius
      );
      sphereGrad.addColorStop(0, '#282834');
      sphereGrad.addColorStop(0.38, '#14141a');
      sphereGrad.addColorStop(0.85, '#09090c');
      sphereGrad.addColorStop(1, '#040405');

      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
      ctx.fill();

      // Specular silver rim
      ctx.strokeStyle = isHovered ? '#ffffff' : 'rgba(191, 194, 199, 0.55)';
      ctx.lineWidth = isHovered ? 1.4 : 1.0;
      ctx.stroke();

      // 5. Luminous Inner Core Heart
      const corePulse = Math.sin(elapsed * 4.2) * 1.8;
      const coreRadius = 10 + corePulse;
      const coreGrad = ctx.createRadialGradient(cx - 1, cy - 1, 1, cx, cy, coreRadius);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.35, '#e0f2fe');
      coreGrad.addColorStop(0.75, '#38bdf8');
      coreGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      // Core Crosshair / Energy Crystal
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(cx - 6, cy);
      ctx.lineTo(cx + 6, cy);
      ctx.moveTo(cx, cy - 6);
      ctx.lineTo(cx, cy + 6);
      ctx.stroke();

      // 6. Ring 1 (Horizontal Ring - Front half)
      for (let i = 0; i < ring1Points.length - 1; i++) {
        const p1 = ring1Points[i];
        const p2 = ring1Points[i + 1];
        if (p1.depth <= 0 && p2.depth <= 0) {
          ctx.strokeStyle = isHovered ? '#ffffff' : 'rgba(235, 238, 242, 0.9)';
          ctx.lineWidth = isHovered ? 2.5 : 2.0;
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.stroke();
        }
      }

      // 7. Ring 2 (Tilted Ring - Front half)
      for (let i = 0; i < ring2Points.length - 1; i++) {
        const p1 = ring2Points[i];
        const p2 = ring2Points[i + 1];
        if (p1.depth <= 0 && p2.depth <= 0) {
          ctx.strokeStyle = 'rgba(215, 218, 224, 0.8)';
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.stroke();
        }
      }

      // 8. Orbital Particles
      particles.forEach((pt) => {
        pt.angle += pt.speed * (isHovered ? 1.8 : 1.0);
        const px = Math.cos(pt.angle) * pt.orbitRadius;
        const py = pt.elevation + Math.sin(elapsed * 2.2 + pt.angle) * 4;
        const pz = Math.sin(pt.angle) * pt.orbitRadius;

        const proj = projectPoint(px, py, pz);
        const alpha = proj.depth < 0 ? pt.alpha : pt.alpha * 0.35;
        ctx.fillStyle = isHovered ? `rgba(255, 255, 255, ${alpha})` : `rgba(224, 242, 254, ${alpha})`;
        ctx.beginPath();
        ctx.arc(proj.px, proj.py, pt.size * proj.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animId);
  }, [isHovered, isSwirling]);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled || isSwirling}
      className={`intro-start-button ${isHovered ? 'hovered' : ''} ${isSwirling ? 'swirling' : ''}`}
      aria-label="Start Portfolio Experience — Click 3D Sphere to Enter"
      title="Click sphere to start and enter"
    >
      {/* Concentric Breathing Beacon Rings */}
      <div className="sphere-pulse-ring ring-1" aria-hidden="true" />
      <div className="sphere-pulse-ring ring-2" aria-hidden="true" />
      <div className="sphere-pulse-ring ring-3" aria-hidden="true" />

      {/* 3D Sphere Canvas */}
      <canvas
        ref={canvasRef}
        className="intro-sphere-canvas"
        style={{ width: '120px', height: '120px', display: 'block' }}
      />

      {/* Distinct Luxury START Pill Button Label */}
      <div className="sphere-start-pill">
        <div className="start-pill-core">
          <span className="start-pill-pulsar" />
          <span className="start-pill-text">DISCOVER</span>
          <span className="start-pill-arrow">↗</span>
        </div>
        <div className="start-pill-sub">PRESS SPHERE TO ENTER</div>
      </div>
    </button>
  );
};
