import React from "react";
import "./style.scss";
import handicon from "../../../images/hand.png"; 
import myimage from "../../../images/me.jpg"; 
import Typewriter from "typewriter-effect";

const IntroContent = () => {
    return (
        <div id="home" className="intro-content-wrapper">
            <div className="layout">
                <div className="intro-left-content">
                    <h1 className="greeting">
                        Hi, I am
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
                                    "Generative AI Engineer", 
                                    "LLM & Agentic AI Specialist", 
                                    "Cloud & DevOps Enthusiast"
                                ],
                                wrapperClassName: "typewriter-text",
                                cursorClassName: "typewriter-cursor"
                            }}
                        />
                    </h3>
                    
                    <p className="bio-summary">
                        Full Stack Developer with 3 years and 3 months of experience. 
                        I specialize in the MERN stack and integrating Generative AI solutions using OpenAI APIs to automate 
                        business processes, reducing manual operational effort by 40%.
                    </p>
                </div>

                <div className="intro-right-content">
                    <div className="profile-image-wrapper">
                        <img src={myimage} alt="Arjun Pratap Profile" className="profile-image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntroContent;