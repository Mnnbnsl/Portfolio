import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import {
  HardcoverClient,
  allPages,
  localDate,
  type FinishedRead,
} from '@hardcover/sdk';

export interface Book {
  title: string;
  author: string;
  /** Date finished, as an ISO calendar date: YYYY-MM-DD. */
  finished: string;
  /** Cover URL (Hardcover CDN or /public/books/...); falls back to a typographic cover. */
  cover?: string;
  rating?: number;
  pages?: number;
  link?: string;
}

export type TimelineSide = 'left' | 'right';

export interface ReadingMonth {
  /** YYYY-MM, used as the machine-readable value for <time>. */
  key: string;
  label: string;
  books: Book[];
  side: TimelineSide;
}

export interface ReadingYear {
  year: number;
  booksCount: number;
  pagesCount: number;
  months: ReadingMonth[];
}

export interface ReadingStats {
  books: number;
  years: number;
  pages: number;
}

/**
 * Fallback shelf. Live data comes from Hardcover when HARDCOVER_API_TOKEN is
 * set; this list renders instead when the token is missing or the request
 * fails, so the timeline never disappears.
 */
export const readingList: Book[] = [
  {
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    finished: '2026-11-02',
    rating: 5,
    pages: 616,
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'David Thomas & Andrew Hunt',
    finished: '2026-10-18',
    rating: 5,
    pages: 352,
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    finished: '2026-10-03',
    rating: 4,
    pages: 443,
  },
  {
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    finished: '2026-09-21',
    rating: 5,
    pages: 476,
  },
  {
    title: 'The Mom Test',
    author: 'Rob Fitzpatrick',
    finished: '2026-09-05',
    rating: 4,
    pages: 136,
  },
  {
    title: 'System Design Interview, Vol. 1',
    author: 'Alex Xu',
    finished: '2026-08-12',
    rating: 4,
    pages: 322,
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    finished: '2026-07-24',
    rating: 4,
    pages: 320,
  },
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    finished: '2025-12-14',
    rating: 5,
    pages: 304,
  },
  {
    title: 'The Almanack of Naval Ravikant',
    author: 'Eric Jorgenson',
    finished: '2025-11-08',
    rating: 4,
    pages: 244,
  },
  {
    title: 'Zero to One',
    author: 'Peter Thiel',
    finished: '2025-09-19',
    rating: 4,
    pages: 224,
  },
  {
    title: 'Building a Second Brain',
    author: 'Tiago Forte',
    finished: '2025-06-27',
    rating: 3,
    pages: 256,
  },
  {
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    finished: '2025-02-11',
    rating: 5,
    pages: 256,
  },
  {
    title: 'Educated',
    author: 'Tara Westover',
    finished: '2024-12-30',
    rating: 5,
    pages: 352,
  },
  {
    title: 'The Martian',
    author: 'Andy Weir',
    finished: '2024-08-16',
    rating: 4,
    pages: 369,
  },
  {
    title: "Man's Search for Meaning",
    author: 'Viktor E. Frankl',
    finished: '2024-04-09',
    rating: 5,
    pages: 192,
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    finished: '2024-01-22',
    rating: 3,
    pages: 180,
  },
];

/** Hardcover has no "everything" range, so start earlier than any plausible read. */
const HISTORY_START = '1990-01-01';

function authorOf(read: FinishedRead): string {
  const contributors = read.userBook?.book?.cachedContributors ?? [];
  const authors = contributors.filter(
    (contributor) =>
      !contributor.contribution ||
      contributor.contribution.toLowerCase() === 'author'
  );
  const primary =
    authors.find((contributor) => contributor.primary) ?? authors[0];

  return primary?.author?.name ?? 'Unknown author';
}

/** Maps one Hardcover finished read into the shape the shelves render. */
function toBook(read: FinishedRead): Book | null {
  const book = read.userBook?.book;

  if (!book?.title || !read.finishedAt) {
    return null;
  }

  const cover = book.cachedImage?.url;
  const pages = read.edition?.pages ?? book.pages ?? undefined;
  const rating = read.userBook?.rating ?? undefined;

  return {
    title: book.title,
    author: authorOf(read),
    finished: read.finishedAt.slice(0, 10),
    ...(cover ? { cover } : {}),
    ...(rating ? { rating } : {}),
    ...(pages ? { pages } : {}),
    ...(book.slug ? { link: `https://hardcover.app/books/${book.slug}` } : {}),
  };
}

