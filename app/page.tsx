import TopHeader from './components/TopHeader';
import BottomNav from './components/BottomNav';
import HeroSection from './components/HeroSection';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import BlogsSection from './components/BlogsSection';
import ContactSection from './components/ContactSection';
import { getSortedPostsData } from '@/app/lib/posts';
import { getProjects } from '@/app/lib/projects';

export default async function Home() {
  const allPosts = getSortedPostsData();
  const recentPosts = allPosts.slice(0, 3);
  const projects = await getProjects();

  return (
    <div className="site-shell" id="home">
      <div style={{ position: 'relative', zIndex: 2 }}>
        <TopHeader />

        <main id="top" className="reading-column main-content">
          <HeroSection />
          <TechStack />
          <Projects projects={projects} />
          {recentPosts.length > 0 && <BlogsSection posts={recentPosts} />}
          <ContactSection />
          
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