import React, { useEffect } from 'react';
import { ProjectItem } from '../data/portfolioData';
import { X, ExternalLink, Github, Layers, ShieldCheck, Cpu } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-content-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close project architecture window"
        >
          <X size={18} />
        </button>

        <div className="editorial-eyebrow">
          <span>{project.category} · {project.year}</span>
        </div>

        <h2 id="modal-title" className="project-title" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
          {project.title}
        </h2>

        <p className="project-tagline" style={{ marginBottom: '1.75rem' }}>
          {project.tagline}
        </p>

        {project.demoBadge && (
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="editorial-pill" style={{ borderColor: 'var(--metallic-silver)', color: '#ffffff' }}>
              {project.demoBadge}
            </span>
          </div>
        )}

        <div className="project-tech-tags" style={{ marginBottom: '2rem' }}>
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>

        <div className="hairline-divider" style={{ marginBottom: '2rem' }} />

        {/* Detailed Overview */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 className="editorial-eyebrow" style={{ color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            <Layers size={14} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
            Project Overview
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7' }}>
            {project.detailedOverview}
          </p>
        </div>

        {/* Architectural Highlights */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 className="editorial-eyebrow" style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
            <Cpu size={14} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
            Features & Development Status
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {project.architecturalHighlights.map((highlight, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9375rem',
                  lineHeight: '1.6',
                }}
              >
                <span style={{ color: 'var(--metallic-silver)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginTop: '2px' }}>
                  0{idx + 1}.
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Engineering Challenges */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 className="editorial-eyebrow" style={{ color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            <ShieldCheck size={14} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
            Project Learning & Key Challenges
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: '1.65' }}>
            {project.keyChallenges}
          </p>
        </div>

        <div className="hairline-divider" style={{ marginBottom: '2rem' }} />

        {/* Action links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-graphite-secondary"
              style={{ padding: '0.75rem 1.4rem', fontSize: '0.75rem' }}
            >
              <Github size={15} />
              <span>Inspect Source Repository</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-graphite-primary"
              style={{ padding: '0.75rem 1.4rem', fontSize: '0.75rem' }}
            >
              <span>Launch Live Interface</span>
              <ExternalLink size={15} />
            </a>
          )}
          <button
            onClick={onClose}
            className="btn-graphite-secondary"
            style={{ padding: '0.75rem 1.4rem', fontSize: '0.75rem', marginLeft: 'auto' }}
          >
            Dismiss View
          </button>
        </div>
      </div>
    </div>
  );
};
