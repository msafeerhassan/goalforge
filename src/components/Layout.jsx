import React from 'react';
import Navigation from './Navigation';

export default function Layout({ children }) {
  return (
    <div className="app-container">
      <Navigation />
      <div className="main-container animate-fadeInUp">
        {children}
      </div>
      <footer className="app-footer">
        Built with ❤️ by Safeer Hassan
      </footer>
    </div>
  );
}
