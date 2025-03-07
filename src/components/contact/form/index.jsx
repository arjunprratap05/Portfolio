import React from "react";
import "./style.scss";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
    return (
        <div className="container">
            <div className="contact-form">
                <form
                    action="https://formspree.io/f/mwkjoejd"
                    method="POST"
                    className="contact-inputs"
                >
                    <input
                        type="text"
                        placeholder="Your Name"
                        name="username"
                        required
                        autoComplete="off"
                    />

                    <input
                        type="email"
                        name="Email"
                        placeholder=" Your Email"
                        autoComplete="off"
                        required
                    />

                    <textarea
                        name="Message"
                        cols="20"
                        rows="8"
                        required
                        autoComplete="off"
                        placeholder="Enter you message here..."
                    ></textarea>

                    <input
                        type="submit"
                        value="send"
                    />
                </form>
            </div>
        </div>
    );
};

export default Form;
