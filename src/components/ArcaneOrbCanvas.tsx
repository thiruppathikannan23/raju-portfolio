import React, { useEffect, useRef } from 'react';

interface ArcaneOrbCanvasProps {
  currentAngle: number;
  pitch: number;
  onDrag: (deltaYaw: number, deltaPitch: number) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  isDragging: boolean;
}

export const ArcaneOrbCanvas: React.FC<ArcaneOrbCanvasProps> = ({
  currentAngle,
  pitch,
  onDrag,
  onDragStart,
  onDragEnd,
  isDragging,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);

  // Pointer drag listeners with pointer capture
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    onDragStart();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragStartPos.current) return;
    const dx = e.clientX - dragStartPos.current.x;
    const dy = e.clientY - dragStartPos.current.y;

    // Convert pixel movement to rotational angles
    const deltaYaw = (dx / 180) * Math.PI;
    const deltaPitch = (-dy / 240) * Math.PI;

    onDrag(deltaYaw, deltaPitch);
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
      onDragEnd();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const startTime = performance.now();

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Generate orbiting energy motes
    const particleCount = 36;
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

      // Idle autonomous slow celestial spin
      const idleSpin = prefersReducedMotion ? 0 : elapsed * 0.15;
      const totalYaw = currentAngle;
      const totalPitch = pitch;

      // 3D Point Projection Helper
      const projectPoint = (x: number, y: number, z: number) => {
        // Yaw rotation around Y axis
        const cosY = Math.cos(totalYaw);
        const sinY = Math.sin(totalYaw);
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;

        // Pitch rotation around X axis
        const cosX = Math.cos(totalPitch);
        const sinX = Math.sin(totalPitch);
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Perspective scaling
        const fov = 380;
        const scale = fov / (fov + z2);
        return {
          px: cx + x1 * scale,
          py: cy + y2 * scale,
          depth: z2,
          scale,
        };
      };

      // -------------------------------------------------------------
      // 1. Draw Ring 1 (Back Segment of Horizontal Navigation Ring)
      // -------------------------------------------------------------
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

      // Back half of Ring 1 (depth > 0)
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

      // -------------------------------------------------------------
      // 2. Draw Ring 2 (Tilted Meridian Ring - Back)
      // -------------------------------------------------------------
      const ring2Radius = 138;
      const ring2Points = [];
      const tiltAngle = Math.PI * 0.32; // ~58 deg

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        // Tilted meridian orientation
        const rx = Math.cos(theta) * ring2Radius;
        const ry = Math.sin(theta) * ring2Radius * Math.sin(tiltAngle);
        const rz = Math.sin(theta) * ring2Radius * Math.cos(tiltAngle);

        // Counter spin
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

      // -------------------------------------------------------------
      // 3. Central Obsidian Sphere & Luminous Icy Core
      // -------------------------------------------------------------
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
          // Visible on front face of sphere
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

      // Luminous Inner Core Aperture Center
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

      // Core Geometric Lattices (Inner crystalline lattice)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.stroke();

      // Crosshair inside core
      ctx.beginPath();
      ctx.moveTo(cx - 8, cy);
      ctx.lineTo(cx + 8, cy);
      ctx.moveTo(cx, cy - 8);
      ctx.lineTo(cx, cy + 8);
      ctx.stroke();

      // -------------------------------------------------------------
      // 4. Draw Ring 1 (Front Segment of Horizontal Navigation Ring)
      // -------------------------------------------------------------
      for (let i = 0; i < ring1Points.length - 1; i++) {
        const p1 = ring1Points[i];
        const p2 = ring1Points[i + 1];
        if (p1.depth <= 0 && p2.depth <= 0) {
          // Front facing ring section
          const sheen = Math.max(0, 1 - Math.abs(p1.depth) / ring1Radius);
          ctx.strokeStyle = `rgba(235, 238, 242, ${0.45 + sheen * 0.55})`;
          ctx.lineWidth = 3.2;
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.stroke();
        }
      }

      // -------------------------------------------------------------
      // 5. Draw 4 Cardinal Navigation Nodes on Ring 1
      // -------------------------------------------------------------
      const destinationLabels = ['PROJECTS', 'ABOUT', 'SKILLS', 'CONTACT'];
      destinationLabels.forEach((_, idx) => {
        const nodeAngle = idx * (Math.PI / 2);
        const nx = Math.cos(nodeAngle) * ring1Radius;
        const nz = Math.sin(nodeAngle) * ring1Radius;
        const np = projectPoint(nx, 0, nz);

        // Node is on the front side if depth <= 0
        const isFront = np.depth <= 0;
        const isSelected = Math.abs(np.depth + ring1Radius) < 35; // facing closest to camera

        ctx.save();
        ctx.translate(np.px, np.py);

        if (isFront) {
          // Node Outer Glow
          const nodeGlow = ctx.createRadialGradient(0, 0, 1, 0, 0, isSelected ? 16 : 9);
          nodeGlow.addColorStop(0, isSelected ? '#ffffff' : '#e0f2fe');
          nodeGlow.addColorStop(0.5, isSelected ? '#38bdf8' : 'rgba(191, 194, 199, 0.4)');
          nodeGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = nodeGlow;
          ctx.beginPath();
          ctx.arc(0, 0, isSelected ? 16 : 9, 0, Math.PI * 2);
          ctx.fill();

          // Node Solid Bead
          ctx.fillStyle = isSelected ? '#ffffff' : '#bfc2c7';
          ctx.beginPath();
          ctx.arc(0, 0, isSelected ? 4.5 : 3, 0, Math.PI * 2);
          ctx.fill();

          // Destination Notch Marker
          if (isSelected) {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(0, 0, 7.5, 0, Math.PI * 2);
            ctx.stroke();
          }
        } else {
          // Faint node on back side
          ctx.fillStyle = 'rgba(191, 194, 199, 0.35)';
          ctx.beginPath();
          ctx.arc(0, 0, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      // -------------------------------------------------------------
      // 6. Draw Ring 2 (Front Segment of Meridian Ring)
      // -------------------------------------------------------------
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

      // -------------------------------------------------------------
      // 7. Draw Floating Energy Particles
      // -------------------------------------------------------------
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

  return (
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
  );
};
