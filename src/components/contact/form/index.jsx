import React, { useState } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'; 

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const response = await fetch(`${BACKEND_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    mobile, 
                    subject,
                    message,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitMessage(data.message || 'Your message has been sent successfully!');
                setName('');
                setEmail('');
                setMobile(''); 
                setSubject('');
                setMessage('');
            } else {
                setSubmitMessage(data.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error sending form:', error);
            setSubmitMessage('An error occurred. Please check your network and try again.');
        } finally {
            setIsSubmitting(false);
        }
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
                        disabled={isSubmitting}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Your Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>
                
                <div className="form-group">
                    <input
                        type="tel" 
                        placeholder="Your Mobile Number"
                        required 
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        disabled={isSubmitting}
                        pattern="[0-9]{10}" 
                        title="Please enter a 10-digit mobile number"
                    />
                </div>
                
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        placeholder="Your Message"
                        rows="5"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={isSubmitting}
                    ></textarea>
                </div>
                <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {submitMessage && (
                    <p className={`submit-status-message ${submitMessage.includes('successfully') ? 'success' : 'error'}`}>
                        {submitMessage}
                    </p>
                )}
            </form>
        </div>
    );
};

export default Form;