import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaFileUpload, FaTimes, FaCheck, FaArrowLeft } from 'react-icons/fa';
import './ApplicationPage.css';

const ApplicationForm = () => {
  const { propertyId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const propertyDetails = state?.propertyDetails || {
    title: 'Property',
    landlord: 'Landlord',
    price: 0,
    location: 'Location',
    requiredDocuments: []
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    moveInDate: '',
    message: ''
  });
  const [documents, setDocuments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length !== files.length) {
      alert('Only PDF files are accepted');
      return;
    }

    setDocuments(prev => [...prev, ...pdfFiles]);
  };

  const removeDocument = (index) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      console.log('Submitting application:', {
        propertyId,
        propertyDetails,
        ...formData,
        documents: documents.map(doc => ({
          name: doc.name,
          size: doc.size,
          type: doc.type
        }))
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1500);
  };

  if (submitSuccess) {
    return (
      <div className="application-success-page">
        <div className="success-content">
          <FaCheck className="success-icon" />
          <h2>Application Submitted Successfully!</h2>
          <p>Your application for {propertyDetails.title} has been received.</p>
          <p>The landlord will review your application and contact you soon.</p>
          <button 
            onClick={() => navigate('/tenant/applications')}
            className="back-to-applications"
          >
            View My Applications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="application-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back to Property
      </button>

      <div className="application-header">
        <h1>Rental Application</h1>
        <div className="property-summary">
          <h2>{propertyDetails.title}</h2>
          <p>Landlord: {propertyDetails.landlord}</p>
          <p>Location: {propertyDetails.location}</p>
          <p>Price: ${propertyDetails.price}/month</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="application-form">
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Rental Details</h3>
          <div className="form-group">
            <label>Desired Move-In Date *</label>
            <input
              type="date"
              name="moveInDate"
              value={formData.moveInDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Message to Landlord (Optional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Tell the landlord about yourself and why you'd be a great tenant..."
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Required Documents</h3>
          <p className="document-instructions">
            Please upload the following documents in PDF format:
          </p>
          <ul className="required-docs-list">
            {propertyDetails.requiredDocuments.map((doc, index) => (
              <li key={index}>{doc}</li>
            ))}
          </ul>

          <div className="file-upload-container">
            <label className="file-upload-label">
              <FaFileUpload className="upload-icon" />
              <span>Upload Documents (PDF only)</span>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf"
                multiple
                style={{ display: 'none' }}
              />
            </label>
          </div>

          {documents.length > 0 && (
            <div className="uploaded-files">
              <h4>Documents to be Submitted:</h4>
              <ul>
                {documents.map((doc, index) => (
                  <li key={index}>
                    <span>{doc.name}</span>
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="remove-doc-btn"
                    >
                      <FaTimes />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting || documents.length === 0}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;