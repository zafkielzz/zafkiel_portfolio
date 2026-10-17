import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/siteData';
import { useLang } from '../i18n';

export const ProjectsPage: React.FC = () => {
  const { t } = useLang();
  return (
    <main className="work-page">
      <section className="page-section-hero projects-page-hero">
        <img
          alt={t({ en: 'Selected Projects hero background', vi: 'Ảnh nền mục Dự án tiêu biểu' })}
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
          src="/images/hero-projects.webp"
        />
        <span className="page-section-hero-shade" />
        <div className="page-section-hero-content">
          <Link className="back" to="/">
            {t({ en: '← INDEX', vi: '← TRANG CHỦ' })}
          </Link>
          <p className="eyebrow">{t({ en: 'SELECTED PROJECTS', vi: 'DỰ ÁN TIÊU BIỂU' })}</p>
          <h1>
            {t({ en: 'Things I made, shaped and ', vi: 'Những gì tôi đã tạo ra, định hình và ' })}
            <em>{t({ en: 'shipped.', vi: 'hoàn thiện.' })}</em>
          </h1>
          <p className="work-lede">
            {t({
              en: 'A selection of AI systems, interactive tools, and collaborative work—where algorithmic ideas become considered experiences.',
              vi: 'Tuyển chọn các hệ thống AI, công cụ tương tác và dự án hợp tác — nơi những ý tưởng thuật toán trở thành trải nghiệm được chăm chút.'
            })}
          </p>
        </div>
      </section>

      <div className="project-grid">
        {PROJECTS.map((proj, idx) => {
          const numStr = String(idx + 1).padStart(2, '0');
          const name = t(proj.name);
          const firstLetter = name.charAt(0);
          const conference = proj.publication?.conference?.en;
          const inDevelopment = proj.year.en.includes('In Development');
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
                aria-label={t({ en: `Read ${name} case study`, vi: `Đọc case study ${name}` })}
                to={`/work/${proj.slug}`}
              >
                {proj.image ? (
                  <img
                    src={proj.image}
                    alt={name}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 1,
                      zIndex: 1,
                      transition: 'transform 0.5s cubic-bezier(0.2, 0.72, 0.2, 1), opacity 0.3s ease'
                    }}
                  />
                ) : (
                  <>
                    <b>{numStr}</b>
                    <span>{firstLetter}</span>
                  </>
                )}
              </Link>
              <div className="project-copy">
                <div>
                  <h2>{name}</h2>
                  <p>{t(proj.description)}</p>
                  <div className="project-actions">
                    <Link className="project-action-btn primary" to={`/work/${proj.slug}`}>
                      {t({ en: 'VIEW CASE STUDY', vi: 'XEM CASE STUDY' })} <span>→</span>
                    </Link>
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-btn secondary"
                      >
                        {t({ en: 'GITHUB REPO', vi: 'REPO GITHUB' })} <span>↗</span>
                      </a>
                    )}
                    {proj.publication && (
                      <span
                        className="project-badge"
                        style={
                          conference?.includes('ICITDA')
                            ? {
                                color: '#4ade80',
                                background: 'rgba(74, 222, 128, 0.12)',
                                borderColor: 'rgba(74, 222, 128, 0.35)'
                              }
                            : undefined
                        }
                      >
                        {conference?.includes('ICITDA')
                          ? 'ICITDA 2026'
                          : conference?.includes('IEEE')
                          ? "IEEE IS'26"
                          : t({ en: 'PUBLICATION', vi: 'CÔNG BỐ' })}
                      </span>
                    )}
                    {inDevelopment && (
                      <span
                        className="project-badge"
                        style={{
                          color: '#f6b73c',
                          background: 'rgba(246, 183, 60, 0.1)',
                          borderColor: 'rgba(246, 183, 60, 0.35)'
                        }}
                      >
                        {t({ en: 'IN DEVELOPMENT', vi: 'ĐANG PHÁT TRIỂN' })}
                      </span>
                    )}
                  </div>
                </div>
                <aside>
                  <span>{t(proj.type)}</span>
                  <span>{t(proj.year)}</span>
                </aside>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
};
