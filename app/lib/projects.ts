import { getRepos, type GitHubRepo } from './github';
import { projectOverrides, projectRepoNames } from './project-content';

export interface Project {
  id: string;
  name: string;
  slug: string;
  year: number;
  description: string;
  domain: string;
  tags: string[];
  repo?: string;
  link?: string;
  language?: string;
  stars?: number;
  status?: string;
  highlights?: string[];
  metrics?: { label: string; value: string }[];
  blogSlug?: string;
}

export function toProjectSlug(nameOrId: string): string {
  return nameOrId
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function toYear(pushedAt: string | null | undefined): number | undefined {
  if (!pushedAt) {
    return undefined;
  }

  const year = new Date(pushedAt).getUTCFullYear();
  return Number.isNaN(year) ? undefined : year;
}

/**
 * Merges curated copy with live GitHub data.
 *
 * A repository with an override always renders. A repository without one is
 * only rendered when GitHub returned it, so an API outage can never produce
 * a blank card. Output order follows `projectRepoNames`.
 */
export async function getProjects(): Promise<Project[]> {
  const repos = await getRepos();
  const reposByName = new Map(
    repos.map((repo) => [repo.name.toLowerCase(), repo] as const)
  );

  const projects: Project[] = [];

  for (const repoName of projectRepoNames) {
    const key = repoName.toLowerCase();
    const repo: GitHubRepo | undefined = reposByName.get(key);
    const override = projectOverrides[repoName];

    if (!repo && !override) {
      continue;
    }

    const year = override?.year ?? toYear(repo?.pushed_at);
    const description = override?.description ?? repo?.description ?? '';

    // Without these the card would render incomplete.
    if (year === undefined || !description) {
      continue;
    }

    const name = override?.name ?? repo?.name ?? repoName;
    const slug = toProjectSlug(name);

    const project: Project = {
      id: repo?.name ?? repoName,
      name,
      slug,
      year,
      description,
      domain: override?.domain ?? repo?.language ?? 'Project',
      tags: override?.tags ?? repo?.topics ?? [],
      repo: repo?.html_url,
      link: override?.link ?? repo?.homepage ?? undefined,
      status: override?.status,
      highlights: override?.highlights,
      metrics: override?.metrics,
      blogSlug: override?.blogSlug,
    };

    if (repo?.language) {
      project.language = repo.language;
    }

    if (repo && repo.stargazers_count > 0) {
      project.stars = repo.stargazers_count;
    }

    projects.push(project);
  }

  return projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  const normalized = slug.toLowerCase();
  return projects.find(
    (p) => p.slug === normalized || toProjectSlug(p.id) === normalized
  );
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const projects = await getProjects();
  return projects.map((p) => p.slug);
}
