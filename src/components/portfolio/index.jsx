import React, { useState } from "react";
import "./style.scss";
import Section from "../shared/section";
import Filters from "./filter";
import Showcase from "./showcase";

const projectsData = [
    {
        id: 1,
        name: "Mega-Blog",
        tags: ["web-app", "product"],
        media: {
            thumbnail: require("../../images/portfolio/appwrite.png"),
        },
    },
     {
         id: 2,
         name: "Mega-Blog-Login",
         tags: ["web-page"],
         media: {
             thumbnail: require("../../images/portfolio/appwriteLogin.png"),
         },
     },
     {
         id: 3,
         name: "Mega-Blog-SignUp",
         tags: ["product"],
         media: {
             thumbnail: require("../../images/portfolio/appwritesignIN.png"),
         },
     },
     {
         id: 4,
         name: "Blog Post",
         tags: ["product"],
         media: {
             thumbnail: require("../../images/portfolio/MegaBlogPost.png"),
         },
     },
     {
       id: 5,
        name: "Blog Post-2",
        tags: ["web-app", "web-page"],
         media: {
         thumbnail: require("../../images/portfolio/BlogPost.png"),
        },
     },
     {
         id: 6,
         name: "DBMS-Project-Data",
         tags: ["product", "web-app"],
         media: {
             thumbnail: require("../../images/portfolio/DbData.png"),
         },
     },
     {
     id: 7,
         name: "DBMS-Project-ERD",
         tags: ["web-page", "web-app", "mobile-app", "product"],
         media: {
             thumbnail: require("../../images/portfolio/DbAttributes.png"),
         },
     },
     {
        id: 8,
            name: "Todo",
            tags: ["web-page", "web-app", "product"],
            media: {
                thumbnail: require("../../images/portfolio/todos.png"),
            },
        },
        {
            id: 9,
                name: "TodoList",
                tags: ["web-page", "web-app"],
                media: {
                    thumbnail: require("../../images/portfolio/todolist.png"),
                },
            },
            {
                id: 10,
                    name: "Todos-details",
                    tags: ["web-page", "web-app", "product"],
                    media: {
                        thumbnail: require("../../images/portfolio/Todo1.png"),
                    },
                },
                
        
];

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
            title="Check My Portfolio"
            background="light"
        >
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
