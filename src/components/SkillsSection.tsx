import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Cpu, Globe, Database, GitBranch, CheckCircle2 } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { skillsSection } = PORTFOLIO_DATA;
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');

  const filteredCategories = activeCategoryId === 'all'
    ? skillsSection.categories
    : skillsSection.categories.filter((c) => c.id === activeCategoryId);

  const getDisciplineIcon = (id: string) => {
    switch (id) {
      case 'systems':
        return <Cpu size={15} />;
      case 'frontend':
        return <Globe size={15} />;
      case 'data':
        return <Database size={15} />;
      case 'workflow':
        return <GitBranch size={15} />;
      default:
        return <Cpu size={15} />;
    }
  };

  return (
    <section id="skills" className="section-wrapper" aria-label="Technical Capabilities">
      <div className="site-container">
        <div className="hairline-divider" style={{ marginBottom: '5rem' }} />

        {/* Section Header */}
        <div style={{ maxWidth: '800px', marginBottom: '3.5rem' }}>
          <span className="editorial-eyebrow">
            {skillsSection.eyebrow}
          </span>
          <h2 className="projects-headline">
            {skillsSection.headline}
          </h2>
          <p className="projects-intro-desc">
            {skillsSection.description}
          </p>
        </div>

        {/* Discipline Filter Tabs */}
        <div className="skills-category-tabs" role="tablist" aria-label="Filter skill disciplines">
          <button
            role="tab"
            aria-selected={activeCategoryId === 'all'}
            onClick={() => setActiveCategoryId('all')}
            className={`skills-tab-button ${activeCategoryId === 'all' ? 'active' : ''}`}
          >
            All Disciplines ({skillsSection.categories.length})
          </button>
          {skillsSection.categories.map((category) => (
            <button
              key={category.id}
              role="tab"
              aria-selected={activeCategoryId === category.id}
              onClick={() => setActiveCategoryId(category.id)}
              className={`skills-tab-button ${activeCategoryId === category.id ? 'active' : ''}`}
            >
              <span style={{ marginRight: '0.4rem', verticalAlign: 'middle', display: 'inline-flex' }}>
                {getDisciplineIcon(category.id)}
              </span>
              {category.discipline}
            </button>
          ))}
        </div>

        {/* Category Groups Matrix */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {filteredCategories.map((category) => (
            <div key={category.id}>
              {/* Category Subheader Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border-graphite)',
                  paddingBottom: '1rem',
                  marginBottom: '1.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--metallic-silver)' }}>
                    {getDisciplineIcon(category.id)}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {category.discipline}
                  </h3>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {category.code}
                </span>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.75rem', maxWidth: '650px' }}>
                {category.description}
              </p>

              {/* Skills cards grid */}
              <div className="skills-grid">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skill-spec-card">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <h4 className="skill-name">{skill.name}</h4>
                        <CheckCircle2 size={15} style={{ color: 'var(--metallic-silver)' }} />
                      </div>
                      <p className="skill-focus">{skill.focus}</p>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '1rem' }}>
                      {skill.tags.map((tag) => (
                        <span key={tag} className="tech-tag" style={{ fontSize: '0.7rem' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
