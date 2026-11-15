import Image from 'next/image';
import type { Book } from '@/app/lib/books';

interface BookCoverProps {
  book: Book;
}

/**
 * Renders a real cover when one has been added, otherwise a typographic cover
 * generated from the title and author so the shelf never shows a broken image.
 */
export default function BookCover({ book }: BookCoverProps) {
  return (
    <span className="book-cover">
      {book.cover ? (
        <Image
          src={book.cover}
          alt={`Cover of ${book.title} by ${book.author}`}
          fill
          className="book-cover-image"
          sizes="(max-width: 640px) 42vw, (max-width: 900px) 30vw, 190px"
        />
      ) : (
        <span className="book-cover-fallback">
          <span className="book-cover-rule" aria-hidden="true" />
          <span className="book-cover-title">{book.title}</span>
          <span className="book-cover-author">{book.author}</span>
        </span>
      )}
    </span>
  );
}
