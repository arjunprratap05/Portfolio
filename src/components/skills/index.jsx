import React from "react";
import Section from "../shared/section";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { SkillsInfo } from "../../constants";
import 'swiper/css';
import 'swiper/css/pagination';
import "./style.scss";

const Skills = () => {
    return (
        <Section background="dark" id="skills">
            <div className="skills-header">
                <span className="subtitle">Expertise</span>
                <h2>Tech <span className="purple">Architecture</span></h2>
            </div>

            <div className="skills-slider-wrapper">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        1024: { 
                            slidesPerView: 3, 
                            centeredSlides: false, 
                            spaceBetween: 20 
                        }
                    }}
                    className="skills-swiper"
                >
                    {SkillsInfo.map((category) => (
                        <SwiperSlide key={category.title}>
                            <div className="skill-category-square">
                                <div className="category-top">
                                    <span className="glow-dot"></span>
                                    <h3>{category.title}</h3>
                                    <span className="count-pill">{category.skills.length}</span>
                                </div>
                                <div className="skills-iphone-grid">
                                    {category.skills.map((skill) => (
                                        <div key={skill.name} className="compact-pill">
                                            <img src={skill.logo} alt={skill.name} />
                                            <span>{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Section>
    );
};

export default Skills;