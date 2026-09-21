import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTACTS } from '../data/siteData';

export const ContactPage: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const directContacts = CONTACTS.filter((c) => c.group === 'DIRECT CONTACT');
  const socialContacts = CONTACTS.filter((c) => c.group === 'SOCIAL CHANNELS');
  const workContacts = CONTACTS.filter((c) => c.group === 'WORK, GAMES & SUPPORT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <main className="contact-page">
      <section className="page-section-hero contact-page-hero">
        <img
          alt="Blue creative contact board"
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            color: 'transparent'
          }}
          src="/images/hero-contact.png"
        />
        <span className="page-section-hero-shade" />
        <div className="page-section-hero-content">
          <Link className="back" to="/">
            ← INDEX
          </Link>
          <p className="eyebrow">CONTACT / LINK HUB</p>
          <h1>
            Find me across the <em>web.</em>
          </h1>
          <p className="contact-lede">
            Contact me directly, explore my code repositories, discuss AI roles or collaborations—all neatly collected below.
          </p>
        </div>
      </section>

      <div className="contact-status">
        <i />
        <span>GRADUATING AI STUDENT · EXPLORING OPPORTUNITIES</span>
        <small>2026 EDITION</small>
      </div>

      <div className="contact-links">
        <section>
          <h2>DIRECT CONTACT</h2>
          <div>
            {directContacts.map((item, idx) => (
              <a key={item.slug} href={item.href}>
                <span>
                  <i>{String(idx + 1).padStart(2, '0')}</i> {item.title}
                </span>
                <b>{item.detail}</b>
                <em>↗</em>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2>SOCIAL CHANNELS</h2>
          <div>
            {socialContacts.map((item, idx) => (
              <a key={item.slug} href={item.href} target="_blank" rel="noreferrer">
                <span>
                  <i>{String(idx + 3).padStart(2, '0')}</i> {item.title}
                </span>
                <b>{item.detail}</b>
                <em>↗</em>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2>WORK, CODE &amp; PLATFORMS</h2>
          <div>
            {workContacts.map((item, idx) => (
              <a key={item.slug} href={item.href} target="_blank" rel="noreferrer">
                <span>
                  <i>{String(idx + 9).padStart(2, '0')}</i> {item.title}
                </span>
                <b>{item.detail}</b>
                <em>↗</em>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* QUICK INQUIRY FORM */}
      <section style={{ maxWidth: '640px', margin: '80px auto 40px', padding: '0 24px' }}>
        <div className="label" style={{ marginBottom: '24px' }}>
          <span>SEND A DISPATCH</span>
          <span>DIRECT MESSAGE</span>
        </div>

        {formSent ? (
          <div style={{ padding: '24px', border: '1px solid var(--line)', borderRadius: '8px', textAlign: 'center' }}>
            <b style={{ color: 'var(--accent)', font: '14px var(--mono)', display: 'block', marginBottom: '8px' }}>
              DISPATCH RECEIVED
            </b>
            <p style={{ color: 'var(--text)', margin: 0, font: '15px Georgia, serif' }}>
              Thank you for reaching out. I’ll review your message and reply promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--muted)', font: '10px var(--mono)', marginBottom: '6px' }}>
                YOUR NAME
              </label>
              <input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--line)',
                  borderRadius: '6px',
                  color: 'var(--text)',
                  font: '14px var(--sans)',
                  outline: 'none'
                }}
                placeholder="e.g. Alex Nguyen"
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--muted)', font: '10px var(--mono)', marginBottom: '6px' }}>
                YOUR EMAIL
              </label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--line)',
                  borderRadius: '6px',
                  color: 'var(--text)',
                  font: '14px var(--sans)',
                  outline: 'none'
                }}
                placeholder="alex@company.com"
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--muted)', font: '10px var(--mono)', marginBottom: '6px' }}>
                MESSAGE
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--line)',
                  borderRadius: '6px',
                  color: 'var(--text)',
                  font: '14px var(--sans)',
                  outline: 'none',
                  resize: 'vertical'
                }}
                placeholder="Let’s discuss an AI role, collaboration, or share an idea..."
              />
            </div>

            <button
              type="submit"
              style={{
                padding: '12px 24px',
                background: 'var(--accent)',
                color: '#151311',
                border: 'none',
                borderRadius: '6px',
                font: '12px var(--mono)',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.05em'
              }}
            >
              TRANSMIT NOTE →
            </button>
          </form>
        )}
      </section>
    </main>
  );
};
