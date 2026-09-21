import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LofiPlayer } from './LofiPlayer';

interface DockProps {
  onOpenCommand: () => void;
}

export const Dock: React.FC<DockProps> = ({ onOpenCommand }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeHash, setActiveHash] = useState<'index' | 'articles' | null>(null);

  const isHome = location.pathname === '/';
  const isProjects = location.pathname.startsWith('/work');
  const isPhotos = location.pathname.startsWith('/photos');
  const isPartners = location.pathname.startsWith('/partners');
  const isContact = location.pathname === '/contact';

  // Track active section on home page when scrolling
  useEffect(() => {
    if (!isHome) {
      setActiveHash(null);
      return;
    }

    const handleScroll = () => {
      const articlesEl = document.getElementById('articles');
      if (!articlesEl) return;
      const rect = articlesEl.getBoundingClientRect();
      // If articles top is near or above viewport middle
      if (rect.top <= window.innerHeight * 0.45) {
        setActiveHash('articles');
      } else {
        setActiveHash('index');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Determine active states
  const isIndexActive = isHome && (activeHash === 'index' || (!activeHash && location.hash !== '#articles'));
  const isBlogActive = isHome && (activeHash === 'articles' || location.hash === '#articles');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToArticles = () => {
    const el = document.getElementById('articles');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (targetPath: string, targetHash?: 'index' | 'articles') => (e: React.MouseEvent) => {
    e.preventDefault();

    if (targetHash) {
      if (!isHome) {
        navigate(`/#${targetHash}`);
        // Wait a tick for page mount
        setTimeout(() => {
          if (targetHash === 'articles') {
            scrollToArticles();
          } else {
            scrollToTop();
          }
        }, 80);
      } else {
        // Already on home page
        if (location.hash !== `#${targetHash}`) {
          window.history.replaceState(null, '', `/#${targetHash}`);
        }
        if (targetHash === 'articles') {
          scrollToArticles();
        } else {
          scrollToTop();
        }
      }
      return;
    }

    // Direct page navigation
    if (location.pathname === targetPath) {
      // Already on this page -> scroll to top
      scrollToTop();
    } else {
      navigate(targetPath);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <nav className="dock">
      <a
        className="mark"
        aria-label="Home"
        href="/"
        onClick={handleNavClick('/', 'index')}
      >
        〽
      </a>
      <a
        className={isIndexActive ? 'active' : ''}
        href="/#index"
        onClick={handleNavClick('/', 'index')}
      >
        INDEX
      </a>
      <a
        className={isBlogActive ? 'active' : ''}
        href="/#articles"
        onClick={handleNavClick('/', 'articles')}
      >
        BLOG
      </a>
      <a
        className={isProjects ? 'active' : ''}
        href="/work"
        onClick={handleNavClick('/work')}
      >
        PROJECTS
      </a>
      <a
        className={isPhotos ? 'active' : ''}
        href="/photos"
        onClick={handleNavClick('/photos')}
      >
        PHOTOS
      </a>
      <a
        className={isPartners ? 'active' : ''}
        href="/partners"
        onClick={handleNavClick('/partners')}
      >
        PARTNERS
      </a>

      <button type="button" onClick={onOpenCommand} title="Open command palette (Ctrl+K)">
        CMD
      </button>

      <LofiPlayer />

      <span />

      <a
        className={isContact ? 'active' : ''}
        href="/contact"
        onClick={handleNavClick('/contact')}
      >
        CONTACT ↗
      </a>
    </nav>
  );
};
