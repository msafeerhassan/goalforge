import React, { useState, useEffect } from 'react';

export default function ProfileSettings() {
  const [preferences, setPreferences] = useState({
    notifications: true,
    darkMode: false,
    autoBackup: true,
    showCompletedGoals: true,
    dailyReminders: true
  });

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('userPreferences')) || {};
      setPreferences(prev => ({ ...prev, ...saved }));
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const updatePreference = (key, value) => {
    const newPrefs = { ...preferences, [key]: value };
    setPreferences(newPrefs);
    localStorage.setItem('userPreferences', JSON.stringify(newPrefs));
  };

  const exportData = () => {
    try {
      const goals = JSON.parse(localStorage.getItem('goals')) || [];
      const habits = JSON.parse(localStorage.getItem('habits')) || [];
      const exportData = {
        goals,
        habits,
        preferences,
        exportDate: new Date().toISOString(),
        version: '1.0'
      };
      
      const dataBlob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `goalforge-backup-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      alert('Data exported successfully!');
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Error exporting data. Please try again.');
    }
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        if (data.goals) localStorage.setItem('goals', JSON.stringify(data.goals));
        if (data.habits) localStorage.setItem('habits', JSON.stringify(data.habits));
        if (data.preferences) localStorage.setItem('userPreferences', JSON.stringify(data.preferences));
        
        alert('Data imported successfully! Please refresh the page.');
      } catch (error) {
        alert('Invalid file format. Please select a valid GoalForge backup file.');
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone!')) {
      localStorage.removeItem('goals');
      localStorage.removeItem('habits');
      localStorage.removeItem('userPreferences');
      alert('All data cleared successfully!');
      window.location.reload();
    }
  };

  return (
    <div className="profile-section">
      <h2>Settings</h2>
      <p>Manage your preferences and data</p>

      {/* Preferences */}
      <div className="settings-group">
        <h3>Preferences</h3>
        <div className="preferences-grid">
          <div className="preference-item">
            <label className="preference-label">
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={(e) => updatePreference('notifications', e.target.checked)}
              />
              <span>Enable notifications</span>
            </label>
            <p className="preference-help">Get notified about goal deadlines and habit reminders</p>
          </div>
          
          <div className="preference-item">
            <label className="preference-label">
              <input
                type="checkbox"
                checked={preferences.showCompletedGoals}
                onChange={(e) => updatePreference('showCompletedGoals', e.target.checked)}
              />
              <span>Show completed goals</span>
            </label>
            <p className="preference-help">Display completed goals in the main goals list</p>
          </div>
          
          <div className="preference-item">
            <label className="preference-label">
              <input
                type="checkbox"
                checked={preferences.dailyReminders}
                onChange={(e) => updatePreference('dailyReminders', e.target.checked)}
              />
              <span>Daily reminders</span>
            </label>
            <p className="preference-help">Get daily reminders to check your goals and habits</p>
          </div>
          
          <div className="preference-item">
            <label className="preference-label">
              <input
                type="checkbox"
                checked={preferences.autoBackup}
                onChange={(e) => updatePreference('autoBackup', e.target.checked)}
              />
              <span>Auto backup data</span>
            </label>
            <p className="preference-help">Automatically backup your data to browser storage</p>
          </div>
          
          <div className="preference-item">
            <label className="preference-label">
              <input
                type="checkbox"
                checked={preferences.darkMode}
                onChange={(e) => updatePreference('darkMode', e.target.checked)}
                disabled
              />
              <span>Dark mode (coming soon)</span>
            </label>
            <p className="preference-help">Switch to dark theme for better night viewing</p>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="settings-group">
        <h3>Data Management</h3>
        <div className="data-actions">
          <button onClick={exportData} className="action-btn export-btn">
            📤 Export Data
          </button>
          
          <label className="action-btn import-btn">
            📥 Import Data
            <input
              type="file"
              accept=".json"
              onChange={importData}
              style={{ display: 'none' }}
            />
          </label>
          
          <button onClick={clearAllData} className="action-btn clear-btn">
            🗑️ Clear All Data
          </button>
        </div>
        
        <div className="data-info">
          <p><strong>Goals:</strong> {JSON.parse(localStorage.getItem('goals') || '[]').length}</p>
          <p><strong>Habits:</strong> {JSON.parse(localStorage.getItem('habits') || '[]').length}</p>
          <p><strong>Storage used:</strong> ~{Math.round((JSON.stringify(localStorage).length / 1024) * 100) / 100} KB</p>
        </div>
      </div>

      {/* App Information */}
      <div className="settings-group">
        <h3>App Information</h3>
        <div className="app-info">
          <p><strong>Version:</strong> 1.0.0</p>
          <p><strong>Last updated:</strong> July 2025</p>
          <p><strong>Developer:</strong> GoalForge Team</p>
        </div>
      </div>
    </div>
  );
}
