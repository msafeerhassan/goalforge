import React, { useState, useEffect } from 'react';

export default function Profile() {
  const [userStats, setUserStats] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [preferences, setPreferences] = useState({
    notifications: true,
    darkMode: false,
    autoBackup: true
  });

  useEffect(() => {
    calculateUserStats();
    calculateAchievements();
    loadPreferences();
  }, []);

  const calculateUserStats = () => {
    try {
      const goals = JSON.parse(localStorage.getItem('goals')) || [];
      const habits = JSON.parse(localStorage.getItem('habits')) || [];
      
      const completedGoals = goals.filter(goal => goal.completed).length;
      const totalHabits = habits.length;
      const habitStreak = habits.reduce((max, habit) => Math.max(max, habit.streak || 0), 0);
      
      // Calculate days since first goal
      const firstGoal = goals.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))[0];
      const daysSinceStart = firstGoal ? 
        Math.floor((new Date() - new Date(firstGoal.createdAt)) / (1000 * 60 * 60 * 24)) : 0;

      setUserStats({
        totalGoals: goals.length,
        completedGoals,
        completionRate: goals.length > 0 ? Math.round((completedGoals / goals.length) * 100) : 0,
        totalHabits,
        longestStreak: habitStreak,
        daysSinceStart
      });
    } catch (error) {
      console.error('Error calculating stats:', error);
    }
  };

  const calculateAchievements = () => {
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    const habits = JSON.parse(localStorage.getItem('habits')) || [];
    const achievements = [];

    // Goal-based achievements
    if (goals.length >= 1) achievements.push({ name: "First Goal", icon: "🎯", description: "Created your first goal" });
    if (goals.length >= 10) achievements.push({ name: "Goal Setter", icon: "📋", description: "Created 10 goals" });
    if (goals.filter(g => g.completed).length >= 5) achievements.push({ name: "Achiever", icon: "✅", description: "Completed 5 goals" });
    
    // Habit-based achievements
    if (habits.length >= 1) achievements.push({ name: "Habit Builder", icon: "🔄", description: "Started tracking habits" });
    if (habits.some(h => h.streak >= 7)) achievements.push({ name: "Week Warrior", icon: "🔥", description: "7-day habit streak" });
    if (habits.some(h => h.streak >= 30)) achievements.push({ name: "Monthly Master", icon: "🏆", description: "30-day habit streak" });

    setAchievements(achievements);
  };

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
        userStats,
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

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone!')) {
      localStorage.removeItem('goals');
      localStorage.removeItem('habits');
      localStorage.removeItem('userPreferences');
      setUserStats({});
      setAchievements([]);
      alert('All data cleared successfully!');
      window.location.reload();
    }
  };

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

      {/* User Stats */}
      <div className="profile-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number" style={{ color: 'var(--primary-600)' }}>{userStats.totalGoals || 0}</div>
            <div className="stat-label">Total Goals</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: 'var(--success-600)' }}>{userStats.completedGoals || 0}</div>
            <div className="stat-label">Completed Goals</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: 'var(--warning-600)' }}>{userStats.completionRate || 0}%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: 'var(--info-600)' }}>{userStats.longestStreak || 0}</div>
            <div className="stat-label">Best Streak</div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="achievements-section">
        <h2 className="section-title">🏆 Achievements</h2>
        {achievements.length > 0 ? (
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-card">
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-info">
                  <h3 className="achievement-name">{achievement.name}</h3>
                  <p className="achievement-desc">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Complete goals and build habits to unlock achievements!</p>
          </div>
        )}
      </div>

      {/* Preferences */}
      <div className="preferences-section">
        <h2 className="section-title">⚙️ Preferences</h2>
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
          </div>
          <div className="preference-item">
            <label className="preference-label">
              <input
                type="checkbox"
                checked={preferences.darkMode}
                onChange={(e) => updatePreference('darkMode', e.target.checked)}
              />
              <span>Dark mode (coming soon)</span>
            </label>
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
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="data-management">
        <h2 className="section-title">💾 Data Management</h2>
        <div className="data-stats">
          <div className="data-info">
            <p><strong>Account active for:</strong> {userStats.daysSinceStart || 0} days</p>
            <p><strong>Total habits tracked:</strong> {userStats.totalHabits || 0}</p>
            <p><strong>Data size:</strong> ~{Math.round((JSON.stringify(localStorage).length / 1024) * 100) / 100} KB</p>
          </div>
          <div className="data-actions">
            <button onClick={exportData} className="export-btn">
              📤 Export Data
            </button>
            <button onClick={clearAllData} className="clear-btn">
              🗑️ Clear All Data
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
