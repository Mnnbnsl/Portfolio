import { notFound } from 'next/navigation';
import Link from 'next/link';
import TopHeader from '@/app/components/TopHeader';
import Reveal from '@/app/components/Reveal';
import ProjectVisual from '@/app/components/ProjectVisual';
import SiteFooter from '@/app/components/SiteFooter';
import { getProjectBySlug, getProjects, getAllProjectSlugs } from '@/app/lib/projects';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.name} — Architecture & Details`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Get other projects for quick navigation
  const allProjects = await getProjects();
  const otherProjects = allProjects.filter((p) => p.slug !== project.slug);

  return (
    <div className="site-shell">
      <div className="page-content">
        <TopHeader />

        <main id="top" className="reading-column main-content">
          {/* Header & Back Link */}
          <Reveal>
            <div className="project-detail-header">
              <Link href="/#projects" className="detail-back-link">
                ← all projects
              </Link>

              <div className="detail-meta-row">
                <span className="detail-domain-tag">{project.domain}</span>
                {project.status && (
                  <span className="detail-status-pill">
                    <span className="pulse-dot" />
                    {project.status}
                  </span>
                )}
                <span className="detail-year">{project.year}</span>
              </div>

              <h1 className="detail-title">{project.name}</h1>
              <p className="detail-lead">{project.description}</p>
            </div>
          </Reveal>

          {/* Dedicated Visual Showcase Frame */}
          <Reveal delay={80}>
            <div className="detail-visual-stage">
              <ProjectVisual
                projectId={project.id}
                projectName={project.name}
              />
            </div>
          </Reveal>

          {/* Technical Metrics & Telemetry */}
          {project.metrics && project.metrics.length > 0 && (
            <Reveal delay={120}>
              <div className="detail-metrics-grid">
                {project.metrics.map((m) => (
                  <div key={m.label} className="detail-metric-card">
                    <span className="metric-tag">{m.label}</span>
                    <span className="metric-data">{m.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* Architecture Specifications */}
          {project.highlights && project.highlights.length > 0 && (
            <Reveal delay={160}>
              <div className="detail-section-block">
                <h2 className="detail-subheading">{'//'} ARCHITECTURAL HIGHLIGHTS</h2>
                <ul className="detail-specs-list">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="spec-item">
                      <span className="spec-bullet">▹</span>
                      <span className="spec-text">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {/* Tech Stack & Tags */}
          <Reveal delay={200}>
            <div className="detail-section-block">
              <h2 className="detail-subheading">{'//'} TECHNOLOGIES & PROTOCOLS</h2>
              <div className="detail-tags-row">
                <span className="tag domain">{project.domain}</span>
                {project.language && (
                  <span className="tag language-tag">
                    <span className="lang-indicator" />
                    {project.language}
                  </span>
                )}
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Action Links */}
          <Reveal delay={240}>
            <div className="detail-actions-block">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn primary"
                >
                  view github source →
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn secondary"
                >
                  open live deployment ↗
                </a>
              )}
              {project.blogSlug && (
                <Link
                  href={`/blogs/${project.blogSlug}`}
                  className="action-btn deepdive"
                >
                  read deep dive article ↗
                </Link>
              )}
            </div>
          </Reveal>

          {/* Next / Other Projects Strip */}
          <Reveal delay={280}>
            <div className="other-projects-strip">
              <div className="other-header">{'//'} EXPLORE OTHER ARCHITECTURES</div>
              <div className="other-cards-grid">
                {otherProjects.slice(0, 3).map((other) => (
                  <Link
                    key={other.id}
                    href={`/projects/${other.slug}`}
                    className="other-card-mini"
                  >
                    <span className="other-domain">{other.domain}</span>
                    <span className="other-name">{other.name}</span>
                    <span className="other-desc">{other.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          <SiteFooter />
        </main>
      </div>
    </div>
  );
}

