import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function ProfileLayout() {
  const location = useLocation();
  
  const profileTabs = [
    { path: '/profile/overview', label: 'Overview', icon: '📊' },
    { path: '/profile/achievements', label: 'Achievements', icon: '🏆' },
    { path: '/profile/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <>
      {/* Header Section */}
      <header className="app-header">
        <h1 className="app-title">
          User <span className="highlight">Profile</span>
        </h1>
        <p className="app-subtitle">
          Your progress, achievements, and settings
        </p>
        <div className="app-divider"></div>
      </header>

      <div className="profile-container">
        {/* Profile Navigation */}
        <div className="profile-nav">
          {profileTabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`profile-nav-link ${location.pathname === tab.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-label">{tab.label}</span>
            </Link>
          ))}
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {location.pathname === '/profile' ? (
            <div className="profile-welcome">
              <h2>Welcome to Your Profile</h2>
              <p>Select a tab above to view your stats, achievements, or change settings.</p>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </>
  );
}
