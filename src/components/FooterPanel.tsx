import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n';

export const FooterPanel: React.FC = () => {
  const { t } = useLang();
  const [meta, setMeta] = useState({
    time: '--:--:--',
    size: '—',
    browser: 'Browser'
  });

  useEffect(() => {
    const updateTimeAndSize = () => {
      const timeStr = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Bangkok',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(new Date());

      const ua = navigator.userAgent;
      const browser = /Firefox/i.test(ua)
        ? 'Firefox'
        : /Edg/i.test(ua)
        ? 'Edge'
        : /Chrome/i.test(ua)
        ? 'Chromium'
        : /Safari/i.test(ua)
        ? 'Safari'
        : 'Browser';

      setMeta({
        time: timeStr,
        size: `${window.innerWidth}×${window.innerHeight}`,
        browser
      });
    };

    updateTimeAndSize();
    const interval = window.setInterval(updateTimeAndSize, 1000);
    window.addEventListener('resize', updateTimeAndSize);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener('resize', updateTimeAndSize);
    };
  }, []);

  return (
    <>
      <section className="site-footer-panel">
        <div className="footer-meta">
          <div>
            <span>
              <strong>{t({ en: 'IDENTITY', vi: 'DANH TÍNH' })}</strong>ĐẶNG PHƯƠNG NAM · {t({ en: 'FPT UNIVERSITY', vi: 'ĐẠI HỌC FPT' })}
            </span>
            <span>
              <strong>{t({ en: 'BROWSER', vi: 'TRÌNH DUYỆT' })}</strong>{meta.browser}
            </span>
            <span>
              <strong>{t({ en: 'LOCAL TIME', vi: 'GIỜ ĐỊA PHƯƠNG' })}</strong>{meta.time}
            </span>
            <span>
              <strong>{t({ en: 'VIEWPORT', vi: 'KHUNG HÌNH' })}</strong>{meta.size}
            </span>
            <span>
              <strong>{t({ en: 'TIMEZONE', vi: 'MÚI GIỜ' })}</strong>{t({ en: 'HANOI / GMT+7', vi: 'HÀ NỘI / GMT+7' })}
            </span>
            <span>
              <strong>{t({ en: 'STATUS', vi: 'TRẠNG THÁI' })}</strong>{t({ en: 'ONLINE', vi: 'TRỰC TUYẾN' })}
            </span>
          </div>
        </div>

        <div className="footer-links">
          <b>{t({ en: 'EXPLORE', vi: 'KHÁM PHÁ' })}</b>
          <div>
            <span>
              <Link to="/">{t({ en: 'Home', vi: 'Trang chủ' })}</Link>
              <Link to="/#articles">{t({ en: 'Notes', vi: 'Bài viết' })}</Link>
              <Link to="/work">{t({ en: 'Projects', vi: 'Dự án' })}</Link>
              <Link to="/education">{t({ en: 'Education & Certs', vi: 'Học vấn & Chứng chỉ' })}</Link>
              <Link to="/skills">{t({ en: 'Technical Skills', vi: 'Kỹ năng' })}</Link>
              <Link to="/contact">{t({ en: 'Contact', vi: 'Liên hệ' })}</Link>
            </span>
            <span>
              <a href="https://github.com/zafkielzz" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href="/cv.pdf" target="_blank" download="Dang_Phuong_Nam_CV.pdf">
                {t({ en: 'Download CV ↗', vi: 'Tải CV ↗' })}
              </a>
              <Link to="/work/conflict-aware-rag-routing">
                {t({ en: "IEEE IS'26 Paper ↗", vi: "Bài báo IEEE IS'26 ↗" })}
              </Link>
              <Link to="/work/probabilistic-stock-breakout-vietnam">
                {t({ en: 'ICITDA 2026 Paper ↗', vi: 'Bài báo ICITDA 2026 ↗' })}
              </Link>
              <Link to="/contact">
                {t({ en: 'Contact', vi: 'Liên hệ' })}
              </Link>
            </span>
          </div>
        </div>

        <p className="visit-counter">
          <i>✦</i> {t({ en: 'DESIGN ADAPTED FROM', vi: 'THIẾT KẾ DỰA TRÊN' })}{' '}
          <a href="https://midnightbarista-work.vercel.app/" target="_blank" rel="noreferrer">
            <b>MIDNIGHT BARISTA</b>
          </a>
        </p>
      </section>

      <footer>
        <span>© 2026 ĐẶNG PHƯƠNG NAM</span>
        <span>{t({ en: 'FPT UNIVERSITY · AI RESEARCH ARCHIVE', vi: 'ĐẠI HỌC FPT · KHO LƯU TRỮ NGHIÊN CỨU AI' })}</span>
      </footer>
    </>
  );
};
