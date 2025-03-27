import {useEffect} from "react";
import {FaGithub, FaExternalLinkAlt, FaLink} from "react-icons/fa";  // Додаємо FaExternalLinkAlt або FaLink
import projects from "../../data/listData.js";
import "./List.sass";
import {useHighlightAnimation} from "../../hooks/useHighlightAnimation.js";

function List({onHighlightReady}) {
    const [ref, isHighlighted, triggerHighlight] = useHighlightAnimation();

    useEffect(() => {
        if (onHighlightReady) {
            onHighlightReady(triggerHighlight);
        }
    }, [onHighlightReady, triggerHighlight]);

    return (
        <div ref={ref} className={`list ${isHighlighted ? "highlight" : ""}`} id="list">
            <h1>Projects</h1>
            <div className="projects-grid">
                {projects.map((project) => (
                    <div key={project.id} className="projects-card">
                        <img src={project.image} alt={project.title} className="projects-image"/>
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
                                        {index < project.technologies.length - 1 && ' - '}
                                    </span>
                                ))}
                            </div>
                            <div className="projects-buttons">
                                {project.title === "Own Profile" ? (
                                    <span className="projects-note">Well, you're here already :D</span>
                                ) : project.live ? (
                                    <a href={project.live} className="projects-button" target="_blank"
                                       rel="noopener noreferrer">
                                        Live Project <FaExternalLinkAlt size={18} className="projects-button-icon" />
                                    </a>
                                ) : null}
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                                       className="github-button">
                                        <FaGithub size={36}/>
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

export default List;
