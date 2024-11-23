import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        <span>Calendar Pro</span>
      </div>
      
      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          <i className="fas fa-home"></i>
          Dashboard
        </Link>
        
        <Link 
          to="/summary" 
          className={`nav-link ${location.pathname === '/summary' ? 'active' : ''}`}
        >
          <i className="fas fa-chart-pie"></i>
          Summary
        </Link>
      </div>

      <div className="nav-actions">
        <button className="create-event-btn">
          <i className="fas fa-plus"></i>
          New Event
        </button>
        
        <div className="user-profile">
          <img src="https://via.placeholder.com/32" alt="User" />
          <div className="user-menu">
            <span>John Doe</span>
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
