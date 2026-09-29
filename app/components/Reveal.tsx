'use client';

import { useEffect, useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
}

/**
 * Reveals its children on first scroll into view.
 *
 * The hidden state is applied by an effect, through a data attribute, rather
 * than through render state. Server-rendered markup therefore ships with no
 * hidden state at all, so the content stays visible when JavaScript is
 * unavailable, when a renderer never fires IntersectionObserver, or when the
 * visitor prefers reduced motion.
 */
export default function Reveal({ children, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    element.dataset.reveal = 'pending';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.reveal = 'shown';
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal" style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}
