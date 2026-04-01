import { useMemo, useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { portfolio } from "../../data/portfolio.js";
import { ProjectModal } from "./ProjectModal.jsx";
import "./Portfolio.scss";

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
  const [isChangingCategory, setIsChangingCategory] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const galleryRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const visible = useMemo(() => {
    let arr = category === "all" ? portfolio : portfolio.filter(p => p.category === category);
    return [...arr].sort((a, b) => b.id - a.id);
  }, [category]);

  useEffect(() => {
    if (selectedProject && !isClosing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject, isClosing]);

  const checkScroll = () => {
    if (galleryRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [visible]);

  const scroll = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  const handleCategoryChange = (newCategory) => {
    if (newCategory === category) return;
    setIsChangingCategory(true);
    setTimeout(() => {
      setCategory(newCategory);
      setIsChangingCategory(false);
      if (galleryRef.current) {
        galleryRef.current.scrollLeft = 0;
        checkScroll();
      }
    }, 300);
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setIsClosing(false);
    onModalChange?.(true);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsClosing(false);
      onModalChange?.(false);
    }, 300);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

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
        <div className="gallery-divider"></div>
        <div
          className={`projects-gallery ${isChangingCategory ? 'fade-out' : 'fade-in'}`}
          ref={galleryRef}
          onScroll={checkScroll}
        >
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
        <div className="gallery-divider"></div>

        <div className="gallery-navigation">
          <button
            className="nav-arrow"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            className="nav-arrow"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isClosing={isClosing}
          onClose={closeModal}
        />
      )}
    </div>
  );
};