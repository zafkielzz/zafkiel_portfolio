import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LofiPlayer } from './LofiPlayer';
import { useLang } from '../i18n';

interface DockProps {
  onOpenCommand: () => void;
}

export const Dock: React.FC<DockProps> = ({ onOpenCommand }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, setLang, t } = useLang();
  const [activeHash, setActiveHash] = useState<'index' | 'articles' | null>(null);

  const isHome = location.pathname === '/';
  const isProjects = location.pathname.startsWith('/work');
  const isEducation = location.pathname.startsWith('/education');
  const isSkills = location.pathname.startsWith('/skills');
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

    // Clicking BLOG (#articles)
    if (targetHash === 'articles') {
      if (!isHome) {
        navigate('/#articles');
        setTimeout(() => {
          scrollToArticles();
        }, 60);
      } else {
        if (location.hash !== '#articles') {
          window.history.replaceState(null, '', '/#articles');
        }
        scrollToArticles();
      }
      return;
    }

    // Clicking INDEX or 〽
    if (targetPath === '/' || targetHash === 'index') {
      if (isHome) {
        if (location.hash) {
          window.history.replaceState(null, '', '/');
        }
        scrollToTop();
      } else {
        // Reset scroll position instantly before route change
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate('/');
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
        });
      }
      return;
    }

    // Direct page navigation
    if (location.pathname === targetPath) {
      scrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
      navigate(targetPath);
    }
  };

  return (
    <nav className="dock" aria-label={t({ en: 'Main navigation', vi: 'Điều hướng chính' })}>
      <a
        className="mark"
        aria-label={t({ en: 'Home', vi: 'Trang chủ' })}
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
        {t({ en: 'INDEX', vi: 'MỤC LỤC' })}
      </a>
      <a
        className={isBlogActive ? 'active' : ''}
        href="/#articles"
        onClick={handleNavClick('/', 'articles')}
      >
        {t({ en: 'BLOG', vi: 'BÀI VIẾT' })}
      </a>
      <a
        className={isProjects ? 'active' : ''}
        href="/work"
        onClick={handleNavClick('/work')}
      >
        {t({ en: 'PROJECTS', vi: 'DỰ ÁN' })}
      </a>
      <a
        className={isEducation ? 'active' : ''}
        href="/education"
        onClick={handleNavClick('/education')}
      >
        {t({ en: 'EDUCATION', vi: 'HỌC VẤN' })}
      </a>
      <a
        className={isSkills ? 'active' : ''}
        href="/skills"
        onClick={handleNavClick('/skills')}
      >
        {t({ en: 'SKILLS', vi: 'KỸ NĂNG' })}
      </a>

      <button
        type="button"
        className="dock-search"
        onClick={onOpenCommand}
        title={t({ en: 'Search (Ctrl+K)', vi: 'Tìm kiếm (Ctrl+K)' })}
        aria-label={t({ en: 'Search the site', vi: 'Tìm kiếm trên trang' })}
      >
        ⌕
      </button>

      <LofiPlayer />

      <span />

      <a
        href="/cv.pdf"
        target="_blank"
        download="Dang_Phuong_Nam_CV.pdf"
        title={t({ en: 'Download CV (PDF)', vi: 'Tải CV (PDF)' })}
        style={{ color: 'var(--accent)' }}
      >
        CV ↓
      </a>

      <a
        className={isContact ? 'active' : ''}
        href="/contact"
        onClick={handleNavClick('/contact')}
      >
        {t({ en: 'CONTACT ↗', vi: 'LIÊN HỆ ↗' })}
      </a>

      <button
        type="button"
        className="dock-lang"
        onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
        title={t({ en: 'Chuyển sang tiếng Việt', vi: 'Switch to English' })}
        aria-label={t({ en: 'Switch language to Vietnamese', vi: 'Chuyển ngôn ngữ sang tiếng Anh' })}
      >
        <b className={lang === 'en' ? 'on' : ''}>EN</b>
        <b className={lang === 'vi' ? 'on' : ''}>VI</b>
      </button>
    </nav>
  );
};
