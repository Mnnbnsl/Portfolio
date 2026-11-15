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
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="top-header" aria-label="Main navigation header">
      <div className="header-container">
        {/* Identity */}
        <Link
          href="/#home"
          className="header-brand"
          aria-label="Home"
          data-label="Home"
        >
          <HomeIcon />
        </Link>

        <nav className="header-nav" aria-label="Primary navigation">
          <Link
            href="/#projects"
            className={`nav-item${projectsActive ? ' is-active' : ''}`}
            aria-label="Projects"
            aria-current={projectsActive ? 'page' : undefined}
            data-label="Projects"
          >
            <ProjectsIcon />
          </Link>
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
          <Link
            href="/#contact"
            className="nav-item"
            aria-label="Contact"
            data-label="Contact"
          >
            <ContactIcon />
          </Link>
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
