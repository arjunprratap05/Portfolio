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
                                    "Software Engineer",
                                    "Full Stack Developer",
                                    "Backend API Specialist",
                                    "Generative AI Engineer",
                                    "AI Workflow Automator"
                                ],
                                wrapperClassName: "typewriter-text",
                                cursorClassName: "typewriter-cursor"
                            }}
                        />
                    </h3>

                    <p className="bio-summary">
                        Software Engineer with <strong>4 years of experience</strong> building scalable 
                        web applications, backend APIs, and <strong>AI-supported product features</strong>. 
                        I specialize in cross-functional development using React.js, Node.js, ASP.NET Core, 
                        and integrating Generative AI (LLMs) to automate complex workflows, successfully 
                        <strong> reducing manual operational effort by 40%</strong>.
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