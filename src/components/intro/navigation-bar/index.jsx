import React from "react";
import "./style.scss";
import CallToAction from "../../shared/CallToAction"; 
import { scrollToSection } from "../../utils/helpers"; 

const Navigation = () => {
    
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/Arjun_Pratap_SoftwareDeveloper_Resume.pdf";
        link.download = "Arjun_Pratap_Resume_Full_Stack.pdf"; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert("Resume Downloaded!");
    };

    return (
        <div className="top-navigation-bar">
            
            <div className="app-logo" onClick={() => scrollToSection("home")}>
                
                <span className="logo-text">Arjun's Portfolio</span> 
            </div>

            <div className="navigation">
                <span
                    className="navigation-item"
                    onClick={() => scrollToSection("home")}
                >
                    Home
                </span>
                <span
                    className="navigation-item"
                    onClick={() => scrollToSection("skills")}
                >
                    Skills
                </span>
                <span
                    className="navigation-item"
                    onClick={() => scrollToSection("portfolio")}
                >
                    Portfolio
                </span>
                <span
                    className="navigation-item"
                    onClick={() => scrollToSection("contact")}
                >
                    Contact Me
                </span>
            </div>

            <CallToAction text="Resume" action={handleDownload} />
        </div>
    );
};

export default Navigation;