import React, { useState, useEffect } from "react";
import Section from "../shared/section";
import "./style.scss";
import { SkillsInfo } from "../../constants";

const Skills = () => {
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [tappedSkill, setTappedSkill] = useState(null);

    useEffect(() => {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            setIsTouchDevice(true);
        }
    }, []);

    const handleTap = (skillName) => {
        setTappedSkill(tappedSkill === skillName ? null : skillName);
    };

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

                                const isHovered = hoveredSkill === skill.name;
                                const isTapped = tappedSkill === skill.name;

                                return (
                                    <div
                                        key={skill.name}
                                        className="skill-item"
                                        onMouseEnter={() => !isTouchDevice && setHoveredSkill(skill.name)}
                                        onMouseLeave={() => !isTouchDevice && setHoveredSkill(null)}
                                        onClick={() => isTouchDevice && handleTap(skill.name)}
                                    >
                                        <div className={`skill-content ${isTouchDevice && isTapped ? 'hidden-on-tap' : ''}`}>
                                            <img
                                                src={skill.logo}
                                                alt={`${skill.name} logo`}
                                                className="skill-logo"
                                            />
                                            <span className="skill-name">{skill.name}</span>
                                        </div>

                                        {skill.percentage && (
                                            <div className={`skill-percentage-overlay ${isTouchDevice && !isTapped ? 'hidden-on-tap' : ''}`}>
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