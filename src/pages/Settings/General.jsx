import React, { useState, useEffect } from 'react';

export default function General() {
  const [settings, setSettings] = useState({
    theme: 'light',
    autoSave: true,
    showCompletedGoals: true,
    goalReminders: true,
    defaultGoalCategory: 'general',
    maxGoalsPerDay: 5
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = JSON.parse(localStorage.getItem('appSettings')) || {};
      setSettings(prev => ({ ...prev, ...savedSettings }));
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }, []);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    // Save to localStorage immediately
    try {
      localStorage.setItem('appSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const resetToDefaults = () => {
    if (window.confirm('Reset all settings to default values?')) {
      const defaultSettings = {
        theme: 'light',
        autoSave: true,
        showCompletedGoals: true,
        goalReminders: true,
        defaultGoalCategory: 'general',
        maxGoalsPerDay: 5
      };
      setSettings(defaultSettings);
      localStorage.setItem('appSettings', JSON.stringify(defaultSettings));
      alert('Settings reset to defaults!');
    }
  };

  const exportData = () => {
    try {
      const goals = JSON.parse(localStorage.getItem('goals')) || [];
      const habits = JSON.parse(localStorage.getItem('habits')) || [];
      const exportData = {
        goals,
        habits,
        settings,
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
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Error exporting data. Please try again.');
    }
  };

  return (
    <div className="settings-section">
      <h2>General Settings</h2>
      <p>Configure your GoalForge experience</p>

      <div className="settings-form">
        <div className="form-group">
          <label htmlFor="theme">App Theme</label>
          <select 
            id="theme" 
            value={settings.theme} 
            onChange={(e) => handleSettingChange('theme', e.target.value)}
            className="form-select"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto (System)</option>
          </select>
          <p className="form-help">Choose your preferred color scheme</p>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.autoSave}
              onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
            />
            <span>Auto-save goals and habits</span>
          </label>
          <p className="form-help">Automatically save changes as you make them</p>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.showCompletedGoals}
              onChange={(e) => handleSettingChange('showCompletedGoals', e.target.checked)}
            />
            <span>Show completed goals in main list</span>
          </label>
          <p className="form-help">Keep completed goals visible in the main goals view</p>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.goalReminders}
              onChange={(e) => handleSettingChange('goalReminders', e.target.checked)}
            />
            <span>Enable goal reminders</span>
          </label>
          <p className="form-help">Get reminders to work on your goals</p>
        </div>

        <div className="form-group">
          <label htmlFor="defaultCategory">Default Goal Category</label>
          <select 
            id="defaultCategory" 
            value={settings.defaultGoalCategory} 
            onChange={(e) => handleSettingChange('defaultGoalCategory', e.target.value)}
            className="form-select"
          >
            <option value="general">General</option>
            <option value="fitness">Fitness & Health</option>
            <option value="learning">Learning & Growth</option>
            <option value="career">Career & Work</option>
            <option value="personal">Personal Development</option>
          </select>
          <p className="form-help">Default category for new goals</p>
        </div>

        <div className="form-group">
          <label htmlFor="maxGoals">Maximum Goals per Day</label>
          <select 
            id="maxGoals" 
            value={settings.maxGoalsPerDay} 
            onChange={(e) => handleSettingChange('maxGoalsPerDay', parseInt(e.target.value))}
            className="form-select"
          >
            <option value={3}>3 goals</option>
            <option value={5}>5 goals</option>
            <option value={7}>7 goals</option>
            <option value={10}>10 goals</option>
            <option value={999}>Unlimited</option>
          </select>
          <p className="form-help">Limit daily goals to maintain focus</p>
        </div>

        <div className="form-actions">
          <button onClick={exportData} className="export-button">
            📥 Export Data
          </button>
          <button onClick={resetToDefaults} className="reset-button">
            🔄 Reset to Defaults
          </button>
        </div>
      </div>

      <div className="settings-info">
        <h3>Current Status</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Goals stored:</span>
            <span className="info-value">{JSON.parse(localStorage.getItem('goals') || '[]').length}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Habits tracked:</span>
            <span className="info-value">{JSON.parse(localStorage.getItem('habits') || '[]').length}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Data size:</span>
            <span className="info-value">
              {Math.round((JSON.stringify(localStorage).length / 1024) * 100) / 100} KB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
