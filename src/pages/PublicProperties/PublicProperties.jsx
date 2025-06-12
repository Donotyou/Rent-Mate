import React, { useState, useEffect } from 'react';
import { FaSearch, FaHeart, FaFileAlt, FaCommentAlt, FaPaperPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './PublicProperties.css';

const PublicProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    location: ''
  });
  const [savedProperties, setSavedProperties] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [chatProperty, setChatProperty] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Mock data with correct image references
    const mockProperties = [
      {
        id: 1,
        title: 'Modern Downtown Apartment',
        landlord: 'Prime Properties',
        description: 'Spacious 2-bedroom apartment in city center with stunning views',
        price: 1800,
        location: 'New York',
        bedrooms: 2,
        bathrooms: 2,
        status: 'available',
        image: 'property1.jfif'
      },
      {
        id: 2,
        title: 'Cozy Suburban House',
        landlord: 'Suburban Homes',
        description: '3-bedroom house with backyard and modern amenities',
        price: 2200,
        location: 'Chicago',
        bedrooms: 3,
        bathrooms: 2,
        status: 'available',
        image: 'property2.jfif'
      },
      {
        id: 3,
        title: 'Luxury Beachfront Villa',
        landlord: 'Ocean View Rentals',
        description: '4-bedroom villa with private beach access',
        price: 4500,
        location: 'Miami',
        bedrooms: 4,
        bathrooms: 3,
        status: 'available',
        image: 'property2.jfif'
      }
    ];
    setProperties(mockProperties);
  }, []);

  const filteredProperties = properties.filter(property => {
    return (
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.location === '' || property.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.minPrice === '' || property.price >= Number(filters.minPrice)) &&
      (filters.maxPrice === '' || property.price <= Number(filters.maxPrice))
    );
  });

  const handleSaveProperty = (propertyId) => {
    if (savedProperties.includes(propertyId)) {
      setSavedProperties(savedProperties.filter(id => id !== propertyId));
    } else {
      setSavedProperties([...savedProperties, propertyId]);
    }
  };

  const handleDoubleClickSave = (propertyId) => {
    setSavedProperties(savedProperties.filter(id => id !== propertyId));
  };

  const handleApply = (propertyId) => {
    navigate(`/booking/${propertyId}`);
  };

  const handleOpenChat = (property) => {
    setChatProperty(property);
    setShowChat(true);
    // Initialize with a welcome message
    setMessages([{
      id: 1,
      text: `Hello! I'm the virtual assistant for ${property.title}. How can I help you?`,
      sender: 'bot'
    }]);
  };

  const handleCloseChat = () => {
    setShowChat(false);
    setChatProperty(null);
    setMessages([]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user'
    };
    setMessages([...messages, userMessage]);
    setNewMessage('');

    // Simulate bot response after a delay
    setTimeout(() => {
      const responses = [
        "I'd be happy to help with that!",
        "That's a great question about this property.",
        "Let me check the details for you.",
        "The landlord typically responds within 24 hours.",
        "Would you like me to provide more information about the amenities?",
        "This property is currently available for viewing."
      ];
      const botMessage = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="public-properties">
      <div className="search-section">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search properties by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filters">
          <select
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
          >
            <option value="">All Locations</option>
            <option value="New York">New York</option>
            <option value="Chicago">Chicago</option>
            <option value="Miami">Miami</option>
            <option value="Los Angeles">Los Angeles</option>
          </select>
          <input
            type="number"
            placeholder="Min Price ($)"
            value={filters.minPrice}
            onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
            min="0"
          />
          <input
            type="number"
            placeholder="Max Price ($)"
            value={filters.maxPrice}
            onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
            min="0"
          />
        </div>
      </div>

      <div className="property-list">
        {filteredProperties.map(property => (
          <div key={property.id} className="property-card">
            <div className="property-image-container">
              <img 
                className="property-image"
                src={`${process.env.PUBLIC_URL}/assets/properties/${property.image}`} 
                alt={property.title} 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = `${process.env.PUBLIC_URL}/assets/properties/default.jpg`;
                }}
              />
              <div className="property-image-overlay">
                <button 
                  className={`save-btn ${savedProperties.includes(property.id) ? 'saved' : ''}`}
                  onClick={() => handleSaveProperty(property.id)}
                  onDoubleClick={() => handleDoubleClickSave(property.id)}
                >
                  <FaHeart /> {savedProperties.includes(property.id) ? 'Saved' : 'Save'}
                </button>
                <button 
                  className="chat-btn"
                  onClick={() => handleOpenChat(property)}
                >
                  <FaCommentAlt /> Chat
                </button>
              </div>
            </div>
            <div className="property-details">
              <div className="property-header">
                <h3>{property.title}</h3>
                <p className="location">
                  <span className="location-icon">📍</span> {property.location}
                </p>
              </div>
              <p className="price">${property.price.toLocaleString()}/month</p>
              <p className="description">{property.description}</p>
              <div className="features">
                <span>🛏️ {property.bedrooms} beds</span>
                <span>🚿 {property.bathrooms} baths</span>
              </div>
              <div className="property-footer">
                <p className="landlord">Managed by: {property.landlord}</p>
                <button 
                  className="apply-btn"
                  onClick={() => handleApply(property.id)}
                >
                  <FaFileAlt /> Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showChat && (
        <div className="property-chat-container">
          <div className="chat-header">
            <h3>Chat about {chatProperty?.title}</h3>
            <button className="close-chat" onClick={handleCloseChat}>×</button>
          </div>
          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <form className="chat-input" onSubmit={handleSendMessage}>
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PublicProperties;