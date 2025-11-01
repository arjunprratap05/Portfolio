import React from "react";
import "./style.scss";
import { FaLinkedinIn, FaGithub } from "react-icons/fa"; 

const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
        const offset = element.offsetTop - 75; 
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    }
};

const Navigation = () => {
    return (
        <div className="portfolio-top-nav-fixed"> 
            
            
            <div className="app-logo" onClick={() => scrollToSection("home")}>
                <span className="logo-text">Arjun<span className="dot">.</span></span>
            </div>

            <div className="navigation-links">
                <span className="navigation-item" onClick={() => scrollToSection("skills")}>
                    Skills
                </span>
                <span className="navigation-item" onClick={() => scrollToSection("experience")}> 
                    Experience
                </span>
                <span className="navigation-item" onClick={() => scrollToSection("portfolio")}>
                    Projects
                </span>
                <span className="navigation-item" onClick={() => scrollToSection("contact")}>
                    Contacts
                </span>
            </div>

            <div className="social-icons">
                <a href="https://github.com/arjunprratap05" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/arjun-pratap-6132941a6" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaLinkedinIn />
                </a>
            </div>
        </div>
    );
};
export default Navigation;