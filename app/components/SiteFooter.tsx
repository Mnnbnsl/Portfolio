import Link from 'next/link';
import { RESUME_HREF, hasResume } from '@/app/lib/resume';

const EMAIL = 'manan.bansal0302@gmail.com';
const GITHUB = 'https://github.com/mnnbnsl';
const LINKEDIN = 'https://www.linkedin.com/in/manan-bansal-42977b324';
const SOURCE = 'https://github.com/Mnnbnsl/Portfolio';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <p className="footer-eyebrow">Manan Bansal</p>
          <p className="footer-note">
            AI &amp; full-stack developer building intelligent systems,
            automation, and the infrastructure behind them.
          </p>
          <a className="footer-email" href={`mailto:${EMAIL}`}>
            {EMAIL}
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <div className="footer-column">
            <h2 className="footer-heading">Explore</h2>
            <ul>
              <li>
                <Link href="/#projects">Projects</Link>
              </li>
              <li>
                <Link href="/blogs">Writing</Link>
              </li>
              <li>
                <Link href="/#contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h2 className="footer-heading">Elsewhere</h2>
            <ul>
              <li>
                <a href={GITHUB} target="_blank" rel="noreferrer">
                  GitHub
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a href={LINKEDIN} target="_blank" rel="noreferrer">
                  LinkedIn
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}>
                  Email
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h2 className="footer-heading">Resources</h2>
            <ul>
              <li>
                <Link href="/books">Reading log</Link>
              </li>
              {hasResume() && (
                <li>
                  <a
                    href={RESUME_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Résumé
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              )}
              <li>
                <a href={SOURCE} target="_blank" rel="noreferrer">
                  Site source
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="footer-bottom">
        <p className="footer-status">
          <span className="availability-dot" aria-hidden="true" />
          Available for collaborations
        </p>
        <a className="footer-top-link" href="#top">
          Back to top
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
