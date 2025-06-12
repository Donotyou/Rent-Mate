import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaEnvelope, FaFileAlt, FaTrash, FaEye, FaReply, FaTimes, FaComments } from 'react-icons/fa';
import './TenantDashboard.css';

const TenantDashboard = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [savedProperties, setSavedProperties] = useState([]);
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [currentUser] = useState({ id: 101 }); // Mock user data - replace with actual user context
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data - replace with API calls
    const mockSavedProperties = [
      {
        id: 1,
        title: 'Luxury Apartment',
        landlord: 'Elite Residences',
        landlordId: 201,
        price: 2000,
        location: 'Manhattan',
        image: 'property1.jfif'
      }
    ];

    const mockApplications = [
      {
        id: 1,
        propertyId: 1,
        propertyTitle: 'Modern Downtown Apartment',
        status: 'pending',
        date: '2023-06-15',
        documents: ['id_proof.pdf', 'income_verification.pdf'],
        landlord: 'Prime Properties',
        landlordId: 1,
        message: 'Looking forward to your review'
      },
      {
        id: 2,
        propertyId: 2,
        propertyTitle: 'Cozy Studio',
        status: 'approved',
        date: '2023-06-10',
        documents: ['id_proof.pdf'],
        landlord: 'Urban Living',
        landlordId: 2,
        message: 'Application approved! Contact us to proceed.'
      }
    ];

    const mockMessages = [
      {
        id: 1,
        from: 'Prime Properties',
        fromId: 1,
        subject: 'Application Update',
        date: '2023-06-16',
        read: false,
        content: 'Your application is under review',
        propertyId: 1
      },
      {
        id: 2,
        from: 'Urban Living',
        fromId: 2,
        subject: 'Lease renewal inquiry',
        date: '2023-06-17',
        read: true,
        content: 'Can we schedule a time to discuss renewal?',
        propertyId: 2
      },
      {
        id: 3,
        from: 'You',
        subject: 'Re: Lease renewal inquiry',
        date: '2023-06-18',
        read: true,
        content: 'Yes, I would like to renew my lease for another year.',
        propertyId: 2
      }
    ];

    setSavedProperties(mockSavedProperties);
    setApplications(mockApplications);
    setMessages(mockMessages);
  }, []);

  const withdrawApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const viewApplicationDetails = (application) => {
    navigate(`/application/${application.id}`, {
      state: { application }
    });
  };

  const viewSavedProperty = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const handleViewMessage = (messageId) => {
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      ));
      setSelectedMessage(message);
      setIsReplying(false);
      setReplyContent('');
    }
  };

  const handleBackToMessages = () => {
    setSelectedMessage(null);
    setIsReplying(false);
    setReplyContent('');
  };

  const handleDeleteMessage = (messageId) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
    if (selectedMessage && selectedMessage.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const handleStartReply = () => {
    setIsReplying(true);
    setReplyContent(`Re: ${selectedMessage.subject}\n\nDear ${selectedMessage.from},\n\n`);
  };

  const handleCancelReply = () => {
    setIsReplying(false);
    setReplyContent('');
  };

  const handleReplySubmit = () => {
    if (replyContent.trim() === '') return;
    
    // In a real app, this would be sent to the backend
    const newMessage = {
      id: messages.length + 1,
      from: 'You',
      subject: `Re: ${selectedMessage.subject}`,
      date: new Date().toISOString().split('T')[0],
      read: true,
      propertyId: selectedMessage.propertyId,
      content: replyContent
    };
    
    setMessages([newMessage, ...messages]);
    setIsReplying(false);
    setReplyContent('');
    alert('Reply sent successfully!');
  };

  const handleStartChat = (landlordId) => {
    navigate(`/chat/landlord${landlordId}-tenant${currentUser.id}`);
  };

  const getPropertyTitle = (propertyId) => {
    const property = savedProperties.find(p => p.id === propertyId) || 
                    applications.find(a => a.propertyId === propertyId);
    return property ? property.title || property.propertyTitle : 'General Inquiry';
  };

  return (
    <div className="tenant-dashboard">
      <div className="sidebar">
        <button 
          className={`nav-item ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          <FaFileAlt /> My Applications ({applications.length})
        </button>
        <button 
          className={`nav-item ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          <FaHeart /> Saved Properties ({savedProperties.length})
        </button>
        <button 
  className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`} 
  onClick={() => navigate('/chat/landlord123-tenant456')}
>
  <FaEnvelope /> Chat
</button>

      </div>

      <div className="main-content">
        {activeTab === 'applications' && (
          <div className="applications-section">
            <h2>My Rental Applications</h2>
            {applications.length === 0 ? (
              <p>You haven't applied to any properties yet.</p>
            ) : (
              <div className="applications-list">
                {applications.map(app => (
                  <div key={app.id} className="application-card">
                    <div className="application-header">
                      <h3>{app.propertyTitle}</h3>
                      <span className={`status-badge ${app.status}`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="application-details">
                      <p><strong>Landlord:</strong> {app.landlord}</p>
                      <p><strong>Applied on:</strong> {app.date}</p>
                      <p><strong>Documents:</strong> {app.documents.join(', ')}</p>
                    </div>
                    <div className="application-actions">
                      <button 
                        className="view-btn"
                        onClick={() => viewApplicationDetails(app)}
                      >
                        <FaEye /> View Details
                      </button>
                      {app.status === 'pending' && (
                        <button 
                          className="withdraw-btn"
                          onClick={() => withdrawApplication(app.id)}
                        >
                          <FaTrash /> Withdraw
                        </button>
                      )}
                      <button 
                        className="chat-btn"
                        onClick={() => handleStartChat(app.landlordId)}
                      >
                        <FaComments /> Chat
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="saved-section">
            <h2>Saved Properties</h2>
            {savedProperties.length === 0 ? (
              <p>You haven't saved any properties yet.</p>
            ) : (
              <div className="saved-list">
                {savedProperties.map(property => (
                  <div key={property.id} className="saved-card">
                    <img 
                      src={`${process.env.PUBLIC_URL}/assets/properties/${property.image}`}
                      alt={property.title}
                      className="saved-property-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `${process.env.PUBLIC_URL}/assets/properties/default.jfif`;
                      }}
                    />
                    <div className="saved-card-content">
                      <h3>{property.title}</h3>
                      <p className="location">{property.location}</p>
                      <p className="price">${property.price}/month</p>
                      <div className="property-actions">
                        <button 
                          className="view-btn"
                          onClick={() => viewSavedProperty(property.id)}
                        >
                          View Details
                        </button>
                        <button 
                          className="chat-btn"
                          onClick={() => handleStartChat(property.landlordId)}
                        >
                          <FaComments /> Chat
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="messages-section">
            <h2>Messages</h2>
            {selectedMessage ? (
              <div className="message-detail">
                <button className="back-btn" onClick={handleBackToMessages}>Back to Messages</button>
                <h3>{selectedMessage.subject}</h3>
                <p><strong>From:</strong> {selectedMessage.from}</p>
                <p><strong>Date:</strong> {selectedMessage.date}</p>
                <p><strong>Property:</strong> {getPropertyTitle(selectedMessage.propertyId)}</p>
                <p className="message-content">{selectedMessage.content}</p>
                
                {isReplying ? (
                  <div className="reply-section">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Type your reply here..."
                      rows="6"
                    />
                    <div className="reply-actions">
                      <button className="send-btn" onClick={handleReplySubmit}>Send Reply</button>
                      <button className="cancel-btn" onClick={handleCancelReply}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="message-actions">
                    {selectedMessage.from !== 'You' && (
                      <>
                        <button className="reply-btn" onClick={handleStartReply}>
                          <FaReply /> Reply
                        </button>
                        <button 
                          className="chat-btn"
                          onClick={() => handleStartChat(selectedMessage.fromId)}
                        >
                          <FaComments /> Chat
                        </button>
                      </>
                    )}
                    <button className="delete-btn" onClick={() => {
                      handleDeleteMessage(selectedMessage.id);
                      handleBackToMessages();
                    }}>
                      <FaTimes /> Delete
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {messages.length === 0 ? (
                  <p>You have no messages.</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>From</th>
                        <th>Property</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map(message => (
                        <tr key={message.id} className={!message.read ? 'unread' : ''}>
                          <td>{message.from}</td>
                          <td>{getPropertyTitle(message.propertyId)}</td>
                          <td>{message.subject}</td>
                          <td>{message.date}</td>
                          <td>{message.read ? 'Read' : 'Unread'}</td>
                          <td>
                            <button className="view-btn" onClick={() => handleViewMessage(message.id)}>View</button>
                            {message.from !== 'You' && (
                              <button 
                                className="chat-btn"
                                onClick={() => handleStartChat(message.fromId)}
                              >
                                <FaComments /> Chat
                              </button>
                            )}
                            <button className="delete-btn" onClick={() => handleDeleteMessage(message.id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantDashboard;