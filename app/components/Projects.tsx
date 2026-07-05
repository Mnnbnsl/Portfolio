'use client';

import { projects } from '@/app/lib/project-content';
import Reveal from './Reveal';

export default function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-header">
        <h2 className="section-heading">Projects</h2>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 70}>
            <div className="project-card">
              <div className="card-header">
                <h3 className="project-name">{project.name}</h3>
                <span className="project-year">{project.year}</span>
              </div>

              {/* Description */}
              <p className="project-description">{project.description}</p>

              {/* Tags */}
              <div className="project-tags">
                <span className="tag domain">{project.domain}</span>
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              {(project.repo || project.link) && (
                <div className="project-links">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      github →
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      live →
                    </a>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
