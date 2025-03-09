import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      setInputValue("");
      // Simulate a bot response
      setTimeout(() => {
        setMessages([...messages, { text: "Thanks for your question!", sender: "bot" }]);
      }, 1000);
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h2>Chatbot</h2>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a question..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;