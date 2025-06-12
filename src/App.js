
// export default App;
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/register";
import Header from "./components/common/Header/header";
import ContactUs from "./pages/ContactUs/Contact";
import Footer from "./components/common/Footer/footer";
import Listing from './pages/PublicProperties/PublicProperties';  // تأكد من استيراد Listing
import BookingPage from './pages/ApplicationPage/ApplicationPage';
import EditProperty from './pages/EditProperty/EditProperty'; // <-- Import added
import AddProperty from './pages/AddProperty/AddProperty';
import Property from './pages/Property/Property';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import LandlordDashboard from './pages/LandlordDashboard/LandlordDashboard';
import TenantDashboard from './pages/TenantDashboard/TenantDashboard';
import Profile from './pages/Profile/Profile';
import ApplicationDetailPage from './pages/ApplicationDetailPage/ApplicationDetailPage';
import ChatPage from './pages/ChatPage/ChatPage';


        <Route path="/tenant/applications" element={<TenantDashboard defaultTab="applications" />} />
        function App() {
          return (
            <div className="app-wrapper d-flex flex-column min-vh-100">
              <Header />
        
              <div className="flex-fill">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/listings" element={<Listing />} />
                  <Route path="/booking/:BookingId" element={<BookingPage />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/landlord" element={<LandlordDashboard />} />
                  <Route path="/tenant" element={<TenantDashboard />} />
                  <Route path="/profile/:userType" element={<Profile />} />
                  <Route path="/property/:propertyId" element={<Property />} />
                  <Route path="/add-property" element={<AddProperty />} />
                  <Route path="/edit-property/:propertyId" element={<EditProperty />} />
                  <Route path="/apply/:propertyId" element={<BookingPage />} />
                  <Route path="/tenant/applications" element={<TenantDashboard defaultTab="applications" />} />
                  <Route path="/application/:applicationId" element={<ApplicationDetailPage />} />
                  <Route path="/chat/:chatId" element={<ChatPage userType="landlord" />} />
                  <Route path="/chat/:conversationId" element={<ChatPage />} />

                </Routes>
              </div>
        
              <Footer />
            </div>
          );
        }
        

export default App;