async function fetchHardcoverReads(): Promise<Book[]> {
  const token = process.env.HARDCOVER_API_TOKEN?.trim();

  if (!token) {
    return readingList;
  }

  try {
    const hc = new HardcoverClient({
      token,
      userAgent: 'mananbansal.dev (portfolio)',
    });

    const books: Book[] = [];

    for await (const read of allPages(
      (page) =>
        hc.reads.finished({
          from: HISTORY_START,
          to: localDate(new Date()),
          ...page,
        }),
      { pageSize: 100 }
    )) {
      const book = toBook(read);

      if (book) {
        books.push(book);
      }
    }

    if (books.length === 0) {
      return readingList;
    }

    console.info(`[books] loaded ${books.length} reads from Hardcover`);

    return books;
  } catch (error) {
    console.warn(
      '[books] Hardcover fetch failed, using the fallback shelf:',
      error instanceof Error ? error.message : error
    );
    return readingList;
  }
}

/** How long a fetched shelf stays warm before the API is asked again. */
const READING_CACHE_SECONDS = 6 * 60 * 60;
const READING_CACHE_MS = READING_CACHE_SECONDS * 1000;

/**
 * Persistent cache: shared across requests, workers and restarts, so a render
 * only reaches Hardcover once per window. `revalidateTag('hardcover')` busts it
 * from a route handler or server action.
 */
const loadBooks = unstable_cache(fetchHardcoverReads, ['hardcover-reads'], {
  revalidate: READING_CACHE_SECONDS,
  tags: ['hardcover'],
});

interface WarmShelf {
  books: Book[];
  expiresAt: number;
}

/** Process-level layer: survives even where the Next.js cache is bypassed. */
let warmShelf: WarmShelf | null = null;
let inFlight: Promise<Book[]> | null = null;

async function readShelf(): Promise<Book[]> {
  if (warmShelf && warmShelf.expiresAt > Date.now()) {
    return warmShelf.books;
  }

  if (!inFlight) {
    // One request per process even when several renders arrive together.
    inFlight = loadBooks()
      .catch((error: unknown) => {
        console.warn(
          '[books] cached shelf unavailable, using the fallback shelf:',
          error instanceof Error ? error.message : error
        );
        return readingList;
      })
      .then((books) => {
        warmShelf = { books, expiresAt: Date.now() + READING_CACHE_MS };
        return books;
      })
      .finally(() => {
        inFlight = null;
      });
  }

  return inFlight;
}

/**
 * Deduped three ways: per request (`cache`), per process (warm shelf plus a
 * shared in-flight promise), and across requests/restarts (`unstable_cache`).
 */
export const getReadingList = cache(readShelf);

const longMonthFormat = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  timeZone: 'UTC',
});

function toUtcDate(finished: string): Date | null {
  const date = new Date(`${finished}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * Groups the reading list by year and month, newest first, and computes the
 * per-year totals shown beside each year heading. Months alternate sides of
 * the centered spine across the whole timeline, not per year.
 */
function buildTimeline(books: Book[]): ReadingYear[] {
  const years = new Map<number, Map<number, Book[]>>();

  const sorted = [...books].sort((a, b) =>
    b.finished.localeCompare(a.finished)
  );

  for (const book of sorted) {
    const date = toUtcDate(book.finished);

    if (!date) {
      continue;
    }

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();

    const months = years.get(year) ?? new Map<number, Book[]>();
    const monthBooks = months.get(month) ?? [];
    monthBooks.push(book);
    months.set(month, monthBooks);
    years.set(year, months);
  }

  let sideIndex = 0;
  const nextSide = (): TimelineSide =>
    sideIndex++ % 2 === 0 ? 'left' : 'right';

  return [...years.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, months]) => {
      const monthGroups: ReadingMonth[] = [...months.entries()]
        .sort(([a], [b]) => b - a)
        .map(([month, monthBooks]) => {
          const date = new Date(Date.UTC(year, month, 1));

          return {
            key: `${year}-${String(month + 1).padStart(2, '0')}`,
            label: longMonthFormat.format(date),
            books: monthBooks,
            side: nextSide(),
          };
        });

      const booksCount = monthGroups.reduce(
        (total, group) => total + group.books.length,
        0
      );

      const pagesCount = monthGroups.reduce(
        (total, group) =>
          total +
          group.books.reduce((pages, book) => pages + (book.pages ?? 0), 0),
        0
      );

      return {
        year,
        booksCount,
        pagesCount,
        months: monthGroups,
      };
    });
}

export async function getReadingTimeline(): Promise<ReadingYear[]> {
  return buildTimeline(await getReadingList());
}

export async function getReadingStats(): Promise<ReadingStats> {
  const timeline = await getReadingTimeline();

  return {
    books: timeline.reduce((total, year) => total + year.booksCount, 0),
    years: timeline.length,
    pages: timeline.reduce((total, year) => total + year.pagesCount, 0),
  };
}

/** Newest books across all years, for the home page preview. */
export async function getReadingPreview(limit = 4): Promise<Book[]> {
  const timeline = await getReadingTimeline();

  return timeline
    .flatMap((year) => year.months.flatMap((month) => month.books))
    .slice(0, limit);
}
