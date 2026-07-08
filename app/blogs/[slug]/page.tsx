import { notFound } from 'next/navigation';
import Link from 'next/link';
import TopHeader from '@/app/components/TopHeader';
import BottomNav from '@/app/components/BottomNav';
import Reveal from '@/app/components/Reveal';
import { getPostData, getSortedPostsData } from '@/app/lib/posts';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostData(slug);
  
  if (!post) {
    return {};
  }
  
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="site-shell">
      {/* Background layers */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        backgroundSize: '40px 40px',
        backgroundImage: 'linear-gradient(to right, rgba(237,240,230,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(237,240,230,0.07) 1px, transparent 1px)',
      }} />

      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        backgroundColor: 'var(--canvas)',
        maskImage: 'radial-gradient(ellipse 50% 100% at 50% 50%, transparent 40%, black 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 50% 100% at 50% 50%, transparent 40%, black 80%)',
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <TopHeader />

        <main className="reading-column main-content">
          <Reveal>
            <div className="blog-post-header">
              <Link href="/blogs" className="blog-back-link">
                ← writing
              </Link>
              
              <div className="blog-post-meta">
                <span className="blog-date">{post.date}</span>
                <span className="blog-meta-dot">·</span>
                <span className="blog-reading-time">{post.readingTime}</span>
              </div>
              
              <h1 className="blog-post-title">{post.title}</h1>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <article 
              className="prose-blog"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </Reveal>
          
          <footer className="site-footer">
            <span>© 2026 Manan Bansal</span>
            <span>Built with Next.js & Turbopack</span>
          </footer>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
