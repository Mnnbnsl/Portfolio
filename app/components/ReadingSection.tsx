import Link from 'next/link';
import { getReadingPreview, getReadingStats } from '@/app/lib/books';
import BookShelf from './BookShelf';
import Reveal from './Reveal';

export default async function ReadingSection() {
  const books = await getReadingPreview(4);

  if (books.length === 0) {
    return null;
  }

  const stats = await getReadingStats();

  return (
    <section className="books-section" id="reading">
      <div className="projects-header">
        <h2 className="section-heading">Reading</h2>
        <p className="section-subtitle">
          A few recent reads from a {stats.books}-book shelf, newest first.
        </p>
      </div>

      <Reveal>
        <BookShelf books={books} />
      </Reveal>

      <div className="blogs-footer">
        <Link href="/books" className="blogs-more-link">
          all books →
        </Link>
      </div>
    </section>
  );
}
