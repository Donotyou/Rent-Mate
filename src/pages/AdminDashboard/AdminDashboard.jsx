import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { FaUsers, FaHome, FaCheck, FaTimes, FaFileAlt, FaInfoCircle } from 'react-icons/fa';

const AdminDashboard = () => {
  const [pendingLandlords, setPendingLandlords] = useState([]);
  const [pendingProperties, setPendingProperties] = useState([]);
  const [activeTab, setActiveTab] = useState('landlords');
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null); // 'landlord' or 'property'

  useEffect(() => {
    // Mock data
    setPendingLandlords([
      { 
        id: 1, 
        name: 'John Doe', 
        email: 'john@example.com', 
        phone: '555-123-4567',
        registrationDate: '2023-05-15',
        documents: ['id_proof.pdf', 'address_proof.pdf'],
        bio: 'Professional property manager with 5 years experience',
        status: 'pending'
      },
      { 
        id: 2, 
        name: 'Jane Smith', 
        email: 'jane@example.com',
        phone: '555-987-6543',
        registrationDate: '2023-05-16',
        documents: ['business_license.pdf'],
        bio: 'Real estate investor with multiple properties',
        status: 'pending'
      }
    ]);

    setPendingProperties([
      { 
        id: 1, 
        title: 'Luxury Apartment', 
        landlord: 'John Doe', 
        price: 1200, 
        location: 'New York', 
        bedrooms: 2,
        bathrooms: 2,
        size: '1200 sqft',
        description: 'Modern apartment with great views',
        amenities: ['Pool', 'Gym', 'Parking'],
        submittedDate: '2023-05-15',
        images: ['property1.jpg'],
        status: 'pending'
      }
    ]);
  }, []);

  const handleApprove = (id, type) => {
    if (type === 'landlord') {
      setPendingLandlords(pendingLandlords.filter(item => item.id !== id));
    } else {
      setPendingProperties(pendingProperties.filter(item => item.id !== id));
    }
    closeModal();
  };

  const handleReject = (id, type) => {
    if (type === 'landlord') {
      setPendingLandlords(pendingLandlords.filter(item => item.id !== id));
    } else {
      setPendingProperties(pendingProperties.filter(item => item.id !== id));
    }
    closeModal();
  };

  const showDetails = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalType(null);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="tabs">
        <button 
          className={activeTab === 'landlords' ? 'active' : ''}
          onClick={() => setActiveTab('landlords')}
        >
          <FaUsers /> Pending Landlords ({pendingLandlords.length})
        </button>
        <button 
          className={activeTab === 'properties' ? 'active' : ''}
          onClick={() => setActiveTab('properties')}
        >
          <FaHome /> Pending Properties ({pendingProperties.length})
        </button>
      </div>
      
      {activeTab === 'landlords' && (
        <div className="pending-section">
          <h2>Pending Landlord Approvals</h2>
          {pendingLandlords.length === 0 ? (
            <p>No pending landlord approvals</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Registration Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingLandlords.map(landlord => (
                  <tr key={landlord.id}>
                    <td>{landlord.name}</td>
                    <td>{landlord.email}</td>
                    <td>{landlord.phone}</td>
                    <td>{landlord.registrationDate}</td>
                    <td className="actions">
                      <button 
                        className="approve-btn"
                        onClick={() => handleApprove(landlord.id, 'landlord')}
                      >
                        <FaCheck /> Approve
                      </button>
                      <button 
                        className="reject-btn"
                        onClick={() => handleReject(landlord.id, 'landlord')}
                      >
                        <FaTimes /> Reject
                      </button>
                      <button 
                        className="details-btn"
                        onClick={() => showDetails(landlord, 'landlord')}
                      >
                        <FaInfoCircle /> Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      
      {activeTab === 'properties' && (
        <div className="pending-section">
          <h2>Pending Property Approvals</h2>
          {pendingProperties.length === 0 ? (
            <p>No pending property approvals</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Landlord</th>
                  <th>Price</th>
                  <th>Location</th>
                  <th>Submitted Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingProperties.map(property => (
                  <tr key={property.id}>
                    <td>{property.title}</td>
                    <td>{property.landlord}</td>
                    <td>${property.price}</td>
                    <td>{property.location}</td>
                    <td>{property.submittedDate}</td>
                    <td className="actions">
                      <button 
                        className="approve-btn"
                        onClick={() => handleApprove(property.id, 'property')}
                      >
                        <FaCheck /> Approve
                      </button>
                      <button 
                        className="reject-btn"
                        onClick={() => handleReject(property.id, 'property')}
                      >
                        <FaTimes /> Reject
                      </button>
                      <button 
                        className="details-btn"
                        onClick={() => showDetails(property, 'property')}
                      >
                        <FaFileAlt /> Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Details Modal */}
      {selectedItem && modalType && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>×</button>
            
            {modalType === 'landlord' ? (
              <>
                <h2>Landlord Details</h2>
                <div className="details-grid">
                  <div><strong>Name:</strong> {selectedItem.name}</div>
                  <div><strong>Email:</strong> {selectedItem.email}</div>
                  <div><strong>Phone:</strong> {selectedItem.phone}</div>
                  <div><strong>Registration Date:</strong> {selectedItem.registrationDate}</div>
                  <div><strong>Bio:</strong> {selectedItem.bio}</div>
                  <div>
                    <strong>Documents:</strong>
                    <ul>
                      {selectedItem.documents.map((doc, index) => (
                        <li key={index}>
                          <a href={`/documents/${doc}`} target="_blank" rel="noopener noreferrer">
                            {doc}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2>Property Details</h2>
                <div className="property-image">
                  <img 
                    src={`/properties/${selectedItem.images[0]}`} 
                    alt={selectedItem.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/properties/default.jpg';
                    }}
                  />
                </div>
                <div className="details-grid">
                  <div><strong>Title:</strong> {selectedItem.title}</div>
                  <div><strong>Landlord:</strong> {selectedItem.landlord}</div>
                  <div><strong>Price:</strong> ${selectedItem.price}/month</div>
                  <div><strong>Location:</strong> {selectedItem.location}</div>
                  <div><strong>Size:</strong> {selectedItem.size}</div>
                  <div><strong>Bedrooms:</strong> {selectedItem.bedrooms}</div>
                  <div><strong>Bathrooms:</strong> {selectedItem.bathrooms}</div>
                  <div><strong>Description:</strong> {selectedItem.description}</div>
                  <div><strong>Amenities:</strong> {selectedItem.amenities.join(', ')}</div>
                </div>
              </>
            )}
            
            <div className="modal-actions">
              <button 
                className="approve-btn"
                onClick={() => handleApprove(selectedItem.id, modalType)}
              >
                <FaCheck /> Approve
              </button>
              <button 
                className="reject-btn"
                onClick={() => handleReject(selectedItem.id, modalType)}
              >
                <FaTimes /> Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;