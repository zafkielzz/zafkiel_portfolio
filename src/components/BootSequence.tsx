import React, { useEffect, useState } from 'react';

const PRELOAD_IMAGES = [
  '/images/studio-cafe.jpg',
  '/images/hero-projects.png',
  '/images/hero-photos.png',
  '/images/hero-partners.png',
  '/images/hero-contact.png',
  '/images/collection-projects.jpg',
  '/images/collection-partners.jpg'
];

export const BootSequence: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if reduced motion or already booted in this session
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.sessionStorage.getItem('midnightbarista-booted')
    ) {
      setVisible(false);
      return;
    }

    let active = true;
    const updateProgress = (val: number) => {
      if (active) setProgress(val);
    };

    updateProgress(8);

    const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve();
    const imagePromises = PRELOAD_IMAGES.map((src, idx) =>
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
      }).then(() => {
        updateProgress(14 + Math.round(((idx + 1) / PRELOAD_IMAGES.length) * 76));
      })
    );

    Promise.all([fontPromise, ...imagePromises]).then(() => {
      updateProgress(100);
      window.setTimeout(() => {
        if (active) {
          window.sessionStorage.setItem('midnightbarista-booted', 'true');
          setVisible(false);
        }
      }, 300);
    });

    // Fallback safety timer
    const fallbackTimer = window.setTimeout(() => {
      if (active) {
        setProgress(100);
        setVisible(false);
      }
    }, 4500);

    return () => {
      active = false;
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="boot-sequence boot-ready" role="status" aria-label="Loading Midnight Barista Archive">
      <div>
        <span>ĐẶNG PHƯƠNG NAM · FPT UNIVERSITY</span>
        <b>
          Zafkiel
          <br />
          AI STUDIO
        </b>
        <i>
          <em style={{ transform: `scaleX(${progress / 100})` }} />
        </i>
        <small>
          INITIALIZING AI LAB · {String(progress).padStart(3, '0')}%
        </small>
      </div>
    </div>
  );
};
