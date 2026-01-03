import React, { useState } from 'react';
import "./style.scss";

const Filters = ({ filterProjects }) => {
    const allTags = ['all', 'web-app', 'product', 'web-page', 'mobile-app'];
    const [activeFilter, setActiveFilter] = useState('all');

    const handleFilterClick = (tag) => {
        setActiveFilter(tag);
        filterProjects(tag);
    };

    return (
        <div className="filters-container">
            {allTags.map((tag) => (
                <button
                    key={tag}
                    className={`filter-btn ${activeFilter === tag ? 'active' : ''}`}
                    onClick={() => handleFilterClick(tag)}
                >
                    {tag.replace('-', ' ')}
                </button>
            ))}
        </div>
    );
};

export default Filters;