import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  SKILLS_DATA,
  HARDWARE_ENVIRONMENT,
  SKILL_CATEGORY_LABELS,
  SKILL_LEVEL_LABELS,
  SkillItem
} from '../data/siteData';
import { useLang } from '../i18n';

export const SkillsPage: React.FC = () => {
  const { t } = useLang();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: Array<'all' | SkillItem['category']> = [
    'all',
    'AI & Deep Learning',
    'LLM & RAG',
    'Computer Vision',
    'Systems & Backend',
    'Hardware & Edge'
  ];

  const filteredSkills = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return SKILLS_DATA.filter((skill) => {
      const matchCat = activeCategory === 'all' || skill.category === activeCategory;
      const matchSearch =
        !q ||
        [skill.name, skill.summary, SKILL_CATEGORY_LABELS[skill.category]].some(
          (v) => v.en.toLowerCase().includes(q) || v.vi.toLowerCase().includes(q)
        ) ||
        skill.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Group count for tabs
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: SKILLS_DATA.length };
    SKILLS_DATA.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <main className="skills-page" style={{ maxWidth: '1000px', margin: 'auto', padding: '150px 24px 110px' }}>
      {/* SECTION HERO */}
      <section className="page-section-hero skills-page-hero">
        <img
          alt={t({ en: 'Technical architecture and hardware infrastructure', vi: 'Kiến trúc kỹ thuật và hạ tầng phần cứng' })}
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
          src="/images/hero-partners.webp"
        />
        <span className="page-section-hero-shade" />
        <div className="page-section-hero-content">
          <Link className="back" to="/">
            ← {t({ en: 'INDEX', vi: 'TRANG CHỦ' })}
          </Link>
          <p className="eyebrow">{t({ en: 'TECHNICAL STACK & ENGINEERING ARSENAL', vi: 'TECH STACK & CÔNG CỤ KỸ THUẬT' })}</p>
          <h1>
            {t({ en: 'Algorithms, architectures & ', vi: 'Thuật toán, kiến trúc & ' })}
            <em>{t({ en: 'hardware.', vi: 'phần cứng.' })}</em>
          </h1>
          <p className="partners-lede" style={{ maxWidth: '640px' }}>
            {t({
              en: 'A comprehensive inventory of deep learning frameworks, agentic pipelines, backend microservices, and hardware compute environments used across scientific benchmarks and production systems.',
              vi: 'Danh mục đầy đủ các framework deep learning, agentic pipeline, backend microservice và môi trường tính toán phần cứng được sử dụng trong các benchmark khoa học và hệ thống production.'
            })}
          </p>
        </div>
      </section>

      {/* SEARCH AND CATEGORY FILTER */}
      <section style={{ margin: '60px 0 40px', borderTop: '1px solid var(--line)', paddingTop: '32px' }}>
        <div className="label">
          <span>{t({ en: '01 / SKILL INVENTORY', vi: '01 / DANH MỤC KỸ NĂNG' })} ({filteredSkills.length})</span>
          <span>{t({ en: 'SPECIALIZATIONS & FRAMEWORKS', vi: 'CHUYÊN MÔN & FRAMEWORK' })}</span>
        </div>

        {/* Search Bar */}
        <div style={{ margin: '20px 0 24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.025)',
              border: '1px solid var(--line)',
              borderRadius: '8px',
              padding: '10px 16px',
              gap: '12px'
            }}
          >
            <span style={{ color: 'var(--accent)', font: '14px var(--mono)' }}>⌕</span>
            <input
              type="text"
              placeholder={t({
                en: 'Search skills, frameworks, techniques (e.g. PyTorch, NLI, Docker, CUDA)...',
                vi: 'Tìm kỹ năng, framework, kỹ thuật (vd. PyTorch, NLI, Docker, CUDA)...'
              })}
              aria-label={t({ en: 'Search skills', vi: 'Tìm kỹ năng' })}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text)',
                font: '14px var(--sans)'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--muted)',
                  cursor: 'pointer',
                  font: '12px var(--mono)'
                }}
              >
                {t({ en: 'CLEAR', vi: 'XÓA' })}
              </button>
            )}
          </div>
        </div>

        {/* Filter Badges */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? 'rgba(230, 155, 75, 0.22)' : 'rgba(255, 255, 255, 0.02)',
                border: activeCategory === cat ? '1px solid var(--accent)' : '1px solid var(--line)',
                color: activeCategory === cat ? '#ffe4bc' : 'var(--muted)',
                padding: '7px 14px',
                borderRadius: '999px',
                font: '10px var(--mono)',
                letterSpacing: '0.06em',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase'
              }}
            >
              {cat === 'all' ? t({ en: 'ALL SKILLS', vi: 'TẤT CẢ KỸ NĂNG' }) : t(SKILL_CATEGORY_LABELS[cat])} ({categoryCounts[cat] || 0})
            </button>
          ))}
        </div>

        {/* SKILLS GRID */}
        {filteredSkills.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '22px' }}>
            {filteredSkills.map((skill: SkillItem) => (
              <article
                key={skill.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.015)',
                  border: '1px solid var(--line)',
                  borderRadius: '10px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.25s ease, border-color 0.25s ease, background 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(230, 155, 75, 0.45)';
                  e.currentTarget.style.background = 'rgba(230, 155, 75, 0.035)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--line)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.015)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ color: 'var(--accent)', font: '600 10px var(--mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {t(SKILL_CATEGORY_LABELS[skill.category])}
                    </span>
                    <span
                      style={{
                        font: '600 9px var(--mono)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background:
                          skill.level === 'Core Mastery'
                            ? 'rgba(230, 155, 75, 0.2)'
                            : 'rgba(255, 255, 255, 0.05)',
                        color:
                          skill.level === 'Core Mastery'
                            ? '#f5c682'
                            : '#b3a290',
                        border:
                          skill.level === 'Core Mastery'
                            ? '1px solid rgba(230, 155, 75, 0.4)'
                            : '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      {t(SKILL_LEVEL_LABELS[skill.level])}
                    </span>
                  </div>

                  <h3 style={{ font: '500 20px Georgia, serif', margin: '0 0 10px', color: 'var(--text)', lineHeight: '1.25' }}>
                    {t(skill.name)}
                  </h3>

                  <p style={{ color: '#c2b3a2', fontSize: '13px', lineHeight: '1.6', margin: '0 0 16px' }}>
                    {t(skill.summary)}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(220, 186, 136, 0.15)',
                          color: '#cdbead',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          font: '10px var(--mono)'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {skill.relatedSlug && (
                  <div style={{ borderTop: '1px solid var(--line)', paddingTop: '12px', marginTop: '8px' }}>
                    <Link
                      to={`/work/${skill.relatedSlug}`}
                      style={{
                        color: 'var(--accent)',
                        font: '11px var(--mono)',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {t({ en: 'APPLIED IN:', vi: 'ÁP DỤNG TẠI:' })}{' '}
                      {t(skill.relatedLabel ?? { en: 'PROJECT STUDY', vi: 'DỰ ÁN' })} <span>→</span>
                    </Link>
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div style={{ padding: '60px 20px', textAlign: 'center', border: '1px dashed var(--line)', borderRadius: '10px' }}>
            <p style={{ color: 'var(--muted)', font: '13px var(--mono)', margin: 0 }}>
              {t({ en: 'No matching skills found for', vi: 'Không tìm thấy kỹ năng phù hợp với' })} "{searchQuery}".
            </p>
          </div>
        )}
      </section>

      {/* COMPUTE AND HARDWARE ENVIRONMENT */}
      <section style={{ margin: '80px 0 60px' }}>
        <div className="label">
          <span>{t({ en: '02 / COMPUTE & INFRASTRUCTURE', vi: '02 / TÍNH TOÁN & HẠ TẦNG' })}</span>
          <span>{t({ en: 'HARDWARE BENCHMARK RIG', vi: 'HỆ THỐNG BENCHMARK PHẦN CỨNG' })}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '24px' }}>
          {HARDWARE_ENVIRONMENT.map((item) => (
            <div
              key={item.label.en}
              style={{
                background: 'rgba(230, 155, 75, 0.025)',
                border: '1px solid rgba(220, 186, 136, 0.22)',
                borderRadius: '8px',
                padding: '22px'
              }}
            >
              <span style={{ color: '#97826d', font: '600 10px var(--mono)', display: 'block', letterSpacing: '0.08em' }}>
                {t(item.label)}
              </span>
              <b style={{ color: '#f2c17b', font: '500 16px var(--mono)', display: 'block', margin: '8px 0 6px' }}>
                {t(item.value)}
              </b>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '12px', lineHeight: '1.5' }}>
                {t(item.detail)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* COLLABORATION & BENCHMARKING CARD */}
      <div className="skills-collab-card">
        <div className="skills-collab-fire">
          <img
            src="/images/collaboration-fire.gif"
            alt={t({ en: 'Warm pixel hearth Calcifer', vi: 'Lò sưởi pixel ấm áp Calcifer' })}
            width={68}
            height={68}
          />
        </div>
        <div className="skills-collab-copy">
          <span>{t({ en: 'COLLABORATION & BENCHMARKING', vi: 'HỢP TÁC & BENCHMARK' })}</span>
          <b>{t({ en: 'Have a challenging AI or systems engineering problem?', vi: 'Bạn có một bài toán AI hay kỹ thuật hệ thống đầy thách thức?' })}</b>
          <p>
            {t({
              en: 'Always open to collaborating on multimodal architectures, custom RAG evaluation benchmarks, and hardware-accelerated model deployment.',
              vi: 'Luôn sẵn sàng hợp tác về kiến trúc đa phương thức, benchmark đánh giá RAG tùy chỉnh và triển khai mô hình tăng tốc phần cứng.'
            })}
          </p>
          <Link to="/contact" className="skills-collab-btn">
            {t({ en: 'LET’S CONNECT →', vi: 'KẾT NỐI NGAY →' })}
          </Link>
        </div>
      </div>

      {/* ENGINEERING ARCHITECTURE PHILOSOPHY */}
      <section style={{ margin: '80px 0 20px', padding: '28px', border: '1px dashed var(--line)', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.01)' }}>
        <span style={{ color: 'var(--accent)', font: '600 10px var(--mono)', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>
          {t({ en: 'SYSTEMS & DESIGN PHILOSOPHY', vi: 'TRIẾT LÝ HỆ THỐNG & THIẾT KẾ' })}
        </span>
        <p style={{ margin: 0, color: '#c4b5a4', fontSize: '14px', lineHeight: '1.65' }}>
          {t({
            en: '"Engineering applied AI is about discipline across the entire stack: from understanding vector math and loss curves, to structuring leak-free nested cross-validation, down to optimizing memory layout and kernel latency on constrained hardware."',
            vi: '"Xây dựng AI ứng dụng là sự kỷ luật trên toàn bộ stack: từ hiểu toán vector và loss curve, đến thiết kế nested cross-validation không rò rỉ dữ liệu, cho tới tối ưu bố cục bộ nhớ và độ trễ kernel trên phần cứng hạn chế."'
          })}
        </p>
      </section>
    </main>
  );
};
