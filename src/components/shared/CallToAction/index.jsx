import React from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import Arrow from "../Arrow";
import "./style.scss";

const CallToAction = ({ text, action, icon }) => {
    return (
        <div className="call-to-action" onClick={action}>
            <span className="text"> {text}</span>
            {icon ? <div className="icon">{icon}</div> : <Arrow />}
        </div>
    );
};

export default CallToAction;