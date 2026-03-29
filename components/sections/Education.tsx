import Image from "next/image";
import { educations } from "@/data/educations";

export default function Education() {
  return (
    <section id="education" className="snap-section section">
      <div className="container">
        <p className="section-label">Academic</p>
        <h2 className="section-title">Education</h2>

        <div className="timeline">
          {educations.map((edu, i) => (
            <article key={i} className="timeline-item">
              <div className="timeline-image-wrap" style={{ position: 'relative' }}>
                {edu.image ? (
                  <Image 
                    src={edu.image} 
                    alt={edu.school} 
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
                      {edu.schoolUrl ? (
                        <a href={edu.schoolUrl} target="_blank" rel="noopener noreferrer">
                          {edu.school}
                        </a>
                      ) : (
                        edu.school
                      )}
                    </h3>
                    <p className="timeline-role">{edu.degree}</p>
                    <p className="timeline-location">{edu.location}</p>
                    <p className="timeline-period-mobile">{edu.period}</p>
                  </div>
                  <span className="timeline-period-desktop">{edu.period}</span>
                </div>
                <ul className="timeline-bullets">
                  {edu.bullets.map((b, j) => (
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
