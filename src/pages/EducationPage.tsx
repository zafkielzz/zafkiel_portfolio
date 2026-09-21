import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  EDUCATION_DATA,
  PUBLICATION_DATA,
  CERTIFICATES_DATA,
  FPT_BADGES_DATA,
  CertificateItem
} from '../data/siteData';

export const EducationPage: React.FC = () => {
  const [activeCertCategory, setActiveCertCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const all = CERTIFICATES_DATA.map((c) => c.category);
    return ['all', ...Array.from(new Set(all))];
  }, []);

  const filteredCerts = useMemo(() => {
    if (activeCertCategory === 'all') return CERTIFICATES_DATA;
    return CERTIFICATES_DATA.filter((c) => c.category === activeCertCategory);
  }, [activeCertCategory]);

  return (
    <main className="education-page" style={{ maxWidth: '1000px', margin: 'auto', padding: '150px 24px 110px' }}>
      {/* SECTION HERO */}
      <section className="page-section-hero education-page-hero">
        <img
          alt="Academic and research library atmosphere"
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
          src="/images/hero-photos.png"
        />
        <span className="page-section-hero-shade" />
        <div className="page-section-hero-content">
          <Link className="back" to="/">
            ← INDEX
          </Link>
          <p className="eyebrow">ACADEMIC FOUNDATIONS &amp; CERTIFICATIONS</p>
          <h1>
            Rigorous study, research &amp; <em>credentials.</em>
          </h1>
          <p className="photos-lede" style={{ maxWidth: '640px' }}>
            A formal record of academic study at FPT University, peer-reviewed scientific contributions, and specialized professional certifications in Artificial Intelligence.
          </p>
        </div>
      </section>

      {/* FORMAL UNIVERSITY EDUCATION */}
      <section style={{ margin: '70px 0 60px', borderTop: '1px solid var(--line)', paddingTop: '40px' }}>
        <div className="label">
          <span>01 / UNIVERSITY DEGREE</span>
          <span>FORMAL EDUCATION</span>
        </div>

        <article
          style={{
            background: 'rgba(230, 155, 75, 0.03)',
            border: '1px solid rgba(220, 186, 136, 0.28)',
            borderRadius: '12px',
            padding: '32px 36px',
            marginTop: '24px',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ color: 'var(--accent)', font: '600 11px var(--mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {EDUCATION_DATA.institution} · {EDUCATION_DATA.location}
              </span>
              <h2 style={{ margin: '10px 0 6px', font: '400 clamp(26px, 3.5vw, 36px) Georgia, serif', color: 'var(--text)' }}>
                {EDUCATION_DATA.major}
              </h2>
              <p style={{ margin: 0, color: 'var(--muted)', font: '500 14px var(--mono)' }}>
                {EDUCATION_DATA.degree}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(230, 155, 75, 0.14)',
                  border: '1px solid rgba(230, 155, 75, 0.4)',
                  color: '#f0be72',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  font: '600 11px var(--mono)',
                  letterSpacing: '0.05em'
                }}
              >
                {EDUCATION_DATA.period}
              </span>
              <p style={{ margin: '8px 0 0', color: 'var(--muted)', font: '11px var(--mono)' }}>
                {EDUCATION_DATA.status}
              </p>
            </div>
          </div>

          <p style={{ color: '#d5c8b6', fontSize: '15px', lineHeight: '1.65', margin: '22px 0 28px' }}>
            {EDUCATION_DATA.description}
          </p>

          {/* Research & Focus Areas */}
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '22px', marginBottom: '24px' }}>
            <span style={{ color: 'var(--accent)', font: '600 10px var(--mono)', letterSpacing: '0.09em', display: 'block', marginBottom: '12px' }}>
              CORE RESEARCH &amp; SPECIALIZATION FOCUS
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {EDUCATION_DATA.focusAreas.map((area) => (
                <span
                  key={area}
                  style={{
                    background: 'rgba(255, 255, 255, 0.035)',
                    border: '1px solid rgba(220, 186, 136, 0.2)',
                    borderRadius: '6px',
                    padding: '7px 12px',
                    color: '#e4d6c4',
                    font: '12px var(--sans)'
                  }}
                >
                  ✦ {area}
                </span>
              ))}
            </div>
          </div>

          {/* Key Coursework */}
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '22px' }}>
            <span style={{ color: '#a28f7a', font: '600 10px var(--mono)', letterSpacing: '0.09em', display: 'block', marginBottom: '12px' }}>
              KEY TECHNICAL COURSEWORK COMPLETED
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
              {EDUCATION_DATA.coursework.map((course) => (
                <div
                  key={course}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--muted)',
                    font: '13px var(--mono)'
                  }}
                >
                  <span style={{ color: 'var(--accent)', fontSize: '10px' }}>▪</span>
                  <span>{course}</span>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      {/* PEER-REVIEWED PUBLICATION SPOTLIGHT */}
      <section style={{ margin: '80px 0 60px' }}>
        <div className="label">
          <span>02 / SCIENTIFIC CONTRIBUTION</span>
          <span>PEER-REVIEWED PUBLICATION</span>
        </div>

        <article
          style={{
            background: 'linear-gradient(145deg, rgba(32, 26, 21, 0.8), rgba(20, 18, 16, 0.95))',
            border: '1px solid rgba(230, 155, 75, 0.38)',
            borderRadius: '12px',
            padding: '36px',
            marginTop: '24px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '180px',
              height: '180px',
              background: 'radial-gradient(circle at 100% 0%, rgba(230, 155, 75, 0.18), transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
            <span
              style={{
                background: 'rgba(230, 155, 75, 0.22)',
                color: '#ffe2b8',
                border: '1px solid rgba(230, 155, 75, 0.6)',
                padding: '4px 10px',
                borderRadius: '4px',
                font: '600 11px var(--mono)',
                letterSpacing: '0.07em'
              }}
            >
              {PUBLICATION_DATA.conference}
            </span>
            <span
              style={{
                color: 'var(--accent)',
                font: '600 11px var(--mono)',
                letterSpacing: '0.05em'
              }}
            >
              ✦ {PUBLICATION_DATA.role}
            </span>
            <span style={{ color: 'var(--muted)', font: '11px var(--mono)', marginLeft: 'auto' }}>
              {PUBLICATION_DATA.date} · {PUBLICATION_DATA.status}
            </span>
          </div>

          <h2 style={{ font: '400 clamp(24px, 3vw, 32px) Georgia, serif', margin: '0 0 16px', color: '#fff4e5', lineHeight: '1.2' }}>
            {PUBLICATION_DATA.title}
          </h2>

          <p style={{ color: '#ccbbaa', fontSize: '15px', lineHeight: '1.7', margin: '0 0 24px' }}>
            {PUBLICATION_DATA.abstract}
          </p>

          {/* Benchmark Metrics Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '14px',
              margin: '24px 0',
              borderTop: '1px solid rgba(230, 155, 75, 0.2)',
              borderBottom: '1px solid rgba(230, 155, 75, 0.2)',
              padding: '18px 0'
            }}
          >
            {PUBLICATION_DATA.metrics.map((m) => (
              <div key={m.label} style={{ padding: '6px 0' }}>
                <span style={{ color: '#9d8772', font: '10px var(--mono)', display: 'block', letterSpacing: '0.06em' }}>
                  {m.label}
                </span>
                <b style={{ color: '#f5c682', font: '600 24px var(--mono)', display: 'block', margin: '4px 0' }}>
                  {m.value}
                </b>
                <small style={{ color: '#887462', font: '10px var(--mono)' }}>{m.note}</small>
              </div>
            ))}
          </div>

          {/* Publication Links & Artifacts */}
          <div className="project-actions" style={{ marginTop: '20px' }}>
            <a
              href={PUBLICATION_DATA.paperPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-btn primary"
            >
              DOWNLOAD MANUSCRIPT (PDF) <span>↓</span>
            </a>
            <Link
              to={`/work/${PUBLICATION_DATA.projectSlug}`}
              className="project-action-btn secondary"
            >
              VIEW RESEARCH STUDY <span>→</span>
            </Link>
            <Link
              to={`/posts/${PUBLICATION_DATA.postSlug}`}
              className="project-action-btn secondary"
            >
              TECHNICAL BREAKDOWN <span>→</span>
            </Link>
            <a
              href={PUBLICATION_DATA.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-btn secondary"
            >
              CODE REPO <span>↗</span>
            </a>
          </div>
        </article>
      </section>

      {/* PROFESSIONAL CERTIFICATIONS */}
      <section style={{ margin: '80px 0 40px' }}>
        <div className="label">
          <span>03 / VERIFIED CERTIFICATIONS</span>
          <span>SPECIALIZED COURSES</span>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '24px 0 32px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCertCategory(cat)}
              style={{
                background: activeCertCategory === cat ? 'rgba(230, 155, 75, 0.2)' : 'rgba(255, 255, 255, 0.02)',
                border: activeCertCategory === cat ? '1px solid var(--accent)' : '1px solid var(--line)',
                color: activeCertCategory === cat ? '#ffe3b9' : 'var(--muted)',
                padding: '7px 14px',
                borderRadius: '999px',
                font: '10px var(--mono)',
                letterSpacing: '0.06em',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase'
              }}
            >
              {cat === 'all' ? 'ALL CERTIFICATIONS' : cat}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '22px' }}>
          {filteredCerts.map((cert) => (
            <article
              key={cert.id}
              style={{
                background: 'rgba(255, 255, 255, 0.018)',
                border: '1px solid var(--line)',
                borderRadius: '10px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, border-color 0.3s ease, background 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(230, 155, 75, 0.45)';
                e.currentTarget.style.background = 'rgba(230, 155, 75, 0.04)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--line)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.018)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div>
                {/* 1. Title */}
                <h3 style={{ font: '400 22px Georgia, serif', margin: '0 0 10px', color: 'var(--text)', lineHeight: '1.25' }}>
                  {cert.title}
                </h3>

                {/* 2. Issuer */}
                <div style={{ color: 'var(--accent)', font: '600 12px var(--mono)', letterSpacing: '0.04em', marginBottom: '4px' }}>
                  {cert.issuer}
                </div>

                {/* 3. Date */}
                <div style={{ color: 'var(--muted)', font: '11px var(--mono)', marginBottom: '10px' }}>
                  {cert.issueDate}
                </div>

                {/* 4. Credential ID */}
                {cert.credentialId && (
                  <div style={{ marginBottom: '16px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        color: '#a08b76',
                        font: '10px var(--mono)',
                        background: 'rgba(255, 255, 255, 0.035)',
                        border: '1px solid rgba(220, 186, 136, 0.18)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        letterSpacing: '0.04em'
                      }}
                    >
                      ID: {cert.credentialId}
                    </span>
                  </div>
                )}

                {/* 4. Technical Summary */}
                <p style={{ color: '#beafa0', fontSize: '13px', lineHeight: '1.6', margin: '0 0 16px' }}>
                  {cert.summary}
                </p>

                {/* 5. Key Skills Covered */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(220, 186, 136, 0.15)',
                        color: '#d4c5b3',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        font: '10px var(--mono)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Category on Left, Verify Button on Right (No duplicate text) */}
              <div
                style={{
                  borderTop: '1px solid var(--line)',
                  paddingTop: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ color: '#887563', font: '600 10px var(--mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {cert.category}
                </span>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--accent)',
                      font: '600 11px var(--mono)',
                      letterSpacing: '0.04em',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    VERIFY CREDENTIAL <span>↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ACADEMIC BADGES & DIGITAL TRANSFORMATION (FPT UNIVERSITY) */}
      <section style={{ margin: '80px 0 40px' }}>
        <div className="label">
          <span>04 / ACADEMIC BADGES &amp; DIGITAL TRANSFORMATION</span>
          <span>FPT UNIVERSITY · KS57 PROGRAM</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '22px', marginTop: '24px' }}>
          {FPT_BADGES_DATA.map((badge) => (
            <article
              key={badge.id}
              style={{
                background: 'rgba(230, 155, 75, 0.025)',
                border: '1px solid rgba(220, 186, 136, 0.25)',
                borderRadius: '10px',
                padding: '26px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, border-color 0.3s ease, background 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(230, 155, 75, 0.45)';
                e.currentTarget.style.background = 'rgba(230, 155, 75, 0.05)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(220, 186, 136, 0.25)';
                e.currentTarget.style.background = 'rgba(230, 155, 75, 0.025)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div>
                {/* 1. Title */}
                <h3 style={{ font: '400 22px Georgia, serif', margin: '0 0 10px', color: 'var(--text)', lineHeight: '1.25' }}>
                  {badge.title}
                </h3>

                {/* 2. Issuer */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', color: 'var(--accent)', font: '600 12px var(--mono)', letterSpacing: '0.04em', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      background: 'rgba(230, 155, 75, 0.18)',
                      border: '1px solid rgba(230, 155, 75, 0.4)',
                      color: '#f5c682',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      fontWeight: 700,
                      fontSize: '10px'
                    }}
                  >
                    {badge.code}
                  </span>
                  <span>{badge.issuer}</span>
                </div>

                {/* 3. Program */}
                <div style={{ color: 'var(--muted)', font: '11px var(--mono)', marginBottom: '10px' }}>
                  {badge.program}
                </div>

                {/* 4. Credential ID */}
                {badge.credentialId && (
                  <div style={{ marginBottom: '16px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        color: '#a08b76',
                        font: '10px var(--mono)',
                        background: 'rgba(255, 255, 255, 0.035)',
                        border: '1px solid rgba(220, 186, 136, 0.18)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        letterSpacing: '0.04em'
                      }}
                    >
                      ID: {badge.credentialId}
                    </span>
                  </div>
                )}

                {/* 4. Description */}
                <p style={{ color: '#c9bba9', fontSize: '13px', lineHeight: '1.65', margin: '0 0 20px' }}>
                  {badge.description}
                </p>

                {/* 5. Focus Areas */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {badge.focus.map((f) => (
                    <span
                      key={f}
                      style={{
                        background: 'rgba(255, 255, 255, 0.035)',
                        border: '1px solid rgba(220, 186, 136, 0.16)',
                        color: '#d6c6b4',
                        padding: '4px 9px',
                        borderRadius: '4px',
                        font: '10px var(--mono)'
                      }}
                    >
                      ✦ {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div
                style={{
                  borderTop: '1px solid var(--line)',
                  paddingTop: '14px',
                  marginTop: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ color: '#8d7a68', font: '600 10px var(--mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  DIGITAL TRANSFORMATION
                </span>
                {badge.credentialUrl ? (
                  <a
                    href={badge.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--accent)',
                      font: '600 11px var(--mono)',
                      letterSpacing: '0.04em',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    VERIFY CREDENTIAL <span>↗</span>
                  </a>
                ) : (
                  <span style={{ color: 'var(--accent)', font: '11px var(--mono)', whiteSpace: 'nowrap' }}>
                    VERIFIED ✦
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FOOTER CALLOUT / RESEARCH PHILOSOPHY */}
      <section style={{ margin: '80px 0 20px', padding: '28px', border: '1px dashed var(--line)', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.01)' }}>
        <span style={{ color: 'var(--accent)', font: '600 10px var(--mono)', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>
          ACADEMIC &amp; SCIENTIFIC ETHOS
        </span>
        <p style={{ margin: 0, color: '#c4b5a4', fontSize: '14px', lineHeight: '1.65' }}>
          "Every theoretical derivation should withstand rigorous empirical benchmarking, and every model architecture deserves transparent, open-source reproducibility."
        </p>
      </section>
    </main>
  );
};
