import type { Metadata } from 'next';
import Link from 'next/link';
import TopHeader from '@/app/components/TopHeader';
import Reveal from '@/app/components/Reveal';
import SiteFooter from '@/app/components/SiteFooter';
import { getSortedPostsData } from '@/app/lib/posts';
import {
  SITE_LOCALE,
  SITE_NAME,
  SITE_OG_IMAGE,
  TWITTER_CREATOR,
} from '@/app/lib/site';

const BLOGS_DESCRIPTION =
  'Notes on software systems, automation, artificial intelligence, and building things from scratch.';

export const metadata: Metadata = {
  title: 'Writing',
  description: BLOGS_DESCRIPTION,
  alternates: {
    canonical: '/blogs',
  },
  openGraph: {
    type: 'website',
    url: '/blogs',
    title: `Writing — ${SITE_NAME}`,
    description: BLOGS_DESCRIPTION,
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Writing — ${SITE_NAME}`,
    description: BLOGS_DESCRIPTION,
    creator: TWITTER_CREATOR,
    images: [SITE_OG_IMAGE],
  },
};

export default function BlogsPage() {
  const posts = getSortedPostsData();

  return (
    <div className="site-shell">
      <div className="page-content">
        <TopHeader />

        <main id="top" className="reading-column main-content">
          <Reveal>
            <div className="blogs-page-header">
              <Link href="/" className="blog-back-link">
                ← home
              </Link>
              <h1 className="blogs-page-title">Writing</h1>
              <p className="blogs-page-subtitle">
                Notes on software systems, automation, artificial intelligence, and building things from scratch.
              </p>
            </div>
          </Reveal>

          <div className="blogs-list-container">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 50}>
                  <div className="blog-row">
                    <div className="blog-meta-col">
                      <span className="blog-date-label">{post.date}</span>
                      <span className="blog-time-label">{post.readingTime}</span>
                    </div>
                    <div className="blog-content-col">
                      <Link href={`/blogs/${post.slug}`} className="blog-row-link">
                        <h3 className="blog-row-title">{post.title}</h3>
                      </Link>
                      <p className="blog-row-desc">{post.description}</p>
                    </div>
                    <span className="blog-row-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </Reveal>
              ))
            ) : (
              <Reveal>
                <div style={{
                  paddingBlock: 'var(--space-7)',
                  color: 'var(--ink-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  No published articles found. Check back later.
                </div>
              </Reveal>
            )}
          </div>
          
          <SiteFooter />
        </main>
      </div>
    </div>
  );
}
