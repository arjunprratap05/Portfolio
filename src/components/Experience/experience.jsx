import React from "react";
import "./style.scss";
import SectionTitle from "../shared/SectionTitle";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
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
            "Delivered batch dashboard saving 8 hours/week for 50+ staff.",
            "Created reusable UI components, reducing redundancy across 4+ projects.",
            "Achieved 99.9% uptime with CI/CD pipelines using GitHub Actions.",
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

                <div className="timeline-container">
                    {experienceData.map((job, index) => (
                        <div key={index} className="timeline-item">
                            <div className="timeline-line-wrapper">
                                <div className="timeline-dot">
                                    <FaBriefcase className="dot-icon" />
                                </div>
                                <div className="timeline-line"></div>
                            </div>

                            <div className="experience-card glass-effect">
                                <div className="card-header">
                                    <div className="title-group">
                                        <h3 className="job-title">{job.title}</h3>
                                        <span className="specialization">{job.specialization}</span>
                                    </div>
                                    <div className="duration-pill">
                                        <FaCalendarAlt /> {job.duration}
                                    </div>
                                </div>

                                <div className="company-info">
                                    <span className="company-name">{job.company}</span>
                                    <span className="divider">|</span>
                                    <span className="location"><FaMapMarkerAlt /> {job.location}</span>
                                </div>

                                <ul className="job-details">
                                    {job.details.map((detail, dIndex) => (
                                        <li key={dIndex}>
                                            <GoDotFill className="bullet" /> 
                                            <p>{detail}</p>
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