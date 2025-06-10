import React from "react";
import "./style.scss";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
    return (
        <div className="container">
            <div className="contact-form-card"> 
                <div className="contact-form-header">
                    <p className="breadcrumb">Arjun's Contact Forms</p>
                    <h2 className="form-title">Contact Form</h2>
                </div>
                <form
                    action="https://formspree.io/f/mwkjoejd"
                    method="POST"
                    className="contact-inputs"
                >
                    <div className="form-group">
                        <label htmlFor="name">Name *</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="" 
                            name="username"
                            required
                            autoComplete="off"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">E-mail *</label>
                        <input
                            type="email"
                            id="email"
                            name="Email"
                            placeholder="" 
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contactNumber">Contact Number *</label>
                        <input
                            type="tel" 
                            id="contactNumber"
                            name="ContactNumber"
                            placeholder="" 
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message *</label>
                        <textarea
                            id="message"
                            name="Message"
                            cols="20"
                            rows="8"
                            required
                            autoComplete="off"
                            placeholder="" 
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="submit-button"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;