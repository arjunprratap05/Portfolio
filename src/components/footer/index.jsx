import React from "react";
import { FaYoutube, FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import Section from "../shared/section";
import SocialIcon from "./social-icon";
import { scrollToSection } from "../utils/helpers";
import "./style.scss";

const Footer = () => {
    return (
        <Section
            background="dark"
            id="footer"
        >
            <div className="footer-content-wrapper">
                <div
                    style={{
                        fontSize: "50px",
                        textAlign: "center",
                        paddingBottom: "20px",
                        color: "white",
                    }}
                >
                    <Typewriter
                        options={{
                            autoStart: true,
                            loop: true,
                            delay: 40,
                            strings: ["Thank You. I hope you like it!"],
                        }}
                    />
                </div>
                <ul className="footer-menu-items">
                    <li
                        className="footer-menu-item"
                        onClick={() => scrollToSection("home")}
                    >
                        Home
                    </li>
                    <li
                        className="footer-menu-item"
                        onClick={() => scrollToSection("skills")}
                    >
                        Skills
                    </li>
                    <li
                        className="footer-menu-item"
                        onClick={() => scrollToSection("portfolio")}
                    >
                        Portfolio
                    </li>

                     <li
                        className="footer-menu-item"
                        onClick={() => {
                            scrollToSection("contact");
                        }}
                    >
                        Contact me
                    </li> 
                </ul>
                <div className="social-icons">
                    <SocialIcon
                        color="#0D2636"
                        icon={<FaGithub />}
                        link="https://github.com/arjunprratap05"
                    />
                    <SocialIcon
                        color="#0A66C2"
                        icon={<FaLinkedinIn />}
                        link="https://www.linkedin.com/in/arjun-pratap-6132941a6/"
                    />

                    <SocialIcon
                        color="#E84C88"
                        icon={<FaInstagram />}
                        link="https://www.instagram.com/arjun.prratap05/"
                    />
                </div>
                <div className="bottom-bar">
                    <div className="copyright-text">
                        Copyright All Rights Reserverd,2025 | Arjun Pratap
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Footer;
