import React, { useState, useEffect, useRef, useCallback } from "react";
import Section from "../shared/section";
import "./style.scss";
import { SkillsInfo } from "../../constants";

const Skills = () => {
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [tappedSkill, setTappedSkill] = useState(null);
    const [skillsData, setSkillsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [popupStyle, setPopupStyle] = useState({});
    const [popupContent, setPopupContent] = useState([]);
    
    const skillRefs = useRef({});
    const popupRef = useRef(null);

    const clearPopupState = useCallback(() => {
        setTappedSkill(null);
        setPopupStyle({});
        setPopupContent([]);
        setHoveredSkill(null);
    }, []);

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

    useEffect(() => {
        const handleOutsideClick = (event) => {
            const isSkillItem = event.target.closest(".skill-item");
            const isPopup = popupRef.current && popupRef.current.contains(event.target);
            
            if (!isSkillItem && !isPopup) {
                clearPopupState();
            }
        };
    
        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("touchstart", handleOutsideClick);
    
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("touchstart", handleOutsideClick);
        };
    }, [clearPopupState]);

    useEffect(() => {
        const handleScroll = () => {
            if (tappedSkill) {
                clearPopupState();
            }
        };
        
        if (tappedSkill) {
            window.addEventListener("scroll", handleScroll, { passive: true });
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [tappedSkill, clearPopupState]);

    const updatePopupPosition = useCallback((node, topics) => {
        if (!node || !topics || topics.length === 0) {
            setPopupStyle({});
            setPopupContent([]);
            return;
        }

        const rect = node.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const popupWidth = 250;
        const popupHeight = Math.min(topics.length * 20 + 70, 300);

        let newStyle = {};
        
        let leftPos = rect.right + 20;
        let topPos = rect.top + rect.height / 2 - popupHeight / 2;

        if (leftPos + popupWidth > viewportWidth) {
            leftPos = rect.left - popupWidth - 20;
        }
        if (topPos < 0) {
            topPos = 10;
        } else if (topPos + popupHeight > viewportHeight) {
            topPos = viewportHeight - popupHeight - 10;
        }

        newStyle = {
            ...newStyle,
            left: `${leftPos}px`,
            top: `${topPos}px`,
            opacity: 1,
            visibility: 'visible',
        };

        setPopupStyle(newStyle);
        setPopupContent(topics);
    }, []);

    const handleMouseEnter = useCallback((skill, name) => {
        if (isTouchDevice) return;
        const node = skillRefs.current[name];
        if (node) {
            setHoveredSkill(name);
            updatePopupPosition(node, skill.topics);
        }
    }, [isTouchDevice, updatePopupPosition]);

    const handleMouseLeave = useCallback((event) => {
        if (isTouchDevice) return;
        if (popupRef.current && popupRef.current.contains(event.relatedTarget)) {
            return;
        }
        setHoveredSkill(null);
        setPopupStyle({});
        setPopupContent([]);
    }, [isTouchDevice]);

    const handleTap = useCallback((skill, name) => {
        if (!isTouchDevice) return;
        const node = skillRefs.current[name];
        if (!node) return;

        if (tappedSkill === name) {
            clearPopupState();
        } else {
            setTappedSkill(name);
            updatePopupPosition(node, skill.topics);
        }
    }, [isTouchDevice, tappedSkill, updatePopupPosition, clearPopupState]);

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
                                const isTapped = tappedSkill === skill.name;
                                
                                return (
                                    <div
                                        key={skill.name}
                                        className={`skill-item ${isTapped ? 'tapped' : ''}`}
                                        ref={el => (skillRefs.current[skill.name] = el)}
                                        onMouseEnter={() => handleMouseEnter(skill, skill.name)}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => handleTap(skill, skill.name)}
                                    >
                                        <div className="skill-content">
                                            <img
                                                src={skill.logo}
                                                alt={`${skill.name} logo`}
                                                className="skill-logo"
                                            />
                                            <span className="skill-name">{skill.name}</span>
                                        </div>
                                        
                                        {(hoveredSkill === skill.name || isTapped) && (
                                            <div className="skill-percentage-overlay">
                                                <div 
                                                    className="percentage-chart" 
                                                    style={{ 
                                                        background: `conic-gradient(#8245ec ${skill.percentage}%, transparent ${skill.percentage}%)`
                                                    }}
                                                >
                                                    <span className="percentage-text">
                                                        {skill.percentage}%
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {popupContent.length > 0 && (
                <div 
                    className="skill-topics-fixed-overlay" 
                    style={popupStyle} 
                    ref={popupRef}
                >
                    <h4>Topics Covered:</h4>
                    <ul>
                        {popupContent.map((topic, index) => (
                            <li key={index}>{topic}</li>
                        ))}
                    </ul>
                </div>
            )}
        </Section>
    );
};

export default Skills;