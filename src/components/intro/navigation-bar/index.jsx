import React from "react";
import "./style.scss";
import CallToAction from "../../shared/CallToAction";
import { scrollToSection } from "../../utils/helpers";

const Navigation = () => {
    return (
        <div className="top-navigation-bar">
            <div className="app-logo">
                
            </div>
            <div className="navigation">
                <span className="navigation-item">Home</span>
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
        </div>
    );
};

export default Navigation;
