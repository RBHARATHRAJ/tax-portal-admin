import React from 'react';
import '../styles/Header.css';

const Header = ({ onToggleSidebar, onLogout }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onToggleSidebar}>
          ☰
        </button>
        <h1 className="page-title">Admin Panel</h1>
      </div>
      <div className="header-right">
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <span className="search-icon">🔍</span>
        </div>
        <button className="notification-btn">
          🔔
          <span className="badge">3</span>
        </button>
        <div className="user-menu">
          <img 
            src="https://via.placeholder.com/40" 
            alt="User" 
            className="user-avatar"
          />
          <span className="user-name">Admin User</span>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;