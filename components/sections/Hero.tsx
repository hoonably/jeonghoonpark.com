import Image from "next/image";
import { profile } from "@/data/profile";

/* SVG icon helpers */
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ fill: 'none' }}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function ScholarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 10a8 8 0 0 1 7.162 3.44L24 9.5z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="snap-section section hero">
      <div className="container">
        <div className="about-grid">
          <div className="profile-photo-wrapper">
            <Image
              src="/images/profile.webp"
              alt={profile.name}
              width={280}
              height={280}
              className="profile-photo"
              priority
            />
            <div className="profile-accent-bg" />
          </div>

          <div className="hero-content">
            {/* Eyebrow */}
            <p className="hero-eyebrow">👋 Welcome</p>

            {/* Name */}
            <h1 className="hero-name" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>{profile.name}</h1>

            {/* Tagline */}
            <p className="hero-tagline" style={{
              marginBottom: '1rem',
              color: 'var(--color-accent)',
              fontWeight: 700,
              fontSize: '0.95rem'
            }}>
              {profile.role} · {profile.affiliation}
            </p>

            {/* Bio integration */}
            <div className="about-text" style={{ marginBottom: '1.5rem' }}>
              {profile.bio.map((paragraph, i) => (
                <p
                  key={i}
                  className={i === 1 ? "hero-bio-secondary" : ""}
                  style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Action buttons */}
            <div className="hero-actions">
              {profile.cvUrl && (
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  View CV ↗
                </a>
              )}
              <a
                href="/blog"
                className="btn btn-outline"
                style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
              >
                Blog ↗
              </a>
            </div>

            {/* Social icons */}
            <div className="hero-socials" style={{ marginTop: '1.5rem' }}>
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="social-link"
                  aria-label="Email"
                >
                  <MailIcon />
                </a>
              )}
              {profile.github && (
                <a
                  href={`https://github.com/${profile.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="GitHub"
                >
                  <GithubIcon />
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={`https://linkedin.com/in/${profile.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon />
                </a>
              )}
              {profile.googleScholar && (
                <a
                  href={`https://scholar.google.com/citations?user=${profile.googleScholar}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Google Scholar"
                >
                  <ScholarIcon />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

