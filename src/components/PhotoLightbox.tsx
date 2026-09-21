import React, { useState, useEffect, useRef } from 'react';
import { PhotoItem } from '../data/siteData';

interface PhotoLightboxProps {
  photos: PhotoItem[];
  currentIndex: number;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photos,
  currentIndex,
  onClose,
  onSelectIndex
}) => {
  const [isFit, setIsFit] = useState(false);
  const activeThumbRef = useRef<HTMLButtonElement>(null);

  const total = photos.length;
  const currentPhoto = photos[currentIndex];

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + total) % total;
    onSelectIndex(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % total;
    onSelectIndex(nextIdx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, total]);

  // Keep active thumbnail centered in the filmstrip
  useEffect(() => {
    if (activeThumbRef.current) {
      activeThumbRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [currentIndex]);

  if (!currentPhoto) return null;

  return (
    <div
      className={`photo-lightbox ${isFit ? 'is-fit' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={currentPhoto.title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* CLOSE BUTTON */}
      <button
        type="button"
        className="photo-close"
        onClick={onClose}
        aria-label="Close photo viewer"
      >
        ×
      </button>

      {/* FIT / FILL BUTTON */}
      <button
        type="button"
        className="photo-fit"
        onClick={() => setIsFit(!isFit)}
      >
        {isFit ? 'FILL' : 'FIT'}
      </button>

      {/* PREVIOUS ARROW BUTTON */}
      <button
        type="button"
        className="photo-arrow previous"
        onClick={handlePrev}
        aria-label="Previous photo"
      >
        ←
      </button>

      {/* MAIN PHOTO FIGURE */}
      <figure>
        <img
          key={currentPhoto.image}
          src={currentPhoto.image}
          alt={currentPhoto.title}
          className="sheet-image-enter"
          style={{
            objectPosition: currentPhoto.position || 'center'
          }}
        />

        <figcaption>
          <span>
            FRAME {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            {currentPhoto.location ? ` · ${currentPhoto.location.toUpperCase()}` : ''}
            {currentPhoto.time ? ` · ${currentPhoto.time}` : ''}
          </span>
          <h2>{currentPhoto.title}</h2>
          {currentPhoto.description && <p>{currentPhoto.description}</p>}
        </figcaption>
      </figure>

      {/* NEXT ARROW BUTTON */}
      <button
        type="button"
        className="photo-arrow next"
        onClick={handleNext}
        aria-label="Next photo"
      >
        →
      </button>

      {/* HORIZONTAL LANDSCAPE THUMBNAIL FILMSTRIP */}
      <div
        className="photo-filmstrip"
        aria-label="Photo thumbnails strip"
      >
        {photos.map((item, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={`${item.image}-${idx}`}
              ref={isActive ? activeThumbRef : null}
              type="button"
              className={isActive ? 'is-active' : ''}
              onClick={() => onSelectIndex(idx)}
              aria-label={`View photo ${idx + 1}: ${item.title}`}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
