import React, { useState } from "react";
import "./style.scss";
import Section from "../shared/section";
import Filters from "./filter";
import Showcase from "./showcase";

const rawProjectsData = [ 
    {
        id: 1,
        name: "Mega-Blog",
        tags: ["web-app", "product"],
        description: "A comprehensive blogging platform built with modern web technologies, enabling users to create and manage their own content.",
        media: {
            thumbnail: require("../../images/portfolio/appwrite.png"),
        },
    },
    {
        id: 2,
        name: "Mega-Blog-Login",
        tags: ["web-page"],
        description: "Secure user authentication interface for the blogging platform, ensuring seamless login experiences.",
        media: {
            thumbnail: require("../../images/portfolio/appwriteLogin.png"),
        },
    },
    {
        id: 3,
        name: "Mega-Blog-SignUp",
        tags: ["product"],
        description: "User registration interface for creating new accounts on the blogging platform, designed for ease of use.",
        media: {
            thumbnail: require("../../images/portfolio/appwritesignIN.png"),
        },
    },
    {
        id: 4,
        name: "Blog Post",
        tags: ["product"],
        description: "Detailed view of individual blog posts with rich content display and commenting features.",
        media: {
            thumbnail: require("../../images/portfolio/MegaBlogPost.png"),
        },
    },
    {
        id: 5,
        name: "Blog Post-2",
        tags: ["web-app", "web-page"],
        description: "Another iteration of a blog post display, focusing on responsive design and content readability.",
        media: {
            thumbnail: require("../../images/portfolio/BlogPost.png"),
        },
    },
    {
        id: 6,
        name: "DBMS-Project-Data",
        tags: ["product", "web-app"],
        description: "Database management system project showcasing data handling and retrieval capabilities for complex datasets.",
        media: {
            thumbnail: require("../../images/portfolio/DbData.png"),
        },
    },
    {
        id: 7,
        name: "DBMS-Project-ERD",
        tags: ["web-page", "web-app", "mobile-app", "product"],
        description: "Entity-Relationship Diagram visualization tool for database design, simplifying complex data models.",
        media: {
            thumbnail: require("../../images/portfolio/DbAttributes.png"),
        },
    },
];

const projectsData = rawProjectsData
   
    .map(project => ({
        ...project,
        codeUrl: "https://github.com/arjunprratap05/appwriteBlog", 
        liveUrl: "https://appwrite-blog-rho-eosin.vercel.app/",   
    }));


const Portfolio = () => {
    const [projects, setProjects] = useState(projectsData);
    const [transition, setTransition] = useState(false);

    const filterProjects = (tag) => {
        setTransition("zoomout");

        setTimeout(() => {
            if (tag !== "all") {
                const filteredProjects = projectsData.filter((item) =>
                    item.tags.includes(tag)
                );
                setProjects(filteredProjects);
            } else {
                setProjects(projectsData);
            }
            setTransition("zoomin");
        }, 200);

        setTimeout(() => {
            setTransition(false);
        }, 600);
    };

    return (
        <Section
            id="portfolio"
            title="PROJECTS"
            background="dark"
        >
            <div className="portfolio-subtitle">
                A showcase of the projects I have worked on, highlighting my skills and experience in various technologies
            </div>
            <div className="portfolio-content-wrapper">
                <Filters filterProjects={(tag) => filterProjects(tag)} />
                <Showcase
                    data={projects}
                    transition={transition}
                />
            </div>
        </Section>
    );
};

export default Portfolio;