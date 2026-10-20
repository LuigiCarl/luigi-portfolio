import Image from "next/image";
import { ArrowUpRight, Code2, ExternalLink } from "lucide-react";
import type { Project } from "@/data/portfolio";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card ${project.featured ? "project-featured" : ""}`}>
      <div className={`project-image project-visual project-visual-${project.name.toLowerCase()} ${project.screenshots ? "project-has-screenshots" : ""}`} role="img" aria-label={project.screenshotAlt ?? `${project.name} abstract project visual`}>
        {project.screenshots ? (
          <div className="project-screenshot-stack">
            <Image
              className="project-screenshot project-screenshot-main"
              src={project.screenshots[0]}
              alt={project.screenshotAlt ?? `${project.name} screenshot`}
              fill
              sizes="(max-width: 800px) 100vw, 58vw"
              quality={90}
              priority={project.featured}
            />
            {project.screenshots[1] && (
              <Image
                className="project-screenshot project-screenshot-secondary"
                src={project.screenshots[1]}
                alt=""
                fill
                sizes="(max-width: 800px) 38vw, 18vw"
                quality={90}
              />
            )}
          </div>
        ) : (
          <div className="visual-window">
            <span className="visual-window-bar"><i /><i /><i /></span>
            <span className="visual-line visual-line-long" />
            <span className="visual-line visual-line-medium" />
            <span className="visual-panels"><i /><i /><i /></span>
          </div>
        )}
        {!project.screenshots && <span className="visual-monogram">{project.name.slice(0, 2)}</span>}
        <span className="project-type">{project.type}</span>
      </div>
      <div className="project-content">
        <div className="project-heading">
          <div>
            <p className="eyebrow">{project.status}</p>
            <h3>{project.name}</h3>
            <p className="project-title">{project.title}</p>
          </div>
          <ArrowUpRight className="project-arrow" size={21} aria-hidden="true" />
        </div>
        <p className="project-description">{project.description}</p>
        <div className="project-details">
          <div className="project-detail-group">
            <p className="project-detail-label">Built with</p>
            <div className="tag-list">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="project-detail-group">
            <p className="project-detail-label">Highlights</p>
            <div className="project-features">
              {project.features.slice(0, 3).map((feature) => <span key={feature}>{feature}</span>)}
            </div>
          </div>
        </div>
        <div className="project-links">
          {project.liveUrl && (
            <a className="project-live-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Live preview of ${project.name}`}>
              <ExternalLink size={15} aria-hidden="true" /> Live Preview
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`Source code for ${project.name}`}>
              <Code2 size={16} aria-hidden="true" /> {project.name === "FinanEase" ? "Frontend Source" : "Source Code"}
            </a>
          )}
          {project.backendUrl && (
            <a href={project.backendUrl} target="_blank" rel="noopener noreferrer" aria-label={`Deployed backend API for ${project.name}`}>
              <ExternalLink size={15} aria-hidden="true" /> Backend API
            </a>
          )}
          {project.backendGithubUrl && (
            <a href={project.backendGithubUrl} target="_blank" rel="noopener noreferrer" aria-label={`Backend source for ${project.name}`}>
              <Code2 size={16} aria-hidden="true" /> Backend Source
            </a>
          )}
          {project.evidenceUrl && (
            <a href={project.evidenceUrl} target="_blank" rel="noopener noreferrer" aria-label={`Expo build evidence for ${project.name}`}>
              <ExternalLink size={15} aria-hidden="true" /> Expo Build
            </a>
          )}
          {!project.liveUrl && !project.backendUrl && !project.githubUrl && !project.backendGithubUrl && !project.evidenceUrl && (
            <span className="project-link-placeholder">Live preview and source links unavailable</span>
          )}
        </div>
      </div>
    </article>
  );
}
