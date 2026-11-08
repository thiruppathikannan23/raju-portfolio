import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA, CareerGoalItem } from '../data/portfolioData';
import { Layout, Code2, BarChart3, Cpu, Smartphone, Compass, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const CareerGoalsSection: React.FC = () => {
  const { careerGoals } = PORTFOLIO_DATA;
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        setIsVisible(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const renderGoalIcon = (iconName: CareerGoalItem['iconName']) => {
    switch (iconName) {
      case 'Layout':
        return <Layout size={20} />;
      case 'Code2':
        return <Code2 size={20} />;
      case 'BarChart3':
        return <BarChart3 size={20} />;
      case 'Cpu':
        return <Cpu size={20} />;
      case 'Smartphone':
        return <Smartphone size={20} />;
      default:
        return <Code2 size={20} />;
    }
  };

  return (
    <section
      id="career-goals"
      ref={sectionRef}
      className="section-wrapper career-goals-section"
      aria-label="Career Goals and Progress"
    >
      <div className="site-container">
        {/* Hairline Divider consistent with other portfolio sections */}
        <div className="hairline-divider" style={{ marginBottom: '5rem' }} />

        {/* Section Header */}
        <div className="career-goals-header">
          <span className="editorial-eyebrow">
            {careerGoals.eyebrow}
          </span>
          <h2 className="projects-headline">
            {careerGoals.heading}
          </h2>
          <p className="projects-intro-desc">
            {careerGoals.subtitle}
          </p>
        </div>

        {/* 5 Career Goal Cards Grid */}
        <div className="career-goals-grid">
          {careerGoals.goals.map((goal, idx) => (
            <article
              key={goal.id}
              className={`career-goal-card ${idx < 2 ? 'career-goal-card--prominent' : ''}`}
              aria-label={`Career Goal: ${goal.title} at ${goal.percentage}% progress`}
            >
              {/* Card Meta Bar */}
              <div className="career-goal-card-header">
                <div className="career-goal-code-badge">
                  <span className="career-goal-code">{goal.categoryCode}</span>
                </div>
                <span className="career-goal-status-badge">
                  {goal.statusBadge}
                </span>
              </div>

              {/* Title & Icon Header */}
              <div className="career-goal-identity">
                <div className="career-goal-icon-box" aria-hidden="true">
                  {renderGoalIcon(goal.iconName)}
                </div>
                <h3 className="career-goal-title">{goal.title}</h3>
              </div>

              {/* Progress Display & Bar */}
              <div className="career-goal-progress-box">
                <div className="career-goal-progress-meta">
                  <span className="career-goal-progress-label">Initial Learning Progress</span>
                  <span className="career-goal-percentage">{goal.percentage}%</span>
                </div>

                <div
                  className="career-progress-track"
                  role="progressbar"
                  aria-valuenow={goal.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${goal.title} progress: ${goal.percentage}%`}
                >
                  <div
                    className="career-progress-fill"
                    style={{ width: isVisible ? `${goal.percentage}%` : '0%' }}
                  />
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="career-goal-details">
                {/* Focus */}
                <div className="career-goal-detail-group">
                  <span className="career-goal-detail-label">Focus</span>
                  <p className="career-goal-detail-desc">{goal.focus}</p>
                </div>

                <div className="career-goal-detail-divider" />

                {/* Current Foundation */}
                <div className="career-goal-detail-group">
                  <span className="career-goal-detail-label career-goal-detail-label--foundation">
                    Current Foundation
                  </span>
                  <p className="career-goal-detail-desc career-goal-foundation-text">
                    {goal.currentFoundation}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Progress Assessment Transparency Note */}
        <div className="career-progress-disclaimer-card" role="note">
          <div className="career-disclaimer-icon-box" aria-hidden="true">
            <ShieldCheck size={16} />
          </div>
          <p className="career-disclaimer-text">
            <strong>Self-Assessed Progression Notice:</strong> {careerGoals.progressDisclaimer}
          </p>
        </div>

        {/* Future Career Vision Box */}
        <div className="career-vision-card" aria-label="My Long-Term Vision">
          <div className="career-vision-sheen" aria-hidden="true" />
          
          <div className="career-vision-header">
            <div className="editorial-eyebrow" style={{ marginBottom: 0 }}>
              <Compass size={14} style={{ marginRight: '0.45rem', verticalAlign: 'middle' }} />
              {careerGoals.vision.eyebrow}
            </div>
            <span className="career-vision-badge">
              <Sparkles size={12} style={{ marginRight: '0.35rem' }} />
              {careerGoals.vision.badge}
            </span>
          </div>

          <h3 className="career-vision-title">{careerGoals.vision.heading}</h3>

          <blockquote className="career-vision-quote">
            &ldquo;{careerGoals.vision.text}&rdquo;
          </blockquote>

          {/* Sequential Ambition Pathway */}
          <div className="career-pathway-container">
            <div className="career-pathway-title">PLANNED CAREER MILESTONES</div>
            <div className="career-pathway-steps">
              {careerGoals.vision.pathway.map((item, index) => (
                <React.Fragment key={item.step}>
                  <div className="career-pathway-step">
                    <span className="career-pathway-number">{item.step}</span>
                    <span className="career-pathway-label">{item.label}</span>
                  </div>
                  {index < careerGoals.vision.pathway.length - 1 && (
                    <div className="career-pathway-connector" aria-hidden="true">
                      <ArrowRight size={14} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

