import React from "react";
import "./style.scss";

const Section = ({ children, id, className, title, background }) => {
    return (
        <div
            className={`section ${className ? className : ""}${
                background === "dark" ? "dark" : "light"
            }`}
            id={id || ""}
        >
            <div className="content">
                {title && (
                    <div className="section-title">
                        <h2>{title}</h2>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

export default Section;
