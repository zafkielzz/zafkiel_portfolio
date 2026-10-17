import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTACTS } from '../data/siteData';
import { useLang } from '../i18n';

export const ContactPage: React.FC = () => {
  const { t } = useLang();
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Group by the English key so grouping is language-independent.
  const directContacts = CONTACTS.filter((c) => c.group.en === 'DIRECT CONTACT');
  const socialContacts = CONTACTS.filter((c) => c.group.en === 'SOCIAL CHANNELS');
  const workContacts = CONTACTS.filter((c) => c.group.en === 'WORK & CODE' || c.group.en === 'WORK, GAMES & SUPPORT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <main className="contact-page">
      <section className="page-section-hero contact-page-hero">
        <img
          alt={t({ en: 'Blue creative contact board', vi: 'Bảng liên hệ sáng tạo màu xanh' })}
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
          src="/images/hero-contact.webp"
        />
        <span className="page-section-hero-shade" />
        <div className="page-section-hero-content">
          <Link className="back" to="/">
            ← {t({ en: 'INDEX', vi: 'TRANG CHỦ' })}
          </Link>
          <p className="eyebrow">{t({ en: 'CONTACT / LINK HUB', vi: 'LIÊN HỆ / TỔNG HỢP LIÊN KẾT' })}</p>
          <h1>
            {t({ en: 'Find me across the ', vi: 'Tìm tôi trên ' })}
            <em>{t({ en: 'web.', vi: 'internet.' })}</em>
          </h1>
          <p className="contact-lede">
            {t({
              en: 'Contact me directly, explore my code repositories, discuss AI roles or research collaborations—all neatly collected below.',
              vi: 'Liên hệ trực tiếp với tôi, xem các repository mã nguồn, trao đổi về vị trí AI hoặc hợp tác nghiên cứu—tất cả được tổng hợp gọn gàng bên dưới.'
            })}
          </p>
        </div>
      </section>

      <div className="contact-status">
        <i />
        <span>
          {t({
            en: 'ĐẶNG PHƯƠNG NAM · FINAL-YEAR AI STUDENT @ FPT UNIVERSITY',
            vi: 'ĐẶNG PHƯƠNG NAM · SINH VIÊN NĂM CUỐI NGÀNH AI @ ĐẠI HỌC FPT'
          })}
        </span>
        <small>{t({ en: '2026 EDITION', vi: 'PHIÊN BẢN 2026' })}</small>
      </div>

      <div className="contact-links">
        <section>
          <h2>{t({ en: 'DIRECT CONTACT', vi: 'LIÊN HỆ TRỰC TIẾP' })}</h2>
          <div>
            {directContacts.map((item, idx) => (
              <a key={item.slug} href={item.href}>
                <span>
                  <i>{String(idx + 1).padStart(2, '0')}</i> {t(item.title)}
                </span>
                <b>{t(item.detail)}</b>
                <em>↗</em>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2>{t({ en: 'SOCIAL CHANNELS', vi: 'MẠNG XÃ HỘI' })}</h2>
          <div>
            {socialContacts.map((item, idx) => (
              <a key={item.slug} href={item.href} target="_blank" rel="noreferrer">
                <span>
                  <i>{String(idx + 3).padStart(2, '0')}</i> {t(item.title)}
                </span>
                <b>{t(item.detail)}</b>
                <em>↗</em>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2>{t({ en: 'WORK, CODE & PLATFORMS', vi: 'CÔNG VIỆC, MÃ NGUỒN & NỀN TẢNG' })}</h2>
          <div>
            {workContacts.map((item, idx) => (
              <a key={item.slug} href={item.href} target="_blank" rel="noreferrer">
                <span>
                  <i>{String(idx + 9).padStart(2, '0')}</i> {t(item.title)}
                </span>
                <b>{t(item.detail)}</b>
                <em>↗</em>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* COZY FIRESIDE BANNER */}
      <div className="contact-campfire-banner">
        <div className="campfire-icon-frame">
          <img
            src="/images/collaboration-fire.gif"
            alt={t({ en: 'Warm pixel-art hearth Calcifer', vi: 'Lò sưởi pixel-art ấm áp Calcifer' })}
            width={72}
            height={72}
          />
        </div>
        <div className="campfire-text">
          <span className="eyebrow">
            <i />{' '}
            {t({
              en: 'PULL UP A CHAIR BY THE FIRE · COLLABORATION & RESEARCH',
              vi: 'KÉO GHẾ NGỒI BÊN LÒ SƯỞI · HỢP TÁC & NGHIÊN CỨU'
            })}
          </span>
          <b>{t({ en: 'Warm conversations & open opportunities.', vi: 'Những cuộc trò chuyện ấm áp & cơ hội rộng mở.' })}</b>
          <p>
            {t({
              en: "Whether you want to discuss AI research findings (IEEE IS'26), explore engineering collaborations, or share creative ideas—the hearth is always burning.",
              vi: "Dù bạn muốn trao đổi về kết quả nghiên cứu AI (IEEE IS'26), tìm kiếm cơ hội hợp tác kỹ thuật hay chia sẻ ý tưởng sáng tạo—lò sưởi luôn rực lửa."
            })}
          </p>
        </div>
      </div>

      {/* QUICK INQUIRY FORM */}
      <section style={{ maxWidth: '640px', margin: '60px auto 40px', padding: '0 24px' }}>
        <div className="label" style={{ marginBottom: '24px' }}>
          <span>{t({ en: 'SEND A DISPATCH', vi: 'GỬI LỜI NHẮN' })}</span>
          <span>{t({ en: 'DIRECT MESSAGE', vi: 'TIN NHẮN TRỰC TIẾP' })}</span>
        </div>

        {formSent ? (
          <div style={{ padding: '24px', border: '1px solid var(--line)', borderRadius: '8px', textAlign: 'center' }}>
            <b style={{ color: 'var(--accent)', font: '14px var(--mono)', display: 'block', marginBottom: '8px' }}>
              {t({ en: 'DISPATCH RECEIVED', vi: 'ĐÃ NHẬN LỜI NHẮN' })}
            </b>
            <p style={{ color: 'var(--text)', margin: 0, font: '15px Georgia, serif' }}>
              {t({
                en: 'Thank you for reaching out. I’ll review your message and reply promptly.',
                vi: 'Cảm ơn bạn đã liên hệ. Tôi sẽ xem tin nhắn và phản hồi sớm nhất.'
              })}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--muted)', font: '10px var(--mono)', marginBottom: '6px' }}>
                {t({ en: 'YOUR NAME', vi: 'TÊN CỦA BẠN' })}
              </label>
              <input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--line)',
                  borderRadius: '6px',
                  color: 'var(--text)',
                  font: '14px var(--sans)',
                  outline: 'none'
                }}
                placeholder={t({ en: 'e.g. Alex Nguyen', vi: 'vd. Nguyễn Văn An' })}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--muted)', font: '10px var(--mono)', marginBottom: '6px' }}>
                {t({ en: 'YOUR EMAIL', vi: 'EMAIL CỦA BẠN' })}
              </label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--line)',
                  borderRadius: '6px',
                  color: 'var(--text)',
                  font: '14px var(--sans)',
                  outline: 'none'
                }}
                placeholder={t({ en: 'alex@company.com', vi: 'an@congty.com' })}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--muted)', font: '10px var(--mono)', marginBottom: '6px' }}>
                {t({ en: 'MESSAGE', vi: 'NỘI DUNG' })}
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--line)',
                  borderRadius: '6px',
                  color: 'var(--text)',
                  font: '14px var(--sans)',
                  outline: 'none',
                  resize: 'vertical'
                }}
                placeholder={t({
                  en: 'Let’s discuss an AI role, collaboration, or share an idea...',
                  vi: 'Hãy cùng trao đổi về vị trí AI, cơ hội hợp tác hoặc chia sẻ một ý tưởng...'
                })}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: '12px 24px',
                background: 'var(--accent)',
                color: '#151311',
                border: 'none',
                borderRadius: '6px',
                font: '12px var(--mono)',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.05em'
              }}
            >
              {t({ en: 'TRANSMIT NOTE →', vi: 'GỬI LỜI NHẮN →' })}
            </button>
          </form>
        )}
      </section>
    </main>
  );
};
