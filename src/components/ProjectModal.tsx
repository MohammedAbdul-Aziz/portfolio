import React from 'react';
import * as Icons from './Icons';
import type { Project } from '../data';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-card animate-zoom-in" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="modal-header-banner" style={{ borderLeftColor: project.highlightColor }}>
          <div className="modal-title-wrapper">
            <span className="project-category-badge" style={{ backgroundColor: `${project.highlightColor}22`, color: project.highlightColor, borderColor: project.highlightColor }}>
              {project.category}
            </span>
            <h2>{project.title}</h2>
            <p className="project-subtitle-text">{project.subtitle}</p>
          </div>
          <span className="project-period-badge">{project.period}</span>
        </div>

        <div className="modal-body-content">
          {/* Pipeline Visualizer */}
          {project.pipelineSteps && project.pipelineSteps.length > 0 && (
            <div className="project-architecture-panel">
              <h3 className="section-subtitle"><Icons.Terminal size={16} /> End-to-End System Pipeline</h3>
              <div className="pipeline-flow-container">
                {project.pipelineSteps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className="pipeline-node" style={{ borderColor: project.highlightColor }}>
                      <div className="node-number" style={{ backgroundColor: project.highlightColor }}>
                        {idx + 1}
                      </div>
                      <div className="node-text">{step}</div>
                    </div>
                    {idx < (project.pipelineSteps?.length || 0) - 1 && (
                      <div className="pipeline-arrow" style={{ color: project.highlightColor }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Key Achievements */}
          <div className="project-highlights-panel">
            <h3 className="section-subtitle"><Icons.Award size={16} /> Key Engineering Highlights</h3>
            <ul className="project-bullet-list">
              {project.achievements.map((ach, idx) => (
                <li key={idx} className="project-bullet-item">
                  <Icons.Check className="bullet-check" size={16} style={{ color: project.highlightColor }} />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="project-tech-panel">
            <h3 className="section-subtitle"><Icons.Code size={16} /> Technologies Utilized</h3>
            <div className="project-tech-tags">
              {project.techStack.map((tech, idx) => (
                <span key={idx} className="tech-badge-detail">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="modal-action-btn github-btn">
            <Icons.GitHub size={16} /> Source Code
          </a>
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="modal-action-btn demo-btn" style={{ backgroundColor: project.highlightColor }}>
              <Icons.ExternalLink size={16} /> Live Prototype
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
