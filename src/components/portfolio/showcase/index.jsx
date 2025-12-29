import React from 'react';
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "./style.scss";

const Showcase = ({ data, transition, onProjectClick }) => {
    return (
        <div className={`projects-grid ${transition ? transition : ''}`}>
            {data.map((project) => (
                <div 
                    key={project.id} 
                    className="project-card glass-effect"
                    onClick={() => onProjectClick(project)}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="project-thumbnail-container">
                        <img 
                            src={project.media.thumbnail} 
                            alt={project.name} 
                            className="project-img" 
                        />
                        <div className="thumbnail-overlay">
                             <div className="overlay-buttons">
                                {project.codeUrl && ( 
                                    <a 
                                        href={project.codeUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="action-icon"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <FaGithub />
                                    </a>
                                )}
                                {project.liveUrl && ( 
                                    <a 
                                        href={project.liveUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="action-icon"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <FaExternalLinkAlt />
                                    </a>
                                )}
                             </div>
                        </div> 
                    </div>
                    <div className="project-info">
                        <h4 className="project-title">{project.name}</h4>
                        <p className="project-description">
                            {project.description.substring(0, 100)}... 
                            <span className="read-more"> Read More</span>
                        </p>
                        <div className="project-tags">
                            {project.tags.map((tag) => (
                                <span key={tag} className="tag-item">
                                    #{tag.replace('-', '')}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Showcase;