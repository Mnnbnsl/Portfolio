import Image from 'next/image';
import avatarImage from '@/assets/avatar.jpg';

export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="intro-heading">
      <div className="avatar" aria-hidden="true">
        <Image 
          src={avatarImage} 
          alt="Manan Bansal"
          fill
          className="avatar-image"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      
      <div className="hero-content">
        <h1 id="intro-heading">Manan Bansal</h1>
        <p className="subtitle">AI & Full-Stack Developer</p>
        
        <div className="availability" aria-live="polite">
          <span className="availability-dot" />
          available for collaborations
        </div>
        
        <p className="intro">
          Hey, I{`'`}m Manan, a 19 year old AI and Full-Stack Developer based in India. Currently a third year engineering undergrad at NITJ. Building across AI/ML, Automation pipelines, and learning how systems work.
        </p>

        <p className="intro">
  I enjoy reading, discovering great movies and TV series, and working out.
</p>
        
        <p className="intro">
            If any of that sounds interesting, let{`'`}s connect!
        </p>
        
        <div className="socials" aria-label="Social links">
          <a href="mailto:manan.bansal0302@gmail.com" title="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
          <a href="https://github.com/mnnbnsl" rel="noreferrer" title="GitHub" target="_blank">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.89 1.529 2.341 1.544 2.914 1.18.09-.916.347-1.544.635-1.899-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/manan-bansal-42977b324" rel="noreferrer" title="LinkedIn" target="_blank">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
