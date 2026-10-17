import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { POSTS, PROJECTS, SKILLS_DATA, SKILL_CATEGORY_LABELS, CERTIFICATES_DATA } from '../data/siteData';
import { useLang, Localized } from '../i18n';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  name: string;
  type: string;
  href: string;
  icon: string;
}

interface StaticRoute {
  name: Localized;
  type: Localized;
  href: string;
}

const PAGE: Localized = { en: 'Page', vi: 'Trang' };

const STATIC_ROUTES: StaticRoute[] = [
  { name: { en: 'Index', vi: 'Trang chủ' }, type: PAGE, href: '/' },
  { name: { en: 'Selected Notes', vi: 'Bài viết chọn lọc' }, type: { en: 'Section', vi: 'Mục' }, href: '/#articles' },
  { name: { en: 'Projects', vi: 'Dự án' }, type: PAGE, href: '/work' },
  { name: { en: 'Education & Certifications', vi: 'Học vấn & Chứng chỉ' }, type: PAGE, href: '/education' },
  { name: { en: 'Technical Skills & Stack', vi: 'Kỹ năng & Công nghệ' }, type: PAGE, href: '/skills' },
  { name: { en: 'Library', vi: 'Thư viện' }, type: PAGE, href: '/library' },
  { name: { en: 'Contact', vi: 'Liên hệ' }, type: PAGE, href: '/contact' }
];

/** Search matches either language, whichever the visitor types in. */
const matches = (q: string, ...values: (string | Localized)[]) =>
  values.some((v) => (typeof v === 'string' ? v : `${v.en} ${v.vi}`).toLowerCase().includes(q));

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { t } = useLang();

  const results = useMemo<CommandItem[]>(() => {
    const q = query.toLowerCase().trim();

    const routes = STATIC_ROUTES.filter((r) => !q || matches(q, r.name)).map((r) => ({
      name: t(r.name),
      type: t(r.type),
      href: r.href,
      icon: '↗'
    }));

    const projects = PROJECTS.filter((p) => !q || matches(q, p.name, p.description, p.type)).map((p) => ({
      name: t(p.name),
      type: t(p.type),
      href: `/work/${p.slug}`,
      icon: '✦'
    }));

    const posts = POSTS.filter((p) => !q || matches(q, p.title, p.summary, ...p.tags)).map((p) => ({
      name: t(p.title),
      type: p.tags.join(' · '),
      href: `/posts/${p.slug}`,
      icon: '#'
    }));

    if (!q) return [...routes, ...projects, ...posts.slice(0, 4)];

    const skills = SKILLS_DATA.filter((s) =>
      matches(q, s.name, s.summary, SKILL_CATEGORY_LABELS[s.category], ...s.tags)
    )
      .slice(0, 4)
      .map((s) => ({
        name: t(s.name),
        type: `${t({ en: 'Skill', vi: 'Kỹ năng' })} · ${t(SKILL_CATEGORY_LABELS[s.category])}`,
        href: '/skills',
        icon: '⚙'
      }));

    const certs = CERTIFICATES_DATA.filter((c) => matches(q, c.title, c.issuer, ...c.skills))
      .slice(0, 3)
      .map((c) => ({
        name: c.title,
        type: `${t({ en: 'Certificate', vi: 'Chứng chỉ' })} · ${c.issuer}`,
        href: '/education',
        icon: '📜'
      }));

    return [...routes, ...projects, ...skills, ...certs, ...posts];
  }, [query, t]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % Math.max(1, results.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length));
      } else if (e.key === 'Enter' && results[activeIndex]) {
        e.preventDefault();
        navigate(results[activeIndex].href);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, activeIndex, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="command open"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-hidden={!isOpen}
    >
      <div className="command-box" role="dialog" aria-modal="true" aria-label={t({ en: 'Search the site', vi: 'Tìm kiếm trên trang' })}>
        <div className="command-head">
          <span>⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t({ en: 'Search notes, pages, topics...', vi: 'Tìm bài viết, trang, chủ đề...' })}
            autoComplete="off"
          />
        </div>
        <div className="command-list">
          {results.length > 0 ? (
            results.map((item, idx) => (
              <a
                key={item.href}
                className={`command-item ${idx === activeIndex ? 'active' : ''}`}
                href={item.href}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.href);
                  onClose();
                }}
              >
                <i>{item.icon}</i>
                <b>{item.name}</b>
                <small>{item.type}</small>
              </a>
            ))
          ) : (
            <p style={{ padding: '24px', textAlign: 'center', color: 'var(--muted)', font: '13px var(--mono)' }}>
              {t({ en: 'No matching notes or pages.', vi: 'Không tìm thấy bài viết hoặc trang phù hợp.' })}
            </p>
          )}
        </div>
        <div className="command-foot">
          {t({ en: '↑ ↓ NAVIGATE · ENTER OPEN · ESC CLOSE', vi: '↑ ↓ DI CHUYỂN · ENTER MỞ · ESC ĐÓNG' })}
        </div>
      </div>
    </div>
  );
};
