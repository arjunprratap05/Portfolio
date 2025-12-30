import React, { useState } from "react";
import "./style.scss";
import { FaLinkedinIn, FaGithub, FaBars, FaTimes, FaCloudDownloadAlt } from "react-icons/fa"; 

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/Arjun_Pratap_Resume_GENAI.pdf"; 
        link.download = "Arjun_Pratap_Resume_GenAI.pdf"; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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

                {/* Desktop UI - Untouched */}
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

                    <button className="nav-resume-btn" onClick={handleDownload}>
                        <FaCloudDownloadAlt /> Resume
                    </button>
                </div>

                <div className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
                {/* Cross Icon for Mobile */}
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

                    <button className="drawer-btn" onClick={handleDownload}>Resume</button>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;