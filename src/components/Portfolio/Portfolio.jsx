import { useEffect, useMemo, useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import projects from "../../data/listData.js";
import "./Portfolio.sass";
import { useHighlightAnimation } from "../../hooks/useHighlightAnimation.js";

const CATEGORIES = [
    { key: "all", label: "All" },
    { key: "pet", label: "Pet Projects" },
    { key: "hackathon", label: "Hackathons" },
    { key: "university", label: "University" },
    { key: "professional", label: "Professional" }
];

function Portfolio({ onHighlightReady }) {
    const [ref, isHighlighted, triggerHighlight] = useHighlightAnimation();
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("id");

    useEffect(() => {
        if (onHighlightReady) onHighlightReady(triggerHighlight);
    }, [onHighlightReady, triggerHighlight]);

    const visible = useMemo(() => {
        let arr = category === "all" ? projects : projects.filter(p => p.category === category);
        if (sort === "id") {
            arr = [...arr].sort((a, b) => b.id - a.id);
        }
        return arr;
    }, [category, sort]);

    return (
        <div ref={ref} className={`portfolio ${isHighlighted ? "highlight" : ""}`} id="list">
            <div className="list-header">
                <h1>Portofolio</h1>
            </div>
            
            <div className="projects-filters">
                <div className="categories">
                    {CATEGORIES.map(c => (
                        <button
                            key={c.key}
                            className={`chip ${category === c.key ? "active" : ""}`}
                            onClick={() => setCategory(c.key)}
                        >
                            {c.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="projects-grid">
                {visible.map((project) => (
                    <div key={project.id} className="projects-card">
                        <img src={project.image} alt={project.title} className="projects-image" />
                        <div className="projects-content">
                            <h3>{project.title}</h3>
                            <div className="projects-description">
                                {project.description.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                            <div className="projects-tags">
                                {project.technologies.map((tech, index) => (
                                    <span key={index} className="tag">
                    {tech}
                                        {index < project.technologies.length - 1 && " - "}
                  </span>
                                ))}
                            </div>
                            <div className="projects-buttons">
                                {project.title === "Own Profile" ? (
                                    <span className="projects-note">Well, you're here already :D</span>
                                ) : project.live ? (
                                    <a href={project.live} className="projects-button" target="_blank" rel="noopener noreferrer">
                                        Live Project <FaExternalLinkAlt size={18} className="projects-button-icon" />
                                    </a>
                                ) : null}
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-button">
                                        <FaGithub size={36} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Portfolio;
