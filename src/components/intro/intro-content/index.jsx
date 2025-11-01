import React from "react";
import "./style.scss";
import handicon from "../../../images/hand.png"; 
import myimage from "../../../images/me.jpg"; 
import Typewriter from "typewriter-effect";
import CallToAction from "../../shared/CallToAction";
import { scrollToSection } from "../../utils/helpers"; 
import { AiOutlineCloudDownload } from "react-icons/ai";

const IntroContent = () => {
    
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
        <> 
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
                                    strings: ["Full-Stack Developer", "React.js Expert", "Node.js Specialist", "MERN Stack Developer"],
                                    wrapperClassName: "typewriter-text",
                                    cursorClassName: "typewriter-cursor"
                                }}
                            />
                        </h3>
                        
                        <p className="bio-summary">
                            I am a full-stack developer with over 3 years of experience in building scalable web applications. Skilled in both front-end and back-end development, I specialize in the MERN stack and other modern technologies to create seamless user experiences and efficient solutions.
                        </p>
                        
                        <CallToAction 
                            text={<span>DOWNLOAD CV</span>} 
                            action={handleDownload} 
                            className="download-cv-button"
                        />
                    </div>

                    <div className="intro-right-content">
                        <div className="profile-image-wrapper">
                            <img
                                src={myimage}
                                alt="Arjun Pratap Profile"
                                className="profile-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IntroContent;