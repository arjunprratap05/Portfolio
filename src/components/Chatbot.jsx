import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Chatbot.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; 

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [showInactivityPrompt, setShowInactivityPrompt] = useState(false);
    const [showAssistPrompt, setShowAssistPrompt] = useState(false);
    const inactivityTimerRef = useRef(null);
    const messagesEndRef = useRef(null);

    const formatTimestamp = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isBotTyping, showInactivityPrompt, showAssistPrompt]); 

    const resetInactivityTimer = useCallback(() => {
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }

        if (isOpen && !showInactivityPrompt && !showAssistPrompt && !isBotTyping) {
            inactivityTimerRef.current = setTimeout(() => {
                setShowInactivityPrompt(true);
                setMessages(prev => [...prev, { from: 'bot', text: 'Do you want to continue the conversation?', isPrompt: true, type: 'continue', timestamp: new Date() }]);
            }, INACTIVITY_TIMEOUT_MS);
        }
    }, [isOpen, showInactivityPrompt, showAssistPrompt, isBotTyping]);

    useEffect(() => {
        if (isOpen) {
            resetInactivityTimer();
        } else {
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }
            setShowInactivityPrompt(false); 
            setShowAssistPrompt(false); 
        }
        return () => { 
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }
        };
    }, [isOpen, resetInactivityTimer, messages]); 

    const toggleChat = useCallback(() => {
        setIsOpen(prev => {
            if (!prev) { 
                resetInactivityTimer();
            } else { 
                if (inactivityTimerRef.current) {
                    clearTimeout(inactivityTimerRef.current);
                }
                setShowInactivityPrompt(false);
                setShowAssistPrompt(false);
            }
            return !prev;
        });
    }, [resetInactivityTimer]);

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
        setShowInactivityPrompt(false); 
        setShowAssistPrompt(false); 
        resetInactivityTimer(); 

        setTimeout(async () => {
            let botReply = '';
            const lowerCaseMessage = userMessage.toLowerCase();

            const now = new Date();
            const currentHour = now.getHours();
            let timeOfDayGreeting = "";
            if (currentHour >= 0 && currentHour < 12) {
                timeOfDayGreeting = "Good Morning!";
            } else if (currentHour >= 12 && currentHour < 17) {
                timeOfDayGreeting = "Good Afternoon!";
            } else if (currentHour >= 17 && currentHour < 21) {
                timeOfDayGreeting = "Good Evening!";
            } else if(currentHour >= 21 || currentHour < 0) {
                timeOfDayGreeting = "Good Night!";
            }

            if (lowerCaseMessage === 'hi' ||
                lowerCaseMessage === 'hello' ||
                lowerCaseMessage === 'hey' ||
                lowerCaseMessage === 'hello arjun\'s verse ai' ||
                lowerCaseMessage === 'hi arjun\'s verse ai' 
            ) {
                botReply = `${timeOfDayGreeting} 👋 Hello! I’m Arjun’s Verse AI!`;
            } else {
                botReply = await sendMessageToAI(userMessage);
            }

            setIsBotTyping(false);
            setMessages(prev => [...prev, { from: 'bot', text: botReply, timestamp: new Date() }]);
            resetInactivityTimer(); 
        }, 1200);
    }, [input, sendMessageToAI, resetInactivityTimer]);

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    }, [handleSend]);

    const handlePromptResponse = useCallback((type, choice) => {
        if (type === 'continue') {
            setMessages(prev => [...prev, { from: 'user', text: choice === 'yes' ? 'Yes' : 'No', timestamp: new Date() }]);
            setShowInactivityPrompt(false);
            if (choice === 'yes') {
                resetInactivityTimer(); 
            } else { 
                setShowAssistPrompt(true);
                setMessages(prev => [...prev, { from: 'bot', text: 'Thank you. Can I assist with something else?', isPrompt: true, type: 'assist', timestamp: new Date() }]);
            }
        } else if (type === 'assist') { 
            setMessages(prev => [...prev, { from: 'user', text: choice === 'yes' ? 'Yes' : 'No', timestamp: new Date() }]);
            setShowAssistPrompt(false);
            if (choice === 'yes') {
                resetInactivityTimer(); 
            } else { 
                setMessages(prev => [...prev, { from: 'bot', text: 'Thank you!', timestamp: new Date() }]);
                setTimeout(() => {
                    setIsOpen(false); 
                    if (inactivityTimerRef.current) {
                        clearTimeout(inactivityTimerRef.current);
                    }
                }, 1000); 
            }
        }
    }, [resetInactivityTimer, setIsOpen]); 

    return (
        <div className="chatbot-wrapper">
            <div className="chatbot-button" onClick={toggleChat}>
                <img src="/chatbot.jpg" alt="Chatbot Icon" />
            </div>

            {isOpen && (
                <div className="chatbox">
                    <div className="chat-header">
                        Arjun's AI Verse Chatbot
                        <span onClick={toggleChat} className="close-button" role="button" aria-label="Close Chat">×</span>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`chat-bubble ${msg.from === 'user' ? 'user' : 'bot'} ${msg.isPrompt ? 'inactivity-prompt-message' : ''}`}
                            >
                                {msg.text}
                                {msg.timestamp && (
                                    <div className="timestamp">
                                        {formatTimestamp(msg.timestamp)}
                                    </div>
                                )}
                                
                                {msg.isPrompt && msg.type === 'continue' && (
                                    <div className="prompt-options">
                                        <button onClick={() => handlePromptResponse('continue', 'yes')}>Yes</button>
                                        <button onClick={() => handlePromptResponse('continue', 'no')}>No</button>
                                    </div>
                                )}
                                {msg.isPrompt && msg.type === 'assist' && (
                                    <div className="prompt-options">
                                        <button onClick={() => handlePromptResponse('assist', 'yes')}>Yes</button>
                                        <button onClick={() => handlePromptResponse('assist', 'no')}>No</button>
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
                            disabled={isBotTyping || showInactivityPrompt || showAssistPrompt} 
                            aria-label="Message input"
                        />
                        <button
                            className="send-button"
                            onClick={handleSend}
                            disabled={isBotTyping || !input.trim() || showInactivityPrompt || showAssistPrompt} 
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