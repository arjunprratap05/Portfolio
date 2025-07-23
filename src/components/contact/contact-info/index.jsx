import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./style.scss"; 

const ContactInfo = () => {
    return (
        <div className="contact-info-box">
            <h4>Let's bridge the gap from screen to connection - looking forward to hearing from you!</h4>

            <div className="contact-option">
                <FaPhoneAlt />
                <span className="text">
                    <a href="tel:+919820903458"> +91 9820903458</a>
                </span>
            </div>
            <div className="contact-option">
                <MdEmail />
                <span className="text">
                    <a href="mailto:arjun.pratap05@gmail.com"> arjun.pratap05@gmail.com</a>
                </span>
            </div>
        </div>
    );
};

export default ContactInfo;