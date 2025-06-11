import React, { useState } from 'react';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); 

        console.log({
            name,
            email,
            subject,
            message,
        });

        setName('');
        setEmail('');
        setSubject('');
        setMessage('');

        alert('Your message has been sent successfully!');
    };

    return (
        <div className="contact-form">
            <h4 className="form-title">Send me a message!</h4>
            <form onSubmit={handleSubmit}> 
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Your Email"
                        required
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Subject"
                        value={subject} 
                        onChange={(e) => setSubject(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <textarea
                        placeholder="Your Message"
                        rows="5"
                        required
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">Send Message</button>
            </form>
        </div>
    );
};

export default Form;