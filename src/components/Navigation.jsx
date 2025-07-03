import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/goals', label: 'Goals', icon: '🎯' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
    { path: '/habits', label: 'Habits', icon: '🔄' },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/" className="brand-link">
          Goal<span className="highlight">Forge</span>
        </Link>
      </div>
      <div className="nav-links">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}