import React from "react";
import "./style.scss";
import SectionTitle from "../shared/SectionTitle";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const experienceData = [
    {
        title: "Software Developer Full Stack and AI Solutions",
        specialization: "ASP.NET Core • React.js • Node.js • OpenAI API",
        company: "NIIT Ltd",
        location: "Gurugram, India",
        duration: "Sep 2022 - Present",
        details: [
            "Engineered 12+ enterprise modules using ASP.NET Core, React.js, Node.js, MongoDB, and SQL Server for internal business applications.",
            "Improved API response time by 35% through SQL indexing, query tuning, payload optimization, and service-layer refactoring.",
            "Automated Excel upload and export workflows, reducing manual data handling effort by 40% for business and operations teams.",
            "Added OpenAI API and LangChain features to support contextual search, content assistance, and faster knowledge access.",
            "Maintained Docker and GitHub Actions CI/CD pipelines, reducing manual deployment tasks by 30%."
        ],
        tags: ["ASP.NET Core", "React.js", "Node.js", "OpenAI API", "SQL Server", "MongoDB", "CI/CD"]
    }
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