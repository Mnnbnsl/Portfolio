import type { Metadata } from 'next';
import Link from 'next/link';
import TopHeader from '@/app/components/TopHeader';
import Reveal from '@/app/components/Reveal';
import BookShelf from '@/app/components/BookShelf';
import SiteFooter from '@/app/components/SiteFooter';
import { getReadingStats, getReadingTimeline } from '@/app/lib/books';

export const metadata: Metadata = {
  title: 'Reading',
  description:
    'A year-by-year timeline of books read, with covers and reading totals.',
};

/** Refresh the shelf hourly so new Hardcover reads show up without a rebuild. */
export const revalidate = 3600;

export default async function BooksPage() {
  const timeline = await getReadingTimeline();
  const stats = await getReadingStats();

  return (
    <div className="site-shell">
      <div className="page-content">
        <TopHeader />

        <main id="top" className="reading-column main-content books-page">
          <Reveal>
            <header className="blogs-page-header">
              <Link href="/" className="blog-back-link">
                ← home
              </Link>
              <h1 className="blogs-page-title">Reading</h1>
              <p className="blogs-page-subtitle">
                Books I have finished, newest first. Keep scrolling to walk the
                shelf backwards.
              </p>

              <dl className="reading-summary">
                <div className="reading-summary-item">
                  <dt>Books</dt>
                  <dd>{stats.books}</dd>
                </div>
                <div className="reading-summary-item">
                  <dt>Years</dt>
                  <dd>{stats.years}</dd>
                </div>
                <div className="reading-summary-item">
                  <dt>Pages</dt>
                  <dd>{stats.pages.toLocaleString('en-US')}</dd>
                </div>
              </dl>
            </header>
          </Reveal>

          {timeline.length > 0 ? (
            <div className="reading-timeline">
              {timeline.map((year) => (
                <section
                  key={year.year}
                  className="reading-year"
                  aria-labelledby={`reading-year-${year.year}`}
                >
                  <div className="reading-entry reading-year-marker">
                    <Reveal className="reading-entry-content">
                      <h2
                        id={`reading-year-${year.year}`}
                        className="reading-year-number"
                      >
                        {year.year}
                      </h2>
                      <p className="reading-year-stat">
                        <strong>{year.booksCount}</strong>{' '}
                        {year.booksCount === 1 ? 'book' : 'books'}
                        {year.pagesCount > 0 && (
                          <span className="reading-year-pages">
                            {year.pagesCount.toLocaleString('en-US')} pages
                          </span>
                        )}
                      </p>
                    </Reveal>
                  </div>

                  {year.months.map((month) => (
                    <div
                      key={month.key}
                      className={`reading-entry reading-month is-${month.side}`}
                    >
                      <Reveal className="reading-entry-content">
                        <div className="reading-entry-header">
                          <time
                            className="reading-month-label"
                            dateTime={month.key}
                            aria-label={`${month.label} ${year.year}`}
                          >
                            {month.label}
                          </time>
                          <span className="reading-month-count">
                            {month.books.length}{' '}
                            {month.books.length === 1 ? 'book' : 'books'}
                          </span>
                        </div>
                        <BookShelf books={month.books} />
                      </Reveal>
                    </div>
                  ))}
                </section>
              ))}
            </div>
          ) : (
            <p className="reading-empty">
              No books logged yet. Check back after the next one.
            </p>
          )}

          <SiteFooter />
        </main>
      </div>
    </div>
  );
}
