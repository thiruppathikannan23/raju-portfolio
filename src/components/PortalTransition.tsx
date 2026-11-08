import React, { useEffect, useRef } from 'react';

interface PortalTransitionProps {
  mode: 'entering' | 'exiting';
  onComplete: () => void;
}

export const PortalTransition: React.FC<PortalTransitionProps> = ({ mode, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const startTime = performance.now();
    const duration = mode === 'entering' ? 1100 : 900;

    // Generate portal stardust particles
    const particleCount = 140;
    const particles = Array.from({ length: particleCount }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * 0.8 + 0.1,
      speed: Math.random() * 0.02 + 0.01,
      size: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.8 + 0.2,
    }));

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Resize
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const cx = width / 2;
      const cy = height / 2;
      const maxDim = Math.hypot(width, height);

      ctx.clearRect(0, 0, width, height);

      // Backdrop fill
      ctx.fillStyle = mode === 'entering' ? `rgba(6, 6, 8, ${progress})` : `rgba(8, 8, 8, ${1 - progress})`;
      ctx.fillRect(0, 0, width, height);

      // Expanding or collapsing vortex radius
      const currentRadius = mode === 'entering'
        ? Math.pow(progress, 2.2) * (maxDim * 0.75)
        : Math.pow(1 - progress, 2.2) * (maxDim * 0.75);

      // Concentric distortion rings
      for (let r = 0; r < 5; r++) {
        const ringProg = (progress + r * 0.18) % 1;
        const ringRadius = currentRadius * (0.4 + ringProg * 0.8);

        ctx.strokeStyle = `rgba(191, 194, 199, ${(1 - ringProg) * 0.35})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, Math.max(0, ringRadius), 0, Math.PI * 2);
        ctx.stroke();
      }

      // Stardust swirling into or out of singularity
      particles.forEach((p) => {
        p.angle += p.speed * (mode === 'entering' ? 1.5 : -1.5);
        const pDist = mode === 'entering'
          ? (p.dist * maxDim * 0.5 * (1 - progress * 0.7))
          : (p.dist * maxDim * 0.5 * progress);

        const px = cx + Math.cos(p.angle) * pDist;
        const py = cy + Math.sin(p.angle) * pDist;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * (1 - Math.abs(progress - 0.5) * 1.2)})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Central blinding core
      const coreRadius = Math.max(1, (1 - Math.abs(progress - 0.5) * 2) * 80);
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.3, 'rgba(191, 194, 199, 0.7)');
      coreGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      if (progress < 1) {
        animId = requestAnimationFrame(render);
      } else {
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete();
        }
      }
    };

    animId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animId);
  }, [mode, onComplete]);

  return (
    <div
      className="portal-transition-overlay"
      role="alert"
      aria-live="assertive"
      aria-label={mode === 'entering' ? 'Transporting to Alternate Cosmic World' : 'Returning to Graphite Reality'}
    >
      <canvas ref={canvasRef} className="portal-transition-canvas" />

      <div className="portal-transition-caption">
        <div className="portal-pulse-ring" />
        <span>
          {mode === 'entering'
            ? 'DEPARTING GRAPHITE REALITY · ENTERING THE UNKNOWN'
            : 'COLLAPSING SINGULARITY · RETURNING TO REALITY'}
        </span>
      </div>
    </div>
  );
};
