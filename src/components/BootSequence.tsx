import React, { useEffect, useState } from 'react';

const PRELOAD_IMAGES = [
  '/images/studio-cafe.jpg',
  '/images/hero-projects.png',
  '/images/hero-photos.png',
  '/images/hero-partners.png',
  '/images/hero-contact.png',
  '/images/collection-projects.jpg',
  '/images/collection-partners.jpg',
  '/images/collaboration-fire.gif'
];

export const BootSequence: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING AI ARCHIVE · 000%');

  useEffect(() => {
    // If reduced motion is requested or already booted this session
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.sessionStorage.getItem('zafkiel-portfolio-booted')
    ) {
      document.documentElement.classList.add('boot-finished');
      setVisible(false);
      return;
    }

    let active = true;
    let currentProgress = 0;

    const getStatusText = (val: number) => {
      if (val < 28) return 'INITIALIZING NEURAL MATRICES';
      if (val < 65) return 'LOADING MULTIMODAL ROUTERS';
      if (val < 92) return 'CALIBRATING CAFE ATMOSPHERE';
      return 'AI STUDIO ONLINE · READY';
    };

    // Smooth incremental progression for authentic game boot pacing (~1.2s)
    const startTime = Date.now();
    const minDuration = 1200;

    const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve();
    const imagePromises = PRELOAD_IMAGES.map((src) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          if (img.decode) {
            img.decode().catch(() => {}).finally(() => resolve());
          } else {
            resolve();
          }
        };
        img.onerror = () => resolve();
        img.src = src;
      })
    );

    const assetsLoadedPromise = Promise.all([fontPromise, ...imagePromises]);

    const progressInterval = setInterval(() => {
      if (!active) return;
      const elapsed = Date.now() - startTime;
      const targetPercent = Math.min(96, Math.round((elapsed / minDuration) * 96));
      if (currentProgress < targetPercent) {
        currentProgress += Math.max(1, Math.floor((targetPercent - currentProgress) / 3));
        setProgress(currentProgress);
        setStatus(`${getStatusText(currentProgress)} · ${String(currentProgress).padStart(3, '0')}%`);
      }
    }, 28);

    assetsLoadedPromise.then(() => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        if (!active) return;
        clearInterval(progressInterval);
        setProgress(100);
        setStatus('AI STUDIO ONLINE · READY · 100%');

        setTimeout(() => {
          if (!active) return;
          setIsFading(true);
          document.documentElement.classList.add('boot-finished');
          window.dispatchEvent(new CustomEvent('boot-sequence-finished'));
          window.sessionStorage.setItem('zafkiel-portfolio-booted', 'true');

          setTimeout(() => {
            if (active) {
              setVisible(false);
            }
          }, 600);
        }, 220);
      }, remainingTime);
    });

    const fallbackTimer = window.setTimeout(() => {
      if (active) {
        clearInterval(progressInterval);
        setProgress(100);
        setIsFading(true);
        document.documentElement.classList.add('boot-finished');
        window.dispatchEvent(new CustomEvent('boot-sequence-finished'));
        window.sessionStorage.setItem('zafkiel-portfolio-booted', 'true');
        setTimeout(() => setVisible(false), 600);
      }
    }, 4500);

    return () => {
      active = false;
      clearInterval(progressInterval);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`boot-sequence boot-ready ${isFading ? 'boot-fading' : ''}`}
      role="status"
      aria-label="Loading Midnight Barista Archive"
    >
      <div>
        <div className="boot-ember-wrapper">
          <img
            src="/images/collaboration-fire.gif"
            alt="Warm pixel hearth flame"
            className="boot-ember-sprite"
            width={52}
            height={52}
          />
        </div>
        <span>ĐẶNG PHƯƠNG NAM · FPT UNIVERSITY</span>
        <b>
          Zafkiel
          <br />
          AI STUDIO
        </b>
        <i>
          <em style={{ transform: `scaleX(${progress / 100})` }} />
        </i>
        <small>{status}</small>
      </div>
    </div>
  );
};

export default BootSequence;
