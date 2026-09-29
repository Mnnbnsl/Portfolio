import { type Project } from '@/app/lib/projects';
import Reveal from './Reveal';

const LANGUAGE_COLORS: Record<string, string> = {
  Go: '#00add8',
  TypeScript: '#3178c6',
  Python: '#3572a5',
  JavaScript: '#f1e05a',
  'Jupyter Notebook': '#da5b0b',
};

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-header">
        <h2 className="section-heading">Projects</h2>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {projects.map((project, index) => {
          const languageColor = project.language
            ? LANGUAGE_COLORS[project.language]
            : undefined;
          const hasMeta = Boolean(project.language) || project.stars !== undefined;

          return (
            <Reveal key={project.id} delay={index * 70}>
              <div className="project-card">
                <div className="card-header">
                  <h3 className="project-name">{project.name}</h3>
                  <span className="project-year">{project.year}</span>
                </div>

                {hasMeta && (
                  <div className="project-meta">
                    {project.language && (
                      <span className="project-language">
                        <span
                          className="language-dot"
                          style={languageColor ? { backgroundColor: languageColor } : undefined}
                          aria-hidden="true"
                        />
                        {project.language}
                      </span>
                    )}
                    {project.stars !== undefined && (
                      <span className="project-stars">
                        <svg
                          className="star-icon"
                          width="10"
                          height="10"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M8 .25l2.06 4.18 4.61.67-3.34 3.25.79 4.6L8 10.75l-4.12 2.17.79-4.6L1.33 5.1l4.61-.67L8 .25z" />
                        </svg>
                        {project.stars}
                      </span>
                    )}
                  </div>
                )}

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
          );
        })}
      </div>
    </section>
  );
}
