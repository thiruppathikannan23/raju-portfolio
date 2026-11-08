import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Copy, Check, Github, Linkedin, ArrowUpRight, Send, MapPin, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { contact, personal } = PORTFOLIO_DATA;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [formFeedback, setFormFeedback] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setFormFeedback('Please complete all required fields before initiating contact.');
      return;
    }

    // Prepare direct mailto URL with pre-filled parameters
    const subjectEncoded = encodeURIComponent(
      formState.subject ? `[Portfolio Inquiry] ${formState.subject}` : `[Portfolio Inquiry] From ${formState.name}`
    );
    const bodyEncoded = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );

    const mailtoUrl = `mailto:${personal.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;

    // Open default mail client directly
    window.location.href = mailtoUrl;

    setFormFeedback(
      `Direct electronic mail link dispatched. If your client did not launch automatically, write directly to ${personal.email}.`
    );
  };

  return (
    <section id="contact" className="section-wrapper" aria-label="Contact and Collaboration">
      <div className="site-container">
        <div className="hairline-divider" style={{ marginBottom: '5rem' }} />

        <div className="contact-container-grid">
          {/* Left Column: Headline, Direct Email, Socials */}
          <div>
            <span className="editorial-eyebrow">
              {contact.eyebrow}
            </span>

            <h2 className="contact-headline">
              {contact.headline}
            </h2>

            <p className="contact-subline">
              {contact.subline}
            </p>

            {/* Direct Copy Email Box */}
            <div className="email-copy-panel">
              <div>
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  {contact.directEmailLabel}
                </span>
                <a href={`mailto:${personal.email}`} className="email-value-text">
                  {personal.email}
                </a>
              </div>

              <button
                onClick={handleCopyEmail}
                className="btn-copy-email"
                aria-label="Copy email address to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check size={14} style={{ color: '#4ade80' }} />
                    <span style={{ color: '#4ade80' }}>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Operational Location & Response Window */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <MapPin size={15} style={{ color: 'var(--metallic-silver)' }} />
                <span>{personal.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <Clock size={15} style={{ color: 'var(--metallic-silver)' }} />
                <span>{contact.responseTime}</span>
              </div>
            </div>

            {/* Verified Network Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              {personal.socials.github && (
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-graphite-secondary"
                  style={{ padding: '0.75rem 1.25rem', fontSize: '0.78rem' }}
                >
                  <Github size={15} />
                  <span>GitHub</span>
                  <ArrowUpRight size={12} />
                </a>
              )}

              {personal.socials.linkedin && (
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-graphite-secondary"
                  style={{ padding: '0.75rem 1.25rem', fontSize: '0.78rem' }}
                >
                  <Linkedin size={15} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Direct Dispatch Formulation Panel */}
          <div className="contact-form-card">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Direct Transmission Formulation
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.75rem' }}>
              Dispatch a direct communication via your configured system mailer.
            </p>

            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">Full Identity / Organization *</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">Return Electronic Mail *</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="elena@enterprise.org"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject" className="form-label">Subject / Purpose</label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Internship Opportunity / System Architecture Inquiry"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">Communication Payload *</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Detail project specifications or role expectations..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                className="btn-graphite-primary"
                style={{ width: '100%', padding: '0.95rem' }}
              >
                <span>Dispatch Message</span>
                <Send size={15} />
              </button>

              {formFeedback && (
                <div className="form-feedback-message">
                  {formFeedback}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
