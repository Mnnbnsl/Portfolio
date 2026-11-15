import { RESUME_HREF, hasResume } from '@/app/lib/resume';
import OverviewLogos from './OverviewLogos';

export default function OverviewSection() {
  return (
    <section
      className="overview"
      id="overview"
      aria-labelledby="overview-heading"
    >
      <div className="overview-column">
        <h2 id="overview-heading" className="overview-heading">
          I build systems that hold up under{' '}
          <span className="mark mark-circle mark-heading">
            real load
            <svg
              className="mark-stroke"
              viewBox="0 0 200 84"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                pathLength="1"
                d="M104 10c50-3 90 10 93 30 3 17-40 31-91 33C51 75 11 64 7 46 3 28 50 11 108 10c7 0 14 0 21 1"
              />
            </svg>
          </span>
          .
        </h2>

        <p className="overview-lede">
          Hey, I&apos;m Manan — a 19 year old AI &amp; full-stack developer and
          third-year engineering undergrad at{' '}
          <span className="overview-em">NITJ</span>. I spend my days building
          across{' '}
          <span className="mark mark-underline">
            AI/ML
            <svg
              className="mark-stroke"
              viewBox="0 0 140 22"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                pathLength="1"
                d="M4 14c28-7 55-9 82-6 18 2 35 5 50 2"
              />
              <path
                pathLength="1"
                d="M9 18c26-4 52-6 78-4 16 1 32 3 47 1"
              />
            </svg>
          </span>{' '}
          and{' '}
          <span className="overview-em">automation pipelines</span>, and
          figuring out how systems really work underneath.
        </p>

        <p className="overview-lede">
          Off the clock I&apos;m usually buried in a book, deep in a film, or
          somewhere under a barbell. If any of that sounds like your kind of
          conversation, let&apos;s talk.
        </p>

        <div className="overview-actions">
          {hasResume() && (
            <a
              href={RESUME_HREF}
              className="overview-resume"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>view resume</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
          )}

          <a
            href="mailto:manan.bansal0302@gmail.com"
            className="overview-social"
            title="Email"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m4 7 8 6 8-6" />
            </svg>
            <span>email</span>
          </a>

          <a
            href="https://github.com/mnnbnsl"
            className="overview-social"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.89 1.529 2.341 1.544 2.914 1.18.09-.916.347-1.544.635-1.899-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            <span>github</span>
          </a>

          <a
            href="https://www.linkedin.com/in/manan-bansal-42977b324"
            className="overview-social"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.57-2.3 3.2V21H9z" />
            </svg>
            <span>linkedin</span>
          </a>
        </div>
      </div>

      <OverviewLogos />
    </section>
  );
}
