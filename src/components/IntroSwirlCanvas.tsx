import React, { useEffect, useRef } from 'react';

interface IntroSwirlCanvasProps {
  onComplete: () => void;
  originX?: number;
  originY?: number;
}

export const IntroSwirlCanvas: React.FC<IntroSwirlCanvasProps> = ({
  onComplete,
  originX,
  originY,
}) => {
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
    const duration = 1250; // 1.25 seconds total swirl duration

    // 240 particles distributed across spiral arms
    const particleCount = 240;
    const arms = 5;
    const maxScreen = Math.hypot(window.innerWidth, window.innerHeight);

    const particles = Array.from({ length: particleCount }, (_, idx) => {
      const armIndex = idx % arms;
      const baseArmAngle = (armIndex / arms) * Math.PI * 2;
      const initialDist = Math.random() * maxScreen * 0.75 + 40;
      const spiralOffset = (initialDist / 200) * 1.5;

      return {
        initialAngle: baseArmAngle + spiralOffset + (Math.random() - 0.5) * 0.4,
        initialDist,
        speed: Math.random() * 0.04 + 0.02,
        size: Math.random() * 2.4 + 1.0,
        color: Math.random() > 0.4 ? '#ffffff' : Math.random() > 0.5 ? '#bae6fd' : '#bfc2c7',
        alpha: Math.random() * 0.7 + 0.3,
      };
    });

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const cx = originX ?? width / 2;
      const cy = originY ?? height / 2;

      ctx.clearRect(0, 0, width, height);

      // Darkening vignette toward singularity
      const bgAlpha = Math.min(0.9, progress * 1.2);
      ctx.fillStyle = `rgba(8, 8, 10, ${bgAlpha})`;
      ctx.fillRect(0, 0, width, height);

      // 1. Swirling Vortex Distortion Rings
      const ringCount = 7;
      ctx.save();
      ctx.translate(cx, cy);

      for (let r = 0; r < ringCount; r++) {
        const ringT = (progress * 1.8 + r * 0.15) % 1;
        const ringRadius = (1 - ringT) * maxScreen * 0.55;
        const twistAngle = progress * 6.5 + r * 0.5;

        ctx.rotate(progress * 0.08);
        ctx.strokeStyle = `rgba(191, 194, 199, ${(1 - ringT) * 0.45 * (1 - progress * 0.5)})`;
        ctx.lineWidth = 1.5 + ringT * 2;

        ctx.beginPath();
        // Elliptical distortion creating physical vortex depth
        ctx.ellipse(0, 0, Math.max(1, ringRadius), Math.max(1, ringRadius * 0.75), twistAngle, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Swirling Logarithmic Spiral Particles
      particles.forEach((p) => {
        // Spiral collapse inwards: distance shrinks, rotation accelerates exponentially
        const dist = p.initialDist * Math.pow(1 - progress, 1.6);
        const swirlAngle = p.initialAngle + Math.pow(progress, 2.2) * 14.0 * (p.speed * 40);

        const px = cx + Math.cos(swirlAngle) * dist;
        const py = cy + Math.sin(swirlAngle) * dist;

        const particleAlpha = p.alpha * (1 - Math.pow(progress, 3));
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, particleAlpha);

        ctx.beginPath();
        ctx.arc(px, py, p.size * (1 - progress * 0.4), 0, Math.PI * 2);
        ctx.fill();

        // Stardust trail motion streak
        const trailDist = dist + 8 * progress;
        const trailAngle = swirlAngle - 0.15 * progress;
        const tx = cx + Math.cos(trailAngle) * trailDist;
        const ty = cy + Math.sin(trailAngle) * trailDist;

        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.size * 0.6;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      });

      ctx.globalAlpha = 1;

      // 3. Central Singularity Core Burst
      const coreIntensity = Math.pow(progress, 2.5);
      const coreMaxRadius = Math.min(width, height) * (0.15 + coreIntensity * 1.2);
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(2, coreMaxRadius));

      coreGrad.addColorStop(0, `rgba(255, 255, 255, ${Math.min(1, coreIntensity * 1.4)})`);
      coreGrad.addColorStop(0.3, `rgba(224, 242, 254, ${coreIntensity * 0.85})`);
      coreGrad.addColorStop(0.6, `rgba(56, 189, 248, ${coreIntensity * 0.4})`);
      coreGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreMaxRadius, 0, Math.PI * 2);
      ctx.fill();

      // 4. Final Flash to white/graphite dissolve
      if (progress > 0.75) {
        const flashAlpha = Math.min(1, (progress - 0.75) * 4);
        ctx.fillStyle = `rgba(245, 245, 245, ${flashAlpha * 0.95})`;
        ctx.fillRect(0, 0, width, height);
      }

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
  }, [onComplete, originX, originY]);

  return (
    <canvas
      ref={canvasRef}
      className="intro-swirl-canvas-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
};
