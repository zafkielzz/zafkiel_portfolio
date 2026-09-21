import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { POSTS, SITE_METADATA } from '../data/siteData';
import { ScrambleText } from '../components/ScrambleText';

type Atmosphere = 'morning' | 'afternoon' | 'night';
type Language = 'en' | 'vi';

const ATMOSPHERES: { id: Atmosphere; label: string; title: string }[] = [
  { id: 'morning', label: 'DAWN', title: 'Morning light' },
  { id: 'afternoon', label: 'DAY', title: 'Afternoon glow' },
  { id: 'night', label: 'NIGHT', title: 'After hours' }
];

export const HomePage: React.FC = () => {
  const [atmosphere, setAtmosphere] = useState<Atmosphere>('morning');
  const [lang, setLang] = useState<Language>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const cafeLightRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Load atmosphere from local storage
  useEffect(() => {
    const saved = localStorage.getItem('cafe-mood') as Atmosphere;
    if (saved && ['morning', 'afternoon', 'night'].includes(saved)) {
      setAtmosphere(saved);
    }
  }, []);

  // Atmospheric cursor light follow
  useEffect(() => {
    const el = cafeLightRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let animFrame: number;
    const handleMove = (e: PointerEvent) => {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(() => {
        el.style.setProperty('--light-x', `${((e.clientX / window.innerWidth) * 100).toFixed(1)}%`);
        el.style.setProperty('--light-y', `${((e.clientY / window.innerHeight) * 100).toFixed(1)}%`);
      });
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('pointermove', handleMove);
    };
  }, []);

  const changeAtmosphere = (mood: Atmosphere) => {
    setAtmosphere(mood);
    localStorage.setItem('cafe-mood', mood);
  };

  // Tags list
  const allTags = useMemo(() => {
    return Array.from(new Set(POSTS.flatMap((p) => p.tags || [])));
  }, []);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return POSTS.filter((p) => {
      const matchTag = selectedTag === 'all' || p.tags.includes(selectedTag);
      const text = `${p.title} ${p.summary} ${p.tags.join(' ')}`.toLowerCase();
      const matchQuery = !q || text.includes(q);
      return matchTag && matchQuery;
    });
  }, [searchQuery, selectedTag]);

  // Group by year
  const postsByYear = useMemo(() => {
    return filteredPosts.reduce((acc, post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!acc[year]) acc[year] = [];
      acc[year].push(post);
      return acc;
    }, {} as Record<string, typeof POSTS>);
  }, [filteredPosts]);

  const featuredPost = POSTS[0];

  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * POSTS.length);
    navigate(`/posts/${POSTS[randomIndex].slug}`);
  };

  const totalReadingMinutes = POSTS.reduce((acc, p) => acc + p.readingTime, 0);

  // Generate deterministic heatmap data (12 weeks x 7 days or 12x4 blocks)
  const heatmapLevels = useMemo(() => {
    return [
      [1, 2, 0, 3, 1, 4, 2, 0, 1, 3, 2, 4],
      [2, 0, 3, 1, 2, 0, 3, 4, 2, 1, 3, 2],
      [0, 3, 1, 2, 4, 1, 2, 3, 0, 2, 4, 3],
      [3, 1, 4, 0, 2, 3, 1, 2, 4, 3, 1, 2]
    ];
  }, []);

  return (
    <main id="index">
      {/* HERO SECTION */}
      <section className="hero hero-photo">
        <img
          alt="Barista and creative studio workspace bathed in warm morning light"
          className="hero-photo-image"
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          }}
          src="/images/studio-cafe.jpg"
        />

        <div
          ref={cafeLightRef}
          className={`cafe-light mood-${atmosphere}`}
          aria-hidden="true"
        />

        <div className="cafe-moods" aria-label="Atmosphere">
          <span>ATMOSPHERE</span>
          <div>
            {ATMOSPHERES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={atmosphere === item.id ? 'active' : ''}
                onClick={() => changeAtmosphere(item.id)}
                title={item.title}
                aria-pressed={atmosphere === item.id}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <a
          className="hero-scroll"
          href="#articles"
          onClick={(e) => {
            e.preventDefault();
            window.history.replaceState(null, '', '/#articles');
            document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>SCROLL TO EXPLORE</span>
          <i aria-hidden="true" />
        </a>

        <div className="hero-copy">
          <p className="eyebrow">
            <i /> {SITE_METADATA.eyebrow}
          </p>

          <div className="language-switcher" aria-label="Language">
            <button
              type="button"
              className={lang === 'en' ? 'active' : ''}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <button
              type="button"
              className={lang === 'vi' ? 'active' : ''}
              onClick={() => setLang('vi')}
            >
              VI
            </button>
          </div>

          <div className="localized-copy" lang={lang}>
            <h1 className="localized-title">
              {lang === 'en' ? (
                <>
                  Multimodal AI,<br />
                  systems &amp; research at<br />
                  <em>FPT University.</em>
                </>
              ) : (
                <>
                  Trí tuệ nhân tạo,<br />
                  hệ thống &amp; nghiên cứu<br />
                  tại <em>Đại học FPT.</em>
                </>
              )}
            </h1>

            <div className="intro">
              <p>
                {lang === 'en' ? (
                  <>
                    Hello, I’m <strong>Đặng Phương Nam</strong> — a final-year Artificial Intelligence student at <strong>FPT University</strong>. My work spans multimodal deep learning, autonomous multi-agent systems, and production AI engineering. Author of a peer-reviewed scientific journal publication.
                  </>
                ) : (
                  <>
                    Xin chào, tôi là <strong>Đặng Phương Nam</strong> — sinh viên năm cuối chuyên ngành Trí tuệ Nhân tạo tại <strong>Đại học FPT</strong>. Nghiên cứu của tôi tập trung vào Deep Learning đa phương thức, hệ thống Multi-Agent tự trị và kỹ thuật AI thực chiến. Tác giả công bố khoa học tại tạp chí chuyên ngành.
                  </>
                )}
              </p>
              <p>
                {lang === 'en' ? (
                  <>
                    Each note deconstructs complex machine learning architectures, journal research findings, and agentic workflows through <strong>playgrounds, visualizations</strong> and clear architectural breakdowns.
                  </>
                ) : (
                  <>
                    Mỗi ghi chép đều đơn giản hóa các kiến trúc học máy phức tạp, phương pháp nghiên cứu và hệ thống tác tử thông qua <strong>playgrounds, visualizations trực quan</strong> và các bài phân tích kiến trúc chi tiết.
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="hero-actions">
            <Link
              to="/work"
              className="random-note"
              style={{
                textDecoration: 'none',
                color: 'var(--text)'
              }}
            >
              <i>✦</i> {lang === 'en' ? 'EXPLORE PROJECTS' : 'KHÁM PHÁ DỰ ÁN'} <span>→</span>
            </Link>
            <a
              href="/cv.pdf"
              target="_blank"
              download="Dang_Phuong_Nam_CV.pdf"
              className="random-note"
              style={{
                textDecoration: 'none',
                background: 'rgba(230, 155, 75, 0.16)',
                borderColor: 'var(--accent)',
                color: 'var(--text)'
              }}
              title="Download Curriculum Vitae (PDF)"
            >
              <i>📄</i> {lang === 'en' ? 'DOWNLOAD CV / RESUME' : 'TẢI CV / RESUME'} <span>↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED NOTE / PUBLICATION */}
      {featuredPost && (
        <section className="featured-note">
          <div className="featured-art" aria-hidden="true">
            <span className="sun" />
            <i />
            <i />
            <i />
          </div>
          <article>
            <p className="eyebrow">
              <i /> PEER-REVIEWED SCIENTIFIC JOURNAL PUBLICATION
            </p>
            <span className="featured-meta">
              AUGUST 2026 · JOURNAL ARTICLE · MULTIMODAL AI
            </span>
            <h2>{lang === 'en' ? 'Scientific Journal Publication: Multimodal AI' : 'Công Bố Khoa Học: Deep Learning Đa Phương Thức'}</h2>
            <p>
              {lang === 'en'
                ? 'Peer-reviewed research paper accepted in international journal. Novel Adaptive Sparse Cross-Attention architecture achieving 38% latency reduction on edge TPUs with negligible perceptual fidelity loss.'
                : 'Công trình nghiên cứu khoa học được xuất bản chính thức trên tạp chí chuyên ngành. Đề xuất cơ chế Sparse Cross-Attention đột phá giúp giảm 38% độ trễ suy luận trên chip biên TPU với độ chính xác bảo toàn.'}
            </p>
            <Link to="/work/journal-publication">
              {lang === 'en' ? 'VIEW FULL RESEARCH PAPER STUDY' : 'XEM CHI TIẾT CÔNG BỐ KHOA HỌC'} <b>→</b>
            </Link>
          </article>
        </section>
      )}

      {/* WRITING / ACTIVITY PULSE */}
      <section className="writing-stats">
        <div className="label">
          <span>AI RESEARCH &amp; WRITING PULSE</span>
          <span>ARCHIVE AT A GLANCE</span>
        </div>
        <div className="stat-row">
          <div>
            <b>{POSTS.length}</b>
            <span>NOTES PUBLISHED</span>
          </div>
          <div>
            <b>{allTags.length}</b>
            <span>TOPICS EXPLORED</span>
          </div>
          <div>
            <b>{totalReadingMinutes}</b>
            <span>MINUTES TO READ</span>
          </div>
        </div>

        {/* Contribution Heatmap */}
        <div className="heatmap" aria-label="Activity heatmap">
          {heatmapLevels.flat().map((lvl, idx) => (
            <i
              key={idx}
              className={`level-${lvl}`}
              title={`Activity block ${idx + 1}: Level ${lvl}`}
            />
          ))}
        </div>
      </section>

      {/* ARTICLES SHELF */}
      <section id="articles" className="articles reading-index">
        <div className="label">
          <span>SELECTED NOTES</span>
          <span>({String(filteredPosts.length).padStart(2, '0')})</span>
        </div>

        <div className="index-tools">
          <label>
            <span>SEARCH THE SHELF</span>
            <input
              placeholder="Title, model, idea, or topic…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedTag('all');
            }}
          >
            RESET
          </button>
        </div>

        <div className="topic-bar" aria-label="Filter articles">
          <button
            type="button"
            className={selectedTag === 'all' ? 'active' : ''}
            onClick={() => setSelectedTag('all')}
          >
            ALL
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={selectedTag === tag ? 'active' : ''}
              onClick={() => setSelectedTag(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>

        {Object.keys(postsByYear)
          .sort((a, b) => Number(b) - Number(a))
          .map((year) => (
            <div key={year} className="year">
              <b>{year}</b>
              <div>
                {postsByYear[year].map((post) => {
                  const dateStr = new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit'
                  }).toUpperCase();

                  return (
                    <Link key={post.slug} className="post" to={`/posts/${post.slug}`}>
                      <span>
                        <span>
                          <ScrambleText>{post.title}</ScrambleText>
                        </span>
                        <small>{post.summary}</small>
                      </span>
                      <time>
                        {dateStr}
                        <em>{post.readingTime} MIN</em>
                      </time>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
      </section>

      {/* COLLECTIONS */}
      <section className="collections" aria-labelledby="collections-title">
        <div className="collections-head">
          <span>EXPLORE THE ARCHIVE</span>
          <h2 id="collections-title">
            More than <em>notes.</em>
          </h2>
          <p>Ideas become engineering projects, research findings, and collaborations.</p>
        </div>

        <div className="collections-list">
          <Link className="collection-card projects" to="/work">
            <img
              alt="Projects showcase card"
              loading="lazy"
              decoding="async"
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                objectPosition: '52% center'
              }}
              src="/images/collection-projects.jpg"
            />
            <div>
              <span>01 / PROJECTS</span>
              <h3>Things made with intention.</h3>
              <p>AI agent architectures, machine learning models, and interactive web experiments.</p>
              <b>EXPLORE PROJECTS →</b>
            </div>
          </Link>

          <Link className="collection-card photos" to="/photos">
            <img
              alt="Photography and visual study"
              loading="lazy"
              decoding="async"
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                objectPosition: '63% center'
              }}
              src="/images/studio-cafe.jpg"
            />
            <div>
              <span>02 / PHOTOGRAPHY &amp; STUDIES</span>
              <h3>Light, places, quiet moments.</h3>
              <p>A visual journal of atmospheres, HUD interface studies, and design references.</p>
              <b>VIEW PHOTO JOURNAL →</b>
            </div>
          </Link>

          <Link className="collection-card partners" to="/partners">
            <img
              alt="Partners and collaborative projects"
              loading="lazy"
              decoding="async"
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                objectPosition: '50% center'
              }}
              src="/images/collection-partners.jpg"
            />
            <div>
              <span>03 / PARTNERS</span>
              <h3>Better things, together.</h3>
              <p>Collaborations with labs, creative studios, and engineering teams.</p>
              <b>WORK TOGETHER →</b>
            </div>
          </Link>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about">
        <span>ABOUT / 01</span>
        <div>
          <h2>
            A quiet corner for <em>AI engineering, research notes, systems</em> and the ideas I build with intention.
          </h2>
          <p>
            <Link to="/photos">PHOTO JOURNAL ↗</Link>
            <Link to="/contact">LET’S CONNECT ↗</Link>
          </p>
        </div>
      </section>
    </main>
  );
};
