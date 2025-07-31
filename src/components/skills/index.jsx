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
                            {category.skills.map((skill) => {
                                const radius = 40; 
                                const circumference = 2 * Math.PI * radius;
                                const strokeDashoffset = circumference - (skill.percentage / 100) * circumference;

                                return (
                                    <div
                                        key={skill.name}
                                        className="skill-item"
                                        onMouseEnter={() => setHoveredSkill(skill.name)}
                                        onMouseLeave={() => setHoveredSkill(null)}
                                    >
                                        <div className="skill-content">
                                            <img
                                                src={skill.logo}
                                                alt={`${skill.name} logo`}
                                                className="skill-logo"
                                            />
                                            <span className="skill-name">{skill.name}</span>
                                        </div>

                                        {hoveredSkill === skill.name && skill.percentage && (
                                            <div className="skill-percentage-overlay">
                                                <svg className="circular-chart" viewBox="0 0 100 100">
                                                    <circle
                                                        className="circle-bg"
                                                        cx="50"
                                                        cy="50"
                                                        r={radius}
                                                    />
                                                    <circle
                                                        className="circle"
                                                        cx="50"
                                                        cy="50"
                                                        r={radius}
                                                        strokeDasharray={circumference}
                                                        strokeDashoffset={strokeDashoffset}
                                                    />
                                                    <text x="50" y="50" className="percentage-text">
                                                        {skill.percentage}%
                                                    </text>
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default Skills;