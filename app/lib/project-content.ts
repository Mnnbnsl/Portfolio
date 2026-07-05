export interface Project {
  id: string;
  name: string;
  year: number;
  description: string;
  domain: string;
  tags: string[];
  repo?: string;
  link?: string;
}

export const projects: Project[] = [
  {
    id: "sahayak",
    name: "Sahayak",
    year: 2026,
    description:
      "AI-powered disaster & mishap response and volunteer coordination platform.",
    domain: "Gen AI",
    tags: ["React", "Node.js", "MongoDB", "Socket.IO", "Cloudinary"],
    repo: "https://github.com/Mnnbnsl/Sahayak",
    link: "https://sahayak-woad.vercel.app",
  },
  {
    id: "vapor",
    name: "Vapor",
    year: 2026,
    description:
      "Ephemeral room-based chat app — no database, purely RAM.",
    domain: "Full-Stack",
    tags: ["Next.js", "TypeScript", "Node.js", "WebSockets"],
    repo: "https://github.com/Mnnbnsl/Vapor",
  },
  {
    id: "mockingjay-claw",
    name: "Mockingjay Claw",
    year: 2026,
    description:
      "A CLI coding agent built from scratch — file reading, modification tools, and web search, all from the terminal.",
    domain: "Automation",
    tags: ["TypeScript", "Bun", "CLI", "AI Agent"],
    repo: "https://github.com/Mnnbnsl/Mockingjay-Claw",
  },
  {
    id: "cybersecurity-classifier",
    name: "Cybersecurity Attack Classifier",
    year: 2025,
    description:
      "Fine-tuned GPT-2 transformer to classify cybersecurity attack types from log and text data.",
    domain: "AI/ML",
    tags: ["Python", "GPT-2", "Jupyter", "NLP"],
    repo: "https://github.com/Mnnbnsl/Cybersecurity-attacks-classifier",
  },
];