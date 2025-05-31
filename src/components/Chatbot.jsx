import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessageToChatling = async (text) => {
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();
      const reply = data?.response;
      return reply || "🤖 No response from Arjun AI.";
    } catch (err) {
      console.error("Chatling API error:", err);
      return "⚠️ Failed to reach Arjun AI.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { from: 'user', text: userMessage }]);
    setInput('');
    setIsBotTyping(true);

    setTimeout(async () => {
      const greetings = ['hi', 'hello', 'hey', 'yo'];
      let botReply = '';

      if (greetings.includes(userMessage.toLowerCase())) {
        botReply = '👋 Hello! I’m Arjun’s AI. Ask me anything.';
      } else {
        botReply = await sendMessageToChatling(userMessage);
      }

      setIsBotTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: botReply }]);
    }, 1200);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-toggle" onClick={toggleChat}>
        <img src="/chatbot.jpg" alt="Chatbot" />
      </div>

      {isOpen && (
        <div className="chatbox">
          <div className="chat-header">
            Chat with Arjun AI
            <span onClick={toggleChat}>×</span>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-bubble ${msg.from === 'user' ? 'user' : 'bot'}`}
              >
                {msg.text}
              </div>
            ))}

            {isBotTyping && (
              <div className="chat-bubble bot typing-indicator">
                <img src="/chatbot-typing.png" alt="Typing" className="bot-avatar" />
                <div className="typing-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="chat-input"
            />
            <button className="send-button" onClick={handleSend}>
              <img src="/send.jpg" alt="Send" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
