import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { POSTS, PROJECTS, SKILLS_DATA, CERTIFICATES_DATA } from '../data/siteData';

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

const STATIC_ROUTES: CommandItem[] = [
  { name: 'Index', type: 'Page', href: '/', icon: '↗' },
  { name: 'Selected Notes', type: 'Section', href: '/#articles', icon: '↗' },
  { name: 'Projects', type: 'Page', href: '/work', icon: '↗' },
  { name: 'Education & Certifications', type: 'Page', href: '/education', icon: '↗' },
  { name: 'Technical Skills & Stack', type: 'Page', href: '/skills', icon: '↗' },
  { name: 'Library', type: 'Page', href: '/library', icon: '↗' },
  { name: 'Contact', type: 'Page', href: '/contact', icon: '↗' }
];

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return [
        ...STATIC_ROUTES,
        ...PROJECTS.map((p) => ({
          name: p.name,
          type: p.type,
          href: `/work/${p.slug}`,
          icon: '✦'
        })),
        ...POSTS.slice(0, 4).map((p) => ({
          name: p.title,
          type: p.tags.join(' · '),
          href: `/posts/${p.slug}`,
          icon: '#'
        }))
      ];
    }

    const matchedRoutes = STATIC_ROUTES.filter((r) => r.name.toLowerCase().includes(q));
    const matchedProjects = PROJECTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
    ).map((p) => ({
      name: p.name,
      type: p.type,
      href: `/work/${p.slug}`,
      icon: '✦'
    }));

    const matchedPosts = POSTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    ).map((p) => ({
      name: p.title,
      type: p.tags.join(' · '),
      href: `/posts/${p.slug}`,
      icon: '#'
    }));

    const matchedSkills = SKILLS_DATA.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 4).map((s) => ({
      name: s.name,
      type: `Skill · ${s.category}`,
      href: `/skills`,
      icon: '⚙'
    }));

    const matchedCerts = CERTIFICATES_DATA.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        c.skills.some((sk) => sk.toLowerCase().includes(q))
    ).slice(0, 3).map((c) => ({
      name: c.title,
      type: `Certificate · ${c.issuer}`,
      href: `/education`,
      icon: '📜'
    }));

    return [...matchedRoutes, ...matchedProjects, ...matchedSkills, ...matchedCerts, ...matchedPosts];
  }, [query]);

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
      <div className="command-box" role="dialog" aria-modal="true" aria-label="Search the site">
        <div className="command-head">
          <span>⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes, pages, topics..."
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
              No matching notes or pages.
            </p>
          )}
        </div>
        <div className="command-foot">
          ↑ ↓ NAVIGATE · ENTER OPEN · ESC CLOSE
        </div>
      </div>
    </div>
  );
};
