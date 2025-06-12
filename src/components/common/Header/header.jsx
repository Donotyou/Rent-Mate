import React, { useState, useEffect } from 'react';
import { Container, Row, Navbar, Offcanvas, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import '../Header/header.css';

const Header = () => {
  const [show, setShow] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  // Check if user is logged in when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token'); // Or your authentication token
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMenu = () => {
    setShow(!show);
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop >= 120) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    setIsLoggedIn(false); // Update state
    // You might want to redirect to home page after logout
    // window.location.href = '/';
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className={`header-section ${isSticky ? 'is-sticky' : ''}`}>
      <Container>
        <Row>
          <Navbar expand="lg" className="p-0">
            {/* Logo Section */}
            
            {/* Desktop Menu */}
            <Navbar.Collapse id="offcanvasNavbar">
              <Nav className="ml-auto">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/about" className="nav-link about">About Us</NavLink>
                <NavLink to="/listings" className="nav-link listings">Latest Listing</NavLink>
                <NavLink to="/contact" className="nav-link">Contact Us</NavLink>
              </Nav>
            </Navbar.Collapse>

            {/* Conditionally render Register/Login or Logout */}
            {!isLoggedIn ? (
              <>
                <div className="ms-md-4 ms-2">
                  <NavLink to="/register" className="primaryBtn d-none d-sm-inline-block">Register</NavLink>
                </div>
                <div className="ms-md-4 ms-2">
                  <NavLink to="/login" className="primaryBtn d-none d-sm-inline-block">Login</NavLink>
                </div>
              </>
            ) : (
              <div className="ms-md-4 ms-2">
                <button onClick={handleLogout} className="primaryBtn d-none d-sm-inline-block">Logout</button>
              </div>
            )}

            {/* Offcanvas Button for Mobile View */}
            <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={toggleMenu} />

            {/* Offcanvas Menu (For Mobile View) */}
            <Offcanvas show={show} onHide={toggleMenu} placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="flex-column">
                  <NavLink to="/" className="nav-link">Home</NavLink>
                  <NavLink to="/about" className="nav-link about">About Us</NavLink>
                  <NavLink to="/listings" className="nav-link listings">Latest Listing</NavLink>
                  <NavLink to="/contact" className="nav-link">Contact Us</NavLink>
                  {!isLoggedIn ? (
                    <>
                      <NavLink to="/register" className="nav-link">Register</NavLink>
                      <NavLink to="/login" className="nav-link">Login</NavLink>
                    </>
                  ) : (
                    <button onClick={handleLogout} className="nav-link">Logout</button>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Offcanvas>
          </Navbar>
        </Row>
      </Container>
    </section>
  );
};

export default Header;