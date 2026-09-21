import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { POSTS, PROJECTS, Post } from '../data/siteData';

export const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const postIndex = POSTS.findIndex((p) => p.slug === slug);
  const post = POSTS[postIndex];

  const [readingScale, setReadingScale] = useState(1);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [reactions, setReactions] = useState<Record<string, number>>({ warm: 12, thoughtful: 8, inspired: 15 });

  // Record visit in recently viewed notes
  useEffect(() => {
    if (!slug) return;
    const historyKey = 'minh-notes-visits';
    const existing = JSON.parse(localStorage.getItem(historyKey) || '[]');
    const updated = [slug, ...existing.filter((s: string) => s !== slug)].slice(0, 5);
    localStorage.setItem(historyKey, JSON.stringify(updated));

    // Check if saved in bookmarks
    const savedKey = 'minh-notes-bookmarks';
    const bookmarks = JSON.parse(localStorage.getItem(savedKey) || '[]');
    setIsSaved(bookmarks.includes(slug));
  }, [slug]);

  // Reading scale CSS property
  useEffect(() => {
    document.documentElement.style.setProperty('--reading-scale', String(readingScale));
    return () => {
      document.documentElement.style.removeProperty('--reading-scale');
    };
  }, [readingScale]);

  // Focus mode body attribute
  useEffect(() => {
    if (isFocusMode) {
      document.body.setAttribute('data-focus', 'true');
    } else {
      document.body.removeAttribute('data-focus');
    }
    return () => {
      document.body.removeAttribute('data-focus');
    };
  }, [isFocusMode]);

  // Reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? Math.min(100, Math.round((window.scrollY / scrollable) * 100)) : 0;
      setScrollPercent(pct);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return <Navigate to="/#articles" replace />;
  }

  const prevPost = postIndex > 0 ? POSTS[postIndex - 1] : POSTS[POSTS.length - 1];
  const nextPost = postIndex < POSTS.length - 1 ? POSTS[postIndex + 1] : POSTS[0];
  const matchingProject = PROJECTS.find((p) => p.slug === post.slug);

  const handleToggleSave = () => {
    const savedKey = 'minh-notes-bookmarks';
    const bookmarks: string[] = JSON.parse(localStorage.getItem(savedKey) || '[]');
    let updated: string[];
    if (bookmarks.includes(post.slug)) {
      updated = bookmarks.filter((s) => s !== post.slug);
      setIsSaved(false);
    } else {
      updated = [...bookmarks, post.slug];
      setIsSaved(true);
    }
    localStorage.setItem(savedKey, JSON.stringify(updated));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const handleReaction = (key: string) => {
    setReactions((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  };

  // Helper to render inline formatting: LaTeX math ($...$), links [..](..), bold (**..**), code (`..`)
  const renderInline = (text: string): React.ReactNode => {
    if (!text) return null;

    // Tokenize text into:
    // 1) display math: $$...$$
    // 2) inline math: $...$
    // 3) markdown links: [text](url)
    // 4) bold: **text**
    // 5) inline code: `code`
    const tokenRegex = /(\$\$[\s\S]+?\$\$|\$(?!\$)[^\$\n]+?\$|\[[^\]]+\]\([^)]+\)|\*\*[^*]+?\*\*|`[^`]+?`)/g;
    const parts = text.split(tokenRegex);

    return parts.map((part, i) => {
      if (!part) return null;

      // Display math $$...$$
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const tex = part.slice(2, -2).trim();
        try {
          const html = katex.renderToString(tex, {
            displayMode: true,
            throwOnError: false,
            output: 'htmlAndMathml'
          });
          return (
            <div
              key={i}
              className="katex-math-block"
              style={{
                margin: '22px 0',
                padding: '16px 20px',
                background: 'rgba(230, 155, 75, 0.04)',
                border: '1px solid rgba(230, 155, 75, 0.22)',
                borderRadius: '8px',
                overflowX: 'auto',
                textAlign: 'center',
                boxShadow: 'inset 0 0 16px rgba(0,0,0,0.25)'
              }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch (err) {
          return (
            <div key={i} style={{ margin: '16px 0', padding: '12px', background: '#222', borderRadius: '6px' }}>
              <code>{tex}</code>
            </div>
          );
        }
      }

      // Inline math $...$
      if (part.startsWith('$') && part.endsWith('$')) {
        const tex = part.slice(1, -1).trim();
        try {
          const html = katex.renderToString(tex, {
            displayMode: false,
            throwOnError: false,
            output: 'htmlAndMathml'
          });
          return (
            <span
              key={i}
              className="katex-math-inline"
              style={{
                padding: '0 2px',
                color: '#ffeacc'
              }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch (err) {
          return <code key={i}>{tex}</code>;
        }
      }

      // Markdown link: [text](url)
      if (part.startsWith('[') && part.includes('](')) {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (match) {
          const [, linkText, url] = match;
          const isExternal = url.startsWith('http');
          return (
            <a
              key={i}
              href={url}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              style={{
                color: 'var(--accent)',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                fontWeight: 500
              }}
            >
              {linkText}
            </a>
          );
        }
      }

      // Bold text **...**
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} style={{ color: '#fff3e0', fontWeight: 600 }}>
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Inline code `...`
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={i}
            style={{
              background: 'rgba(230, 155, 75, 0.12)',
              border: '1px solid rgba(230, 155, 75, 0.25)',
              borderRadius: '4px',
              padding: '2px 7px',
              font: '13px var(--mono)',
              color: '#f7ca88'
            }}
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
  };

  // Render markdown content segments
  const renderContent = (rawContent: string) => {
    // Robust parser for markdown headings, lists, KaTeX math blocks, callouts, and columns
    const blocks = rawContent.split(/\n\n+/);
    return blocks.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith('### ')) {
        return (
          <h3
            key={idx}
            className="article-subheading"
            style={{ margin: '36px 0 14px', fontSize: '22px', letterSpacing: '-0.03em', color: '#f6ede0' }}
          >
            {renderInline(trimmed.replace('### ', ''))}
          </h3>
        );
      }

      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="article-section-heading">
            {renderInline(trimmed.replace('## ', ''))}
          </h2>
        );
      }

      if (trimmed.startsWith('<PostCallout')) {
        const titleMatch = trimmed.match(/title="([^"]+)"/);
        const title = titleMatch ? titleMatch[1] : 'Note';
        const innerText = trimmed.replace(/<[^>]+>/g, '').trim();
        return (
          <aside
            key={idx}
            style={{
              margin: '32px 0',
              padding: '24px',
              borderLeft: '2px solid var(--accent)',
              background: 'rgba(230, 155, 75, 0.05)',
              borderRadius: '0 8px 8px 0'
            }}
          >
            <b style={{ font: '11px var(--mono)', color: 'var(--accent)', display: 'block', marginBottom: '8px' }}>
              {title}
            </b>
            <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.6' }}>{renderInline(innerText)}</p>
          </aside>
        );
      }

      if (trimmed.startsWith('<PostColumns>')) {
        const columns = trimmed.match(/<PostColumn title="([^"]+)">([\s\S]*?)<\/PostColumn>/g) || [];
        return (
          <div
            key={idx}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
              margin: '32px 0'
            }}
          >
            {columns.map((colStr, cIdx) => {
              const tMatch = colStr.match(/title="([^"]+)"/);
              const t = tMatch ? tMatch[1] : '';
              const c = colStr.replace(/<[^>]+>/g, '').trim();
              return (
                <div key={cIdx} style={{ padding: '20px', border: '1px solid var(--line)', borderRadius: '8px' }}>
                  <b style={{ font: '12px var(--mono)', color: 'var(--accent)', display: 'block', marginBottom: '8px' }}>
                    {t}
                  </b>
                  <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.55', color: 'var(--muted)' }}>
                    {renderInline(c)}
                  </p>
                </div>
              );
            })}
          </div>
        );
      }

      if (trimmed.startsWith('<PostImage')) {
        const srcMatch = trimmed.match(/src="([^"]+)"/);
        const altMatch = trimmed.match(/alt="([^"]+)"/);
        const captionMatch = trimmed.match(/caption="([^"]+)"/);
        return (
          <figure key={idx} style={{ margin: '36px 0' }}>
            <img
              src={srcMatch ? srcMatch[1] : ''}
              alt={altMatch ? altMatch[1] : ''}
              style={{ width: '100%', borderRadius: '8px', maxHeight: '440px', objectFit: 'cover' }}
            />
            {captionMatch && (
              <figcaption style={{ marginTop: '10px', font: '11px var(--mono)', color: 'var(--muted)', textAlign: 'center' }}>
                {captionMatch[1]}
              </figcaption>
            )}
          </figure>
        );
      }

      // Ordered list (1. 2. 3.)
      if (/^\d+\.\s/m.test(trimmed)) {
        const items = trimmed.split(/\n(?=\d+\.\s)/);
        return (
          <ol key={idx} style={{ paddingLeft: '24px', margin: '24px 0' }}>
            {items.map((item, itemIdx) => {
              const itemBody = item.replace(/^\d+\.\s*/, '').trim();
              return (
                <li key={itemIdx} style={{ marginBottom: '16px', lineHeight: '1.75' }}>
                  {renderInline(itemBody)}
                </li>
              );
            })}
          </ol>
        );
      }

      // Unordered list (- item)
      if (/^-\s/m.test(trimmed)) {
        const items = trimmed.split(/\n(?=-\s)/);
        return (
          <ul key={idx} style={{ paddingLeft: '24px', margin: '24px 0' }}>
            {items.map((item, itemIdx) => {
              const itemBody = item.replace(/^-\s*/, '').trim();
              return (
                <li key={itemIdx} style={{ marginBottom: '14px', lineHeight: '1.75' }}>
                  {renderInline(itemBody)}
                </li>
              );
            })}
          </ul>
        );
      }

      // Standard paragraph
      return (
        <p key={idx} style={{ lineHeight: '1.75', margin: '20px 0' }}>
          {renderInline(trimmed)}
        </p>
      );
    });
  };

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <main className="article">
      <Link className="back" to="/#articles">
        ← ALL BLOG POSTS
      </Link>
      <p className="eyebrow">
        {formattedDate} · {post.readingTime} MIN READ
      </p>
      <h1>{post.title}</h1>
      <p className="lede">{post.summary}</p>

      <aside className="reading-ritual">
        <div>
          <span>BREW TIME</span>
          <b>{post.readingTime} MIN</b>
        </div>
        <div>
          <span>PAGE MARK</span>
          <b>{scrollPercent}%</b>
        </div>
        <button
          type="button"
          onClick={() => {
            window.scrollBy({ top: 350, behavior: 'smooth' });
          }}
        >
          START READING ↓
        </button>
      </aside>

      <div className="tags">
        {post.tags.map((tag) => (
          <Link key={tag} to={`/#articles`}>
            #{tag}
          </Link>
        ))}
      </div>

      <div className="reading-settings" style={{ marginTop: '20px' }}>
        <span>READING COMFORT:</span>
        <button type="button" onClick={() => setReadingScale((s) => Math.max(0.85, s - 0.08))}>
          A-
        </button>
        <button type="button" onClick={() => setReadingScale(1)}>
          RESET
        </button>
        <button type="button" onClick={() => setReadingScale((s) => Math.min(1.3, s + 0.08))}>
          A+
        </button>
        <i />
        <button
          type="button"
          onClick={() => setIsFocusMode(!isFocusMode)}
          style={{ borderColor: isFocusMode ? 'var(--accent)' : undefined }}
        >
          {isFocusMode ? 'EXIT FOCUS' : 'FOCUS MODE'}
        </button>
      </div>

      <div className="article-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
        <button type="button" onClick={handleToggleSave} aria-pressed={isSaved}>
          {isSaved ? '★ SAVED IN SHELF' : '☆ SAVE'}
        </button>
        <button type="button" onClick={handleCopyLink}>
          ↗ COPY LINK
        </button>
        {matchingProject && (
          <Link
            to={`/work/${matchingProject.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 12px',
              borderRadius: '5px',
              border: '1px solid rgba(230, 155, 75, 0.45)',
              background: 'rgba(230, 155, 75, 0.1)',
              color: 'var(--accent)',
              font: '10px var(--mono)',
              textDecoration: 'none',
              letterSpacing: '0.04em'
            }}
          >
            💼 VIEW CASE STUDY →
          </Link>
        )}
        {matchingProject?.publication?.pdfUrl && (
          <a
            href={matchingProject.publication.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="Dang_Phuong_Nam_Conflict_Aware_RAG_Routing_IEEE_IS26.pdf"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 12px',
              borderRadius: '5px',
              border: '1px solid rgba(230, 155, 75, 0.45)',
              background: 'rgba(230, 155, 75, 0.1)',
              color: 'var(--accent)',
              font: '10px var(--mono)',
              textDecoration: 'none',
              letterSpacing: '0.04em'
            }}
          >
            📄 PAPER PDF ↓
          </a>
        )}
        {matchingProject?.githubUrl && (
          <a
            href={matchingProject.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 12px',
              borderRadius: '5px',
              border: '1px solid var(--line)',
              background: 'transparent',
              color: 'var(--muted)',
              font: '10px var(--mono)',
              textDecoration: 'none',
              letterSpacing: '0.04em'
            }}
          >
            ⚡ GITHUB REPO ↗
          </a>
        )}
      </div>

      <article>{renderContent(post.content)}</article>

      {matchingProject && (
        <aside
          style={{
            margin: '48px 0 24px',
            padding: '24px 28px',
            border: '1px solid var(--line)',
            borderRadius: '10px',
            background: 'rgba(230, 155, 75, 0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <span style={{ font: '10px var(--mono)', color: 'var(--accent)', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>
              PROJECT CASE STUDY &amp; REPRODUCIBILITY
            </span>
            <p style={{ margin: 0, fontSize: '15px', color: '#e8ded0', fontFamily: 'Georgia, serif' }}>
              Detailed architectural decisions, milestone logs, and verification artifacts.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link
              to={`/work/${matchingProject.slug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 14px',
                borderRadius: '6px',
                background: 'rgba(230, 155, 75, 0.2)',
                border: '1px solid var(--accent)',
                color: 'var(--text)',
                font: '11px var(--mono)',
                textDecoration: 'none'
              }}
            >
              EXPLORE CASE STUDY →
            </Link>
            {matchingProject.githubUrl && (
              <a
                href={matchingProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 14px',
                  borderRadius: '6px',
                  border: '1px solid var(--line)',
                  background: 'transparent',
                  color: 'var(--muted)',
                  font: '11px var(--mono)',
                  textDecoration: 'none'
                }}
              >
                GITHUB REPO ↗
              </a>
            )}
          </div>
        </aside>
      )}

      {/* REACTION BAR */}
      <div
        className="reaction-bar"
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          padding: '24px 0',
          borderTop: '1px solid var(--line)',
          marginTop: '60px'
        }}
      >
        <span style={{ font: '10px var(--mono)', color: 'var(--muted)' }}>SIGNAL RESPONSE:</span>
        <button
          type="button"
          onClick={() => handleReaction('warm')}
          style={{
            background: 'transparent',
            border: '1px solid var(--line)',
            borderRadius: '4px',
            color: 'var(--text)',
            padding: '6px 12px',
            cursor: 'pointer',
            font: '11px var(--mono)'
          }}
        >
          ☕ Warm ({reactions.warm})
        </button>
        <button
          type="button"
          onClick={() => handleReaction('thoughtful')}
          style={{
            background: 'transparent',
            border: '1px solid var(--line)',
            borderRadius: '4px',
            color: 'var(--text)',
            padding: '6px 12px',
            cursor: 'pointer',
            font: '11px var(--mono)'
          }}
        >
          ✦ Thoughtful ({reactions.thoughtful})
        </button>
        <button
          type="button"
          onClick={() => handleReaction('inspired')}
          style={{
            background: 'transparent',
            border: '1px solid var(--line)',
            borderRadius: '4px',
            color: 'var(--text)',
            padding: '6px 12px',
            cursor: 'pointer',
            font: '11px var(--mono)'
          }}
        >
          💡 Inspired ({reactions.inspired})
        </button>
      </div>

      {/* NAV */}
      <nav className="article-nav" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '40px 0' }}>
        <Link to={`/posts/${prevPost.slug}`} style={{ textDecoration: 'none', padding: '16px', border: '1px solid var(--line)', borderRadius: '6px' }}>
          <span style={{ font: '10px var(--mono)', color: 'var(--muted)', display: 'block' }}>← PREVIOUS</span>
          <b style={{ font: '400 18px Georgia, serif', color: 'var(--text)' }}>{prevPost.title}</b>
        </Link>
        <Link to={`/posts/${nextPost.slug}`} style={{ textDecoration: 'none', padding: '16px', border: '1px solid var(--line)', borderRadius: '6px', textAlign: 'right' }}>
          <span style={{ font: '10px var(--mono)', color: 'var(--muted)', display: 'block' }}>NEXT NOTE →</span>
          <b style={{ font: '400 18px Georgia, serif', color: 'var(--text)' }}>{nextPost.title}</b>
        </Link>
      </nav>
    </main>
  );
};
