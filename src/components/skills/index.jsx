import React from "react";
import Section from "../shared/section";
import { SkillsInfo } from "../../constants";
import "./style.scss";

const Skills = () => {
    return (
        <Section background="dark" id="skills">
            <div className="skills-header">
                <h2 className="underlined-title">Tech Architecture</h2>
            </div>

            <div className="skills-container">
                {SkillsInfo.map((category) => (
                    <div key={category.title} className="skill-category-square">
                        <div className="category-top">
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
                ))}
            </div>
        </Section>
    );
};

export default Skills;