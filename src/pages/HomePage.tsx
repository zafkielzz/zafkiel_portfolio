import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { POSTS, SITE_METADATA } from '../data/siteData';
import { ScrambleText } from '../components/ScrambleText';
import { GitHubPulse } from '../components/GitHubPulse';
import { useLang, Language, Localized } from '../i18n';

type Atmosphere = 'morning' | 'afternoon' | 'night';

const ATMOSPHERES: { id: Atmosphere; label: Localized; title: Localized }[] = [
  { id: 'morning', label: { en: 'DAWN', vi: 'SÁNG' }, title: { en: 'Morning light', vi: 'Ánh sáng ban mai' } },
  { id: 'afternoon', label: { en: 'DAY', vi: 'CHIỀU' }, title: { en: 'Afternoon glow', vi: 'Nắng chiều' } },
  { id: 'night', label: { en: 'NIGHT', vi: 'ĐÊM' }, title: { en: 'After hours', vi: 'Đêm muộn' } }
];

export const HomePage: React.FC = () => {
  const [atmosphere, setAtmosphere] = useState<Atmosphere>('morning');
  const { lang, setLang, t } = useLang();
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
      window.sessionStorage.getItem('zafkiel-portfolio-booted')
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

  // Handle URL tag parameter (e.g. from PostDetailPage tags)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tagParam = params.get('tag');
    if (tagParam) {
      setSelectedTag(tagParam);
      setTimeout(() => {
        document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
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
      const text = `${t(p.title)} ${t(p.summary)} ${p.tags.join(' ')}`.toLowerCase();
      const matchQuery = !q || text.includes(q);
      return matchTag && matchQuery;
    });
  }, [searchQuery, selectedTag, t]);

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
          alt={t({ en: 'Late-night study corner by a rainy Hanoi window', vi: 'Góc học tập đêm khuya bên khung cửa sổ mưa Hà Nội' })}
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
          src="/images/hero-home.webp"
        />

        <div
          ref={cafeLightRef}
          className={`cafe-light mood-${atmosphere}`}
          aria-hidden="true"
        />

        <div className={`cafe-moods ${isRevealed ? 'hero-game-revealed' : 'hero-game-hidden'}`} aria-label={t({ en: 'Atmosphere', vi: 'Không khí' })}>
          <span>{t({ en: 'ATMOSPHERE', vi: 'KHÔNG KHÍ' })}</span>
          <div>
            {ATMOSPHERES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={atmosphere === item.id ? 'active' : ''}
                onClick={() => changeAtmosphere(item.id)}
                title={t(item.title)}
                aria-pressed={atmosphere === item.id}
              >
                {t(item.label)}
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
          <span>{t({ en: 'SCROLL TO EXPLORE', vi: 'CUỘN ĐỂ KHÁM PHÁ' })}</span>
          <i aria-hidden="true" />
        </a>

        <div className={`hero-copy ${isRevealed ? 'hero-game-revealed' : 'hero-game-hidden'}`}>
          <p className="eyebrow">
            <i /> {SITE_METADATA.eyebrow}
          </p>

          <div className="language-switcher" aria-label={t({ en: 'Language', vi: 'Ngôn ngữ' })}>
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

          {/* Both languages share one grid cell so the hero height never changes on toggle */}
          <div className="localized-stack">
            {(['en', 'vi'] as Language[]).map((l) => (
              <div
                key={l}
                className="localized-copy"
                lang={l}
                aria-hidden={l !== lang}
              >
                <h1 className="localized-title">
                  {l === 'en' ? (
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
                    {l === 'en' ? (
                      <>
                        Hello, I’m <strong>Đặng Phương Nam</strong> — known online as <strong>Zafkiel</strong>. I’m a final-year <strong>Artificial Intelligence</strong> student at <strong>FPT University</strong> and <strong>first author of an IEEE IS'26 paper</strong> on cost-aware RAG routing.
                      </>
                    ) : (
                      <>
                        Xin chào, tôi là <strong>Đặng Phương Nam</strong> — biệt danh <strong>Zafkiel</strong>. Tôi là sinh viên năm cuối ngành <strong>Trí tuệ Nhân tạo</strong> tại <strong>Đại học FPT</strong> và là <strong>tác giả chính của bài báo tại IEEE IS'26</strong> về định tuyến RAG tối ưu chi phí.
                      </>
                    )}
                  </p>
                  <p>
                    {l === 'en' ? (
                      <>
                        I build <strong>LLM &amp; RAG systems</strong>, <strong>on-device computer vision</strong> and <strong>constrained LLM decoding</strong>, and I’m open to <strong>AI engineering &amp; research roles</strong>.
                      </>
                    ) : (
                      <>
                        Tôi xây dựng <strong>hệ thống LLM &amp; RAG</strong>, <strong>thị giác máy tính trên thiết bị</strong> và <strong>sinh văn bản có ràng buộc</strong>, và đang tìm kiếm cơ hội ở vị trí <strong>AI Engineer &amp; nghiên cứu</strong>.
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
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
              <i /> {t({ en: "ACCEPTED & PRESENTED AT IEEE IS'26 CONFERENCE", vi: "ĐƯỢC CHẤP NHẬN & TRÌNH BÀY TẠI HỘI NGHỊ IEEE IS'26" })}
            </p>
            <span className="featured-meta">
              {t({ en: "IEEE IS'26 · FIRST AUTHOR · CONFLICT-AWARE RAG ROUTING", vi: "IEEE IS'26 · TÁC GIẢ CHÍNH · CONFLICT-AWARE RAG ROUTING" })}
            </span>
            <h2>
              Conflict-Aware RAG Routing: Balancing Cost and Accuracy via Context Contradiction
            </h2>
            <p>
              {lang === 'en'
                ? 'First-author paper accepted and presented at IEEE IS\'26: The 13th IEEE International Conference on Intelligent Systems. Evaluated across 3,000 multi-hop questions (MuSiQue, HotpotQA, 2Wiki), the hybrid router saves ~35% of API calls while retaining 83.2%–92.2% of Always-LLM F1, and recovers up to +14.35 F1 in high-RRF/high-conflict regimes.'
                : 'Bài báo khoa học (tác giả chính) được chấp nhận và trình bày tại IEEE IS\'26: The 13th IEEE International Conference on Intelligent Systems. Đánh giá trên 3,000 câu hỏi multi-hop (MuSiQue, HotpotQA, 2Wiki), bộ định tuyến hybrid tiết kiệm ~35% chi phí gọi API trong khi giữ lại 83.2%–92.2% F1 của Always-LLM, đặc biệt tăng tới +14.35 F1 trong vùng dữ liệu RRF cao nhưng mâu thuẫn cao.'}
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
        aria-label={t({ en: 'ICITDA 2026 quantitative finance research', vi: 'Nghiên cứu tài chính định lượng ICITDA 2026' })}
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
                {t({ en: 'ICITDA 2026 ACCEPTED', vi: 'ICITDA 2026 · ĐÃ CHẤP NHẬN' })}
              </span>
              <span style={{ color: '#6ee7b7', font: '10px var(--mono)', letterSpacing: '0.05em' }}>
                {t({ en: 'CO-AUTHOR · QUANTITATIVE ML & FINANCE (ARCHIVE MANUSCRIPT)', vi: 'ĐỒNG TÁC GIẢ · ML ĐỊNH LƯỢNG & TÀI CHÍNH (BẢN LƯU TRỮ)' })}
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
              Probabilistic Modeling of Stock Breakout Success in the Vietnamese Equity Market
            </h3>
            <p style={{ margin: 0, color: '#a7f3d0', fontSize: '13px', lineHeight: 1.65, opacity: 0.9 }}>
              {lang === 'en'
                ? 'Co-authored research paper accepted at ICITDA 2026. Modeling consolidation breakouts with LightGBM and Minervini SEPA / VCP features on 255 liquid equities (HOSE/HNX, 2010–2026) under strict causal constraints. Achieved Precision@10 = 90.0% and 72.5% win rate at P > 0.8 on out-of-sample test data.'
                : 'Bài báo khoa học (đồng tác giả) được chấp nhận tại ICITDA 2026. Ứng dụng LightGBM kết hợp bộ đặc trưng SEPA / VCP nén biến động trên 255 cổ phiếu vốn hóa lớn VNINDEX (2010–2026), đạt Precision@10 = 90.0% và Win Rate 72.5% tại ngưỡng xác suất P > 0.8 trên tập out-of-sample.'}
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
          <span>{t({ en: 'SELECTED NOTES', vi: 'BÀI VIẾT CHỌN LỌC' })}</span>
          <span>({String(filteredPosts.length).padStart(2, '0')})</span>
        </div>

        <div className="index-tools">
          <label>
            <span>{t({ en: 'SEARCH THE SHELF', vi: 'TÌM TRÊN KỆ' })}</span>
            <input
              placeholder={t({ en: 'Title, model, idea, or topic…', vi: 'Tiêu đề, mô hình, ý tưởng hoặc chủ đề…' })}
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
            {t({ en: 'RESET', vi: 'ĐẶT LẠI' })}
          </button>
        </div>

        <div className="topic-bar" aria-label={t({ en: 'Filter articles', vi: 'Lọc bài viết' })}>
          <button
            type="button"
            className={selectedTag === 'all' ? 'active' : ''}
            onClick={() => setSelectedTag('all')}
          >
            {t({ en: 'ALL', vi: 'TẤT CẢ' })}
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
                  const dateStr = new Date(post.date).toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', {
                    month: 'short',
                    day: '2-digit'
                  }).toUpperCase();

                  return (
                    <Link key={post.slug} className="post" to={`/posts/${post.slug}`}>
                      <span>
                        <span>
                          <ScrambleText>{t(post.title)}</ScrambleText>
                        </span>
                        <small>{t(post.summary)}</small>
                      </span>
                      <time>
                        {dateStr}
                        <em>{post.readingTime} {t({ en: 'MIN', vi: 'PHÚT' })}</em>
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
          <span>{t({ en: 'EXPLORE THE ARCHIVE', vi: 'KHÁM PHÁ KHO LƯU TRỮ' })}</span>
          <h2 id="collections-title">
            {t({ en: 'More than', vi: 'Không chỉ là' })} <em>{t({ en: 'notes.', vi: 'ghi chép.' })}</em>
          </h2>
          <p>{t({ en: 'Ideas become engineering projects, research findings, and collaborations.', vi: 'Ý tưởng trở thành dự án kỹ thuật, kết quả nghiên cứu và những lần hợp tác.' })}</p>
        </div>

        <div className="collections-list">
          <Link className="collection-card projects" to="/work">
            <img
              alt={t({ en: 'Projects showcase', vi: 'Giới thiệu dự án' })}
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
              <span>{t({ en: '01 / PROJECTS', vi: '01 / DỰ ÁN' })}</span>
              <h3>{t({ en: 'Things made with intention.', vi: 'Những sản phẩm làm bằng cả tâm huyết.' })}</h3>
              <p>{t({ en: 'Adaptive RAG routing, quantitative equity breakouts, multimodal SLMs, and Edge AI.', vi: 'Định tuyến RAG thích ứng, breakout cổ phiếu định lượng, SLM đa phương thức và Edge AI.' })}</p>
              <b>{t({ en: 'EXPLORE PROJECTS →', vi: 'XEM DỰ ÁN →' })}</b>
            </div>
          </Link>

          <Link className="collection-card photos" to="/education">
            <img
              alt={t({ en: 'Education and research credentials', vi: 'Học vấn và thành tích nghiên cứu' })}
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
              src="/images/hero-home.webp"
            />
            <div>
              <span>{t({ en: '02 / EDUCATION & CERTS', vi: '02 / HỌC VẤN & CHỨNG CHỈ' })}</span>
              <h3>{t({ en: 'Formal study & publications.', vi: 'Học tập & công bố khoa học.' })}</h3>
              <p>{t({ en: "FPT University AI major, IEEE IS'26 (first author) & ICITDA 2026 conference research, and verified credentials.", vi: "Ngành AI tại Đại học FPT, bài báo IEEE IS'26 (tác giả chính) & ICITDA 2026, cùng các chứng chỉ đã xác minh." })}</p>
              <b>{t({ en: 'VIEW ACADEMIC RECORD →', vi: 'XEM HỒ SƠ HỌC TẬP →' })}</b>
            </div>
          </Link>

          <Link className="collection-card partners" to="/skills">
            <img
              alt={t({ en: 'Technical stack and infrastructure', vi: 'Công nghệ và hạ tầng' })}
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
              <span>{t({ en: '03 / TECHNICAL STACK', vi: '03 / CÔNG NGHỆ' })}</span>
              <h3>{t({ en: 'Algorithms, models & hardware.', vi: 'Thuật toán, mô hình & phần cứng.' })}</h3>
              <p>{t({ en: 'PyTorch, LLM routing pipelines, cross-encoders, and GPU/edge compute runtimes.', vi: 'PyTorch, pipeline định tuyến LLM, cross-encoder và môi trường tính toán GPU/edge.' })}</p>
              <b>{t({ en: 'EXPLORE TECH STACK →', vi: 'XEM CÔNG NGHỆ →' })}</b>
            </div>
          </Link>
        </div>
      </section>

      {/* CAMPFIRE RESEARCH & COLLABORATION SPOTLIGHT */}
      <section className="partner-intro" aria-label={t({ en: 'Collaboration and research partnerships', vi: 'Hợp tác và nghiên cứu' })}>
        <div className="partner-intro-aside">
          <span>{lang === 'en' ? 'OPEN TO SELECT COLLABORATIONS' : 'MỞ RỘNG HỢP TÁC & NGHIÊN CỨU'}</span>
          <div className="fire-gif-frame">
            <img
              src="/images/collaboration-fire.gif"
              alt={t({ en: 'Animated pixel-art fireplace Calcifer', vi: 'Ảnh động lò lửa Calcifer phong cách pixel' })}
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
                For research labs &amp; engineering teams with <em>problems worth solving.</em>
              </>
            ) : (
              <>
                Dành cho các phòng lab &amp; đội ngũ kỹ thuật cùng <em>giải những bài toán đáng giá.</em>
              </>
            )}
          </h2>
          <p>
            {lang === 'en'
              ? 'From multimodal deep learning architectures and adaptive RAG routing to Edge AI deployment and interactive AI systems—I am open to research collaborations, internships, and full-time AI engineering roles.'
              : 'Từ kiến trúc Deep Learning đa phương thức, định tuyến RAG thích ứng đến tối ưu hóa Edge AI và hệ thống AI tương tác—tôi sẵn sàng cho các cơ hội hợp tác nghiên cứu, thực tập và vị trí AI Engineer toàn thời gian.'}
          </p>
          <div className="partner-actions">
            <Link to="/contact" className="partner-btn primary">
              {lang === 'en' ? 'START A CONVERSATION →' : 'KẾT NỐI NGAY →'}
            </Link>
            <a
              href="mailto:dphuongthuy7@gmail.com"
              className="partner-btn secondary"
            >
              dphuongthuy7@gmail.com ↗
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
        <span>{t({ en: 'ABOUT / 01', vi: 'GIỚI THIỆU / 01' })}</span>
        <div>
          <h2>
            {lang === 'en' ? (
              <>
                A quiet corner for <em>AI engineering, research notes, systems</em> and the ideas I build with intention.
              </>
            ) : (
              <>
                Một góc nhỏ dành cho <em>kỹ thuật AI, ghi chép nghiên cứu, hệ thống</em> và những ý tưởng tôi dồn tâm huyết xây dựng.
              </>
            )}
          </h2>
          <p className="about-note">
            {lang === 'en' ? (
              <>
                Away from the terminal, I’m an avid anime fan and gamer, and I hit the gym regularly to stay disciplined —
                an honest way to “touch grass” after long stretches in front of the screen. This site is where I archive
                prototypes, research notes and things I’ve learned.
              </>
            ) : (
              <>
                Rời khỏi màn hình máy tính, tôi thích xem anime, chơi game và duy trì tập gym đều đặn để rèn tính kỷ luật —
                một cách “chạm cỏ” sau những giờ dài làm việc với code và dữ liệu. Đây là nơi tôi lưu trữ các thử nghiệm,
                ghi chép nghiên cứu và những điều mình học được.
              </>
            )}
          </p>
          <p>
            <Link to="/education">{t({ en: 'ACADEMIC RECORD ↗', vi: 'HỒ SƠ HỌC TẬP ↗' })}</Link>
            <Link to="/skills">{t({ en: 'TECH STACK ↗', vi: 'CÔNG NGHỆ ↗' })}</Link>
            <Link to="/contact">{t({ en: 'LET’S CONNECT ↗', vi: 'KẾT NỐI ↗' })}</Link>
          </p>
        </div>
      </section>
    </main>
  );
};
