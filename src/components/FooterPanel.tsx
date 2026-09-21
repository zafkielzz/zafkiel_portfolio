import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const FooterPanel: React.FC = () => {
  const [meta, setMeta] = useState({
    time: '--:--:--',
    size: '—',
    browser: 'Browser'
  });
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    const updateTimeAndSize = () => {
      const timeStr = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Bangkok',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(new Date());

      const ua = navigator.userAgent;
      const browser = /Firefox/i.test(ua)
        ? 'Firefox'
        : /Edg/i.test(ua)
        ? 'Edge'
        : /Chrome/i.test(ua)
        ? 'Chromium'
        : /Safari/i.test(ua)
        ? 'Safari'
        : 'Browser';

      setMeta({
        time: timeStr,
        size: `${window.innerWidth}×${window.innerHeight}`,
        browser
      });
    };

    updateTimeAndSize();
    const interval = window.setInterval(updateTimeAndSize, 1000);
    window.addEventListener('resize', updateTimeAndSize);

    // Page visit count
    const storageKey = 'midnightbarista-page-visits';
    const current = Math.max(92400, Number(window.localStorage.getItem(storageKey) || 0)) + 1;
    window.localStorage.setItem(storageKey, String(current));
    setVisits(current);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener('resize', updateTimeAndSize);
    };
  }, []);

  return (
    <>
      <section className="site-footer-panel">
        <div className="footer-meta">
          <div>
            <span>
              <strong>IDENTITY</strong>MIDNIGHT BARISTA · AI ARCHIVE
            </span>
            <span>
              <strong>BROWSER</strong>{meta.browser}
            </span>
            <span>
              <strong>LOCAL TIME</strong>{meta.time}
            </span>
            <span>
              <strong>VIEWPORT</strong>{meta.size}
            </span>
            <span>
              <strong>TIMEZONE</strong>BANGKOK / HANOI (GMT+7)
            </span>
            <span>
              <strong>STATUS</strong>ONLINE
            </span>
          </div>
        </div>

        <div className="footer-links">
          <b>EXPLORE</b>
          <div>
            <span>
              <Link to="/">Home</Link>
              <Link to="/#articles">Blog</Link>
              <Link to="/work">Projects</Link>
              <Link to="/photos">Photography</Link>
              <Link to="/partners">Partners</Link>
              <Link to="/contact">Contact</Link>
            </span>
            <span>
              <a href="https://github.com/kimigakawaii-dev" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href="https://www.instagram.com/kimi.ga.kawaii" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href="https://ko-fi.com/kimigakawaii_" target="_blank" rel="noreferrer">
                Support
              </a>
              <a href="/rss.xml">RSS</a>
            </span>
          </div>
        </div>

        <p className="visit-counter">
          <i>✦</i> PAGE VISITS <b>{visits.toLocaleString()}</b>
        </p>
      </section>

      <footer>
        <span>© 2026 KIMIGAKAWAII</span>
        <span>BUILT WITH CURIOSITY</span>
      </footer>
    </>
  );
};
