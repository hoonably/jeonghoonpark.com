import Image from "next/image";
import { Project } from "@/types";
import { projects } from "@/data/projects";

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="14" height="14">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="14" height="14">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="14" height="14">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

interface ProjectsProps {
  onItemClick: (item: Project) => void;
  projects?: Project[];
}

export default function Projects({ onItemClick, projects: propProjects }: ProjectsProps) {
  const displayProjects = propProjects && propProjects.length > 0 ? propProjects : projects;

  return (
    <section id="projects" className="snap-section section">
      <div className="container">
        <p className="section-label">Featured</p>
        <h2 className="section-title">Projects</h2>

        {displayProjects.length === 0 ? (
          <p className="empty-note">Projects coming soon.</p>
        ) : (
          <div className="project-grid">
            {displayProjects.map((proj, i) => (
              <article
                key={i}
                className={`project-card${(proj.slug || proj.content) ? " clickable" : ""}`}
                onClick={() => (proj.slug || proj.content) && onItemClick(proj)}
              >
                {/* Image side */}
                <div className="project-image-wrap" style={{ position: 'relative' }}>
                  {proj.image ? (
                    <Image 
                      src={proj.image} 
                      alt={proj.title} 
                      fill 
                      style={{ objectFit: 'cover' }} 
                      sizes="(max-width: 768px) 100vw, 200px"
                      priority={i < 6}
                    />
                  ) : (
                    <div className="project-image-placeholder" />
                  )}
                </div>

                {/* Content side */}
                <div className="project-content">
                  {/* Top row: tags and period */}
                  <div className="project-meta-row">
                    <div className="project-tech-tags">
                      {proj.tech.map((t) => (
                        <span key={t} className="tech-tag">{t}</span>
                      ))}
                    </div>
                    {proj.period && (
                      <span className="project-period">{proj.period}</span>
                    )}
                  </div>

                  <h3 className="project-title">{proj.title}</h3>

                  <p className="project-desc">{proj.description}</p>

                  {/* Links */}
                  {proj.links && (proj.links.github || proj.links.page || proj.links.pdf) && (
                    <div className="project-links">
                      {proj.links.github && (
                        <a
                          href={proj.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="project-link"
                          aria-label="GitHub repository"
                        >
                          <GithubIcon /> GitHub
                        </a>
                      )}
                      {proj.links.page && (
                        <a
                          href={proj.links.page}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="project-link"
                        >
                          <LinkIcon /> Page
                        </a>
                      )}
                      {proj.links.pdf && (
                        <a
                          href={proj.links.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="project-link"
                        >
                          <PdfIcon /> PDF
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
