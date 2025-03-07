import React, { useState } from "react";
import "./style.scss";

const filtersData = [
    {
        name: "All",
        id: "all",
    },
    {
        name: "Products",
        id: "product",
    },
    {
        name: "Web Pages",
        id: "web-page",
    },
];
const Filters = ({ filterProjects }) => {
    const [active, setActive] = useState("");
    const clickHandler = (id) => {
        setActive(id);
        filterProjects(id);
    };

    return (
        <ul className="filters-menu-items">
            {filtersData.map((curElem, i) => {
                return (
                    <li
                        id={curElem.id}
                        key={i}
                        className={`filter-menu-item ${
                            active === curElem.id ? "active" : ""
                        }`}
                        onClick={() => clickHandler(curElem.id)}
                    >
                        {curElem.name}
                    </li>
                );
            })}
        </ul>
    );
};

export default Filters;
