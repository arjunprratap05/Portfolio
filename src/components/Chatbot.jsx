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
    const [userName, setUserName] = useState('');
    const [conversationStarted, setConversationStarted] = useState(false);
    const [awaitingNameInput, setAwaitingNameInput] = useState(false);
    const [conversationHistory, setConversationHistory] = useState([]); 

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

    useEffect(() => {
        if (isOpen && !conversationStarted && messages.length === 0) {
            setIsBotTyping(true);
            setTimeout(() => {
                const now = new Date();
                const currentHour = now.getHours();
                let timeOfDayGreeting = "";
                if (currentHour >= 0 && currentHour < 12) {
                    timeOfDayGreeting = "Good Morning!";
                } else if (currentHour >= 12 && currentHour < 17) {
                    timeOfDayGreeting = "Good Afternoon!";
                } else if (currentHour >= 17 && currentHour < 21) {
                    timeOfDayGreeting = "Good Evening!";
                } else {
                    timeOfDayGreeting = "Good Night!";
                }

                const initialBotMessage = `${timeOfDayGreeting} 👋 Hello! I’m Arjun’s Verse AI. To start, could you please tell me your name?`;
                setMessages([{ from: 'bot', text: initialBotMessage, timestamp: new Date() }]);
                setAwaitingNameInput(true); 
                setIsBotTyping(false);
                
            }, 1000);
        }
    }, [isOpen, conversationStarted, messages.length]);

    const resetInactivityTimer = useCallback(() => {
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }

        if (isOpen && !showInactivityPrompt && !showAssistPrompt && !isBotTyping && conversationStarted) {
            inactivityTimerRef.current = setTimeout(() => {
                setShowInactivityPrompt(true);
                setMessages(prev => [...prev, { from: 'bot', text: 'Do you want to continue the conversation?', isPrompt: true, type: 'continue', timestamp: new Date() }]);
            }, INACTIVITY_TIMEOUT_MS);
        }
    }, [isOpen, showInactivityPrompt, showAssistPrompt, isBotTyping, conversationStarted]);

    useEffect(() => {
        if (isOpen) {
            resetInactivityTimer();
        } else {
            
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }
            setShowInactivityPrompt(false);
            setShowAssistPrompt(false);
            
            setUserName('');
            setConversationStarted(false);
            setAwaitingNameInput(false);
            setMessages([]); 
            setConversationHistory([]); 
        }
        return () => { 
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }
        };
    }, [isOpen, resetInactivityTimer]);

    const toggleChat = useCallback(() => {
        setIsOpen(prev => {
            if (!prev) {
                
            } else {
                if (inactivityTimerRef.current) {
                    clearTimeout(inactivityTimerRef.current);
                }
                setShowInactivityPrompt(false);
                setShowAssistPrompt(false);
                setUserName('');
                setConversationStarted(false);
                setAwaitingNameInput(false);
                setMessages([]);
                setConversationHistory([]);
            }
            return !prev;
        });
    }, []); 

    const sendConversationEmail = useCallback(async (name, history) => {
        console.log("Attempting to send email...", { name, history });
        try {
            const res = await fetch(`${BACKEND_URL}/api/send-chat-summary-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName: name, conversation: history })
            });

            if (!res.ok) {
                const errorData = await res.json();
                const errorMessage = errorData.error || `HTTP error! status: ${res.status}`;
                throw new Error(errorMessage);
            }

            console.log("Email sent successfully!");
            
            setMessages(prev => [...prev, { from: 'bot', text: 'Thank you for your conversation! I\'ve sent a summary to Arjun.', timestamp: new Date() }]);

            setMessages([]);
            setConversationHistory([]);

        } catch (err) {
            console.error("Failed to send conversation email:", err);
            setMessages(prev => [...prev, { from: 'bot', text: 'Failed to send conversation summary. Please inform Arjun directly.', timestamp: new Date() }]);
        }
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
        const userTimestamp = new Date();

        
        setMessages(prev => [...prev, { from: 'user', text: userMessage, timestamp: userTimestamp }]);
        
        setConversationHistory(prev => [...prev, { from: 'User', text: userMessage, timestamp: userTimestamp.toLocaleString() }]);

        setInput('');
        setIsBotTyping(true);
        setShowInactivityPrompt(false);
        setShowAssistPrompt(false);
        
        if (conversationStarted) {
            resetInactivityTimer();
        }

        setTimeout(async () => {
            let botReply = '';
            const botTimestamp = new Date();

            if (awaitingNameInput) {
                setUserName(userMessage);
                setAwaitingNameInput(false);
                setConversationStarted(true); 
                botReply = `Thanks, ${userMessage}! How can I assist you today? Feel free to ask about Arjun's skills, projects, or anything else about his work.`;
                resetInactivityTimer(); 
            } else {
               
                botReply = await sendMessageToAI(userMessage);
            }

            setIsBotTyping(false);
            setMessages(prev => [...prev, { from: 'bot', text: botReply, timestamp: botTimestamp }]);
            
            setConversationHistory(prev => [...prev, { from: 'Bot', text: botReply, timestamp: botTimestamp.toLocaleString() }]);
            
            if (conversationStarted || awaitingNameInput) { 
                resetInactivityTimer();
            }
        }, 1200);
    }, [input, awaitingNameInput, conversationStarted, sendMessageToAI, resetInactivityTimer]);

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    }, [handleSend]);

    const handlePromptResponse = useCallback(async (type, choice) => { 
        const userChoiceMessage = choice === 'yes' ? 'Yes' : 'No';
        const userChoiceTimestamp = new Date();

        setMessages(prev => [...prev, { from: 'user', text: userChoiceMessage, timestamp: userChoiceTimestamp }]);
        
        setConversationHistory(prev => [...prev, { from: 'User', text: userChoiceMessage, timestamp: userChoiceTimestamp.toLocaleString() }]);

        if (type === 'continue') {
            setShowInactivityPrompt(false);
            if (choice === 'yes') {
                resetInactivityTimer();
            } else {
                setShowAssistPrompt(true);
                const botAssistMessage = 'Thank you. Can I assist with something else?';
                setMessages(prev => [...prev, { from: 'bot', text: botAssistMessage, isPrompt: true, type: 'assist', timestamp: new Date() }]);
                setConversationHistory(prev => [...prev, { from: 'Bot', text: botAssistMessage, timestamp: new Date().toLocaleString() }]);
            }
        } else if (type === 'assist') {
            setShowAssistPrompt(false);
            if (choice === 'yes') {
                resetInactivityTimer();
            } else {
                const botFarewellMessage = 'Thank you! Ending the conversation now.';
                setMessages(prev => [...prev, { from: 'bot', text: botFarewellMessage, timestamp: new Date() }]);
                setConversationHistory(prev => [...prev, { from: 'Bot', text: botFarewellMessage, timestamp: new Date().toLocaleString() }]);

                await sendConversationEmail(userName, conversationHistory);

                setTimeout(() => {
                    setIsOpen(false);
                    if (inactivityTimerRef.current) {
                        clearTimeout(inactivityTimerRef.current);
                    }
                    
                    setUserName('');
                    setConversationStarted(false);
                    setAwaitingNameInput(false);
                }, 2000);
            }
        }
    }, [resetInactivityTimer, userName, conversationHistory, sendConversationEmail]); 

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
                            placeholder={awaitingNameInput ? "Type your name here..." : "Type your message..."} 
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