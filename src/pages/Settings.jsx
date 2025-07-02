import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Settings() {
  const location = useLocation();
  
  const settingsItems = [
    { path: '/settings/general', label: 'General', icon: '⚙️' },
    { path: '/settings/notifications', label: 'Notifications', icon: '🔔' },
    { path: '/settings/account', label: 'Account', icon: '👤' }
  ];

  return (
    <>
      {/* Header Section */}
      <header className="app-header">
        <h1 className="app-title">
          <span className="highlight">Settings</span>
        </h1>
        <p className="app-subtitle">
          Customize your GoalForge experience
        </p>
        <div className="app-divider"></div>
      </header>

      <div className="settings-container">
        {/* Settings Navigation */}
        <div className="settings-sidebar">
          <nav className="settings-nav">
            {settingsItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`settings-nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {location.pathname === '/settings' ? (
            <div className="settings-welcome">
              <h2>Welcome to Settings</h2>
              <p>Select a category from the sidebar to customize your experience.</p>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </>
  );
}
