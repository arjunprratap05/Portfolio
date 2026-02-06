import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import "./style.scss";

const Showcase = ({ data, onProjectClick, transition }) => {
    return (
        <div className={`showcase-slider-wrapper ${transition}`}>
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1.1}
                centeredSlides={true}
                loop={true}
                autoHeight={true} 
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{
                    clickable: true,
                    el: '.custom-projects-pagination'
                }}
                breakpoints={{
                    1024: { slidesPerView: 3, spaceBetween: 30, centeredSlides: false },
                    768: { slidesPerView: 2, spaceBetween: 20, centeredSlides: false }
                }}
                className="projects-swiper"
            >
                {data.map((project) => (
                    <SwiperSlide key={project.id}>
                        <div className="project-square-card" onClick={() => onProjectClick(project)}>
                            {project.id === 9 && <div className="solo-architect-badge">Solo Architect</div>}
                            <div className="project-thumbnail-container">
                                <img src={project.media.thumbnail} alt={project.name} />
                            </div>
                            <div className="project-info">
                                <h4 className="project-title">{project.name}</h4>
                                <div className="project-tags">
                                    {project.tags.slice(0, 3).map((tag) => (
                                        <span key={tag} className="tag-item">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="custom-projects-pagination"></div>
        </div>
    );
};

export default Showcase;