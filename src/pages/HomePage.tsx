import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { POSTS, SITE_METADATA } from '../data/siteData';
import { ScrambleText } from '../components/ScrambleText';
import { GitHubPulse } from '../components/GitHubPulse';

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
  const [isRevealed, setIsRevealed] = useState(false);

  // Controlled game-style entrance reveal
  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.classList.contains('boot-finished') ||
      window.sessionStorage.getItem('midnightbarista-booted')
    ) {
      const timer = setTimeout(() => setIsRevealed(true), 60);
      return () => clearTimeout(timer);
    }

    const onBootDone = () => setIsRevealed(true);
    window.addEventListener('boot-sequence-finished', onBootDone);
    const fallback = setTimeout(() => setIsRevealed(true), 1500);

    return () => {
      window.removeEventListener('boot-sequence-finished', onBootDone);
      clearTimeout(fallback);
    };
  }, []);

  // Load atmosphere from local storage
  useEffect(() => {
    const saved = localStorage.getItem('cafe-mood') as Atmosphere;
    const initial = saved && ['morning', 'afternoon', 'night'].includes(saved) ? saved : 'morning';
    setAtmosphere(initial);
    document.documentElement.setAttribute('data-atmosphere', initial);
  }, []);

  // Atmospheric cursor light follow & hero boundary detection
  useEffect(() => {
    const el = cafeLightRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let animFrame: number;
    const heroEl = el.closest('.hero') as HTMLElement | null;

    const updateLight = (e?: PointerEvent) => {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(() => {
        if (!heroEl) return;
        const rect = heroEl.getBoundingClientRect();

        // If hero is scrolled completely off the screen, hide hero light
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
          el.style.setProperty('--light-opacity', '0');
          document.body.classList.remove('in-hero');
          return;
        }

        if (e) {
          const isInside =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;

          if (isInside) {
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            el.style.setProperty('--light-x', `${x.toFixed(1)}%`);
            el.style.setProperty('--light-y', `${y.toFixed(1)}%`);
            el.style.setProperty('--light-opacity', '1');
            document.body.classList.add('in-hero');
          } else {
            // Pointer is OUTSIDE the hero (e.g. scrolled down to articles or hovering nav)
            el.style.setProperty('--light-opacity', '0');
            document.body.classList.remove('in-hero');
          }
        } else {
          // Triggered on scroll
          if (rect.bottom <= 60) {
            el.style.setProperty('--light-opacity', '0');
            document.body.classList.remove('in-hero');
          }
        }
      });
    };

    const handlePointerMove = (e: PointerEvent) => updateLight(e);
    const handleScroll = () => updateLight();
    const handleMouseLeave = () => {
      el.style.setProperty('--light-opacity', '0');
      document.body.classList.remove('in-hero');
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.classList.remove('in-hero');
    };
  }, []);

  const changeAtmosphere = (mood: Atmosphere) => {
    setAtmosphere(mood);
    localStorage.setItem('cafe-mood', mood);
    document.documentElement.setAttribute('data-atmosphere', mood);
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

  return (
    <main id="index">
      {/* HERO SECTION */}
      <section className={`hero hero-photo mood-${atmosphere}`} data-atmosphere={atmosphere}>
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

        <div className={`cafe-moods ${isRevealed ? 'hero-game-revealed' : 'hero-game-hidden'}`} aria-label="Atmosphere">
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
          className={`hero-scroll ${isRevealed ? 'hero-game-revealed' : 'hero-game-hidden'}`}
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

        <div className={`hero-copy ${isRevealed ? 'hero-game-revealed' : 'hero-game-hidden'}`}>
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
                    Hello, I’m <strong>Đặng Phương Nam</strong> — widely known online as <strong>Zafkiel</strong> (an alias inspired by the Emperor of Time in <em>Date A Live</em>). I’m a final-year Artificial Intelligence student at <strong>FPT University</strong>. Through coursework and research, I’ve worked closely with <strong>Edge Devices</strong>, <strong>Agentic AI workflows</strong>, and architecture optimization. Lately, I’m particularly intrigued by human-centric domains like <strong>Emotional AI</strong>, alongside researching <strong>Multimodal Transformers for financial market forecasting</strong> (my graduation Capstone project).
                  </>
                ) : (
                  <>
                    Xin chào, tôi là <strong>Đặng Phương Nam</strong> — hay còn được biết đến trên không gian số với biệt danh <strong>Zafkiel</strong> (bắt nguồn từ thiên sứ thời gian trong <em>Date A Live</em>). Tôi là sinh viên năm cuối ngành Trí tuệ Nhân tạo tại <strong>Đại học FPT</strong>. Trong quá trình học tập và nghiên cứu, tôi đã có dịp làm quen với các chủ đề như <strong>Edge Devices</strong>, <strong>Agentic AI</strong> và tối ưu kiến trúc mô hình. Thời gian gần đây, tôi đặc biệt hứng thú với những hướng đi mới mẻ giàu tính tương tác như <strong>Emotional AI</strong> (Trí tuệ nhân tạo cảm xúc), cũng như ứng dụng <strong>Multimodal Transformers cho thị trường chứng khoán</strong> (dự án Capstone tốt nghiệp).
                  </>
                )}
              </p>
              <p>
                {lang === 'en' ? (
                  <>
                    Away from the terminal, I’m an avid <strong>anime fan and gamer</strong>. I also hit the <strong>gym</strong> regularly to maintain self-discipline — and as an honest way to <em>"touch grass"</em> after long stretches in front of the screen. This website is my personal corner for archiving engineering prototypes, thoughts, and technical notes.
                  </>
                ) : (
                  <>
                    Rời khỏi màn hình máy tính, sở thích của tôi là xem <strong>anime</strong> và <strong>chơi game</strong>. Tôi cũng duy trì việc <strong>tập gym</strong> đều đặn để rèn luyện tính kỷ luật — và xem đó như một cách hiệu quả để <em>"chạm cỏ"</em> sau những giờ dài làm việc với code và dữ liệu. Đây là không gian nhỏ nơi tôi lưu trữ các thử nghiệm kỹ thuật và chia sẻ lại những điều mình học được.
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
              <i /> ACCEPTED &amp; PRESENTED AT IEEE IS'26 CONFERENCE
            </p>
            <span className="featured-meta">
              IEEE IS'26 · FIRST AUTHOR (TÁC GIẢ CHÍNH) · CONFLICT-AWARE RAG ROUTING
            </span>
            <h2>
              {lang === 'en'
                ? 'Conflict-Aware RAG Routing: Balancing Cost and Accuracy via Context Contradiction'
                : 'Điều Phối RAG Nhận Thức Xung Đột: Cân Bằng Chi Phí & Độ Chính Xác (IEEE IS\'26)'}
            </h2>
            <p>
              {lang === 'en'
                ? 'Research paper accepted and presented at IEEE IS\'26: The 13th IEEE International Conference on Intelligent Systems (First Author: Dang Phuong Nam). Evaluated across 3,000 multi-hop questions (MuSiQue, HotpotQA, 2Wiki), the hybrid router saves ~35% of API calls while retaining 83.2%–92.2% of Always-LLM F1, and recovers up to +14.35 F1 in high-RRF/high-conflict regimes.'
                : 'Công trình nghiên cứu khoa học được chấp thuận và trình bày tại IEEE IS\'26 (Đặng Phương Nam - Tác giả chính). Đánh giá trên 3,000 câu hỏi multi-hop (MuSiQue, HotpotQA, 2Wiki), bộ định tuyến hybrid tiết kiệm ~35% chi phí gọi API trong khi giữ lại 83.2%–92.2% F1 của Always-LLM, đặc biệt tăng tới +14.35 F1 trong vùng dữ liệu RRF cao nhưng mâu thuẫn cao.'}
            </p>
            <Link to="/work/conflict-aware-rag-routing">
              {lang === 'en' ? 'VIEW FULL IEEE IS\'26 RESEARCH CASE STUDY' : 'XEM CHI TIẾT CÔNG BỐ KHOA HỌC IEEE IS\'26'} <b>→</b>
            </Link>
          </article>
        </section>
      )}

      {/* SECONDARY SCIENTIFIC HIGHLIGHT: ICITDA 2026 QUANT RESEARCH */}
      <section
        className="icitda-highlight-section"
        style={{
          maxWidth: '1000px',
          margin: '24px auto 0',
          padding: '0 24px'
        }}
        aria-label="ICITDA 2026 Quantitative Finance Research"
      >
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(20, 32, 25, 0.85), rgba(14, 22, 18, 0.95))',
            border: '1px solid rgba(74, 222, 128, 0.32)',
            borderRadius: '14px',
            padding: '28px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '160px',
              height: '160px',
              background: 'radial-gradient(circle at 100% 0%, rgba(74, 222, 128, 0.14), transparent 70%)',
              pointerEvents: 'none'
            }}
          />
          <div style={{ flex: '1 1 520px', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
              <span
                style={{
                  background: 'rgba(74, 222, 128, 0.16)',
                  color: '#86efac',
                  border: '1px solid rgba(74, 222, 128, 0.45)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  font: '600 10px var(--mono)',
                  letterSpacing: '0.06em'
                }}
              >
                ICITDA 2026 ACCEPTED
              </span>
              <span style={{ color: '#6ee7b7', font: '10px var(--mono)', letterSpacing: '0.05em' }}>
                CO-AUTHOR · QUANTITATIVE ML &amp; FINANCE (ARCHIVE MANUSCRIPT)
              </span>
            </div>
            <h3
              style={{
                margin: '0 0 10px',
                font: '400 clamp(19px, 2.2vw, 25px) Georgia, serif',
                color: '#f0fdf4',
                lineHeight: 1.25
              }}
            >
              {lang === 'en'
                ? 'Probabilistic Modeling of Stock Breakout Success in the Vietnamese Equity Market'
                : 'Mô Hình Hóa Xác Suất Breakout Thành Công Trên TTCK Việt Nam (ICITDA 2026)'}
            </h3>
            <p style={{ margin: 0, color: '#a7f3d0', fontSize: '13px', lineHeight: 1.65, opacity: 0.9 }}>
              {lang === 'en'
                ? 'Co-authored research paper accepted at ICITDA 2026. Modeling consolidation breakouts with LightGBM and Minervini SEPA / VCP features on 255 liquid equities (HOSE/HNX, 2010–2026) under strict causal constraints. Achieved Precision@10 = 90.0% and 72.5% win rate at P > 0.8 on out-of-sample test data.'
                : 'Công trình nghiên cứu khoa học đồng tác giả được chấp thuận tại ICITDA 2026. Ứng dụng LightGBM kết hợp bộ đặc trưng SEPA / VCP nén biến động trên 255 cổ phiếu vốn hóa lớn VNINDEX (2010–2026), đạt Precision@10 = 90.0% và Win Rate 72.5% tại ngưỡng xác suất P > 0.8 trên tập out-of-sample.'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <Link
              to="/work/probabilistic-stock-breakout-vietnam"
              className="project-action-btn primary"
              style={{ fontSize: '11px', padding: '9px 15px' }}
            >
              {lang === 'en' ? 'CASE STUDY →' : 'XEM CASE STUDY →'}
            </Link>
            <Link
              to="/posts/probabilistic-stock-breakout-vietnam"
              className="project-action-btn secondary"
              style={{ fontSize: '11px', padding: '9px 15px' }}
            >
              {lang === 'en' ? 'READ NOTE →' : 'ĐỌC BÀI VIẾT →'}
            </Link>
            <a
              href="/icitda_2026_stock_breakout.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-btn secondary"
              style={{ fontSize: '11px', padding: '9px 15px' }}
            >
              PDF <span>↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* GITHUB ACTIVITY & RESEARCH PULSE */}
      <GitHubPulse
        postsCount={POSTS.length}
        topicsCount={allTags.length}
        lang={lang}
      />

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
              <p>Adaptive RAG routing, quantitative equity breakouts, multimodal SLMs, and Edge AI.</p>
              <b>EXPLORE PROJECTS →</b>
            </div>
          </Link>

          <Link className="collection-card photos" to="/education">
            <img
              alt="Education and research credentials"
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
              <span>02 / EDUCATION &amp; CERTS</span>
              <h3>Formal study &amp; publications.</h3>
              <p>FPT University AI major, IEEE IS'26 (First Author) &amp; ICITDA 2026 conference research, and verified credentials.</p>
              <b>VIEW ACADEMIC RECORD →</b>
            </div>
          </Link>

          <Link className="collection-card partners" to="/skills">
            <img
              alt="Technical stack and infrastructure"
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
              <span>03 / TECHNICAL STACK</span>
              <h3>Algorithms, models &amp; hardware.</h3>
              <p>PyTorch, LLM routing pipelines, cross-encoders, and GPU/edge compute runtimes.</p>
              <b>EXPLORE TECH STACK →</b>
            </div>
          </Link>
        </div>
      </section>

      {/* CAMPFIRE RESEARCH & COLLABORATION SPOTLIGHT */}
      <section className="partner-intro" aria-label="Collaboration and research partnerships">
        <div className="partner-intro-aside">
          <span>{lang === 'en' ? 'OPEN TO SELECT COLLABORATIONS' : 'MỞ RỘNG HỢP TÁC & NGHIÊN CỨU'}</span>
          <div className="fire-gif-frame">
            <img
              src="/images/collaboration-fire.gif"
              alt="Animated pixel-art fireplace Calcifer"
              width={180}
              height={180}
              loading="lazy"
            />
            <span className="fire-glow" aria-hidden="true" />
          </div>
        </div>
        <div className="partner-intro-copy">
          <p className="eyebrow">
            <i /> {lang === 'en' ? 'COLLABORATION & OPEN IDEAS' : 'HỢP TÁC & Ý TƯỞNG CỞI MỞ'}
          </p>
          <h2>
            {lang === 'en' ? (
              <>
                For research labs, studios &amp; teams with a <em>story worth shaping.</em>
              </>
            ) : (
              <>
                Dành cho các phòng lab, studio &amp; đội ngũ cùng <em>kiến tạo giá trị mới.</em>
              </>
            )}
          </h2>
          <p>
            {lang === 'en'
              ? 'From multimodal deep learning architectures and adaptive RAG routing to Edge AI deployment and creative interactive systems—every meaningful breakthrough starts with a thoughtful conversation by the hearth.'
              : 'Từ kiến trúc Deep Learning đa phương thức, định tuyến RAG thích ứng đến tối ưu hóa Edge AI và hệ thống tương tác—mọi công trình đột phá đều bắt đầu từ một buổi trò chuyện cởi mở bên ánh lửa.'}
          </p>
          <div className="partner-actions">
            <Link to="/contact" className="partner-btn primary">
              {lang === 'en' ? 'START A CONVERSATION →' : 'KẾT NỐI NGAY →'}
            </Link>
            <a
              href="mailto:phuongnam060204@gmail.com"
              className="partner-btn secondary"
            >
              phuongnam060204@gmail.com ↗
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              download="Dang_Phuong_Nam_CV.pdf"
              className="partner-btn secondary"
            >
              {lang === 'en' ? 'DOWNLOAD CV ↓' : 'TẢI CV (PDF) ↓'}
            </a>
          </div>
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
            <Link to="/education">ACADEMIC RECORD ↗</Link>
            <Link to="/skills">TECH STACK ↗</Link>
            <Link to="/contact">LET’S CONNECT ↗</Link>
          </p>
        </div>
      </section>
    </main>
  );
};
