import React from "react";
import Section from "../shared/section";
import "./style.scss";


import { SkillsInfo } from "../../constants"; 

const Skills = () => {
    return (
        <Section background="dark" id="skills">
            
            <div className="skills-section-title">
                <h2>SKILLS</h2>
                <div className="separator"></div> 
                <p>
                    A collection of my technical skills and expertise honed through various projects
                </p>
            </div>

            <div className="skill-categories-wrapper">
                {SkillsInfo.map((category) => (
                    <div key={category.title} className="skill-category-card">
                        <h3>{category.title}</h3>
                        <div className="skill-items-grid">
                            {category.skills.map((skill) => (
                                <div key={skill.name} className="skill-item">
                                    <img
                                        src={skill.logo}
                                        alt={`${skill.name} logo`}
                                        className="skill-logo"
                                    />
                                    <span className="skill-name">{skill.name}</span>
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