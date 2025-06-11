// src/components/portfolio/filter/index.js (Filters.jsx)
import React, { useState } from 'react';

const Filters = ({ filterProjects }) => {
    // Define all possible tags from your projectsData to create filter buttons
    const allTags = ['all', 'web-app', 'product', 'web-page', 'mobile-app']; // Extend as needed

    const [activeFilter, setActiveFilter] = useState('all');

    const handleFilterClick = (tag) => {
        setActiveFilter(tag);
        filterProjects(tag);
    };

    return (
        <div className="filters-container">
            {allTags.map((tag) => (
                <span
                    key={tag}
                    className={`filter-btn ${activeFilter === tag ? 'active' : ''}`}
                    onClick={() => handleFilterClick(tag)}
                >
                    {tag.replace('-', ' ')}
                </span>
            ))}
        </div>
    );
};

export default Filters;