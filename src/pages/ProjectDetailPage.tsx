import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PROJECTS } from '../data/siteData';
import { useLang } from '../i18n';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLang();
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[projectIndex];

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : PROJECTS[0];
  const name = t(project.name);
  const firstLetter = name.charAt(0);
  const isInDev = project.year.en.includes('In Development');
  const venue = project.publication?.conference || project.publication?.journal;

  return (
    <main className="case-page">
      <Link className="back" to="/work">
        {t({ en: '← ALL PROJECTS', vi: '← TẤT CẢ DỰ ÁN' })}
      </Link>
      <p className="eyebrow">
        CASE STUDY · {t(project.year)} · {t(project.type)}
      </p>
      <h1>{name}</h1>
      <p className="case-lede">{t(project.description)}</p>

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
            alt={name}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 1,
              zIndex: 1
            }}
          />
        )}
        {!project.image && <span style={{ position: 'relative', zIndex: 2 }}>{firstLetter}</span>}
      </div>

      <section className="case-meta">
        <div>
          <span>{t({ en: 'ROLE', vi: 'VAI TRÒ' })}</span>
          <b>{t(project.role)}</b>
        </div>
        <div>
          <span>{t({ en: 'TIMELINE', vi: 'THỜI GIAN' })}</span>
          <b>{t(project.year)}</b>
        </div>
        <div>
          <span>{t({ en: 'FOCUS', vi: 'TRỌNG TÂM' })}</span>
          <b>{t(project.type)}</b>
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
            <span>{t({ en: 'CONFERENCE CITATION & SCIENTIFIC PUBLICATION', vi: 'TRÍCH DẪN HỘI NGHỊ & CÔNG BỐ KHOA HỌC' })}</span>
            <span>
              {project.publication.status
                ? t(project.publication.status).toUpperCase()
                : t({ en: 'ACCEPTED', vi: 'ĐÃ ĐƯỢC CHẤP NHẬN' })}
            </span>
          </div>
          <h3 style={{ margin: '0 0 12px', fontSize: '20px', letterSpacing: '-0.03em', color: 'var(--text)' }}>
            {venue && t(venue)}
          </h3>
          <p style={{ margin: '0 0 8px', color: 'var(--muted)', fontSize: '13px', font: '12px var(--mono)' }}>
            <strong>{t({ en: 'Authors:', vi: 'Tác giả:' })}</strong>{' '}
            <span style={{ color: '#fff3e0' }}>{t(project.publication.authors)}</span> ·{' '}
            <strong>{t({ en: 'Date:', vi: 'Thời gian:' })}</strong> {t(project.publication.date)}
          </p>
          {project.publication.status && (
            <p style={{ margin: '0 0 8px', color: '#e6aa60', fontSize: '12px', font: '500 12px var(--mono)' }}>
              <strong>{t({ en: 'Status:', vi: 'Trạng thái:' })}</strong> {t(project.publication.status)}
            </p>
          )}
          <p style={{ margin: '16px 0 20px', color: '#c3b09a', lineHeight: 1.65, fontSize: '15px' }}>
            <strong>{t({ en: 'Abstract:', vi: 'Tóm tắt:' })}</strong> {t(project.publication.abstract)}
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
              <i>📄</i> {t({ en: 'DOWNLOAD PAPER (PDF)', vi: 'TẢI BÀI BÁO (PDF)' })} <span>↓</span>
            </a>
            <Link
              to={`/posts/${project.slug}`}
              className="random-note"
              style={{
                textDecoration: 'none',
                color: 'var(--text)'
              }}
            >
              <i>📖</i> {t({ en: 'READ TECHNICAL NOTE', vi: 'ĐỌC GHI CHÚ KỸ THUẬT' })} <span>→</span>
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
                <i>⚡</i> {t({ en: 'VIEW RESEARCH REPOSITORY', vi: 'XEM REPOSITORY NGHIÊN CỨU' })} <span>↗</span>
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
            <i>⚡</i> {t({ en: 'VIEW SOURCE CODE ON GITHUB', vi: 'XEM MÃ NGUỒN TRÊN GITHUB' })} <span>↗</span>
          </a>
        </div>
      )}

      <section className="case-copy">
        <div>
          <span>{t({ en: 'THE PROBLEM / CHALLENGE', vi: 'VẤN ĐỀ / THÁCH THỨC' })}</span>
          <h2>{t({ en: 'Research Context & Technical Challenges', vi: 'Bối cảnh nghiên cứu & Thách thức kỹ thuật' })}</h2>
          <p>{t(project.challenge)}</p>
        </div>
        <div>
          <span>{t({ en: 'THE OUTCOME / SOLUTION', vi: 'KẾT QUẢ / GIẢI PHÁP' })}</span>
          <h2>{t({ en: 'Proposed Architecture & Experimental Results', vi: 'Kiến trúc đề xuất & Kết quả thực nghiệm' })}</h2>
          <p>{t(project.outcome)}</p>
        </div>
      </section>

      {project.decisions && project.decisions.length > 0 && (
        <section className="case-approach">
          <div className="label">
            <span>{t({ en: 'CORE DECISIONS', vi: 'QUYẾT ĐỊNH CỐT LÕI' })}</span>
            <span>{t({ en: 'ARCHITECTURAL PRINCIPLES', vi: 'NGUYÊN TẮC KIẾN TRÚC' })}</span>
          </div>
          {project.decisions.map(([title, desc], idx) => (
            <article key={title.en}>
              <i>
                0{idx + 1} / {t({ en: 'PRINCIPLE', vi: 'NGUYÊN TẮC' })}
              </i>
              <div>
                <h2>{t(title)}</h2>
                <p>{t(desc)}</p>
              </div>
            </article>
          ))}
        </section>
      )}

      {project.detail?.timeline && (
        <section className="case-timeline">
          <div className="label">
            <span>{t({ en: 'DEVELOPMENT PHASES', vi: 'CÁC GIAI ĐOẠN PHÁT TRIỂN' })}</span>
            <span>{t({ en: 'EXPERIMENTATION LOG', vi: 'NHẬT KÝ THỬ NGHIỆM' })}</span>
          </div>
          {project.detail.timeline.map(([phase, note]) => (
            <article key={phase.en}>
              <span>{t(phase)}</span>
              <p>{t(note)}</p>
            </article>
          ))}
        </section>
      )}

      {project.detail && (
        <section className="case-evidence">
          {project.detail.artifacts && (
            <div>
              <span>{t({ en: 'KEY ARTIFACTS & DELIVERABLES', vi: 'SẢN PHẨM & KẾT QUẢ BÀN GIAO CHÍNH' })}</span>
              <ul>
                {project.detail.artifacts.map((art) => (
                  <li key={art.en}>
                    <span>{t(art)}</span>
                    <b style={{ color: isInDev ? '#f6b73c' : '#7bc786' }}>
                      {isInDev
                        ? t({ en: 'IN PROGRESS', vi: 'ĐANG THỰC HIỆN' })
                        : t({ en: 'VERIFIED', vi: 'ĐÃ KIỂM CHỨNG' })}
                    </b>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {project.detail.reflection && (
            <div className="case-takeaway-card">
              <span>{t({ en: 'KEY TAKEAWAYS & TECHNICAL CONCLUSION', vi: 'BÀI HỌC CHÍNH & KẾT LUẬN KỸ THUẬT' })}</span>
              <p>{t(project.detail.reflection)}</p>
            </div>
          )}
        </section>
      )}

      <nav className="case-nav">
        <Link to={`/work/${prevProject.slug}`}>
          <span>{t({ en: '← PREVIOUS WORK', vi: '← DỰ ÁN TRƯỚC' })}</span>
          <b>{t(prevProject.name)}</b>
        </Link>
        <Link to={`/work/${nextProject.slug}`}>
          <span>{t({ en: 'NEXT WORK →', vi: 'DỰ ÁN TIẾP THEO →' })}</span>
          <b>{t(nextProject.name)}</b>
        </Link>
      </nav>
    </main>
  );
};
