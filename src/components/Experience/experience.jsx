import React from "react";
import "./style.scss";
import SectionTitle from "../shared/SectionTitle";
import { FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go"; 

const experienceData = [
    {
        title: "Software Developer Full Stack (ASP.NET Core, ReactJS, Node.js)",
        company: "NIIT Ltd, Gurugram, India",
        duration: "Sep 2022 - Present",
        details: [
            "Architected Excel bulk upload system using ASP.NET Core, reducing workflow time by 40%.",
            "Delivered batch dashboard (React.JS/Node/ASP.NET) saving 8 hours/week for 50+ staff.",
            "Created reusable UI components, reducing redundancy across 4+ projects.",
            "Achieved 99.9% uptime with CI/CD pipelines using GitHub Actions.",
            "Reduced development time by 25% via GitHub Copilot and prompt engineering."
        ],
    },
];

const Experience = () => {
    return (
        <section id="experience" className="experience-section">
            <div className="layout">
                <SectionTitle 
                    title="EXPERIENCE" 
                    tagline="My professional journey, highlighting key roles and accomplishments in software development."
                />

                <div className="timeline-container">
                    {experienceData.map((job, index) => (
                        <div key={index} className="timeline-item">
                            <div className="job-header">
                                <h3 className="job-title">{job.title}</h3>
                                <p className="job-company">
                                    <FaBriefcase className="icon" /> {job.company}
                                </p>
                                <p className="job-duration">
                                    <FaCalendarAlt className="icon" /> {job.duration}
                                </p>
                            </div>
                            <ul className="job-details">
                                {job.details.map((detail, detailIndex) => (
                                    <li key={detailIndex}>
                                        <GoDotFill className="bullet-icon" /> {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;