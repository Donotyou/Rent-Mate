import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import './ChatPage.css';

const ChatPage = () => {
  const navigate = useNavigate();
  const [landlords, setLandlords] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchLandlords = async () => {
    try {
      const response = await fetch('http://localhost:5062/api/Message/tenant/accepted-landlords');
      const data = await response.json();
      console.log("API Response:", data); // Debugging log
      
      if (Array.isArray(data)) {
        const formattedLandlords = data.map(landlord => ({
          id: landlord.Id,
          name: landlord.Name || 'Unknown Landlord', // Fallback for missing names
          email: landlord.Email || '',
          messages: []
        }));
        setLandlords(formattedLandlords);
        
        // Auto-select first landlord if available
        if (formattedLandlords.length > 0) {
          setSelectedChat(formattedLandlords[0]);
        }
      } else {
        console.error("Received data is not an array:", data);
      }
    } catch (error) {
      console.error('Error fetching landlords:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLandlords();
  }, []);

  const handleSend = () => {
    if (!messageInput.trim() || !selectedChat) return;
    
    const newMsg = {
      id: Date.now(),
      sender: 'you',
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Update both landlords and selectedChat
    setLandlords(prev => prev.map(landlord => 
      landlord.id === selectedChat.id
        ? { ...landlord, messages: [...landlord.messages, newMsg] }
        : landlord
    ));
    
    setSelectedChat(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg]
    }));
    
    setMessageInput('');
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (isLoading) {
    return <div className="loading">Loading chats...</div>;
  }

  return (
    <div className="chat-page">
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <button className="back-button" onClick={handleBack}>
            <FaArrowLeft /> Back
          </button>
          <h3>Your Landlords</h3>
        </div>
        
        {landlords.length > 0 ? (
          landlords.map(landlord => (
            <div
              key={landlord.id}
              className={`chat-user ${selectedChat?.id === landlord.id ? 'active' : ''}`}
              onClick={() => setSelectedChat(landlord)}
            >
              <div className="user-info">
                <div className="chat-name">{landlord.name}</div>
                {landlord.email && <div className="chat-email">{landlord.email}</div>}
              </div>
            </div>
          ))
        ) : (
          <div className="no-landlords">
            <p>No landlords available for chat</p>
          </div>
        )}
      </div>

      <div className="chat-main">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <button className="back-button mobile-only" onClick={handleBack}>
                <FaArrowLeft />
              </button>
              <div className="chat-partner-info">
                <h4>{selectedChat.name}</h4>
                {selectedChat.email && <p>{selectedChat.email}</p>}
              </div>
            </div>
            
            <div className="chat-body">
              {selectedChat.messages?.length > 0 ? (
                selectedChat.messages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`chat-bubble ${msg.sender === 'you' ? 'outgoing' : 'incoming'}`}
                  >
                    <p>{msg.text}</p>
                    <span>{msg.time}</span>
                  </div>
                ))
              ) : (
                <div className="no-messages">
                  <p>No messages yet. Start the conversation!</p>
                </div>
              )}
            </div>
            
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend}>
                <FaPaperPlane /> Send
              </button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <p>Select a landlord to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;