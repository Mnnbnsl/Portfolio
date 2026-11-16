'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ContactIcon,
  HomeIcon,
  ProjectsIcon,
  ReadingIcon,
  WritingIcon,
} from './NavIcons';

export default function TopHeader() {
  const [time, setTime] = useState('--:--');
  const pathname = usePathname();

  const projectsActive = pathname.startsWith('/projects');
  const writingActive = pathname.startsWith('/blogs');
  const readingActive = pathname.startsWith('/books');

  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setTime(currentTime);
    };

    updateTime();

    // Only the minute is displayed, so tick once a minute instead of every
    // second: no wasted renders competing with user input (INP). The first
    // tick is aligned to the minute boundary so the clock never lags.
    let interval: ReturnType<typeof setInterval> | undefined;
    const alignToMinute = window.setTimeout(() => {
      updateTime();
      interval = setInterval(updateTime, 60_000);
    }, 60_000 - (Date.now() % 60_000));

    return () => {
      window.clearTimeout(alignToMinute);
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <header className="top-header" aria-label="Main navigation header">
      <div className="header-container">
        {/* Identity */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- native hash link; smooth scrolling comes from CSS */}
        <a
          href="/#home"
          className="header-brand"
          aria-label="Home"
          data-label="Home"
        >
          <HomeIcon />
        </a>

        <nav className="header-nav" aria-label="Primary navigation">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- native hash link; smooth scrolling comes from CSS */}
          <a
            href="/#projects"
            className={`nav-item${projectsActive ? ' is-active' : ''}`}
            aria-label="Projects"
            aria-current={projectsActive ? 'page' : undefined}
            data-label="Projects"
          >
            <ProjectsIcon />
          </a>
          <Link
            href="/blogs"
            className={`nav-item${writingActive ? ' is-active' : ''}`}
            aria-label="Writing"
            aria-current={writingActive ? 'page' : undefined}
            data-label="Writing"
          >
            <WritingIcon />
          </Link>
          <Link
            href="/books"
            className={`nav-item${readingActive ? ' is-active' : ''}`}
            aria-label="Reading"
            aria-current={readingActive ? 'page' : undefined}
            data-label="Reading"
          >
            <ReadingIcon />
          </Link>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- native hash link; smooth scrolling comes from CSS */}
          <a
            href="/#contact"
            className="nav-item"
            aria-label="Contact"
            data-label="Contact"
          >
            <ContactIcon />
          </a>
        </nav>

        {/* Live Telemetry / Clock */}
        <div className="header-right">
          <span className="status-live-dot" title="Available for collaborations" />
          <span className="time">{time}</span>
        </div>
      </div>
    </header>
  );
}
