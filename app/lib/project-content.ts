export interface ProjectOverride {
  name?: string;
  year?: number;
  description?: string;
  domain?: string;
  tags?: string[];
  link?: string;
}

/**
 * Repositories rendered in the Projects section, in display order.
 * The first block mirrors the pinned repositories on the GitHub profile;
 * the rest are additional featured work kept below them.
 * Pin or unpin on GitHub, then add or move the repo name here.
 */
export const projectRepoNames: string[] = [
  // Pinned on github.com/mnnbnsl
  'Sider',
  'shorty',
  'Mockingjay-Claw',
  'Smart-Stock-Engine',
  // Additional featured work
  'Vapor',
  'Sahayak',
];

/**
 * Hand-written copy, keyed by repository name. Any field left out falls back
 * to the data GitHub returns, so a newly listed repository needs no entry.
 * `year` is pinned rather than derived because "last pushed" drifts forward
 * every time a repository is committed to.
 */
export const projectOverrides: Record<string, ProjectOverride | undefined> = {
  Sider: {
    year: 2026,
    description:
      'Redis-inspired in-memory datastore built from scratch — RESP2 codec, TCP server, epoll event loop, and TTL expiration.',
    domain: 'Systems',
    tags: ['Go', 'RESP2', 'Networking', 'Epoll'],
  },
  shorty: {
    year: 2026,
    description: 'A URL shortener backend with PostgreSQl and Redis for caching.',
    domain: 'Backend',
    tags: ['Go', 'PostgreSQl','Redis', 'HTTP'],
  },
  'Mockingjay-Claw': {
    year: 2026,
    description:
      'A CLI coding agent built from scratch — file reading, modification tools, and web search, all from the terminal.',
    domain: 'Automation',
    tags: ['TypeScript', 'Bun', 'CLI', 'AI Agent'],
  },
  'Smart-Stock-Engine': {
    year: 2026,
    description:
      'Stock analysis and forecasting over technical indicators, momentum, volatility, and delivery data.',
    domain: 'AI/ML',
    tags: ['Python', 'PyTorch', 'Time Series', 'Forecasting'],
  },
  Vapor: {
    year: 2026,
    description: 'Ephemeral room-based chat app — no database, purely RAM.',
    domain: 'Full-Stack',
    tags: ['Next.js', 'TypeScript', 'Node.js', 'WebSockets'],
  },
  Sahayak: {
    year: 2026,
    description:
      'AI-powered disaster & mishap response and volunteer coordination platform.',
    domain: 'Gen AI',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.IO', 'Cloudinary'],
    link: 'https://sahayak-woad.vercel.app',
  },
};
