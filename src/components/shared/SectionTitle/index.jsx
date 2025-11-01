import React from "react";
import "./style.scss"; 

const SectionTitle = ({ title, tagline }) => {
    return (
        <div className="section-title-container" id={title.toLowerCase()}>
            <h2 className="section-title-text">{title}</h2>
            {tagline && <p className="section-tagline">{tagline}</p>}
        </div>
    );
};

export default SectionTitle;