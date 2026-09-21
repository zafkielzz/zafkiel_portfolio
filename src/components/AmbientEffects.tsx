import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const AmbientEffects: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let animFrame: number;
    const onPointerMove = (e: PointerEvent) => {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--pointer-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--pointer-y', `${e.clientY}px`);
      });
    };

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty('--scroll-progress', String(progress));
      setShowBackToTop(window.scrollY > 560);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Reveal observer on route changes
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('reveal-ready');

    const targets = Array.from(
      document.querySelectorAll(
        '.featured-note,.playground,.writing-stats,.history,.reading-index,.about,.glossary-list article,.library-list article,.now-grid section,.article .reaction-bar,.article .related,.article .article-nav,.project-grid,.photo-feature,.photo-notes article,.contact-sheet,.created-sheet,.photo-archive,.partner-process,.partner-directory,.partners-hub,.contact-status,.contact-links>a,.contact-links>button,.contact-foot'
      )
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -35px' }
    );

    targets.forEach((el, idx) => {
      (el as HTMLElement).style.setProperty('--reveal-delay', `${55 * Math.min(idx % 4, 3)}ms`);
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('reveal-ready');
    };
  }, [location.pathname, location.hash]);

  // Handle hash scrolling or scroll-to-top on route changes
  useEffect(() => {
    if (location.hash && location.hash !== '#index') {
      const id = location.hash.replace('#', '');
      const scrollToElement = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      };

      scrollToElement();
      const timer = setTimeout(scrollToElement, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <div className="ambient-cursor" aria-hidden="true" />
      <div className="page-progress" aria-hidden="true" />
      <button
        type="button"
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑ <span>TOP</span>
      </button>
    </>
  );
};
