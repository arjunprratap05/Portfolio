import React, { useState, useEffect } from "react";
import Section from "../shared/section";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { SkillsInfo } from "../../constants";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./style.scss";

const Skills = () => {
    const [skillsData, setSkillsData] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/skills`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    const merged = SkillsInfo.map(category => {
                        const apiCat = data.find(c => c.title === category.title);
                        return {
                            ...category,
                            skills: category.skills.map(s => {
                                const apiSkill = apiCat?.skills?.find(as => as.name === s.name);
                                return { ...s, percentage: apiSkill?.percentage || s.percentage };
                            })
                        };
                    });
                    setSkillsData(merged);
                } else { setSkillsData(SkillsInfo); }
            } catch (err) { setSkillsData(SkillsInfo); }
        };
        fetchSkills();
    }, []);

    return (
        <Section background="dark" id="skills">
            <div className="skills-header">
                <span className="subtitle">Expertise</span>
                <h2>Tech <span className="purple">Architecture</span></h2>
                <div className="line-glow"></div>
            </div>

            <div className="skills-slider-wrapper">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
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
                    {skillsData.map((category) => (
                        <SwiperSlide key={category.title}>
                            <div className="skill-category-box">
                                <div className="category-top">
                                    <span className="glow-dot"></span>
                                    <h3>{category.title}</h3>
                                    <span className="count-pill">{category.skills.length} Skills</span>
                                </div>
                                <div className="skills-grid-layout">
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