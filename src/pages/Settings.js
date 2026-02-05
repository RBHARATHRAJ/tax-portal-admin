import React, { useState } from 'react';
import '../styles/Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'Tax Portal',
    email: 'admin@taxportal.com',
    notifications: true,
    twoFactor: false,
    darkMode: false,
    language: 'en',
  });

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  return (
    <div className="settings-page">
      <h2 className="page-heading">Settings</h2>

      <div className="settings-grid">
        <div className="settings-card">
          <h3>🏢 General Settings</h3>
          <div className="setting-group">
            <label>Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
              className="setting-input"
            />
          </div>
          <div className="setting-group">
            <label>Admin Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="setting-input"
            />
          </div>
          <div className="setting-group">
            <label>Language</label>
            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="setting-select"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>

        <div className="settings-card">
          <h3>🔐 Security Settings</h3>
          <div className="setting-toggle">
            <div>
              <strong>Two-Factor Authentication</strong>
              <p>Add an extra layer of security to your account</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.twoFactor}
                onChange={(e) => handleChange('twoFactor', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="setting-group">
            <label>Change Password</label>
            <button className="btn-secondary">Update Password</button>
          </div>
          <div className="setting-group">
            <label>Session Timeout</label>
            <select className="setting-select">
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>2 hours</option>
            </select>
          </div>
        </div>

        <div className="settings-card">
          <h3>🔔 Notifications</h3>
          <div className="setting-toggle">
            <div>
              <strong>Email Notifications</strong>
              <p>Receive email updates about important events</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="setting-toggle">
            <div>
              <strong>Dark Mode</strong>
              <p>Switch to dark theme for better visibility</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => handleChange('darkMode', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-card">
          <h3>💾 Backup & Data</h3>
          <div className="setting-group">
            <label>Database Backup</label>
            <button className="btn-secondary">Create Backup</button>
          </div>
          <div className="setting-group">
            <label>Export Data</label>
            <button className="btn-secondary">Export All Data</button>
          </div>
          <div className="setting-group">
            <label>Last Backup</label>
            <p className="setting-info">2026-02-01 10:30 AM</p>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn-primary">Save Changes</button>
        <button className="btn-secondary">Reset to Default</button>
      </div>
    </div>
  );
};

export default Settings;