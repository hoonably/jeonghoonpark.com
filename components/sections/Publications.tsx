import { Publication } from "@/types";

/** Render **bold** in author strings */
function renderAuthors(str: string) {
  if (!str) return null;
  const parts = str.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

interface PublicationsProps {
  onItemClick: (item: Publication) => void;
  items: Publication[];
}

export default function Publications({ onItemClick, items }: PublicationsProps) {
  return (
    <section id="publications" className="snap-section section">
      <div className="container">
        <p className="section-label">Research</p>
        <h2 className="section-title">Publications</h2>
        <p className="section-desc" style={{ marginBottom: "2rem" }}>
          *:Co-primary authors; †:Co-corresponding authors
        </p>

        {items.length === 0 ? (
          <p className="empty-note">Papers coming soon.</p>
        ) : (
          <div className="teaching-container">
            <ul className="teaching-list">
              {items.map((pub, i) => (
                <li key={pub.slug || i} style={{ listStyle: "none", marginBottom: "1.5rem" }}>
                  {/* Badges on their own line, aligned with the title text */}
                  <div className="pub-badges" style={{ display: "flex", gap: "0.4rem", marginBottom: "0.4rem", paddingLeft: "1.25rem" }}>
                    {pub.venue && (
                      <span className="badge badge-preprint">{pub.venue}</span>
                    )}
                    {pub.badge && (
                      <span className="badge badge-conference">{pub.badge}</span>
                    )}
                  </div>

                  {/* Title row with bullet point */}
                  <div className="teaching-item">
                    <div className="teaching-main">
                      <div className="teaching-title">
                        {(pub.slug || pub.content) ? (
                          <span
                            className="clickable-title"
                            onClick={() => onItemClick(pub)}
                          >
                            {pub.title}
                          </span>
                        ) : (
                          <span>{pub.title}</span>
                        )}
                      </div>
                      <span className="teaching-period">
                        {pub.year}
                      </span>
                      <div className="teaching-org" style={{ marginTop: "0.25rem" }}>
                        <p className="pub-authors">{renderAuthors(pub.authors)}</p>
                        
                        {/* Links */}
                        {pub.links && (
                          <div className="pub-links" style={{ marginTop: "0.6rem" }}>
                            {pub.links.arxiv && (
                              <a
                                href={pub.links.arxiv}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="pub-link"
                              >
                                arXiv
                              </a>
                            )}
                            {pub.links.paper && (
                              <a
                                href={pub.links.paper}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="pub-link"
                              >
                                Paper
                              </a>
                            )}
                            {pub.links.code && (
                              <a
                                href={pub.links.code}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="pub-link"
                              >
                                Code
                              </a>
                            )}
                            {pub.links.poster && (
                              <a
                                href={pub.links.poster}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="pub-link"
                              >
                                Poster
                              </a>
                            )}
                            {pub.links.project && (
                              <a
                                href={pub.links.project}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="pub-link"
                              >
                                Project
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
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
