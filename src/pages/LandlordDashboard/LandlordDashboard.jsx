import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaEnvelope, FaChartLine, FaFileAlt, FaReply, FaTimes, FaComments } from 'react-icons/fa';
import './LandlordDashboard.css';

const LandlordDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('properties');
  const [properties, setProperties] = useState([]);
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [currentUser] = useState({ id: 1 }); // Mock user data - replace with actual user context

  useEffect(() => {
    // Mock data - replace with API calls
    const mockProperties = [
      { id: 1, title: 'Downtown Apartment', price: 1800, location: 'New York', status: 'available', views: 124, image: 'property1.jfif' },
      { id: 2, title: 'Suburban House', price: 2200, location: 'Chicago', status: 'rented', views: 89, image: 'property2.jfif' }
    ];

    const mockApplications = [
      { id: 1, propertyId: 1, tenantName: 'John Doe', tenantId: 101, date: '2023-06-15', status: 'pending' },
      { id: 2, propertyId: 2, tenantName: 'Jane Smith', tenantId: 102, date: '2023-06-16', status: 'approved' }
    ];

    const mockMessages = [
      { id: 1, from: 'John Doe', fromId: 101, subject: 'Question about the apartment', date: '2023-06-16', read: false, propertyId: 1, content: 'Is the apartment still available?' },
      { id: 2, from: 'Jane Smith', fromId: 102, subject: 'Lease renewal inquiry', date: '2023-06-17', read: true, propertyId: 2, content: 'Can I renew the lease for another year?' },
      { id: 3, from: 'Maintenance Team', fromId: 201, subject: 'Scheduled inspection', date: '2023-06-18', read: false, propertyId: null, content: 'We will inspect the property on Friday.' }
    ];

    setProperties(mockProperties);
    setApplications(mockApplications);
    setMessages(mockMessages);
    setUnreadCount(mockMessages.filter(msg => !msg.read).length);
  }, []);

  const handleAddProperty = () => {
    navigate('/add-property');
  };

  const handleStatusChange = (propertyId, newStatus) => {
    setProperties(properties.map(prop => 
      prop.id === propertyId ? { ...prop, status: newStatus } : prop
    ));
  };

  const handleEdit = (propertyId) => {
    navigate(`/edit-property/${propertyId}`);
  };

  const handleDelete = (propertyId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this property?');
    if (confirmDelete) {
      setProperties(properties.filter(prop => prop.id !== propertyId));
      setApplications(applications.filter(app => app.propertyId !== propertyId));
      setMessages(messages.filter(msg => msg.propertyId !== propertyId));
    }
  };

  const handleApprove = (appId) => {
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, status: 'approved' } : app
    ));
  };

  const handleReject = (appId) => {
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, status: 'rejected' } : app
    ));
  };

  const handleViewApplication = (appId) => {
    navigate(`/application/${appId}`);
  };

  const handleViewMessage = (messageId) => {
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      ));
      setUnreadCount(messages.filter(msg => !msg.read && msg.id !== messageId).length);
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
    setUnreadCount(messages.filter(msg => !msg.read && msg.id !== messageId).length);
    if (selectedMessage && selectedMessage.id === messageId) {
      setSelectedMessage(null);
      setIsReplying(false);
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
    
    // In a real app, you would send this to your backend
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

  const handleStartChat = (tenantId) => {
    navigate(`/chat/landlord${currentUser.id}-tenant${tenantId}`);
  };

  const getPropertyTitle = (propertyId) => {
    const property = properties.find(p => p.id === propertyId);
    return property ? property.title : 'General Inquiry';
  };

  return (
    <div className="landlord-dashboard">
      <div className="sidebar">
        <button 
          className={`nav-item ${activeTab === 'properties' ? 'active' : ''}`} 
          onClick={() => setActiveTab('properties')}
        >
          <FaHome /> My Properties
        </button>
        <button 
          className={`nav-item ${activeTab === 'applications' ? 'active' : ''}`} 
          onClick={() => setActiveTab('applications')}
        >
          <FaFileAlt /> Applications
        </button>
        <button 
  className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`} 
  onClick={() => navigate('/chat/landlord123-tenant456')}
>
  <FaEnvelope /> Chat
</button>

        <button 
          className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`} 
          onClick={() => setActiveTab('analytics')}
        >
          <FaChartLine /> Analytics
        </button>
      </div>

      <div className="main-content">
        {activeTab === 'properties' && (
          <div className="properties-section">
            <div className="section-header">
              <h2>My Properties</h2>
              <button className="add-property" onClick={handleAddProperty}>
                <FaPlus /> Add Property
              </button>
            </div>
            {properties.length === 0 ? (
              <p>You haven't listed any properties yet.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Property</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Views</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map(property => (
                    <tr key={property.id}>
                      <td>
                        <img 
                          src={`${process.env.PUBLIC_URL}/assets/properties/${property.image}`} 
                          alt={property.title}
                          className="property-thumbnail"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = `${process.env.PUBLIC_URL}/assets/properties/default.jfif`;
                          }}
                        />
                      </td>
                      <td>{property.title}</td>
                      <td>{property.location}</td>
                      <td>${property.price}</td>
                      <td>{property.views}</td>
                      <td>
                        <select
                          value={property.status}
                          onChange={(e) => handleStatusChange(property.id, e.target.value)}
                        >
                          <option value="available">Available</option>
                          <option value="rented">Rented</option>
                          <option value="maintenance">Maintenance</option>
                        </select>
                      </td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEdit(property.id)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(property.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="applications-section">
            <h2>Rental Applications</h2>
            {applications.length === 0 ? (
              <p>No applications received yet.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Applicant</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app.id}>
                      <td>{getPropertyTitle(app.propertyId)}</td>
                      <td>{app.tenantName}</td>
                      <td>{app.date}</td>
                      <td>
                        <span className={`status-badge ${app.status}`}>
                          {app.status}
                        </span>
                      </td>
                      <td>
                        {app.status === 'pending' && (
                          <>
                            <button className="approve-btn" onClick={() => handleApprove(app.id)}>Approve</button>
                            <button className="reject-btn" onClick={() => handleReject(app.id)}>Reject</button>
                          </>
                        )}
                        <button className="view-btn" onClick={() => handleViewApplication(app.id)}>View</button>
                        <button 
                          className="chat-btn"
                          onClick={() => handleStartChat(app.tenantId)}
                        >
                          <FaComments /> Chat
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* {activeTab === 'messages' && (
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
                    <button className="reply-btn" onClick={handleStartReply}>
                      <FaReply /> Reply
                    </button>
                    {selectedMessage.fromId && (
                      <button 
                        className="chat-btn"
                        onClick={() => handleStartChat(selectedMessage.fromId)}
                      >
                        <FaComments /> Chat
                      </button>
                    )}
                    <button className="delete-btn" onClick={() => handleDeleteMessage(selectedMessage.id)}>
                      <FaTimes /> Delete
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {messages.length === 0 ? (
                  <p>No messages yet.</p>
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
                            {message.fromId && (
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
        )} */}

        {activeTab === 'analytics' && (
          <div className="analytics-section">
            <h2>Property Analytics</h2>
            <div className="analytics-grid">
              <div className="stat-card">
                <h3>Total Properties</h3>
                <p>{properties.length}</p>
              </div>
              <div className="stat-card">
                <h3>Available Properties</h3>
                <p>{properties.filter(p => p.status === 'available').length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Views</h3>
                <p>{properties.reduce((sum, prop) => sum + prop.views, 0)}</p>
              </div>
              <div className="stat-card">
                <h3>Pending Applications</h3>
                <p>{applications.filter(app => app.status === 'pending').length}</p>
              </div>
              <div className="stat-card">
                <h3>Unread Messages</h3>
                <p>{unreadCount}</p>
              </div>
              <div className="stat-card">
                <h3>Total Messages</h3>
                <p>{messages.length}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandlordDashboard;