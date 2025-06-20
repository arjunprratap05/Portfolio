import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Chatbot.css'; 

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const messagesEndRef = useRef(null); 

    const formatTimestamp = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isBotTyping]);

    const toggleChat = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const sendMessageToAI = useCallback(async (text) => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/gemini-chat`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: text })
            });

            if (!res.ok) {
                const errorData = await res.json();
                const errorMessage = errorData.error || `HTTP error! status: ${res.status}`;
                throw new Error(errorMessage);
            }

            const data = await res.json();
            const reply = data?.response;
            return reply || "🤖 I'm having trouble connecting to Arjun AI. Please try again.";
        } catch (err) {
            console.error("AI API Call Error:", err);
            return `⚠️ Failed to reach Arjun AI: ${err.message}. Please try again later.`;
        }
    }, []); 

    const handleSend = useCallback(async () => {
        if (!input.trim()) return; 

        const userMessage = input.trim();
        
        setMessages(prev => [...prev, { from: 'user', text: userMessage, timestamp: new Date() }]); 
        setInput(''); 
        setIsBotTyping(true); 

        setTimeout(async () => {
            let botReply = '';
            const lowerCaseMessage = userMessage.toLowerCase();
            
            
            const now = new Date();
            const currentHour = now.getHours();
            let timeOfDayGreeting = "";
            if (currentHour >= 5 && currentHour < 12) {
                timeOfDayGreeting = "Good Morning!";
            } else if (currentHour >= 12 && currentHour < 18) {
                timeOfDayGreeting = "Good Afternoon!";
            } else {
                timeOfDayGreeting = "Good Evening!";
            }

            if (lowerCaseMessage === 'hi' || 
                lowerCaseMessage === 'hello' || 
                lowerCaseMessage === 'hey' ||
                lowerCaseMessage === 'hello arjun\'s verse ai' || 
                lowerCaseMessage === 'hi arjun\'s verse ai' ||    
                lowerCaseMessage === 'hey arjun\'s verse ai'    
            ) {
                botReply = `${timeOfDayGreeting} 👋 Hello! I’m Arjun’s Verse AI. Ask me anything about Arjun or his work!`; // Updated bot's self-introduction
            } else {
                
                botReply = await sendMessageToAI(userMessage);
            }

            setIsBotTyping(false); 

            setMessages(prev => [...prev, { from: 'bot', text: botReply, timestamp: new Date() }]); 
        }, 1200); 
    }, [input, sendMessageToAI]); 

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    }, [handleSend]);

    return (
        <div className="chatbot-wrapper"> 
            <div className="chatbot-button" onClick={toggleChat}>
                <img src="/chatbot.jpg" alt="Chatbot Icon" />
            </div>

            {isOpen && (
                <div className="chatbox"> 
                    <div className="chat-header">
                        Arjun's Verse AI Chatbot 
                        <span onClick={toggleChat} className="close-button" role="button" aria-label="Close Chat">×</span>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`chat-bubble ${msg.from === 'user' ? 'user' : 'bot'}`}
                            >
                                {msg.text}
                                {msg.timestamp && (
                                    <div className="timestamp">
                                        {formatTimestamp(msg.timestamp)}
                                    </div>
                                )}
                            </div>
                        ))}

                        {isBotTyping && (
                            <div className="chat-bubble bot typing-indicator">
                                <img src="/chatbot-typing.jpg" alt="Bot Typing" className="bot-avatar" />
                                <div className="typing-dots">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} /> 
                    </div>

                    <div className="chat-input-area">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress} 
                            placeholder="Type your message..."
                            className="chat-input"
                            disabled={isBotTyping} 
                            aria-label="Message input"
                        />
                        <button
                            className="send-button"
                            onClick={handleSend}
                            disabled={isBotTyping || !input.trim()} 
                            aria-label="Send message"
                        >
                            <img src="/send.jpg" alt="Send" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;