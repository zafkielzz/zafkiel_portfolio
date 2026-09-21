import React from 'react';
import { Link } from 'react-router-dom';
import { PARTNERS } from '../data/siteData';

export const PartnersPage: React.FC = () => {
  return (
    <main className="partners-page" style={{ maxWidth: '1000px', margin: 'auto', padding: '150px 24px 110px' }}>
      <section className="page-section-hero partners-page-hero">
        <img
          alt="Partners hero background"
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
          src="/images/hero-partners.png"
        />
        <span className="page-section-hero-shade" />
        <div className="page-section-hero-content">
          <Link className="back" to="/">
            ← INDEX
          </Link>
          <p className="eyebrow">PARTNERS &amp; COLLABORATIONS</p>
          <h1>
            Better things, <em>together.</em>
          </h1>
          <p className="partners-lede">
            A space for thoughtful collaborations with research labs, creative studios, and engineering teams pushing the modern web and AI forward.
          </p>
        </div>
      </section>

      <section className="partner-principles" style={{ margin: '70px 0', borderTop: '1px solid var(--line)', paddingTop: '40px' }}>
        <div className="label">
          <span>HOW I WORK</span>
          <span>COLLABORATION ETHOS</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px', marginTop: '24px' }}>
          <div>
            <span style={{ color: 'var(--accent)', font: '11px var(--mono)' }}>01 / RIGOR &amp; TASTE</span>
            <h3 style={{ margin: '8px 0', font: '400 24px Georgia, serif' }}>Code with intention</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.6', fontSize: '15px' }}>
              Building software that pairs technical precision with genuine aesthetic restraint.
            </p>
          </div>
          <div>
            <span style={{ color: 'var(--accent)', font: '11px var(--mono)' }}>02 / EXPERIMENTAL PATIENCE</span>
            <h3 style={{ margin: '8px 0', font: '400 24px Georgia, serif' }}>Curiosity-driven iterations</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.6', fontSize: '15px' }}>
              Prototyping rapidly, validating assumptions early, and polishing the details until the interaction sings.
            </p>
          </div>
          <div>
            <span style={{ color: 'var(--accent)', font: '11px var(--mono)' }}>03 / OPEN TRANSMISSION</span>
            <h3 style={{ margin: '8px 0', font: '400 24px Georgia, serif' }}>Transparent documentation</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.6', fontSize: '15px' }}>
              Sharing architectures, benchmark numbers, and learnings openly to empower fellow builders.
            </p>
          </div>
        </div>
      </section>

      <section className="partner-directory" style={{ margin: '80px 0' }}>
        <div className="label">
          <span>FEATURED DIRECTORY</span>
          <span>ALLIES &amp; STUDIOS</span>
        </div>
        <div style={{ display: 'grid', gap: '40px', marginTop: '30px' }}>
          {PARTNERS.map((item) => (
            <article
              key={item.slug}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '30px',
                border: '1px solid var(--line)',
                borderRadius: '8px',
                padding: '24px',
                background: 'rgba(255, 255, 255, 0.015)'
              }}
            >
              <div>
                <span style={{ color: 'var(--accent)', font: '11px var(--mono)', display: 'block', marginBottom: '8px' }}>
                  {item.type}
                </span>
                <h2 style={{ margin: '0 0 12px', font: '400 32px Georgia, serif' }}>{item.name}</h2>
                <p style={{ color: 'var(--text)', fontSize: '18px', lineHeight: '1.4' }}>{item.headline}</p>
                <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.6' }}>{item.summary}</p>
                <p style={{ color: '#dba663', fontSize: '13px', fontStyle: 'italic' }}>{item.note}</p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--accent)', font: '12px var(--mono)', textDecoration: 'none', display: 'inline-block', marginTop: '12px' }}
                >
                  VISIT WEBSITE ↗
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ maxWidth: '100%', maxHeight: '220px', borderRadius: '6px', objectFit: 'contain' }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="partner-availability" style={{ borderTop: '1px solid var(--line)', paddingTop: '40px' }}>
        <div className="label">
          <span>AVAILABILITY</span>
          <span>STATUS</span>
        </div>
        <div style={{ margin: '20px 0', padding: '24px', border: '1px solid var(--line)', borderRadius: '8px' }}>
          <b style={{ font: '12px var(--mono)', color: 'var(--accent)', display: 'block', marginBottom: '8px' }}>
            ● OPEN FOR GRADUATE AI ROLES &amp; SELECT RESEARCH COLLABORATIONS
          </b>
          <p style={{ color: 'var(--muted)', lineHeight: '1.6', margin: '0 0 16px' }}>
            Currently completing studies and exploring full-time opportunities as an AI Engineer / Applied ML Researcher, alongside high-impact open-source initiatives.
          </p>
          <Link to="/contact" style={{ color: 'var(--text)', font: '12px var(--mono)' }}>
            GET IN TOUCH VIA CONTACT PAGE →
          </Link>
        </div>
      </section>
    </main>
  );
};
