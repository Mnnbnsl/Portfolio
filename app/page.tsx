import TopHeader from './components/TopHeader';
import BottomNav from './components/BottomNav';
import HeroSection from './components/HeroSection';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import BlogsSection from './components/BlogsSection';
import { getSortedPostsData } from '@/app/lib/posts';

export default function Home() {
  const allPosts = getSortedPostsData();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <div className="site-shell" id="home">
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

        <main id="top" className="reading-column main-content">
          <HeroSection />
          <TechStack />
          <Projects />
          {recentPosts.length > 0 && <BlogsSection posts={recentPosts} />}
          
          <footer className="site-footer">
            <span>© 2026 Manan Bansal</span>
            <span>Built with Next.js</span>
          </footer>
        </main>

        <BottomNav />
      </div>

    </div>
  );
}