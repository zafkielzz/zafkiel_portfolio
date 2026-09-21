import React, { useEffect, useRef } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

interface ScrambleTextProps {
  children: string;
  className?: string;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({ children, className }) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const originalText = String(children);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        let step = 0;
        const interval = setInterval(() => {
          el.textContent = [...originalText]
            .map((char, idx) =>
              idx < step / 2
                ? char
                : char === ' '
                ? ' '
                : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            )
            .join('');

          step += 1;
          if (step >= originalText.length * 2) {
            clearInterval(interval);
            el.textContent = originalText;
          }
        }, 22);

        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [children]);

  return (
    <span ref={spanRef} className={className}>
      {children}
    </span>
  );
};
