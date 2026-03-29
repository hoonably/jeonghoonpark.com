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
          <div className="pub-list">
            {items.map((pub, i) => (
              <article
                key={pub.slug || i}
                className={`pub-card${(pub.slug || pub.content) ? " clickable" : ""}`}
                onClick={() => (pub.slug || pub.content) && onItemClick(pub)}
              >
                {/* Badges row */}
                <div className="pub-badges">
                  {pub.badge && (
                    <span className="badge badge-conference">{pub.badge}</span>
                  )}
                  <span
                    className={`badge ${pub.type === "preprint"
                        ? "badge-preprint"
                        : "badge-conference"
                      }`}
                  >
                    {pub.venue}
                  </span>
                  <span className="pub-year">{pub.year}</span>
                </div>

                {/* Title */}
                <h3 className="pub-title">
                  {pub.links?.paper ? (
                    <a
                      href={pub.links.paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {pub.title}
                    </a>
                  ) : (
                    pub.title
                  )}
                </h3>

                {/* Authors */}
                <p className="pub-authors">{renderAuthors(pub.authors)}</p>

                {/* Links */}
                {pub.links && (
                  <div className="pub-links">
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
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
