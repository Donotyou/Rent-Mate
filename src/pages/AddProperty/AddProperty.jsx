import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaTimes, FaArrowLeft } from 'react-icons/fa';
import './AddProperty.css';

const AddProperty = () => {
  const [property, setProperty] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    amenities: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setSelectedImage(null);
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!property.title || !property.price || !property.location) {
      alert('Please fill in required fields (Title, Price, Location)');
      return;
    }

    // In a real app, you would save to backend here
    console.log('Property submitted:', {
      ...property,
      image: selectedImage,
      status: 'pending',
      views: 0,
      landlord: 'Your Name',
      date: new Date().toLocaleString()
    });

    // Navigate back to landlord dashboard after submission
    navigate('/profile/landlord');
  };

  const triggerFileInput = () => fileInputRef.current.click();

  return (
    <div className="add-property-page">
      <button className="back-btn" onClick={() => navigate('/profile/landlord')}>
        <FaArrowLeft /> Back to Properties
      </button>

      <h1>Add New Property</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Property Title*</label>
            <input
              name="title"
              value={property.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Price per month*</label>
            <input
              name="price"
              type="number"
              value={property.price}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Location*</label>
          <input
            name="location"
            value={property.location}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Detailed Description</label>
          <textarea
            name="description"
            value={property.description}
            onChange={handleInputChange}
            rows={4}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Bedrooms</label>
            <input
              name="bedrooms"
              type="number"
              value={property.bedrooms}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Bathrooms</label>
            <input
              name="bathrooms"
              type="number"
              value={property.bathrooms}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Amenities (comma separated)</label>
          <input
            name="amenities"
            value={property.amenities}
            onChange={handleInputChange}
            placeholder="e.g., Pool, Gym, Parking"
          />
        </div>

        <div className="form-group">
          <label>Property Image</label>
          <button type="button" className="upload-btn" onClick={triggerFileInput}>
            <FaUpload /> Select Image
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          
          <div className="image-preview-container">
            {selectedImage && (
              <div className="image-preview">
                <img src={selectedImage} alt="Property preview" />
                <button 
                  type="button"
                  className="remove-image"
                  onClick={removeImage}
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;