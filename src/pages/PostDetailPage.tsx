import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { POSTS, Post } from '../data/siteData';

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

  // Render markdown content segments
  const renderContent = (rawContent: string) => {
    // Simple robust parser for our structured markdown
    const blocks = rawContent.split('\n\n');
    return blocks.map((block, idx) => {
      const trimmed = block.trim();
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="article-section-heading">
            {trimmed.replace('## ', '')}
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
            <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.6' }}>{innerText}</p>
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
                  <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.55', color: 'var(--muted)' }}>{c}</p>
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
      return (
        <p key={idx} style={{ lineHeight: '1.7', margin: '20px 0' }}>
          {trimmed}
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

      <div className="article-actions">
        <button type="button" onClick={handleToggleSave} aria-pressed={isSaved}>
          {isSaved ? '★ SAVED IN SHELF' : '☆ SAVE'}
        </button>
        <button type="button" onClick={handleCopyLink}>
          ↗ COPY LINK
        </button>
      </div>

      <article>{renderContent(post.content)}</article>

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
