import React, { useState, useEffect } from 'react';

export default function ProfileSettings() {
  const [userPrefs, setUserPrefs] = useState({
    notifications: true,
    darkMode: false,
    autoBackup: true,
    showCompletedGoals: true,
    dailyReminders: true
  });

  useEffect(() => {
    loadUserPrefs();
  }, []);

  const loadUserPrefs = () => {
    try {
      const savedPrefs = JSON.parse(localStorage.getItem('userPreferences')) || {};
      setUserPrefs(prev => ({ ...prev, ...savedPrefs }));
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const changePref = (key, value) => {
    const newPrefs = { ...userPrefs, [key]: value };
    setUserPrefs(newPrefs);
    localStorage.setItem('userPreferences', JSON.stringify(newPrefs));
  };

  const downloadData = () => {
    try {
      const goalsList = JSON.parse(localStorage.getItem('goals')) || [];
      const habitsList = JSON.parse(localStorage.getItem('habits')) || [];
      const backupData = {
        goals: goalsList,
        habits: habitsList,
        preferences: userPrefs,
        exportDate: new Date().toISOString(),
        version: '1.0'
      };
      
      const fileBlob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const downloadUrl = URL.createObjectURL(fileBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadUrl;
      downloadLink.download = `goalforge-backup-${new Date().toISOString().split('T')[0]}.json`;
      downloadLink.click();
      URL.revokeObjectURL(downloadUrl);
      
      alert('Data exported successfully!');
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Error exporting data. Please try again.');
    }
  };

  const uploadData = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        
        if (importedData.goals) localStorage.setItem('goals', JSON.stringify(importedData.goals));
        if (importedData.habits) localStorage.setItem('habits', JSON.stringify(importedData.habits));
        if (importedData.preferences) localStorage.setItem('userPreferences', JSON.stringify(importedData.preferences));
        
        alert('Data imported successfully! Please refresh the page.');
      } catch (error) {
        alert('Invalid file format. Please select a valid GoalForge backup file.');
      }
    };
    fileReader.readAsText(selectedFile);
  };

  const wipeAllData = () => {
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

      <div className="settings-group">
        <h3>Preferences</h3>
        <div className="preferences-grid">
          <div className="preference-item">
            <label className="preference-label">
              <input
                type="checkbox"
                checked={userPrefs.notifications}
                onChange={(e) => changePref('notifications', e.target.checked)}
              />
              <span>Enable notifications</span>
            </label>
            <p className="preference-help">Get notified about goal deadlines and habit reminders</p>
          </div>
          
          <div className="preference-item">
            <label className="preference-label">
              <input
                type="checkbox"
                checked={userPrefs.showCompletedGoals}
                onChange={(e) => changePref('showCompletedGoals', e.target.checked)}
              />
              <span>Show completed goals</span>
            </label>
            <p className="preference-help">Display completed goals in the main goals list</p>
          </div>
          
          <div className="preference-item">
            <label className="preference-label">
              <input
                type="checkbox"
                checked={userPrefs.dailyReminders}
                onChange={(e) => changePref('dailyReminders', e.target.checked)}
              />
              <span>Daily reminders</span>
            </label>
            <p className="preference-help">Get daily reminders to check your goals and habits</p>
          </div>
          
          <div className="preference-item">
            <label className="preference-label">
              <input
                type="checkbox"
                checked={userPrefs.autoBackup}
                onChange={(e) => changePref('autoBackup', e.target.checked)}
              />
              <span>Auto backup data</span>
            </label>
            <p className="preference-help">Automatically backup your data to browser storage</p>
          </div>
          
          <div className="preference-item">
            <label className="preference-label">
              <input
                type="checkbox"
                checked={userPrefs.darkMode}
                onChange={(e) => changePref('darkMode', e.target.checked)}
                disabled
              />
              <span>Dark mode (coming soon)</span>
            </label>
            <p className="preference-help">Switch to dark theme for better night viewing</p>
          </div>
        </div>
      </div>

      <div className="settings-group">
        <h3>Data Management</h3>
        <div className="data-actions">
          <button onClick={downloadData} className="action-btn export-btn">
            📤 Export Data
          </button>
          
          <label className="action-btn import-btn">
            📥 Import Data
            <input
              type="file"
              accept=".json"
              onChange={uploadData}
              style={{ display: 'none' }}
            />
          </label>
          
          <button onClick={wipeAllData} className="action-btn clear-btn">
            🗑️ Clear All Data
          </button>
        </div>
        
        <div className="data-info">
          <p><strong>Goals:</strong> {JSON.parse(localStorage.getItem('goals') || '[]').length}</p>
          <p><strong>Habits:</strong> {JSON.parse(localStorage.getItem('habits') || '[]').length}</p>
          <p><strong>Storage used:</strong> ~{Math.round((JSON.stringify(localStorage).length / 1024) * 100) / 100} KB</p>
        </div>
      </div>

      <div className="settings-group">
        <h3>App Information</h3>
        <div className="app-info">
          <p><strong>Version:</strong> 1.0.0</p>
          <p><strong>Last updated:</strong> July 2025</p>
          <p><strong>Developer:</strong> Safeer Hassan</p>
        </div>
      </div>
    </div>
  );
}
