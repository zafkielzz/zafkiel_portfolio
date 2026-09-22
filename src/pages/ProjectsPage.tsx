import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/siteData';

export const ProjectsPage: React.FC = () => {
  return (
    <main className="work-page">
      <section className="page-section-hero projects-page-hero">
        <img
          alt="Selected Projects hero background"
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
          src="/images/hero-projects.png"
        />
        <span className="page-section-hero-shade" />
        <div className="page-section-hero-content">
          <Link className="back" to="/">
            ← INDEX
          </Link>
          <p className="eyebrow">SELECTED PROJECTS</p>
          <h1>
            Things I made, shaped and <em>shipped.</em>
          </h1>
          <p className="work-lede">
            A selection of AI systems, interactive tools, and collaborative work—where algorithmic ideas become considered experiences.
          </p>
        </div>
      </section>

      <div className="project-grid">
        {PROJECTS.map((proj, idx) => {
          const numStr = String(idx + 1).padStart(2, '0');
          const firstLetter = proj.name.charAt(0);
          return (
            <article key={proj.slug} className="project-card">
              <Link
                className="project-image"
                style={
                  {
                    '--one': proj.colors[0],
                    '--two': proj.colors[1]
                  } as React.CSSProperties
                }
                aria-label={`Read ${proj.name} case study`}
                to={`/work/${proj.slug}`}
              >
                {proj.image && (
                  <img
                    src={proj.image}
                    alt={proj.name}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.65,
                      transition: 'transform 0.5s cubic-bezier(0.2, 0.72, 0.2, 1), opacity 0.3s ease'
                    }}
                  />
                )}
                <b>{numStr}</b>
                <span>{firstLetter}</span>
              </Link>
              <div className="project-copy">
                <div>
                  <h2>{proj.name}</h2>
                  <p>{proj.description}</p>
                  <div className="project-actions">
                    <Link className="project-action-btn primary" to={`/work/${proj.slug}`}>
                      VIEW CASE STUDY <span>→</span>
                    </Link>
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-btn secondary"
                      >
                        GITHUB REPO <span>↗</span>
                      </a>
                    )}
                    {proj.publication && (
                      <span
                        className="project-badge"
                        style={
                          proj.publication.conference?.includes('ICITDA')
                            ? {
                                color: '#4ade80',
                                background: 'rgba(74, 222, 128, 0.12)',
                                borderColor: 'rgba(74, 222, 128, 0.35)'
                              }
                            : undefined
                        }
                      >
                        {proj.publication.conference?.includes('ICITDA')
                          ? 'ICITDA 2026'
                          : proj.publication.conference?.includes('IEEE')
                          ? "IEEE IS'26"
                          : 'PUBLICATION'}
                      </span>
                    )}
                    {(proj.year.includes('In Development') || proj.type.includes('Đang')) && (
                      <span
                        className="project-badge"
                        style={{
                          color: '#f6b73c',
                          background: 'rgba(246, 183, 60, 0.1)',
                          borderColor: 'rgba(246, 183, 60, 0.35)'
                        }}
                      >
                        IN DEVELOPMENT
                      </span>
                    )}
                  </div>
                </div>
                <aside>
                  <span>{proj.type}</span>
                  <span>{proj.year}</span>
                </aside>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
};
