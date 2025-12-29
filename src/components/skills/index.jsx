import React, { useState, useEffect } from "react";
import Section from "../shared/section";
import "./style.scss";
import { SkillsInfo } from "../../constants";

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
                } else {
                    setSkillsData(SkillsInfo);
                }
            } catch (err) {
                setSkillsData(SkillsInfo);
            }
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

            <div className="skills-container-grid">
                {skillsData.map((category) => (
                    <div key={category.title} className="skill-category-box glass-effect">
                        <div className="category-header">
                            <span className="category-icon-dot"></span>
                            <h3>{category.title}</h3>
                        </div>
                        <div className="pill-cloud">
                            {category.skills.map((skill) => (
                                <div key={skill.name} className="skill-pill">
                                    <img src={skill.logo} alt={skill.name} className="pill-logo" />
                                    <div className="pill-info">
                                        <span className="name">{skill.name}</span>
                                        <div className="mini-progress-bg">
                                            <div 
                                                className="progress-fill" 
                                                style={{ width: `${skill.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <span className="percent-num">{skill.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default Skills;