import { Project } from "@/types";
import { projects } from "@/data/projects";

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
        <p className="section-desc" style={{ 
          fontSize: '0.85rem', 
          marginTop: '-0.5rem', 
          marginBottom: '2rem' 
        }}>
          Explore my works. Click a title to view more details.
        </p>

        {displayProjects.length === 0 ? (
          <p className="empty-note">Projects coming soon.</p>
        ) : (
          <div className="teaching-container">
            <ul className="teaching-list">
              {displayProjects.map((proj, i) => (
                <li key={proj.slug || i} className="teaching-item">
                  <div className="teaching-main">
                    {(proj.slug || proj.content) ? (
                      <span
                        className="teaching-title clickable-title"
                        onClick={() => onItemClick(proj)}
                      >
                        {proj.title}
                      </span>
                    ) : (
                      <span className="teaching-title">{proj.title}</span>
                    )}
                    <span className="teaching-period">{proj.period}</span>
                    <span className="teaching-org">{proj.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
