import React, { useState } from 'react';

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