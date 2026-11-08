import React, { useState } from 'react';
import { PORTFOLIO_DATA, ProjectItem } from '../data/portfolioData';
import { ProjectVisual } from './ProjectVisual';
import { ProjectModal } from './ProjectModal';
import { ExternalLink, Github, ArrowUpRight, Eye } from 'lucide-react';

export const SelectedWork: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  return (
    <section id="work" className="section-wrapper" aria-label="Selected Engineering Work">
      <div id="projects" style={{ position: 'relative', top: '-100px', visibility: 'hidden' }} aria-hidden="true" />
      <div className="site-container">
        {/* Section Header */}
        <div className="projects-header">
          <span className="editorial-eyebrow">
            PROJECTS & INNOVATION
          </span>
          <h2 className="projects-headline">
            GENUINE PROJECTS. PRACTICAL LEARNING.
          </h2>
          <p className="projects-intro-desc">
            A focused showcase of my project work: the Agrinilo agricultural platform concept and my 12th grade 1st-place Smart Irrigation System.
          </p>
        </div>

        {/* Project Showcase List */}
        <div className="projects-showcase-list">
          {PORTFOLIO_DATA.projects.map((project, index) => {
            const isAlternate = index % 2 === 1;

            return (
              <article
                key={project.id}
                className={`project-showcase-item ${isAlternate ? 'alternate' : ''}`}
                aria-label={`Project: ${project.title}`}
              >
                {/* Visual Representation Area */}
                <div
                  className="project-visual-wrapper"
                  onClick={() => setActiveModalProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveModalProject(project);
                    }
                  }}
                  aria-label={`Inspect architectural blueprint of ${project.title}`}
                >
                  <ProjectVisual project={project} />

                  {/* Status / Demo Badge Overlay */}
                  <div className="project-visual-badge-overlay">
                    {project.demoBadge ? (
                      <span className="editorial-pill" style={{ borderColor: 'var(--metallic-silver)', color: '#ffffff' }}>
                        {project.demoBadge}
                      </span>
                    ) : (
                      <span className="editorial-pill">
                        {project.status}
                      </span>
                    )}
                  </div>

                  {/* Hover Inspect CTA Overlay */}
                  <div className="project-visual-cta-overlay">
                    <span className="btn-graphite-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>
                      <Eye size={13} />
                      <span>View Project Details</span>
                    </span>
                  </div>
                </div>

                {/* Project Information Area */}
                <div className="project-info-wrapper">
                  <div className="project-meta-bar">
                    <span style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      0{index + 1} · {project.category}
                    </span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="project-title">
                    {project.title}
                  </h3>

                  <p className="project-tagline">
                    {project.tagline}
                  </p>

                  <p className="project-description">
                    {project.shortDescription}
                  </p>

                  <div className="project-tech-tags">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="project-action-bar">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="btn-graphite-primary"
                      style={{ padding: '0.75rem 1.5rem', fontSize: '0.78rem' }}
                    >
                      <span>Project Details</span>
                      <ArrowUpRight size={14} />
                    </button>

                    {project.sourceUrl && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-graphite-secondary"
                        style={{ padding: '0.75rem 1rem', fontSize: '0.78rem' }}
                        aria-label={`View ${project.title} repository on GitHub`}
                      >
                        <Github size={15} />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-graphite-secondary"
                        style={{ padding: '0.75rem 1rem', fontSize: '0.78rem' }}
                        aria-label={`Launch ${project.title} live interface`}
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Modal Inspector */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
};
