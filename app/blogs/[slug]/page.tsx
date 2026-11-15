import { notFound } from 'next/navigation';
import Link from 'next/link';
import TopHeader from '@/app/components/TopHeader';
import Reveal from '@/app/components/Reveal';
import SiteFooter from '@/app/components/SiteFooter';
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
      <div className="page-content">
        <TopHeader />

        <main id="top" className="reading-column main-content">
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
          
          <SiteFooter />
        </main>
      </div>
    </div>
  );
}
