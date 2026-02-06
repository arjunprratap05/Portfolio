import React from 'react';
import { FaTimes, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "./style.scss";

const ProjectModal = ({ project, onClose }) => {
    return (
        <div className="project-modal-overlay" onClick={onClose}>
            <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
                {/* FaTimes is already used here */}
                <button className="close-btn" onClick={onClose}><FaTimes /></button>
                <div className="modal-body">
                    <div className="modal-image-section">
                        <img src={project.media.thumbnail} alt={project.name} />
                    </div>
                    <div className="modal-info-section">
                        <h3>{project.name}</h3>
                        <div className="tags">
                            {project.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
                        </div>
                        <p className="desc">{project.description}</p>
                        <div className="modal-footer">
                            {/* Now using FaGithub and FaExternalLinkAlt to fix Vercel error */}
                            <a href={project.codeUrl} target="_blank" rel="noreferrer" className="modal-btn ghost">
                                <FaGithub style={{ marginRight: '8px' }} /> GitHub
                            </a>
                            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="modal-btn solid">
                                <FaExternalLinkAlt style={{ marginRight: '8px' }} /> Live Demo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;