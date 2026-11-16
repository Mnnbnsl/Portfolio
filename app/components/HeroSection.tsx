import bgImage from '@/assets/bg_image.jpg';

/**
 * Mobile gets no photograph at all: the <picture> source only matches from
 * 48rem up, so phones never request the image file. The fallback below is a
 * transparent pixel.
 */
const EMPTY_PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="intro-heading">
      <div className="hero-media" aria-hidden="true">
        <picture>
          <source media="(min-width: 48.01rem)" srcSet={bgImage.src} />
          <img
            src={EMPTY_PIXEL}
            alt=""
            width={bgImage.width}
            height={bgImage.height}
            decoding="async"
            fetchPriority="high"
            className="hero-image"
          />
        </picture>
      </div>

      <div className="hero-veil" aria-hidden="true" />

      <div className="hero-inner">
        <h1 id="intro-heading">Manan Bansal</h1>

        <p className="hero-role">
          AI &amp; backend developer building intelligent systems and the
          infrastructure behind them.
        </p>

        <div className="hero-signals" aria-live="polite">
          <span className="hero-signal">
            <span className="availability-dot" aria-hidden="true" />
            available for collaborations
          </span>
        </div>
      </div>
    </section>
  );
}
