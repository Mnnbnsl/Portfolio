const GITHUB_USER = 'mnnbnsl';
const REPOS_PER_PAGE = 100;

export interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  homepage: string | null;
  topics?: string[];
  pushed_at: string | null;
  html_url: string;
}

/**
 * Fetches every public repository for the profile in a single request.
 * Returns an empty list on any failure so a build or runtime outage
 * degrades to override-only cards rather than breaking the page.
 */
export async function getRepos(): Promise<GitHubRepo[]> {
  const url = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=${REPOS_PER_PAGE}&sort=pushed`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/vnd.github+json' },
    });

    if (!response.ok) {
      console.error(`GitHub API request failed with status ${response.status}`);
      return [];
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error('GitHub API returned an unexpected payload');
      return [];
    }

    return data as GitHubRepo[];
  } catch (error) {
    console.error('Error fetching repositories from GitHub:', error);
    return [];
  }
}
