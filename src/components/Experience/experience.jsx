import React from "react";
import "./style.scss";
import SectionTitle from "../shared/SectionTitle";
import { FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go"; 

const experienceData = [
    {
        title: "Software Developer Full Stack",
        specialization: "ASP.NET Core • ReactJS • Node.js",
        company: "NIIT Ltd",
        location: "Gurugram, India",
        duration: "Sep 2022 - Present",
        details: [
            "Architected Excel bulk upload system using ASP.NET Core, reducing workflow time by 40%.",
            "Delivered batch dashboard (React.JS/Node/ASP.NET) saving 8 hours/week for 50+ staff.",
            "Created reusable UI components, reducing redundancy across 4+ projects.",
            "Achieved 99.9% uptime with CI/CD pipelines using GitHub Actions.",
            "Reduced development time by 25% via GitHub Copilot and prompt engineering."
        ],
        tags: ["ASP.NET Core", "React", "Node.js", "GenAI", "CI/CD"]
    },
];

const Experience = () => {
    return (
        <section id="experience" className="experience-section">
            <div className="layout">
                <SectionTitle 
                    title="EXPERIENCE" 
                    tagline="My professional journey in software development."
                />

                <div className="timeline-wrapper">
                    {experienceData.map((job, index) => (
                        <div key={index} className="timeline-card glass-effect">
                            <div className="timeline-node">
                                <div className="node-inner"></div>
                            </div>

                            <div className="card-content">
                                <div className="job-header">
                                    <h3 className="job-title">{job.title}</h3>
                                    <span className="specialization">{job.specialization}</span>
                                    
                                    <div className="job-meta">
                                        <p><FaBriefcase className="icon" /> {job.company}, {job.location}</p>
                                        <p><FaCalendarAlt className="icon" /> {job.duration}</p>
                                    </div>
                                </div>

                                <ul className="job-details">
                                    {job.details.map((detail, dIndex) => (
                                        <li key={dIndex}>
                                            <GoDotFill className="bullet" /> {detail}
                                        </li>
                                    ))}
                                </ul>

                                <div className="skill-tags">
                                    {job.tags.map((tag, tIndex) => (
                                        <span key={tIndex} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;