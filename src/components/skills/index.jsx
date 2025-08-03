import React, { useState, useEffect } from "react";
import Section from "../shared/section";
import "./style.scss";
import { SkillsInfo } from "../../constants";

const Skills = () => {
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [tappedSkill, setTappedSkill] = useState(null);
    const [skillsData, setSkillsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            setIsTouchDevice(true);
        }

        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; 
        
        const fetchSkills = async () => {
            let mergedSkills = [...SkillsInfo];

            try {
                const response = await fetch(`${apiUrl}/skills`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const dataFromApi = await response.json();
                
                if (Array.isArray(dataFromApi)) {
                    mergedSkills = SkillsInfo.map(category => {
                        const apiCategory = dataFromApi.find(ac => ac.title === category.title);
                        
                        if (apiCategory && Array.isArray(apiCategory.skills)) {
                            return {
                                ...category,
                                skills: category.skills.map(localSkill => {
                                    const apiSkillData = apiCategory.skills.find(
                                        s => s.name === localSkill.name
                                    );
                                    return {
                                        ...localSkill,
                                        percentage: apiSkillData?.percentage || 0,
                                        topics: apiSkillData?.topics || []
                                    };
                                })
                            };
                        }
                        
                        return category;
                    });
                } else {
                    console.warn("API response is not an array, using local data.");
                }

            } catch (err) {
                console.error("Failed to fetch skills data from API, using fallback data:", err);
            } finally {
                setSkillsData(mergedSkills);
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    const handleTap = (skillName) => {
        setTappedSkill(tappedSkill === skillName ? null : skillName);
    };

    if (loading) {
        return <Section background="dark" id="skills">Loading skills...</Section>;
    }
    
    return (
        <Section background="dark" id="skills">
            <div className="skills-section-title">
                <h2>SKILLS</h2>
                <div className="separator"></div>
                <p>A collection of my technical skills</p>
            </div>

            <div className="skill-categories-wrapper">
                {skillsData.map((category) => (
                    <div key={category.title} className="skill-category-card">
                        <h3>{category.title}</h3>
                        <div className="skill-items-grid">
                            {category.skills.map((skill) => {
                                const isHovered = hoveredSkill === skill.name;
                                const isTapped = tappedSkill === skill.name;
                                
                                return (
                                    <div
                                        key={skill.name}
                                        className={`skill-item ${isTapped ? 'tapped' : ''}`}
                                        onMouseEnter={() => !isTouchDevice && setHoveredSkill(skill.name)}
                                        onMouseLeave={() => !isTouchDevice && setHoveredSkill(null)}
                                        onClick={() => isTouchDevice && handleTap(skill.name)}
                                    >
                                        <div className="skill-content">
                                            <img
                                                src={skill.logo}
                                                alt={`${skill.name} logo`}
                                                className="skill-logo"
                                            />
                                            <span className="skill-name">{skill.name}</span>
                                        </div>

                                        {(isHovered || isTapped) && (
                                            <div className="skill-details-overlay">
                                                <h4>Progress: {skill.percentage}%</h4>
                                                {skill.topics.length > 0 ? (
                                                    <ul>
                                                        {skill.topics.map((topic, index) => (
                                                            <li key={index}>{topic}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>No topics tracked yet.</p>
                                                )}
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