import React from "react";
import "./style.scss";
import handicon from "../../../images/hand.png";
import myimage from "../../../images/me.jpeg";
import Typewriter from "typewriter-effect";

const IntroContent = () => {
    return (
        <div id="home" className="intro-content-wrapper">
            <div className="layout">
                <div className="intro-left-content">
                    <h1 className="greeting">
                        HI, I AM 
                        <img src={handicon} alt="hand icon" className="hand-icon" />
                    </h1>
                    <h2 className="main-name">Arjun Pratap</h2>

                    <h3 className="hero-role-typewriter">
                        I am a{' '}
                        <Typewriter
                            options={{
                                autoStart: true,
                                loop: true,
                                delay: 40,
                                strings: [
                                    "Full Stack Developer (MERN)",
                                    "Backend & Microservices Engineer",
                                    "Generative AI Engineer",
                                    "LLM & Agentic AI Specialist",
                                    "Cloud & DevOps Engineer"
                                ],
                                wrapperClassName: "typewriter-text",
                                cursorClassName: "typewriter-cursor"
                            }}
                        />
                    </h3>

                    <p className="bio-summary">
                        Full Stack Engineer with <strong>3.3+ years of impact</strong> building scalable
                        MERN applications and <strong>production-grade AI solutions</strong>. I specialize in
                        <strong> Microservices architecture</strong> and integrating LLMs to automate
                        complex business processes, successfully <strong>reducing operational effort
                        by 40%</strong>.
                    </p>
                </div>

                <div className="intro-right-content">
                    <div className="profile-image-container">
                        <div className="blob-border">
                            <img src={myimage} alt="Arjun Pratap Profile" className="profile-image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntroContent;