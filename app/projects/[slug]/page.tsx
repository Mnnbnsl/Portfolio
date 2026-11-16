import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import TopHeader from '@/app/components/TopHeader';
import Reveal from '@/app/components/Reveal';
import ProjectArtifacts from '@/app/components/ProjectArtifacts';
import SiteFooter from '@/app/components/SiteFooter';
import {
  getProjectBySlug,
  getAllProjectSlugs,
  type Project,
} from '@/app/lib/projects';
import { getSortedPostsData } from '@/app/lib/posts';
import {
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  TWITTER_CREATOR,
  absoluteUrl,
} from '@/app/lib/site';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Publication anchor is the project year; the modification date follows the
 * repository's last push so social cards and schema.org stay truthful.
 */
function projectDates(project: Project) {
  const published = new Date(Date.UTC(project.year, 0, 1));
  const pushed = project.updatedAt ? new Date(project.updatedAt) : undefined;
  const modified =
    pushed && !Number.isNaN(pushed.getTime()) ? pushed : published;

  return { published: published.toISOString(), modified: modified.toISOString() };
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project not found',
      robots: { index: false, follow: false },
    };
  }

  const path = `/projects/${project.slug}`;
  const title = `${project.name} — ${project.domain} case study`;
  const images = [
    {
      url: `${path}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: `${project.name} — ${project.domain} project by ${SITE_NAME}`,
    },
  ];

  const dates = projectDates(project);
  const publishedTime = dates.published;
  const modifiedTime = dates.modified;

  const keywords = Array.from(
    new Set(
      [
        project.name,
        project.domain,
        project.language,
        ...project.tags,
        'case study',
        'software engineering',
        SITE_NAME,
      ].filter((keyword): keyword is string => Boolean(keyword))
    )
  );

  return {
    title,
    description: project.description,
    keywords,
    alternates: {
      canonical: path,
    },
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    category: project.domain,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'article',
      url: path,
      title,
      description: project.description,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      tags: project.tags,
      authors: [SITE_NAME],
      publishedTime,
      modifiedTime,
      section: project.domain,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.description,
      creator: TWITTER_CREATOR,
      images: images.map((image) => image.url),
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const blogPost = project.blogSlug
    ? getSortedPostsData().find((post) => post.slug === project.blogSlug)
    : undefined;

  const architecture = project.architecture;
  const hasActions = Boolean(project.repo || project.link);
  const hasHighlights = Boolean(
    project.highlights && project.highlights.length > 0
  );
  const sectionNumber = (value: number) => String(value).padStart(2, '0');
  const stackIndex = sectionNumber(hasHighlights ? 2 : 1);
  const architectureIndex = sectionNumber(hasHighlights ? 3 : 2);

  const projectUrl = absoluteUrl(`/projects/${project.slug}`);
  const projectImage = absoluteUrl(`/projects/${project.slug}/opengraph-image`);
  const projectDatesIso = projectDates(project);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: 'en',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${projectUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: absoluteUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projects',
            item: absoluteUrl('/#projects'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.name,
            item: projectUrl,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${projectUrl}#webpage`,
        url: projectUrl,
        name: `${project.name} — ${project.domain} case study`,
        description: project.description,
        inLanguage: 'en',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': `${projectUrl}#breadcrumb` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: projectImage,
          width: 1200,
          height: 630,
        },
        about: { '@id': `${projectUrl}#project` },
        datePublished: projectDatesIso.published,
        dateModified: projectDatesIso.modified,
      },
      {
        '@type': 'SoftwareSourceCode',
        '@id': `${projectUrl}#project`,
        name: project.name,
        description: project.description,
        url: projectUrl,
        genre: project.domain,
        dateCreated: String(project.year),
        dateModified: projectDatesIso.modified,
        image: projectImage,
        inLanguage: 'en',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntityOfPage: { '@id': `${projectUrl}#webpage` },
        author: {
          '@type': 'Person',
          name: SITE_NAME,
          url: SITE_URL,
        },
        ...(project.repo ? { codeRepository: project.repo } : {}),
        ...(project.language
          ? { programmingLanguage: project.language }
          : {}),
        ...(project.tags.length > 0
          ? { keywords: project.tags.join(', ') }
          : {}),
        ...(project.repo || project.link
          ? { sameAs: [project.repo, project.link].filter(Boolean) }
          : {}),
      },
    ],
  };
  const structuredDataJson = JSON.stringify(structuredData).replace(
    /</g,
    '\\u003c'
  );

  return (
    <div className="site-shell">
      <div className="page-content">
        <TopHeader />

        <main id="top" className="project-detail-main">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: structuredDataJson }}
          />

          <div className="project-detail-stage">
            <div className="project-detail-column">
              <Reveal>
                <header className="project-detail-header">
                  {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- native hash link; smooth scrolling comes from CSS */}
                  <a href="/#projects" className="detail-back-link">
                    ← all projects
                  </a>

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
                </header>
              </Reveal>
            </div>

            <ProjectArtifacts
              projectId={project.id}
              projectName={project.name}
            />

            <div className="project-detail-column">
              {project.highlights && project.highlights.length > 0 && (
                <Reveal delay={80}>
                  <section
                    className="detail-section-block"
                    aria-labelledby="highlights-heading"
                  >
                    <div className="detail-section-head">
                      <span className="detail-section-index">01</span>
                      <h2
                        id="highlights-heading"
                        className="detail-section-title"
                      >
                        Main highlights
                      </h2>
                    </div>

                    <ol className="highlight-list">
                      {project.highlights.map((highlight, index) => (
                        <li key={highlight} className="highlight-item">
                          <span className="highlight-index">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <p className="highlight-text">{highlight}</p>
                        </li>
                      ))}
                    </ol>

                    {project.metrics && project.metrics.length > 0 && (
                      <div className="detail-readout">
                        {project.metrics.map((metric) => (
                          <div key={metric.label} className="readout-cell">
                            <span className="readout-label">
                              {metric.label}
                            </span>
                            <span className="readout-value">
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                </Reveal>
              )}

              <Reveal delay={140}>
                <section
                  className="detail-section-block"
                  aria-labelledby="stack-heading"
                >
                  <div className="detail-section-head">
                    <span className="detail-section-index">{stackIndex}</span>
                    <h2 id="stack-heading" className="detail-section-title">
                      Tech stack
                    </h2>
                  </div>

                  <div className="detail-stack-panel">
                    <div className="detail-stack-meta">
                      <div className="stack-meta-item">
                        <span className="stack-meta-label">Domain</span>
                        <span className="stack-meta-value">
                          {project.domain}
                        </span>
                      </div>
                      {project.language && (
                        <div className="stack-meta-item">
                          <span className="stack-meta-label">
                            Primary language
                          </span>
                          <span className="stack-meta-value">
                            {project.language}
                          </span>
                        </div>
                      )}
                      <div className="stack-meta-item">
                        <span className="stack-meta-label">Year</span>
                        <span className="stack-meta-value">{project.year}</span>
                      </div>
                    </div>

                    {project.tags.length > 0 && (
                      <div className="detail-tags-row">
                        {project.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              </Reveal>

              {architecture && architecture.layers.length > 0 && (
                <Reveal delay={200}>
                  <section
                    className="detail-section-block"
                    aria-labelledby="architecture-heading"
                  >
                    <div className="detail-section-head">
                      <span className="detail-section-index">
                        {architectureIndex}
                      </span>
                      <h2
                        id="architecture-heading"
                        className="detail-section-title"
                      >
                        Architecture
                      </h2>
                    </div>

                    {architecture.caption && (
                      <p className="architecture-caption">
                        {architecture.caption}
                      </p>
                    )}

                    <div className="architecture-diagram">
                      {architecture.layers.map((layer, index) => (
                        <div key={layer.label} className="architecture-step">
                          <div className="architecture-lane">
                            <span className="architecture-label">
                              <span className="architecture-label-index">
                                L{index + 1}
                              </span>
                              {layer.label}
                            </span>
                            <div className="architecture-nodes">
                              {layer.nodes.map((node) => (
                                <span
                                  key={node}
                                  className="architecture-node"
                                >
                                  {node}
                                </span>
                              ))}
                            </div>
                          </div>

                          {index < architecture.layers.length - 1 && (
                            <div
                              className="architecture-connector"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                </Reveal>
              )}

              {blogPost && (
                <Reveal delay={240}>
                  <Link
                    href={`/blogs/${blogPost.slug}`}
                    className="detail-deepdive"
                  >
                    <span className="detail-deepdive-copy">
                      <span className="detail-deepdive-label">
                        Deep dive article
                      </span>
                      <span className="detail-deepdive-title">
                        {blogPost.title}
                      </span>
                      <span className="detail-deepdive-meta">
                        {blogPost.readingTime} · full engineering write-up
                      </span>
                    </span>
                    <span
                      className="detail-deepdive-arrow"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </Link>
                </Reveal>
              )}

              {hasActions && (
                <Reveal delay={280}>
                  <section
                    className="detail-actions-block"
                    aria-label="Project links"
                  >
                    <div className="detail-actions-heading">
                      Source &amp; deployment
                    </div>
                    <div className="detail-actions-row">
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-btn primary"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.89 1.529 2.341 1.544 2.914 1.18.09-.916.347-1.544.635-1.899-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                          </svg>
                          GitHub source
                        </a>
                      )}

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`action-btn ${
                            project.repo ? 'secondary' : 'primary'
                          }`}
                        >
                          <span>Live demo</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </section>
                </Reveal>
              )}
            </div>
          </div>

          <div className="project-detail-column">
            <SiteFooter />
          </div>
        </main>
      </div>
    </div>
  );
}
