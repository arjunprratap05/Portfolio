import React from "react";
import "./style.scss";
import handicon from "../../../images/hand.png"; 
import myimage from "../../../images/me.jpg"; 
import { BsAwardFill } from "react-icons/bs";
import { FaReact } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import { scrollToSection } from "../../utils/helpers"; 
import CallToAction from "../../shared/CallToAction";
import { AiOutlineCloudDownload } from "react-icons/ai";


const IntroContent = () => {
    return (
        <div className="intro-content">
            <div className="layout">
                {/* Left Card */}
                <div className="card card-left">
                    <h1 className="title">
                        <span className="small-text">
                            <span className="text">Hello</span>
                            <span className="icon">
                                <img
                                    src={handicon}
                                    alt="iconhand"
                                />
                            </span>
                            <span className="text">, I am</span>
                        </span>
                        <div
                            style={{ fontSize: "50px", paddingBottom: "20px" }}
                        >
                            <Typewriter
                                options={{
                                    autoStart: true,
                                    loop: true,
                                    delay: 40,
                                    strings: ["Arjun Pratap"],
                                }}
                            />
                        </div>
                    </h1>
                    <div className="i-title">
                        <div className="i-title-wrapper">
                            <div className="i-title-item">Web Developer</div>
                            <div className="i-title-item">Frontend Developer</div>
                            <div className="i-title-item">React Js Developer</div>
                            <div className="i-title-item">Asp.Net Developer</div>
                            <div className="i-title-item">Java Developer</div>
                        </div>
                    </div>
                    <p>
                        I am a full stack developer. My skills are HTML, CSS, Tailwind CSS, JS, React.Js, Git, GitHub, Asp.Net. I am looking for an in-office job for growing my skills.
                    </p>
                    
                </div>

                <div className="card card-right">
                    <img
                        src={myimage}
                        alt="imagegirl"
                        className="profile-image"
                    />
                    <div className="highlights horizontal">
                        <div className="icon">
                            <BsAwardFill />
                        </div>
                        <div className="text">Mern Stack Developer</div>
                    </div>

                    <div className="highlights verticle">
                        <div className="icon">
                            <FaReact />
                        </div>
                        <div className="text">
                            <span>React Js</span>
                            Developer
                        </div>
                    </div>
                    
                </div>
            </div>
           
        </div>
    );
};

export default IntroContent;
