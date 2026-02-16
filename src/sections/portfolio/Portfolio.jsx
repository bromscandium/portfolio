import { useMemo, useState, useEffect } from "react";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import { portfolio } from "../../data/portfolio.js";
import "./portfolio.scss";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "pet", label: "Pet Projects" },
  { key: "hackathon", label: "Hackathons" },
  { key: "university", label: "University" },
  { key: "professional", label: "Professional" }
];

export const Portfolio = ({ onModalChange }) => {
  const [category, setCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [, setHasAnimated] = useState(false);
  const [isChangingCategory, setIsChangingCategory] = useState(false);

  const visible = useMemo(() => {
    let arr = category === "all" ? portfolio : portfolio.filter(p => p.category === category);
    return [...arr].sort((a, b) => b.id - a.id);
  }, [category]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (newCategory) => {
    if (newCategory === category) return;

    setIsChangingCategory(true);
    setTimeout(() => {
      setCategory(newCategory);
      setIsChangingCategory(false);
    }, 300);
  };

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
    onModalChange?.(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
    onModalChange?.(false);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedProject]);

  return (
    <div className="portfolio">
      <div className="section-header">
        <h1>Portfolio</h1>
      </div>

      <div className="projects-filters">
        <div className="categories">
          {CATEGORIES.map(c => (
            <button
              key={c.key}
              className={`chip ${category === c.key ? "active" : ""}`}
              onClick={() => handleCategoryChange(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-gallery-wrapper">
        <div className={`projects-gallery ${isChangingCategory ? 'fade-out' : 'fade-in'}`}>
          {visible.map((project) => (
            <div
              key={project.id}
              className="projects-card"
              onClick={() => openModal(project)}
            >
              <div className="projects-card-image-wrapper">
                <img src={project.image} alt={project.title} className="projects-image" />
                <div className="projects-overlay">
                  <span className="projects-view-text">View Project</span>
                </div>
              </div>
              <div className="projects-card-info">
                <h3>{project.title}</h3>
                <div className="projects-tags">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="tag">{tech}</span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="tag-more">+{project.technologies.length - 3}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="projects__scroll-indicator">
          Scroll to explore more projects
        </div>
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <FaTimes size={24} />
            </button>

            <div className="modal-image">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>

            <div className="modal-info">
              <h2>{selectedProject.title}</h2>

              <div className="modal-description">
                {selectedProject.description.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="modal-technologies">
                <h4>Technologies:</h4>
                <div className="modal-tags">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span key={idx} className="modal-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="modal-buttons">
                {selectedProject.title === "Own Profile" ? (
                  <span className="projects-note">Well, you're here already :D</span>
                ) : selectedProject.live ? (
                  <a href={selectedProject.live} className="modal-button primary" target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt size={18} />
                    Live Project
                  </a>
                ) : null}
                {selectedProject.github && (
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="modal-button secondary">
                    <FaGithub size={24} />
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}