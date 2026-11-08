import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface PortraitFrameProps {
  className?: string;
  introCompleted?: boolean;
}

export const PortraitFrame: React.FC<PortraitFrameProps> = ({
  className = '',
  introCompleted = true,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });

  // Use the cropped, defringed transparent cutout with cache buster
  const photoSrc = '/images/profile-cutout.png?v=5';

  useEffect(() => {
    if (introCompleted) {
      // Trigger cinematic entrance transition when discover / intro completes
      const timer = setTimeout(() => {
        setHasEntered(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setHasEntered(false);
    }
  }, [introCompleted]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, glareX, glareY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`hero-portrait-stage ${hasEntered ? 'entered' : 'entering'} ${className}`}
      style={{
        transform: hasEntered
          ? `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : undefined,
      }}
      aria-label={`Official Portrait of ${PORTFOLIO_DATA.personal.name}`}
    >
      {/* Studio Backlight Aura behind the silhouette */}
      <div className={`portrait-backlight-aura ${hasEntered ? 'visible' : ''}`} aria-hidden="true" />

      {/* Large Transparent Studio Cutout Image */}
      <div className="portrait-cutout-wrapper">
        <img
          src={photoSrc}
          alt={`Portrait of ${PORTFOLIO_DATA.personal.name}`}
          className={`portrait-cutout-img ${imageLoaded ? 'loaded' : ''} ${hasEntered ? 'entered' : ''}`}
          onLoad={() => setImageLoaded(true)}
          loading="eager"
        />

        {/* Luminous Sweep Sheen on Entrance */}
        <div className={`portrait-reveal-sweep ${hasEntered ? 'active' : ''}`} aria-hidden="true" />

        {/* Interactive Specular Glare Sheen */}
        <div
          className="portrait-specular-sheen"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)`,
          }}
        />
      </div>
    </div>
  );
};
