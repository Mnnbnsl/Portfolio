import TopHeader from './components/TopHeader';
import HeroSection from './components/HeroSection';
import OverviewSection from './components/OverviewSection';
import Projects from './components/Projects';
import BlogsSection from './components/BlogsSection';
import ReadingSection from './components/ReadingSection';
import ContactSection from './components/ContactSection';
import SiteFooter from './components/SiteFooter';
import { getSortedPostsData } from '@/app/lib/posts';
import { getProjects } from '@/app/lib/projects';

/** The home shelf mirrors /books, so refresh it on the same hourly cadence. */
export const revalidate = 3600;

export default async function Home() {
  const allPosts = getSortedPostsData();
  const recentPosts = allPosts.slice(0, 3);
  const projects = await getProjects();

  return (
    <div className="site-shell" id="home">
      <div className="page-content">
        <TopHeader />

        <main id="top" className="reading-column main-content home-main">
          <HeroSection />
          <OverviewSection />
          <Projects projects={projects} />
          {recentPosts.length > 0 && <BlogsSection posts={recentPosts} />}
          <ReadingSection />
          <ContactSection />

          <SiteFooter />
        </main>
      </div>
    </div>
  );
}