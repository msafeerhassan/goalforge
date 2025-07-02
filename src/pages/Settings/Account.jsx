import React, { useState } from 'react';

export default function Account() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    timezone: 'UTC'
  });

  const handleInputChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    alert('Account settings saved!');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Clear all user data
      localStorage.clear();
      alert('Account deleted successfully!');
    }
  };

  return (
    <div className="settings-section">
      <h2>Account Settings</h2>
      <p>Manage your account information</p>

      <div className="settings-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={profile.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={profile.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="timezone">Timezone</label>
          <select 
            id="timezone" 
            value={profile.timezone} 
            onChange={(e) => handleInputChange('timezone', e.target.value)}
            className="form-select"
          >
            <option value="UTC">UTC</option>
            <option value="EST">Eastern (EST)</option>
            <option value="PST">Pacific (PST)</option>
            <option value="GMT">Greenwich (GMT)</option>
          </select>
        </div>

        <div className="form-actions">
          <button onClick={handleSave} className="save-button">
            Save Changes
          </button>
          <button onClick={handleDeleteAccount} className="delete-button">
            Delete Account
          </button>
        </div>
      </div>

      <div className="account-stats">
        <h3>Account Statistics</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Member since:</span>
            <span className="stat-value">January 2025</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Goals created:</span>
            <span className="stat-value">{JSON.parse(localStorage.getItem('goals') || '[]').length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
