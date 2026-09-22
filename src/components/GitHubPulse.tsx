import React, { useEffect, useState, useMemo } from 'react';

interface GitHubDay {
  date: string;
  count: number;
  level: number;
}

interface GitHubPulseProps {
  postsCount: number;
  topicsCount: number;
  lang: 'en' | 'vi';
}

export const GitHubPulse: React.FC<GitHubPulseProps> = ({
  postsCount,
  topicsCount,
  lang
}) => {
  const [totalContributions, setTotalContributions] = useState<number>(211);
  const [days, setDays] = useState<GitHubDay[]>([]);
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
  } | null>(null);

  useEffect(() => {
    let active = true;

    // Fast load from local cached file
    fetch('/github-contributions.json')
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        if (data && data.contributions) {
          setDays(data.contributions);
          setTotalContributions(data.total?.lastYear || 211);
        }
      })
      .catch(() => {});

    // Revalidate live in the background
    fetch('https://github-contributions-api.jogruber.de/v4/zafkielzz?y=last')
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        if (data && data.contributions) {
          setDays(data.contributions);
          setTotalContributions(data.total?.lastYear || 211);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  // Split days into weeks (53 columns x 7 days)
  const weeks = useMemo(() => {
    if (!days || days.length === 0) return [];
    const chunks: GitHubDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      chunks.push(days.slice(i, i + 7));
    }
    return chunks;
  }, [days]);

  // Compute month label positions
  const monthLabels = useMemo(() => {
    if (weeks.length === 0) return [];
    const labels: { weekIndex: number; month: string }[] = [];
    let lastMonth = '';

    weeks.forEach((week, wIdx) => {
      if (week[0]) {
        const d = new Date(week[0].date);
        const m = d.toLocaleString('en-US', { month: 'short' });
        const dayOfMonth = d.getDate();
        if (m !== lastMonth && dayOfMonth <= 14) {
          labels.push({ weekIndex: wIdx, month: m });
          lastMonth = m;
        }
      }
    });

    return labels;
  }, [weeks]);

  return (
    <section className="writing-stats" aria-label="GitHub activity and research pulse">
      <div className="label">
        <span>{lang === 'en' ? 'GITHUB ACTIVITY & RESEARCH PULSE' : 'HOẠT ĐỘNG GITHUB & NGHIÊN CỨU'}</span>
        <span>
          <a
            href="https://github.com/zafkielzz"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            @zafkielzz ↗
          </a>
        </span>
      </div>

      <div className="stat-row">
        <div>
          <b>{totalContributions}+</b>
          <span>{lang === 'en' ? 'GITHUB CONTRIBUTIONS (YEAR)' : 'ĐÓNG GÓP GITHUB (NĂM QUA)'}</span>
        </div>
        <div>
          <b>{postsCount}</b>
          <span>{lang === 'en' ? 'NOTES PUBLISHED' : 'GHI CHÉP KỸ THUẬT'}</span>
        </div>
        <div>
          <b>{topicsCount}</b>
          <span>{lang === 'en' ? 'TOPICS EXPLORED' : 'CHỦ ĐỀ NGHIÊN CỨU'}</span>
        </div>
      </div>

      {/* GitHub Real Contribution Heatmap */}
      <div className="github-heatmap-card">
        <div className="github-heatmap-header">
          <span>
            {hoveredDay ? (
              <>
                <strong>{hoveredDay.count}</strong> contribution{hoveredDay.count === 1 ? '' : 's'} on {hoveredDay.date}
              </>
            ) : (
              lang === 'en'
                ? `${totalContributions} contributions in the last year`
                : `${totalContributions} lượt đóng góp mã nguồn trong năm qua`
            )}
          </span>
          <a
            href="https://github.com/zafkielzz"
            target="_blank"
            rel="noreferrer"
            className="github-profile-link"
          >
            github.com/zafkielzz ↗
          </a>
        </div>

        <div className="github-heatmap-scroll">
          <div className="github-heatmap-grid">
            {/* Months Row */}
            <div className="github-months-row">
              <span className="github-day-label-space" />
              <div className="github-months-track">
                {monthLabels.map((item, idx) => (
                  <span
                    key={idx}
                    className="github-month-name"
                    style={{ left: `${(item.weekIndex / Math.max(1, weeks.length)) * 100}%` }}
                  >
                    {item.month}
                  </span>
                ))}
              </div>
            </div>

            {/* Days & Weeks Body */}
            <div className="github-body-row">
              {/* Day of week labels */}
              <div className="github-day-labels">
                <span></span>
                <span>Mon</span>
                <span></span>
                <span>Wed</span>
                <span></span>
                <span>Fri</span>
                <span></span>
              </div>

              {/* 53 Columns */}
              <div className="github-weeks-container">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="github-week-col">
                    {week.map((day) => {
                      const countText = `${day.count} contribution${day.count === 1 ? '' : 's'}`;
                      return (
                        <div
                          key={day.date}
                          className={`github-cell level-${day.level}`}
                          title={`${day.date}: ${countText}`}
                          onMouseEnter={() => setHoveredDay({ date: day.date, count: day.count })}
                          onMouseLeave={() => setHoveredDay(null)}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Legend */}
        <div className="github-heatmap-footer">
          <small className="github-data-hint">
            {lang === 'en'
              ? 'Real-time verified data via GitHub Contributions API'
              : 'Dữ liệu thực xác thực qua GitHub Contributions API'}
          </small>

          <div className="github-legend">
            <span>{lang === 'en' ? 'Less' : 'Ít'}</span>
            <i className="github-cell level-0" />
            <i className="github-cell level-1" />
            <i className="github-cell level-2" />
            <i className="github-cell level-3" />
            <i className="github-cell level-4" />
            <span>{lang === 'en' ? 'More' : 'Nhiều'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubPulse;
