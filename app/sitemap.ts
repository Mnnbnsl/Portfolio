import type { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/app/lib/posts';
import { getProjects } from '@/app/lib/projects';
import { absoluteUrl } from '@/app/lib/site';

/** Refresh alongside the GitHub and Hardcover data caches. */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([
    getProjects(),
    Promise.resolve(getSortedPostsData()),
  ]);
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/blogs'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: absoluteUrl('/books'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => {
    // Prefer the real last-commit date so a materially changed case study is
    // recrawled; fall back to the project year when GitHub is unreachable.
    const updated = project.updatedAt ? new Date(project.updatedAt) : undefined;

    return {
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified:
        updated && !Number.isNaN(updated.getTime())
          ? updated
          : new Date(Date.UTC(project.year, 0, 1)),
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  });

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    const published = new Date(post.date);

    return {
      url: absoluteUrl(`/blogs/${post.slug}`),
      lastModified: Number.isNaN(published.getTime()) ? now : published,
      changeFrequency: 'monthly',
      priority: 0.6,
    };
  });

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
