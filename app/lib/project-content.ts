export interface ProjectOverride {
  name?: string;
  year?: number;
  description?: string;
  domain?: string;
  tags?: string[];
  link?: string;
  highlights?: string[];
  metrics?: { label: string; value: string }[];
  status?: string;
  blogSlug?: string;
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
    status: 'Systems Core',
    highlights: [
      'Custom RESP2 wire-protocol codec parser & serializer in Go',
      'Non-blocking Epoll event-loop handling TCP connection multiplexing',
      'In-memory key-value dictionary with active/passive TTL eviction',
    ],
    metrics: [
      { label: 'Latency', value: '< 0.05ms' },
      { label: 'Protocol', value: 'RESP2 / TCP' },
      { label: 'Event Loop', value: 'epoll' },
    ],
  },
  shorty: {
    year: 2026,
    description: 'A URL shortener backend with PostgreSQl and Redis for caching.',
    domain: 'Backend',
    tags: ['Go', 'PostgreSQl', 'Redis', 'HTTP'],
    status: 'High Throughput',
    highlights: [
      'Base62 encoding engine with collision-resistant token generation',
      'Redis caching tier with fast-path redirects (<1ms response)',
      'Connection pooling with PostgreSQL for persistent lookups',
    ],
    metrics: [
      { label: 'Cache Hit', value: '< 1ms' },
      { label: 'Store', value: 'PostgreSQL' },
      { label: 'Cache', value: 'Redis' },
    ],
  },
  'Mockingjay-Claw': {
    year: 2026,
    description:
      'A CLI coding agent built from scratch — file reading, modification tools, and web search, all from the terminal.',
    domain: 'Automation',
    tags: ['TypeScript', 'Bun', 'CLI', 'AI Agent'],
    status: 'Autonomous CLI',
    highlights: [
      'Autonomous prompt-eval loop executing file and system tools',
      'High-speed ripgrep integration for symbol and codebase search',
      'Atomic file modification with structured git diff generation',
    ],
    metrics: [
      { label: 'Runtime', value: 'Bun' },
      { label: 'Search', value: 'ripgrep' },
      { label: 'Interface', value: 'CLI Terminal' },
    ],
    blogSlug: 'building-mockingjay-claw',
  },
  'Smart-Stock-Engine': {
    year: 2026,
    description:
      'Stock analysis and forecasting over technical indicators, momentum, volatility, and delivery data.',
    domain: 'AI/ML',
    tags: ['Python', 'PyTorch', 'Time Series', 'Forecasting'],
    status: 'Quantitative Model',
    highlights: [
      'PyTorch deep-learning time-series forecasting over market OHLCV data',
      'Feature extraction across RSI, MACD, Bollinger Bands, and momentum',
      'Dynamic confidence-interval bands and historical backtesting',
    ],
    metrics: [
      { label: 'Framework', value: 'PyTorch' },
      { label: 'Model', value: 'LSTM / Seq2Seq' },
      { label: 'Horizon', value: 'Multi-Step' },
    ],
  },
  Vapor: {
    year: 2026,
    description: 'Ephemeral room-based chat app — no database, purely RAM.',
    domain: 'Full-Stack',
    tags: ['Next.js', 'TypeScript', 'Node.js', 'WebSockets'],
    status: 'Zero-Disk RAM',
    highlights: [
      'Zero-database memory architecture storing 0 bytes on disk',
      'Garbage collector sweeping inactive rooms automatically after 5 minutes',
      'Real-time WebSocket connection state with instant handoff',
    ],
    metrics: [
      { label: 'Disk Footprint', value: '0 Bytes' },
      { label: 'State', value: 'Pure RAM' },
      { label: 'Transport', value: 'WebSockets' },
    ],
    blogSlug: 'vapor-ephemeral-chat',
  },
  Sahayak: {
    year: 2026,
    description:
      'AI-powered disaster & mishap response and volunteer coordination platform.',
    domain: 'Gen AI',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.IO', 'Cloudinary'],
    link: 'https://sahayak-woad.vercel.app',
    status: 'Emergency Mesh',
    highlights: [
      'Geospatial incident mapping and live distress beacon routing',
      'AI-assisted severity triage and automated volunteer dispatch',
      'Socket.IO real-time volunteer cluster coordination network',
    ],
    metrics: [
      { label: 'Dispatch', value: 'Real-time' },
      { label: 'Sockets', value: 'Socket.IO' },
      { label: 'Status', value: 'Live Platform' },
    ],
    blogSlug: 'sahayak-disaster-response',
  },
};
