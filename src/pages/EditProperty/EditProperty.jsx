import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProperty.css';

const EditProperty = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    status: 'available',
    image: null,
    imagePreview: ''
  });

  useEffect(() => {
    // Replace with API call to get property details
    const mockProperty = {
      id: propertyId,
      title: 'Downtown Apartment',
      location: 'New York',
      price: 1800,
      status: 'available',
      image: null, // Change as needed
      imagePreview: 'property1.jfif'
    };

    setFormData(mockProperty);
  }, [propertyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('location', formData.location);
    data.append('price', formData.price);
    data.append('status', formData.status);
    if (formData.image) {
      data.append('image', formData.image);
    }

    // Replace this with your API call using `fetch` or Axios
    console.log('Form data ready to send:', formData);
    navigate('/landlord');
  };

  return (
    <div className="landlord-dashboard">
      <div className="main-content">
        <div className="section-header">
          <h2>Edit Property</h2>
        </div>
        <form onSubmit={handleSubmit} className="edit-form" encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="image">Image Upload</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {formData.imagePreview && (
              <img src={formData.imagePreview} alt="Preview" className="image-preview" />
            )}
          </div>
          <button type="submit" className="add-property">Update Property</button>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;
