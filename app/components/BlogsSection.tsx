import Link from 'next/link';
import { PostMetadata } from '@/app/lib/posts';
import Reveal from './Reveal';

interface BlogsSectionProps {
  posts: PostMetadata[];
}

export default function BlogsSection({ posts }: BlogsSectionProps) {
  return (
    <section className="blogs-section" id="writing">
      <div className="projects-header">
        <h2 className="section-heading">Writing</h2>
      </div>

      <div className="blogs-list-container">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 70}>
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
            </div>
          </Reveal>
        ))}
      </div>

      <div className="blogs-footer">
        <Link href="/blogs" className="blogs-more-link">
          more writing →
        </Link>
      </div>
    </section>
  );
}
