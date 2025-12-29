import React, { useState } from "react";
import "./style.scss";
import Section from "../shared/section";
import Filters from "./filter";
import Showcase from "./showcase";
import ProjectModal from "./project-modal";

const rawProjectsData = [ 
    {
        id: 1,
        name: "Mega-Blog",
        tags: ["web-app", "product"],
        description: "A comprehensive blogging platform built with modern web technologies, enabling users to create and manage their own content.",
        media: { thumbnail: require("../../images/portfolio/appwrite.png") },
        codeUrl: "https://github.com/arjunprratap05/appwriteBlog", 
        liveUrl: "https://appwrite-blog-rho-eosin.vercel.app/",
    },
    {
        id: 2,
        name: "Mega-Blog-Login",
        tags: ["web-page"],
        description: "Secure user authentication interface for the blogging platform, ensuring seamless login experiences.",
        media: { thumbnail: require("../../images/portfolio/appwriteLogin.png") },
        codeUrl: "https://github.com/arjunprratap05/appwriteBlog", 
        liveUrl: "https://appwrite-blog-rho-eosin.vercel.app/",
    },
    {
        id: 3,
        name: "Mega-Blog-SignUp",
        tags: ["product"],
        description: "User registration interface for creating new accounts on the blogging platform, designed for ease of use.",
        media: { thumbnail: require("../../images/portfolio/appwritesignIN.png") },
        codeUrl: "https://github.com/arjunprratap05/appwriteBlog", 
        liveUrl: "https://appwrite-blog-rho-eosin.vercel.app/",
    },
    {
        id: 4,
        name: "Blog Post",
        tags: ["product"],
        description: "Detailed view of individual blog posts with rich content display and commenting features.",
        media: { thumbnail: require("../../images/portfolio/MegaBlogPost.png") },
        codeUrl: "https://github.com/arjunprratap05/appwriteBlog", 
        liveUrl: "https://appwrite-blog-rho-eosin.vercel.app/",
    },
    {
        id: 5,
        name: "Blog Post-2",
        tags: ["web-app", "web-page"],
        description: "Another iteration of a blog post display, focusing on responsive design and content readability.",
        media: { thumbnail: require("../../images/portfolio/BlogPost.png") },
        codeUrl: "https://github.com/arjunprratap05/appwriteBlog", 
        liveUrl: "https://appwrite-blog-rho-eosin.vercel.app/",
    },
    {
        id: 6,
        name: "DBMS-Project-Data",
        tags: ["product", "web-app"],
        description: "Database management system project showcasing data handling and retrieval capabilities for complex datasets.",
        media: { thumbnail: require("../../images/portfolio/DbData.png") },
        codeUrl: "https://github.com/arjunprratap05/appwriteBlog", 
        liveUrl: "https://appwrite-blog-rho-eosin.vercel.app/",
    },
    {
        id: 7,
        name: "DBMS-Project-ERD",
        tags: ["web-page", "web-app", "mobile-app", "product"],
        description: "Entity-Relationship Diagram visualization tool for database design, simplifying complex data models.",
        media: { thumbnail: require("../../images/portfolio/DbAttributes.png") },
        codeUrl: "https://github.com/arjunprratap05/appwriteBlog", 
        liveUrl: "https://appwrite-blog-rho-eosin.vercel.app/",
    },
    {
        id: 8,
        name: "GitHub Profile Detective",
        tags: ["web-page", "web-app", "mobile-app", "product"],
        description: "A github profile analysis tool that provides insights into user contributions, repositories, and activity patterns.",
        media: { thumbnail: require("../../images/portfolio/GitHub-Profile-Search-App.png") },
        codeUrl: "https://github.com/arjunprratap05/SocialMedia", 
        liveUrl: "https://social-media-kappa-pearl.vercel.app/",          
    },
];

const Portfolio = () => {
    const [projects, setProjects] = useState(rawProjectsData);
    const [transition, setTransition] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const filterProjects = (tag) => {
        setTransition("zoomout");
        setTimeout(() => {
            if (tag !== "all") {
                const filtered = rawProjectsData.filter((item) => item.tags.includes(tag));
                setProjects(filtered);
            } else {
                setProjects(rawProjectsData);
            }
            setTransition("zoomin");
        }, 200);
        setTimeout(() => setTransition(false), 600);
    };

    return (
        <Section id="portfolio" background="dark">
            <div className="portfolio-header">
                <span className="subtitle">Showcase</span>
                <h2>RECENT <span className="purple">PROJECTS</span></h2>
                <div className="line-glow"></div>
                <p className="portfolio-subtitle">
                    Explore my technical journey through these live projects.
                </p>
            </div>

            <div className="portfolio-content-wrapper">
                <Filters filterProjects={filterProjects} />
                <Showcase 
                    data={projects} 
                    transition={transition} 
                    onProjectClick={(project) => setSelectedProject(project)}
                />
            </div>

            {selectedProject && (
                <ProjectModal 
                    project={selectedProject} 
                    onClose={() => setSelectedProject(null)} 
                />
            )}
        </Section>
    );
};

export default Portfolio;