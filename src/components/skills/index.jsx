import React from "react";
import Section from "../shared/section";
import "./style.scss";
import Skill from "../../images/tech-icons.png";
import CallToAction from "../shared/CallToAction";
import { AiOutlineCloudDownload } from "react-icons/ai";

const Skills = () => {
    // const handleDownload = () => {
    //     const link = document.createElement("a");
    //     link.href = "\Arjun_Pratap_SoftwareDeveloper_Resume.pdf"; // Replace with actual CV file path
    //     link.download = "Arjun_Pratap_Resume_Full_Stack.pdf"; // Set the downloaded file name
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

    return (
        <Section background="dark" id="skills">
            <div className="skills-content-wrapper">
                <div className="left-col">
                    <img src={Skill} alt="imageJsReact" />
                </div>
                <div className="right-col">
                    <h2>Skills</h2>
                    <ul>
                        <li>HTML5</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                        <li>Asp.Net</li>
                        <li>Git</li>
                        <li>GitHub</li>
                        <li>React Js</li>
                        <li>Java</li>
                        <li>Python</li>
                        <li>KafKa</li>
                    </ul>

                    <p>
                        Familiarity with Node.js, Express.js, MongoDB,
                        jQuery, Material UI, Redux, and Tailwind CSS.
                    </p>
                    {/* <CallToAction
                        text="Download CV"
                        icon={<AiOutlineCloudDownload />}
                        action={handleDownload}
                    /> */}
                </div>
            </div>
        </Section>
    );
};

export default Skills;
