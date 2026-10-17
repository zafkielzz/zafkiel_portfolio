import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { POSTS, Post } from '../data/siteData';
import { useLang } from '../i18n';

export const LibraryPage: React.FC = () => {
  const { t } = useLang();
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'toread' | 'finished'>('toread');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('zafkiel-notes-bookmarks') || '[]');
    setSavedSlugs(saved);
  }, []);

  const savedPosts: Post[] = savedSlugs
    .map((s) => POSTS.find((p) => p.slug === s))
    .filter((p): p is Post => Boolean(p));

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(savedSlugs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'library-shelf.json';
    a.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const imported = JSON.parse(evt.target?.result as string);
        if (Array.isArray(imported)) {
          const updated = Array.from(new Set([...savedSlugs, ...imported]));
          setSavedSlugs(updated);
          localStorage.setItem('zafkiel-notes-bookmarks', JSON.stringify(updated));
        }
      } catch {
        alert(t({ en: 'Invalid library JSON file.', vi: 'Tệp JSON thư viện không hợp lệ.' }));
      }
    };
    reader.readAsText(file);
  };

  return (
    <main className="library-page" style={{ maxWidth: '860px', margin: 'auto', padding: '150px 24px 110px' }}>
      <Link className="back" to="/">
        {t({ en: '← INDEX', vi: '← TRANG CHỦ' })}
      </Link>
      <p className="eyebrow">{t({ en: 'PERSONAL READING SPACE', vi: 'GÓC ĐỌC CÁ NHÂN' })}</p>
      <h1>{t({ en: 'Your library.', vi: 'Thư viện của bạn.' })}</h1>
      <p style={{ color: 'var(--muted)', fontSize: '16px' }}>
        {t({
          en: 'Saved notes live only in this browser of yours.',
          vi: 'Các bài viết được lưu chỉ tồn tại trên trình duyệt này của bạn.'
        })}
      </p>

      <section className="library-insights" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', margin: '40px 0' }}>
        <div style={{ padding: '20px', border: '1px solid var(--line)', borderRadius: '8px' }}>
          <span style={{ font: '10px var(--mono)', color: 'var(--muted)', display: 'block' }}>{t({ en: 'ON YOUR SHELF', vi: 'TRÊN KỆ CỦA BẠN' })}</span>
          <b style={{ fontSize: '32px', display: 'block', margin: '6px 0' }}>
            {String(savedPosts.length).padStart(2, '0')}
          </b>
          <small style={{ font: '10px var(--mono)', color: '#888' }}>{t({ en: 'SAVED NOTES', vi: 'BÀI ĐÃ LƯU' })}</small>
        </div>

        <div style={{ padding: '20px', border: '1px solid var(--line)', borderRadius: '8px' }}>
          <span style={{ font: '10px var(--mono)', color: 'var(--muted)', display: 'block' }}>{t({ en: 'COMPLETED', vi: 'ĐÃ HOÀN THÀNH' })}</span>
          <b style={{ fontSize: '32px', display: 'block', margin: '6px 0' }}>00</b>
          <small style={{ font: '10px var(--mono)', color: '#888' }}>{t({ en: 'READ THROUGH', vi: 'ĐÃ ĐỌC XONG' })}</small>
        </div>

        <div className="library-progress" style={{ padding: '20px', border: '1px solid var(--line)', borderRadius: '8px' }}>
          <span style={{ font: '10px var(--mono)', color: 'var(--muted)', display: 'block' }}>{t({ en: 'READING PACE', vi: 'TIẾN ĐỘ ĐỌC' })}</span>
          <b style={{ fontSize: '32px', display: 'block', margin: '6px 0' }}>0%</b>
          <i style={{ display: 'block', height: '3px', background: 'var(--line)', marginTop: '8px', borderRadius: '2px', overflow: 'hidden' }}>
            <em style={{ display: 'block', height: '100%', width: '0%', background: 'var(--accent)' }} />
          </i>
        </div>
      </section>

      <div className="library-tabs" style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '32px' }}>
        <button
          type="button"
          className={activeTab === 'toread' ? 'active' : ''}
          onClick={() => setActiveTab('toread')}
          style={{
            padding: '8px 16px',
            border: '1px solid var(--line)',
            background: activeTab === 'toread' ? 'var(--line)' : 'transparent',
            color: 'var(--text)',
            borderRadius: '4px',
            font: '11px var(--mono)',
            cursor: 'pointer'
          }}
        >
          {t({ en: 'TO READ', vi: 'CẦN ĐỌC' })} <b>{savedPosts.length}</b>
        </button>
        <button
          type="button"
          className={activeTab === 'finished' ? 'active' : ''}
          onClick={() => setActiveTab('finished')}
          style={{
            padding: '8px 16px',
            border: '1px solid var(--line)',
            background: activeTab === 'finished' ? 'var(--line)' : 'transparent',
            color: 'var(--text)',
            borderRadius: '4px',
            font: '11px var(--mono)',
            cursor: 'pointer'
          }}
        >
          {t({ en: 'FINISHED', vi: 'ĐÃ ĐỌC' })} <b>0</b>
        </button>
        <button
          type="button"
          className="library-export"
          disabled={savedPosts.length === 0}
          onClick={handleExport}
          style={{
            marginLeft: 'auto',
            padding: '8px 12px',
            border: '1px solid var(--line)',
            background: 'transparent',
            color: 'var(--muted)',
            borderRadius: '4px',
            font: '10px var(--mono)',
            cursor: savedPosts.length ? 'pointer' : 'not-allowed'
          }}
        >
          {t({ en: 'EXPORT JSON ↗', vi: 'XUẤT JSON ↗' })}
        </button>
        <label
          style={{
            padding: '8px 12px',
            border: '1px solid var(--line)',
            background: 'transparent',
            color: 'var(--text)',
            borderRadius: '4px',
            font: '10px var(--mono)',
            cursor: 'pointer'
          }}
        >
          {t({ en: 'IMPORT JSON', vi: 'NHẬP JSON' })}
          <input type="file" accept="application/json" onChange={handleImport} style={{ display: 'none' }} />
        </label>
      </div>

      {savedPosts.length > 0 ? (
        <div style={{ display: 'grid', gap: '16px' }}>
          {savedPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/posts/${post.slug}`}
              style={{
                display: 'block',
                padding: '20px',
                border: '1px solid var(--line)',
                borderRadius: '6px',
                textDecoration: 'none',
                color: 'var(--text)',
                transition: 'border-color 0.2s'
              }}
            >
              <h3 style={{ margin: '0 0 8px', font: '400 22px Georgia, serif' }}>{t(post.title)}</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>{t(post.summary)}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="library-empty" style={{ textAlign: 'center', padding: '60px 20px', border: '1px dashed var(--line)', borderRadius: '8px' }}>
          <b style={{ font: '13px var(--mono)', color: 'var(--text)', display: 'block', marginBottom: '8px' }}>
            {t({ en: 'YOUR LIBRARY IS EMPTY', vi: 'THƯ VIỆN CỦA BẠN ĐANG TRỐNG' })}
          </b>
          <p style={{ color: 'var(--muted)', margin: '0 0 16px', fontSize: '14px' }}>
            {t({
              en: 'Save a note while reading to create a personal reading shelf.',
              vi: 'Lưu một bài viết khi đang đọc để tạo kệ sách cá nhân của bạn.'
            })}
          </p>
          <Link to="/#articles" style={{ color: 'var(--accent)', font: '12px var(--mono)' }}>
            {t({ en: 'Explore notes →', vi: 'Khám phá bài viết →' })}
          </Link>
        </div>
      )}
    </main>
  );
};
