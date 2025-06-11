// src/components/portfolio/showcase/index.js (Showcase.jsx)
import React from 'react';

const Showcase = ({ data, transition }) => {
    return (
        <div className={`projects-grid ${transition ? transition : ''}`}>
            {data.map((project) => (
                <div key={project.id} className="project-card">
                    <div className="project-thumbnail-container">
                        <img src={project.media.thumbnail} alt={project.name} />
                        <div className="thumbnail-overlay"></div> {/* Optional overlay */}
                    </div>
                    <div className="project-info">
                        <h4 className="project-title">{project.name}</h4>
                        <p className="project-description">{project.description}</p>
                        <div className="project-tags">
                            {project.tags.map((tag) => (
                                <span key={tag} className="project-tag-item">
                                    {tag.replace('-', ' ')}
                                </span>
                            ))}
                        </div>
                        <div className="project-buttons">
                            {project.codeUrl && ( // Conditionally render View Code button
                                <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="view-code-btn">View Code</a>
                            )}
                            {project.liveUrl && ( // Conditionally render View Live button
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="view-live-btn">View Live</a>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Showcase;