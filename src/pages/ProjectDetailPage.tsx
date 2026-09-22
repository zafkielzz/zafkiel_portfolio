import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PROJECTS } from '../data/siteData';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[projectIndex];

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : PROJECTS[0];
  const firstLetter = project.name.charAt(0);

  return (
    <main className="case-page">
      <Link className="back" to="/work">
        ← ALL PROJECTS
      </Link>
      <p className="eyebrow">
        CASE STUDY · {project.year} · {project.type}
      </p>
      <h1>{project.name}</h1>
      <p className="case-lede">{project.description}</p>

      <div
        className="case-hero"
        style={
          {
            '--one': project.colors[0],
            '--two': project.colors[1],
            position: 'relative',
            overflow: 'hidden'
          } as React.CSSProperties
        }
      >
        {project.image && (
          <img
            src={project.image}
            alt={project.name}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.45
            }}
          />
        )}
        <span style={{ position: 'relative', zIndex: 2 }}>{firstLetter}</span>
      </div>

      <section className="case-meta">
        <div>
          <span>ROLE</span>
          <b>{project.role}</b>
        </div>
        <div>
          <span>TIMELINE</span>
          <b>{project.year}</b>
        </div>
        <div>
          <span>FOCUS</span>
          <b>{project.type}</b>
        </div>
      </section>

      {project.publication && (
        <section
          style={{
            margin: '36px 0',
            padding: '28px 32px',
            border: '1px solid var(--line)',
            borderRadius: '12px',
            background: 'rgba(230, 155, 75, 0.06)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="label" style={{ marginTop: 0, paddingTop: 0, borderTop: 0, marginBottom: '16px' }}>
            <span>CONFERENCE CITATION &amp; SCIENTIFIC PUBLICATION</span>
            <span>{project.publication.status ? project.publication.status.toUpperCase() : 'ACCEPTED'}</span>
          </div>
          <h3 style={{ margin: '0 0 12px', fontSize: '20px', letterSpacing: '-0.03em', color: 'var(--text)' }}>
            {project.publication.conference || project.publication.journal}
          </h3>
          <p style={{ margin: '0 0 8px', color: 'var(--muted)', fontSize: '13px', font: '12px var(--mono)' }}>
            <strong>Authors:</strong> <span style={{ color: '#fff3e0' }}>{project.publication.authors}</span> · <strong>Date:</strong> {project.publication.date}
          </p>
          {project.publication.status && (
            <p style={{ margin: '0 0 8px', color: '#e6aa60', fontSize: '12px', font: '500 12px var(--mono)' }}>
              <strong>Status:</strong> {project.publication.status}
            </p>
          )}
          <p style={{ margin: '16px 0 20px', color: '#c3b09a', lineHeight: 1.65, fontSize: '15px' }}>
            <strong>Abstract:</strong> {project.publication.abstract}
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href={project.publication.pdfUrl || '/paper_93.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              download={
                project.publication.pdfUrl?.includes('icitda')
                  ? 'Dang_Phuong_Nam_ICITDA_2026_Stock_Breakout_Modeling.pdf'
                  : 'Dang_Phuong_Nam_Conflict_Aware_RAG_Routing_IEEE_IS26.pdf'
              }
              className="random-note"
              style={{
                textDecoration: 'none',
                background: 'rgba(230, 155, 75, 0.22)',
                borderColor: 'var(--accent)',
                color: 'var(--text)',
                fontWeight: 600
              }}
            >
              <i>📄</i> DOWNLOAD PAPER (PDF) <span>↓</span>
            </a>
            <Link
              to={`/posts/${project.slug}`}
              className="random-note"
              style={{
                textDecoration: 'none',
                color: 'var(--text)'
              }}
            >
              <i>📖</i> READ TECHNICAL NOTE <span>→</span>
            </Link>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="random-note"
                style={{
                  textDecoration: 'none',
                  color: 'var(--text)'
                }}
              >
                <i>⚡</i> VIEW RESEARCH REPOSITORY <span>↗</span>
              </a>
            )}
          </div>
        </section>
      )}

      {project.githubUrl && !project.publication && (
        <div style={{ margin: '24px 0 32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="random-note"
            style={{
              textDecoration: 'none',
              background: 'rgba(230, 155, 75, 0.12)',
              borderColor: 'var(--accent)',
              color: 'var(--text)'
            }}
          >
            <i>⚡</i> VIEW SOURCE CODE ON GITHUB <span>↗</span>
          </a>
        </div>
      )}

      <section className="case-copy">
        <div>
          <span>THE PROBLEM / CHALLENGE</span>
          <h2>Bối cảnh nghiên cứu &amp; Thách thức kỹ thuật</h2>
          <p>{project.challenge}</p>
        </div>
        <div>
          <span>THE OUTCOME / SOLUTION</span>
          <h2>Kiến trúc đề xuất &amp; Kết quả thực nghiệm</h2>
          <p>{project.outcome}</p>
        </div>
      </section>

      {project.decisions && project.decisions.length > 0 && (
        <section className="case-approach">
          <div className="label">
            <span>CORE DECISIONS</span>
            <span>ARCHITECTURAL PRINCIPLES</span>
          </div>
          {project.decisions.map(([title, desc], idx) => (
            <article key={title}>
              <i>0{idx + 1} / PRINCIPLE</i>
              <div>
                <h2>{title}</h2>
                <p>{desc}</p>
              </div>
            </article>
          ))}
        </section>
      )}

      {project.detail?.timeline && (
        <section className="case-timeline">
          <div className="label">
            <span>DEVELOPMENT PHASES</span>
            <span>EXPERIMENTATION LOG</span>
          </div>
          {project.detail.timeline.map(([phase, note]) => (
            <article key={phase}>
              <span>{phase}</span>
              <p>{note}</p>
            </article>
          ))}
        </section>
      )}

      {project.detail && (
        <section className="case-evidence">
          {project.detail.artifacts && (
            <div>
              <span>KEY ARTIFACTS &amp; DELIVERABLES</span>
              <ul>
                {project.detail.artifacts.map((art) => {
                  const isInDev =
                    project.year.includes('In Development') ||
                    project.type.includes('Đang') ||
                    project.role.includes('Đang');
                  return (
                    <li key={art}>
                      <span>{art}</span>
                      <b style={{ color: isInDev ? '#f6b73c' : '#7bc786' }}>
                        {isInDev ? 'IN PROGRESS' : 'VERIFIED'}
                      </b>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {project.detail.reflection && (
            <div className="case-takeaway-card">
              <span>KEY TAKEAWAYS &amp; TECHNICAL CONCLUSION</span>
              <p>{project.detail.reflection}</p>
            </div>
          )}
        </section>
      )}

      <nav className="case-nav">
        <Link to={`/work/${prevProject.slug}`}>
          <span>← PREVIOUS WORK</span>
          <b>{prevProject.name}</b>
        </Link>
        <Link to={`/work/${nextProject.slug}`}>
          <span>NEXT WORK →</span>
          <b>{nextProject.name}</b>
        </Link>
      </nav>
    </main>
  );
};
