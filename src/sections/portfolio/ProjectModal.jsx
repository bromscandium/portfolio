import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

export const ProjectModal = ({ project, isClosing, onClose }) => {
  if (!project) return null;

  return (
    <div className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={onClose}>
      <div className={`modal-content ${isClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes size={24} />
        </button>

        <div className="modal-image">
          <img src={project.image} alt={project.title} />
        </div>

        <div className="modal-info">
          <h2>{project.title}</h2>

          <div className="modal-description">
            {project.description.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="modal-technologies">
            <h4>Technologies:</h4>
            <div className="modal-tags">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="modal-tag">{tech}</span>
              ))}
            </div>
          </div>

          <div className="modal-buttons">
            {project.title === "Own Profile" ? (
              <span className="projects-note">Well, you're here already :D</span>
            ) : project.live ? (
              <a href={project.live} className="modal-button primary" target="_blank" rel="noopener noreferrer">
                <FaExternalLinkAlt size={18} />
                Live Project
              </a>
            ) : null}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="modal-button secondary">
                <FaGithub size={24} />
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};