import Image from "next/image";
import { experiences } from "@/data/experiences";

export default function Experience() {
  return (
    <section id="experience" className="snap-section section">
      <div className="container">
        <p className="section-label">Work</p>
        <h2 className="section-title">Experience</h2>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <article key={i} className="timeline-item">
              <div className="timeline-image-wrap" style={{ position: 'relative' }}>
                {exp.image ? (
                  <Image 
                    src={exp.image} 
                    alt={exp.org} 
                    fill 
                    style={{ objectFit: 'contain' }} 
                    sizes="(max-width: 768px) 80px, 120px"
                  />
                ) : (
                  <div className="timeline-image-placeholder" />
                )}
              </div>
              <div className="timeline-main">
                <div className="timeline-header">
                  <div className="timeline-left">
                    <h3 className="timeline-org">
                      {exp.orgUrl ? (
                        <a href={exp.orgUrl} target="_blank" rel="noopener noreferrer">
                          {exp.org}
                        </a>
                      ) : (
                        exp.org
                      )}
                    </h3>
                    <p className="timeline-role">{exp.role}</p>
                    <p className="timeline-location">{exp.location}</p>
                    <p className="timeline-period-mobile">{exp.period}</p>
                  </div>
                  <span className="timeline-period-desktop">{exp.period}</span>
                </div>
                <ul className="timeline-bullets">
                  {exp.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
