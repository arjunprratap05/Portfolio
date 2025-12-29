import React from "react";
import { FaGithub, FaLinkedinIn, FaInstagram, FaFacebook } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import Section from "../shared/section";
import SocialIcon from "./social-icon";
import { scrollToSection } from "../utils/helpers";
import "./style.scss";

const Footer = () => {
    return (
        <Section background="dark" id="footer">
            <div className="footer-content-wrapper">
                <div className="footer-typewriter">
                    <Typewriter
                        options={{
                            autoStart: true,
                            loop: true,
                            delay: 40,
                            strings: [
                                "This is just a glimpse of what I bring to the table.",
                                "Thank you for visiting!",
                                "Let's build the future together."
                            ],
                        }}
                    />
                </div>

                <ul className="footer-menu-items">
                    <li className="footer-menu-item" onClick={() => scrollToSection("home")}>Home</li>
                    <li className="footer-menu-item" onClick={() => scrollToSection("skills")}>Skills</li>
                    <li className="footer-menu-item" onClick={() => scrollToSection("contact")}>Contact</li>
                    <li className="footer-menu-item" onClick={() => scrollToSection("experience")}>experience</li>
                    <li className="footer-menu-item" onClick={() => scrollToSection("portfolio")}>Projects</li>
                </ul>

                <div className="social-icons">
                    <SocialIcon
                        color="#24292e"
                        icon={<FaGithub />}
                        link="https://github.com/arjunprratap05"
                    />
                    <SocialIcon
                        color="#0A66C2"
                        icon={<FaLinkedinIn />}
                        link="https://www.linkedin.com/in/arjun-pratap-6132941a6/"
                    />
                    <SocialIcon
                        color="#E4405F"
                        icon={<FaInstagram />}
                        link="https://www.instagram.com/arjun.prratap05/"
                    />
                    <SocialIcon
                        color="#1877F2"
                        icon={<FaFacebook />}
                        link="https://www.facebook.com/arjun.prratap05/"
                    />
                </div>

                <div className="bottom-bar">
                    <div className="copyright-text">
                        Copyright All Rights Reserved, 2025 | Arjun Pratap
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Footer;