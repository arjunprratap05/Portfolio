import React from "react";
import "./style.scss";
import cloudSoft from "../../images/cloud-soft.png";
import IntroContent from "./intro-content";

const Intro = () => {
    return (
        <div className="Intro-section" id="home">
            <div className="vector-bg" id="parallax"></div>

            <div className="purple-glow-orb top-left"></div>
            <div className="purple-glow-orb bottom-right"></div>

            <img
                src={cloudSoft}
                alt="cloudSoft"
                className="cloud-soft"
            />

            <div className="content">
                <IntroContent />
            </div>
        </div>
    );
};

export default Intro;