import React, { useState, useRef, useEffect } from "react";
import "./style.scss";
import { FaLinkedinIn, FaGithub, FaBars, FaTimes, FaCloudDownloadAlt, FaBuilding, FaRocket, FaChevronDown } from "react-icons/fa";

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close the dropdown if the user clicks outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setResumeDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDownload = (type) => {
        const link = document.createElement("a");
        
        // Target the specific PDFs based on the user's selection
        if (type === 'mnc') {
            link.href = "/Arjun_Pratap_MNC_Enterprise_Software_Engineer_Resume.pdf";
            link.download = "Arjun_Pratap_MNC_Enterprise_Software_Engineer_Resume.pdf";
        } else {
            link.href = "/Arjun_Pratap_Startup_Product_AI_Resume.pdf";
            link.download = "Arjun_Pratap_Startup_Product_AI_Resume.pdf";
        }
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setResumeDropdownOpen(false);
        setMenuOpen(false);
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = element.offsetTop - 80;
            window.scrollTo({ top: offset, behavior: 'smooth' });
            setMenuOpen(false);
        }
    };

    return (
        <nav className="portfolio-top-nav-fixed">
            <div className="nav-wrapper">
                <div className="app-logo" onClick={() => scrollToSection("home")}>
                    <span className="logo-text">Arjun<span className="dot">.</span></span>
                    <span className="logo-badge">Full Stack & GenAI</span>
                </div>

                <div className="desktop-menu-wrapper">
                    <div className="navigation-links">
                        <span className="navigation-item" onClick={() => scrollToSection("skills")}>Skills</span>
                        <span className="navigation-item" onClick={() => scrollToSection("experience")}>Experience</span>
                        <span className="navigation-item" onClick={() => scrollToSection("portfolio")}>Projects</span>
                        <span className="navigation-item" onClick={() => scrollToSection("contact")}>Contact</span>
                    </div>

                    <div className="v-divider"></div>

                    <div className="eye-catch-socials">
                        <a href="https://github.com/arjunprratap05" target="_blank" rel="noopener noreferrer" className="social-icon github">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/arjun-pratap-6132941a6/" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                            <FaLinkedinIn />
                        </a>
                    </div>

                    {/* Desktop Resume Dropdown Container */}
                    <div className="resume-dropdown-container" ref={dropdownRef}>
                        <button 
                            className="nav-resume-btn" 
                            onClick={() => setResumeDropdownOpen(!resumeDropdownOpen)}
                        >
                            <FaCloudDownloadAlt /> Resume <FaChevronDown className={`chevron ${resumeDropdownOpen ? 'open' : ''}`} style={{ fontSize: '0.7em', marginLeft: '5px' }} />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {resumeDropdownOpen && (
                            <div className="resume-dropdown-menu">
                                <div className="dropdown-item" onClick={() => handleDownload('mnc')}>
                                    <FaBuilding className="dropdown-icon" />
                                    <span>MNC / Enterprise</span>
                                </div>
                                <div className="dropdown-item" onClick={() => handleDownload('startup')}>
                                    <FaRocket className="dropdown-icon" />
                                    <span>Startup / Product</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
                <div className="mobile-close-btn" onClick={() => setMenuOpen(false)}>
                    <FaTimes />
                </div>

                <div className="drawer-content">
                    <span onClick={() => scrollToSection("skills")}>Skills</span>
                    <span onClick={() => scrollToSection("experience")}>Experience</span>
                    <span onClick={() => scrollToSection("portfolio")}>Projects</span>
                    <span onClick={() => scrollToSection("contact")}>Contact</span>

                    <div className="mobile-social-wrap">
                        <a href="https://github.com/arjunprratap05" target="_blank" rel="noopener noreferrer">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/arjun-pratap-6132941a6/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedinIn />
                        </a>
                    </div>

                    {/* Mobile Resume Options */}
                    <div className="mobile-resume-section">
                        <p className="resume-title" style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '10px', opacity: 0.7 }}>Download Resume</p>
                        <button className="drawer-btn outline" onClick={() => handleDownload('mnc')} style={{ marginBottom: '10px' }}>
                            <FaBuilding /> Enterprise Profile
                        </button>
                        <button className="drawer-btn outline" onClick={() => handleDownload('startup')}>
                            <FaRocket /> Startup Profile
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;