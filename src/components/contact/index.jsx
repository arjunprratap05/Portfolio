import React, { useState } from 'react';
import { FaPhoneAlt, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./style.scss";

const ContactHub = () => {
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ type: '', msg: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', msg: '' });

        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', msg: 'Message sent successfully! 🚀' });
                setFormData({ name: '', email: '', mobile: '', message: '' });
            } else {
                throw new Error(data.message || 'Something went wrong on the server.');
            }
        } catch (err) {
            console.error("API Error:", err);
            setStatus({ type: 'error', msg: 'Failed to connect to the server.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="contact-hub-section">
            <div className="hub-container">
                <div className="info-column glass-effect">
                    <div className="availability-tag">
                        <span className="dot"></span> Available for GenAI Roles
                        <span className="dot"></span> Available for MERN Stack Roles
                    </div>
                    <h2 className="hub-title">Let's build something <span className="purple">intelligent.</span></h2>
                    <p className="hub-desc">Leveraging 3.3 years of experience in MERN and Generative AI.</p>

                    <div className="contact-details">
                        <a href="tel:+917856953862" className="detail-item">
                            <FaPhoneAlt className="purple-icon" /> +91 7856953862
                        </a>
                        <a href="mailto:arjun.pratap05@gmail.com" className="detail-item">
                            <MdEmail className="purple-icon" /> arjun.pratap05@gmail.com
                        </a>
                    </div>

                    <div className="social-pills">
                        <a href="https://github.com/arjunprratap05" target="_blank" rel="noreferrer" className="pill"><FaGithub /> GitHub</a>
                        <a href="https://www.linkedin.com/in/arjun-pratap-6132941a6/" target="_blank" rel="noreferrer" className="pill"><FaLinkedinIn /> LinkedIn</a>
                    </div>
                </div>

                <div className="form-column">
                    <form className="modern-form glass-effect" onSubmit={handleSubmit}>
                        <div className="input-row">
                            <input 
                                type="text" placeholder="Name" required 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                            />
                            <input 
                                type="email" placeholder="Email" required 
                                value={formData.email} 
                                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                            />
                        </div>
                        <input 
                            type="tel" placeholder="Mobile" required 
                            value={formData.mobile} 
                            onChange={(e) => setFormData({...formData, mobile: e.target.value})} 
                        />
                        <textarea 
                            placeholder="Your message..." rows="5" required 
                            value={formData.message} 
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                        ></textarea>
                        
                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>

                        {status.msg && (
                            <div className={`status-message ${status.type}`}>
                                {status.msg}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactHub;