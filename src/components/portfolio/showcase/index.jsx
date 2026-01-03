import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./style.scss";

const Showcase = ({ data, onProjectClick }) => {
    return (
        <div className="showcase-slider-wrapper">
            <div className="section-header">
                <span className="subtitle">Showcase</span>
                <h2 className="underlined-title">Recent Projects</h2>
                <p className="description">Full Stack & GenAl journey with 3+ years of impact.</p>
            </div>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1.1}
                centeredSlides={true}
                loop={true}
                pagination={{
                    clickable: true,
                    el: '.projects-pagination'
                }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                breakpoints={{
                    1024: { slidesPerView: 3, spaceBetween: 30, centeredSlides: false },
                    768: { slidesPerView: 2, spaceBetween: 20, centeredSlides: false }
                }}
                className="projects-swiper"
            >
                {data.map((project) => (
                    <SwiperSlide key={project.id}>
                        <div
                            className="project-square-card"
                            onClick={() => onProjectClick(project)}
                        >
                            <div className="project-thumbnail-container">
                                <img src={project.media.thumbnail} alt={project.name} />
                                <div className="thumbnail-overlay">
                                    <div className="overlay-buttons">
                                        {project.codeUrl && (
                                            <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="action-icon" onClick={(e) => e.stopPropagation()}>
                                                <FaGithub />
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="action-icon" onClick={(e) => e.stopPropagation()}>
                                                <FaExternalLinkAlt />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="project-info">
                                <h4 className="project-title">{project.name}</h4>
                                <div className="project-tags">
                                    {project.tags.slice(0, 2).map((tag) => (
                                        <span key={tag} className="tag-item">#{tag.replace('-', '')}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="projects-pagination"></div>
        </div>
    );
};

export default Showcase;