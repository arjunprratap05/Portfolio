import React from "react";
import "./style.scss";
import Section from "../shared/section";
import ContactInfo from "./contact-info";
import Form from "./form";

const Contact = () => {
    return (
         <Section>
            <div className="contact-content-wrapper">
                <div className="contact-info-container">
                    <ContactInfo />
                </div>
                <div className="contact-form-container">
                    <Form />
                </div>
            </div>
        </Section>
    );
};

export default Contact;
