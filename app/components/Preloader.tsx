'use client';

import { useEffect, useState } from 'react';

type Phase = 'loading' | 'leaving' | 'done';

/**
 * The intro belongs to the first view of the home route in a page load. The
 * module outlives client-side navigations, so returning to `/` starts with
 * the content already in place instead of replaying the 1.5s overlay.
 */
let introPlayed = false;

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>(() =>
    introPlayed ? 'done' : 'loading'
  );

  useEffect(() => {
    const root = document.documentElement;

    if (introPlayed) {
      // A later visit resumes at the settled state the intro would end on.
      root.dataset.boot = 'loaded';
      return;
    }

    introPlayed = true;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion) {
      root.dataset.boot = 'loaded';
      const skipTimer = window.setTimeout(() => setPhase('done'), 0);
      return () => window.clearTimeout(skipTimer);
    }

    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';

    const leaveTimer = window.setTimeout(() => {
      const loaderName = document.querySelector<HTMLElement>(
        '.preloader-name'
      );
      const heading = document.getElementById('intro-heading');

      if (loaderName && heading) {
        // Measure the hidden hero heading so the loader name can land on it.
        // The heading reserves its layout while only its opacity is hidden.
        const nameRect = loaderName.getBoundingClientRect();
        const headingRect = heading.getBoundingClientRect();

        if (nameRect.width > 0) {
          const scale = headingRect.width / nameRect.width;
          const dx =
            headingRect.left +
            headingRect.width / 2 -
            (nameRect.left + nameRect.width / 2);
          const dy =
            headingRect.top +
            headingRect.height / 2 -
            (nameRect.top + nameRect.height / 2);

          loaderName.style.setProperty('--boot-dx', `${dx}px`);
          loaderName.style.setProperty('--boot-dy', `${dy}px`);
          loaderName.style.setProperty('--boot-scale', `${scale}`);
        }
      }

      root.dataset.boot = 'loaded';
      setPhase('leaving');
    }, 900);

    const doneTimer = window.setTimeout(() => {
      root.style.overflow = previousOverflow;
      setPhase('done');
    }, 1750);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
      root.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === 'done') {
    return null;
  }

  return (
    <div
      className={`preloader${phase === 'leaving' ? ' is-leaving' : ''}`}
      aria-busy="true"
    >
      <span className="visually-hidden" role="status">
        Loading portfolio
      </span>

      <div className="preloader-mark" aria-hidden="true">
        <span className="preloader-name">Manan Bansal</span>
        <span className="preloader-track">
          <span className="preloader-fill" />
        </span>
      </div>
    </div>
  );
}
