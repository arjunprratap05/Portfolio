import React, { useState } from "react";
import "./style.scss";
import Section from "../shared/section";
import Filters from "./filter";
import Showcase from "./showcase";
import ProjectModal from "./project-modal";

const rawProjectsData = [
    {
        id: 1,
        name: "Toni and Guy Patna",
        tags: ["Full Stack", "AI Automation", "web-app"],
        description: "Built a premium salon website featuring an appointment booking platform and an AI-powered WhatsApp automation using the OpenAI API to handle customer inquiries during non-business hours.",
        media: { thumbnail: require("../../images/portfolio/toni-guy.png") }, 
        codeUrl: "https://github.com/arjunprratap05/toni-guyfrontend", 
        liveUrl: "https://www.toniandguypatna.com/",
        techStack: ["React.js", "Tailwind CSS", "WhatsApp Business API", "OpenAI API"]
    },
    {
        id: 2,
        name: "Quiz Forge AI-Powered Platform",
        tags: ["Full Stack", "Next.js", "web-app", "product"],
        description: "Developed a role-based quiz platform with secure dashboards for tracking quizzes, students, and AI-powered learning feedback.",
        media: { thumbnail: require("../../images/portfolio/quiz-forge.png") }, 
        codeUrl: "https://github.com/arjunprratap05/quizforge", 
        liveUrl: "https://quizforge-ashy.vercel.app/",
        techStack: ["Next.js", "React.js", "TypeScript", "Prisma", "PostgreSQL", "Vercel"]
    },
    {
        id: 3,
        name: "Expert Computer Academy LMS",
        tags: ["Full Stack", "LMS", "Admin Architecture"],
        description: "Launched a production LMS platform for student management and engineered an AI-powered WhatsApp bot to automatically respond to admission and schedule inquiries.",
        media: { thumbnail: require("../../images/portfolio/expert-academy.png") },
        codeUrl: "https://github.com/arjunprratap05/expertcomputer", 
        liveUrl: "https://www.expertcomputeracademy.in/",
        techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "Docker", "GitHub Actions", "WhatsApp Business API", "OpenAI API"] 
    },
    {
        id: 4,
        name: "GitHub Profile Detective",
        tags: ["AI", "web-app", "product"],
        description: "Built a GitHub profile review platform leveraging LangChain and Pinecone for similarity matching, reducing manual profile review time by 60%.",
        media: { thumbnail: require("../../images/portfolio/GitHub-Profile-Search-App.png") },
        codeUrl: "https://github.com/arjunprratap05/SocialMedia",
        liveUrl: "https://social-media-kappa-pearl.vercel.app/",
        techStack: ["React.js", "Node.js", "OpenAI API", "Lang Chain", "Pinecone"]
    },
    {
        id: 5,
        name: "Mega-Blog",
        tags: ["web-app", "product"],
        description: "A comprehensive blogging platform built with modern web technologies, enabling users to create and manage their own content.",
        media: { thumbnail: require("../../images/portfolio/appwrite.png") },
        codeUrl: "https://github.com/arjunprratap05/appwriteBlog",
        liveUrl: "https://appwrite-blog-rho-eosin.vercel.app/",
    },
    {
        id: 6,
        name: "Mega-Blog-Login",
        tags: ["web-page"],
        description: "Secure user authentication interface for the blogging platform, ensuring seamless login experiences.",
        media: { thumbnail: require("../../images/portfolio/appwriteLogin.png") },
        codeUrl: "https://github.com/arjunprratap05/appwriteBlog",
        liveUrl: "https://appwrite-blog-rho-eosin.vercel.app/",
    },
    {
        id: 7,
        name: "Mega-Blog-SignUp",
        tags: ["product"],
        description: "User registration interface for creating new accounts on the blogging platform, designed for ease of use.",
        media: { thumbnail: require("../../images/portfolio/appwritesignIN.png") },
        codeUrl: "https://github.com/arjunprratap05/appwriteBlog",
        liveUrl: "https://appwrite-blog-rho-eosin.vercel.app/",
    },
    {
        id: 8,
        name: "Blog Post",
        tags: ["product"],
        description: "Detailed view of individual blog posts with rich content display and commenting features.",
        media: { thumbnail: require("../../images/portfolio/MegaBlogPost.png") },
        codeUrl: "https://github.com/arjunprratap05/appwriteBlog",
        liveUrl: "https://appwrite-blog-rho-eosin.vercel.app/",
    },
    {
        id: 9,
        name: "Blog Post-2",
        tags: ["web-app", "web-page"],
        description: "Another iteration of a blog post display, focusing on responsive design and content readability.",
        media: { thumbnail: require("../../images/portfolio/BlogPost.png") },
        codeUrl: "https://github.com/arjunprratap05/appwriteBlog",
        liveUrl: "https://appwrite-blog-rho-eosin.vercel.app/",
    },
    {
        id: 10,
        name: "DBMS-Project-Data",
        tags: ["product", "web-app"],
        description: "Database management system project showcasing data handling and retrieval capabilities for complex datasets.",
        media: { thumbnail: require("../../images/portfolio/DbData.png") },
        codeUrl: "https://github.com/arjunprratap05/appwriteBlog",
        liveUrl: "https://appwrite-blog-rho-eosin.vercel.app/",
    },
    {
        id: 11,
        name: "DBMS-Project-ERD",
        tags: ["web-page", "web-app", "mobile-app", "product"],
        description: "Entity-Relationship Diagram visualization tool for database design, simplifying complex data models.",
        media: { thumbnail: require("../../images/portfolio/DbAttributes.png") },
        codeUrl: "https://github.com/arjunprratap05/appwriteBlog",
        liveUrl: "https://appwrite-blog-rho-eosin.vercel.app/",
    }
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
        <Section id="portfolio" style={{ backgroundColor: "var(--light-shade-purple, #f3e8ff)" }}>
            <div className="portfolio-inner-container">
                <div className="section-header">
                    <h2 className="underlined-title">Recent Projects</h2>
                    <p className="description">Full Stack & GenAI journey with 4 years of impact.</p>
                </div>

                <div className="portfolio-content-wrapper">
                    <Filters filterProjects={filterProjects} />
                    <Showcase
                        data={projects}
                        transition={transition}
                        onProjectClick={(project) => setSelectedProject(project)}
                    />
                </div>
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