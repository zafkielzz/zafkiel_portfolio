import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SHEETS, PhotoItem } from '../data/siteData';
import { PhotoLightbox } from '../components/PhotoLightbox';

export const PhotosPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const allPhotos: PhotoItem[] = SHEETS.flatMap((s) => s.images || []);

  const handleOpenPhoto = (item: PhotoItem) => {
    const idx = allPhotos.findIndex((p) => p.image === item.image);
    setActiveIndex(idx >= 0 ? idx : 0);
  };

  return (
    <main className="photos-page">
      <section className="page-section-hero photos-page-hero">
        <img
          alt="A quiet train carriage at sunset"
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            color: 'transparent'
          }}
          src="/images/hero-photos.png"
        />
        <span className="page-section-hero-shade" />
        <div className="page-section-hero-content">
          <Link className="back" to="/">
            ← INDEX
          </Link>
          <p className="eyebrow">VISUAL JOURNAL &amp; INTERFACE ARCHIVE</p>
          <h1>
            Light, places, and <em>quiet moments.</em>
          </h1>
          <p className="photos-lede">
            A visual journal of atmosphere, spatial typography, game HUDs, and moments worth remembering.
          </p>
        </div>
      </section>

      <section className="photo-feature">
        <img
          alt="A quiet café filled with stained-glass light"
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            color: 'transparent'
          }}
          src="/images/studio-cafe.jpg"
        />
        <div>
          <span>STUDIO ATMOSPHERE</span>
          <h2>Where thought slows down and ideas take shape.</h2>
        </div>
      </section>

      <section className="photo-notes">
        <article>
          <span>01 / LIGHT</span>
          <h2>Before the room wakes</h2>
          <p>A small study in filtered glass, chrome, and the first warmth of the morning counter.</p>
        </article>
        <article>
          <span>02 / INTERFACE</span>
          <h2>HUDs &amp; Tactile Signals</h2>
          <p>How density, typography, and muted tones convey complex states in game interfaces.</p>
        </article>
        <article>
          <span>03 / PRACTICE</span>
          <h2>Return to the same light</h2>
          <p>A living archive built from quiet repetitions, code experiments, and familiar surfaces.</p>
        </article>
      </section>

      {SHEETS.map((sheet) => (
        <section key={sheet.slug} className="created-sheet">
          <div className="contact-sheet-head">
            <span>
              CONTACT SHEET / {String(sheet.number).padStart(3, '0')} · {String(sheet.images?.length || 0).padStart(2, '0')} FRAMES · CLICK TO VIEW
            </span>
            <p>{sheet.description}</p>
          </div>
          <div className="created-sheet-grid">
            {sheet.images?.map((item, idx) => (
              <button
                key={item.image}
                type="button"
                onClick={() => handleOpenPhoto(item)}
                aria-label={`Open ${item.title}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: item.position || 'center' }}
                />
                <span>
                  <i>{String(idx + 1).padStart(2, '0')}</i>
                  <b>{item.title}</b>
                </span>
              </button>
            ))}
          </div>
        </section>
      ))}

      {activeIndex !== null && (
        <PhotoLightbox
          photos={allPhotos}
          currentIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onSelectIndex={(idx) => setActiveIndex(idx)}
        />
      )}
    </main>
  );
};
