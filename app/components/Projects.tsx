'use client';

import Link from 'next/link';
import { type Project } from '@/app/lib/projects';
import ProjectVisual from './ProjectVisual';
import Reveal from './Reveal';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-header">
        <h2 className="section-heading">Projects</h2>
        <p className="section-subtitle">
          Core in-memory datastores, autonomous agents, and low-latency backends built from scratch. Tap any visual to inspect the system architecture.
        </p>
      </div>

      {/* Square Cards Grid: Displaying Only the Visual */}
      <div className="projects-square-grid">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 60}>
            <Link
              href={`/projects/${project.slug}`}
              className="project-square-card"
              title={`View ${project.name} system details`}
            >
              {/* Visual Animation */}
              <div className="square-card-visual">
                <ProjectVisual
                  projectId={project.id}
                  projectName={project.name}
                />
              </div>

              {/* Minimal Clean Label Overlay */}
              <div className="square-card-overlay">
                <div className="square-card-meta">
                  <span className="square-card-name">{project.name}</span>
                  <span className="square-card-domain">{project.domain}</span>
                </div>
                <span className="square-card-arrow" aria-hidden="true">↗</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
