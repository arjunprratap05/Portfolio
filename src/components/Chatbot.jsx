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
    }, [messages, isBotTyping]);

    useEffect(() => {
        if (isOpen && !conversationStarted && messages.length === 0) {
            setIsBotTyping(true);
            setTimeout(() => {
                const now = new Date();
                const currentHour = now.getHours();
                let greeting = "Good Morning!";
                if (currentHour >= 12 && currentHour < 17) greeting = "Good Afternoon!";
                else if (currentHour >= 17 && currentHour < 21) greeting = "Good Evening!";
                else if (currentHour >= 21 || currentHour < 5) greeting = "Good Night!";

                const initialBotMessage = `${greeting} 👋 I'm Arjun's AI Verse. To get started, what's your name?`;
                setMessages([{ from: 'bot', text: initialBotMessage, timestamp: new Date() }]);
                setAwaitingNameInput(true);
                setIsBotTyping(false);
            }, 1000);
        }
    }, [isOpen, conversationStarted, messages.length]);

    const resetInactivityTimer = useCallback(() => {
        if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);

        if (!showInactivityPrompt && !showAssistPrompt && !isBotTyping && conversationStarted) {
            inactivityTimerRef.current = setTimeout(() => {
                setShowInactivityPrompt(true);
                setMessages(prev => [...prev, { 
                    from: 'bot', 
                    text: 'Still there? Do you want to continue?', 
                    isPrompt: true, 
                    type: 'continue', 
                    timestamp: new Date() 
                }]);
            }, INACTIVITY_TIMEOUT_MS);
        }
    }, [showInactivityPrompt, showAssistPrompt, isBotTyping, conversationStarted]);

    useEffect(() => {
        if (conversationStarted) resetInactivityTimer();
        return () => { if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current); };
    }, [conversationStarted, resetInactivityTimer]);

    const toggleChat = () => {
        setIsOpen(prev => !prev);
    };

    const endConversationManually = useCallback(async () => {
        if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
        await sendConversationEmail(userName, conversationHistory);
        
        setMessages([]);
        setConversationHistory([]);
        setUserName('');
        setConversationStarted(false);
        setAwaitingNameInput(false);
        setShowInactivityPrompt(false);
        setShowAssistPrompt(false);
        setIsOpen(false);
    }, [userName, conversationHistory]);

    const sendConversationEmail = async (name, history) => {
        try {
            await fetch(`${BACKEND_URL}/api/send-chat-summary-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName: name, conversation: history })
            });
        } catch (err) {
            console.error("Email error:", err);
        }
    };

    const sendMessageToAI = async (text) => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/gemini-chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            const data = await res.json();
            return data?.response || "I'm having a glitch.";
        } catch (err) {
            return "⚠️ Connection error.";
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMessage = input.trim();
        const userTimestamp = new Date();

        setMessages(prev => [...prev, { from: 'user', text: userMessage, timestamp: userTimestamp }]);
        setConversationHistory(prev => [...prev, { from: 'User', text: userMessage, timestamp: userTimestamp.toLocaleString() }]);
        setInput('');
        setIsBotTyping(true);
        
        setTimeout(async () => {
            let botReply = '';
            const botTimestamp = new Date();
            if (awaitingNameInput) {
                setUserName(userMessage);
                setAwaitingNameInput(false);
                setConversationStarted(true); 
                botReply = `Nice to meet you, ${userMessage}! Ask me about Arjun's skills or projects.`;
            } else {
                botReply = await sendMessageToAI(userMessage);
            }
            setIsBotTyping(false);
            setMessages(prev => [...prev, { from: 'bot', text: botReply, timestamp: botTimestamp }]);
            setConversationHistory(prev => [...prev, { from: 'Bot', text: botReply, timestamp: botTimestamp.toLocaleString() }]);
            resetInactivityTimer();
        }, 1000);
    };

    const handlePromptResponse = async (type, choice) => { 
        setMessages(prev => [...prev, { from: 'user', text: choice === 'yes' ? 'Yes' : 'No', timestamp: new Date() }]);
        
        if (type === 'continue') {
            setShowInactivityPrompt(false);
            if (choice === 'yes') {
                resetInactivityTimer();
            } else {
                setShowAssistPrompt(true);
                setMessages(prev => [...prev, { from: 'bot', text: 'Anything else I can help with?', isPrompt: true, type: 'assist', timestamp: new Date() }]);
            }
        } else if (type === 'assist') {
            setShowAssistPrompt(false);
            if (choice === 'yes') {
                resetInactivityTimer();
            } else {
                setMessages(prev => [...prev, { from: 'bot', text: 'Closing chat. Have a great day!', timestamp: new Date() }]);
                setTimeout(endConversationManually, 2000);
            }
        }
    };

    return (
        <div className="chatbot-wrapper">
            <div className="chatbot-button" onClick={toggleChat}>
                <img src="/chatbot.jpg" alt="Chatbot Icon" />
            </div>

            {isOpen && (
                <div className="chatbox">
                    <div className="chat-header">
                        <div className="header-info">
                            <span className="dot active"></span>
                            Arjun's AI Verse
                        </div>
                        <span onClick={toggleChat} className="close-button">×</span>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`chat-bubble ${msg.from === 'user' ? 'user' : 'bot'}`}>
                                {msg.text}
                                {msg.timestamp && <div className="timestamp">{formatTimestamp(msg.timestamp)}</div>}
                                {msg.isPrompt && (
                                    <div className="prompt-options">
                                        <button onClick={() => handlePromptResponse(msg.type, 'yes')}>Yes</button>
                                        <button onClick={() => handlePromptResponse(msg.type, 'no')}>No</button>
                                    </div>
                                )}
                            </div>
                        ))}
                        {isBotTyping && (
                            <div className="chat-bubble bot typing-indicator">
                                <div className="typing-dots"><span></span><span></span><span></span></div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-input-area">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={awaitingNameInput ? "Enter your name..." : "Ask me anything..."} 
                            className="chat-input"
                            disabled={isBotTyping || showInactivityPrompt || showAssistPrompt}
                        />
                        <button className="send-button" onClick={handleSend} disabled={isBotTyping || !input.trim()}>
                            <img src="/send.jpg" alt="Send" style={{filter: 'invert(1)', width: '20px'}} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;