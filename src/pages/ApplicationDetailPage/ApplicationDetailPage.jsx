import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaFilePdf, FaArrowLeft } from 'react-icons/fa';
import './ApplicationDetailPage.css';

const ApplicationDetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const application = state?.application || {
    id: 0,
    propertyTitle: 'Property',
    status: 'pending',
    date: 'Date',
    documents: [],
    landlord: 'Landlord',
    message: 'No message'
  };

  return (
    <div className="application-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back to Applications
      </button>

      <div className="application-header">
        <h1>Application Details</h1>
        <h2>{application.propertyTitle}</h2>
        <div className={`status-badge ${application.status}`}>
          {application.status}
        </div>
      </div>

      <div className="application-details">
        <div className="detail-section">
          <h3>Application Information</h3>
          <p><strong>Applied on:</strong> {application.date}</p>
          <p><strong>Landlord:</strong> {application.landlord}</p>
          <p><strong>Status:</strong> {application.status}</p>
          {application.message && (
            <p><strong>Landlord Message:</strong> {application.message}</p>
          )}
        </div>

        <div className="detail-section">
          <h3>Submitted Documents</h3>
          {application.documents.length > 0 ? (
            <ul className="document-list">
              {application.documents.map((doc, index) => (
                <li key={index}>
                  <FaFilePdf className="pdf-icon" />
                  <span>{doc}</span>
                  <button className="view-doc-btn">View</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No documents submitted</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailPage; 
