import type { Book } from '@/app/lib/books';
import BookCover from './BookCover';

interface BookShelfProps {
  books: Book[];
}

function bookMeta(book: Book): string {
  return book.rating ? `${book.author} · ${book.rating}/5` : book.author;
}

export default function BookShelf({ books }: BookShelfProps) {
  return (
    <ul className="book-grid">
      {books.map((book) => {
        const content = (
          <>
            <BookCover book={book} />
            <span className="book-caption">
              <span className="book-title">{book.title}</span>
              <span className="book-author">{bookMeta(book)}</span>
            </span>
          </>
        );

        return (
          <li key={`${book.title}-${book.finished}`} className="book-card">
            {book.link ? (
              <a
                href={book.link}
                className="book-card-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            ) : (
              <div className="book-card-link">{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
