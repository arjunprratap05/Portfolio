import React, { useState } from "react"; 
import Section from "../shared/section";
import "./style.scss";
import { SkillsInfo } from "../../constants";

const Skills = () => {
    const [hoveredSkill, setHoveredSkill] = useState(null);

    return (
        <Section background="dark" id="skills">
            <div className="skills-section-title">
                <h2>SKILLS</h2>
                <div className="separator"></div>
                <p>
                    A collection of my technical skills
                </p>
            </div>

            <div className="skill-categories-wrapper">
                {SkillsInfo.map((category) => (
                    <div key={category.title} className="skill-category-card">
                        <h3>{category.title}</h3>
                        <div className="skill-items-grid">
                            {category.skills.map((skill) => (
                                <div
                                    key={skill.name}
                                    className="skill-item"
                                    onMouseEnter={() => setHoveredSkill(skill.name)} 
                                    onMouseLeave={() => setHoveredSkill(null)} 
                                >
                                    <img
                                        src={skill.logo}
                                        alt={`${skill.name} logo`}
                                        className="skill-logo"
                                    />
                                    <span className="skill-name">{skill.name}</span>
                                    {hoveredSkill === skill.name && skill.percentage && (
                                        <div className="skill-percentage">
                                            {skill.percentage}%
                                        </div>
                                    )}
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