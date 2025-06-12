// src/pages/Profile/Profile.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaEdit, FaTrash, FaImage, FaUpload, FaTimes } from 'react-icons/fa';
import './Profile.css';

function Profile({ userType }) {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: ''
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }
    
    const imagePreviews = files.map(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise(resolve => {
        reader.onload = () => resolve(reader.result);
      });
    });

    Promise.all(imagePreviews).then(previews => {
      setSelectedImages(prev => [...prev, ...previews]);
    });
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreateProperty = () => {
    if (!newProperty.title || !newProperty.price || !newProperty.location) {
      alert('Please fill in required fields (Title, Price, Location)');
      return;
    }

    const property = {
      id: `property-${Date.now()}`,
      ...newProperty,
      images: selectedImages,
      status: 'pending', // 'pending', 'approved', 'rented'
      views: 0,
      landlord: 'Your Name',
      date: new Date().toLocaleString()
    };

    setProperties([property, ...properties]);
    setNewProperty({
      title: '',
      description: '',
      price: '',
      location: '',
      bedrooms: '',
      bathrooms: ''
    });
    setSelectedImages([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerFileInput = () => fileInputRef.current.click();

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>{userType === 'landlord' ? 'Landlord' : 'Tenant'} Profile</h1>
      </div>

      {userType === 'landlord' && (
        <div className="create-property">
          <h2>Add New Property</h2>
          <div className="property-form">
            <div className="form-row">
              <input
                name="title"
                value={newProperty.title}
                onChange={handleInputChange}
                placeholder="Property Title*"
                required
              />
              <input
                name="price"
                type="number"
                value={newProperty.price}
                onChange={handleInputChange}
                placeholder="Price per month*"
                required
              />
            </div>
            <input
              name="location"
              value={newProperty.location}
              onChange={handleInputChange}
              placeholder="Location*"
              required
            />
            <textarea
              name="description"
              value={newProperty.description}
              onChange={handleInputChange}
              placeholder="Detailed description"
              rows={3}
            />
            <div className="form-row">
              <input
                name="bedrooms"
                type="number"
                value={newProperty.bedrooms}
                onChange={handleInputChange}
                placeholder="Bedrooms"
              />
              <input
                name="bathrooms"
                type="number"
                value={newProperty.bathrooms}
                onChange={handleInputChange}
                placeholder="Bathrooms"
              />
            </div>

            <div className="image-upload">
              <button className="upload-btn" onClick={triggerFileInput}>
                <FaUpload /> Upload Images (max 5)
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                multiple
                style={{ display: 'none' }}
              />
              
              <div className="image-previews">
                {selectedImages.map((img, index) => (
                  <div key={index} className="image-preview">
                    <img src={img} alt={`Preview ${index}`} />
                    <button className="remove-image" onClick={() => removeImage(index)}>
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button className="submit-btn" onClick={handleCreateProperty}>
              Submit Property
            </button>
          </div>
        </div>
      )}

      {userType === 'landlord' && (
        <div className="properties-list">
          <h2>Your Properties</h2>
          {properties.length === 0 ? (
            <p>No properties listed yet</p>
          ) : (
            properties.map(property => (
              <div key={property.id} className="property-card">
                <div className="property-images">
                  {property.images.slice(0, 1).map((img, i) => (
                    <img key={i} src={img} alt={`Property ${i}`} />
                  ))}
                </div>
                <div className="property-details">
                  <h3>{property.title}</h3>
                  <p><strong>Location:</strong> {property.location}</p>
                  <p><strong>Price:</strong> ${property.price}/month</p>
                  <p><strong>Status:</strong> <span className={`status-${property.status}`}>
                    {property.status}
                  </span></p>
                  <div className="property-actions">
                    <button className="view-btn" onClick={() => navigate(`/property/${property.id}`)}>
                      <FaHome /> View
                    </button>
                    <button className="edit-btn">
                      <FaEdit /> Edit
                    </button>
                    <button className="delete-btn">
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {userType === 'tenant' && (
        <div className="tenant-section">
          <h2>Your Saved Properties</h2>
          <p>Properties you've saved will appear here</p>
          
          <h2>Your Applications</h2>
          <p>Your rental applications will appear here</p>
        </div>
      )}
    </div>
  );
}

export default Profile;