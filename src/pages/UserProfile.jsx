import React, { useState, useEffect } from 'react';

export default function Profile() {
  const [myStats, setMyStats] = useState({});
  const [badgeList, setBadgeList] = useState([]);
  const [appPrefs, setAppPrefs] = useState({
    notifications: true,
    darkMode: false,
    autoBackup: true
  });

  useEffect(() => {
    loadStats();
    loadBadges();
    loadSettings();
  }, []);

  const loadStats = () => {
    try {
      const goalsList = JSON.parse(localStorage.getItem('goals')) || [];
      const habitsList = JSON.parse(localStorage.getItem('habits')) || [];
      
      const finishedGoals = goalsList.filter(goal => goal.completed).length;
      const allHabits = habitsList.length;
      const bestStreak = habitsList.reduce((max, habit) => Math.max(max, habit.streak || 0), 0);
      
      const oldestGoal = goalsList.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))[0];
      const daysSinceStart = oldestGoal ? 
        Math.floor((new Date() - new Date(oldestGoal.createdAt)) / (1000 * 60 * 60 * 24)) : 0;

      setMyStats({
        totalGoals: goalsList.length,
        completedGoals: finishedGoals,
        completionRate: goalsList.length > 0 ? Math.round((finishedGoals / goalsList.length) * 100) : 0,
        totalHabits: allHabits,
        longestStreak: bestStreak,
        daysSinceStart
      });
    } catch (error) {
      console.error('Error calculating stats:', error);
    }
  };

  const loadBadges = () => {
    const goalsList = JSON.parse(localStorage.getItem('goals')) || [];
    const habitsList = JSON.parse(localStorage.getItem('habits')) || [];
    const badges = [];
    
    if (goalsList.length >= 1) badges.push({ name: "First Goal", icon: "🎯", description: "Created your first goal" });
    if (goalsList.length >= 10) badges.push({ name: "Goal Setter", icon: "📋", description: "Created 10 goals" });
    if (goalsList.filter(g => g.completed).length >= 5) badges.push({ name: "Achiever", icon: "✅", description: "Completed 5 goals" });
    
    if (habitsList.length >= 1) badges.push({ name: "Habit Builder", icon: "🔄", description: "Started tracking habits" });
    if (habitsList.some(h => h.streak >= 7)) badges.push({ name: "Week Warrior", icon: "🔥", description: "7-day habit streak" });
    if (habitsList.some(h => h.streak >= 30)) badges.push({ name: "Monthly Master", icon: "🏆", description: "30-day habit streak" });

    setBadgeList(badges);
  };

  const loadSettings = () => {
    try {
      const savedPrefs = JSON.parse(localStorage.getItem('userPreferences')) || {};
      setAppPrefs(prev => ({ ...prev, ...savedPrefs }));
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const changePref = (key, value) => {
    const newPrefs = { ...appPrefs, [key]: value };
    setAppPrefs(newPrefs);
    localStorage.setItem('userPreferences', JSON.stringify(newPrefs));
  };

  const downloadData = () => {
    try {
      const goalsList = JSON.parse(localStorage.getItem('goals')) || [];
      const habitsList = JSON.parse(localStorage.getItem('habits')) || [];
      const backupData = {
        goals: goalsList,
        habits: habitsList,
        userStats: myStats,
        preferences: appPrefs,
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

  const wipeAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone!')) {
      localStorage.removeItem('goals');
      localStorage.removeItem('habits');
      localStorage.removeItem('userPreferences');
      setMyStats({});
      setBadgeList([]);
      alert('All data cleared successfully!');
      window.location.reload();
    }
  };

  return (
    <>
      <header className="app-header">
        <h1 className="app-title">
          User <span className="highlight">Profile</span>
        </h1>
        <p className="app-subtitle">
          Your progress, achievements, and settings
        </p>
        <div className="app-divider"></div>
      </header>

      <div className="profile-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number" style={{ color: 'var(--primary-600)' }}>{myStats.totalGoals || 0}</div>
            <div className="stat-label">Total Goals</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: 'var(--success-600)' }}>{myStats.completedGoals || 0}</div>
            <div className="stat-label">Completed Goals</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: 'var(--warning-600)' }}>{myStats.completionRate || 0}%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: 'var(--info-600)' }}>{myStats.longestStreak || 0}</div>
            <div className="stat-label">Best Streak</div>
          </div>
        </div>
      </div>

      <div className="achievements-section">
        <h2 className="section-title">🏆 Achievements</h2>
        {badgeList.length > 0 ? (
          <div className="achievements-grid">
            {badgeList.map((badge, index) => (
              <div key={index} className="achievement-card">
                <div className="achievement-icon">{badge.icon}</div>
                <div className="achievement-info">
                  <h3 className="achievement-name">{badge.name}</h3>
                  <p className="achievement-desc">{badge.description}</p>
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

      <div className="preferences-section">
        <h2 className="section-title">⚙️ Preferences</h2>
        <div className="preferences-grid">
          <div className="preference-item">
            <label className="preference-label">
              <input
                type="checkbox"
                checked={appPrefs.notifications}
                onChange={(e) => changePref('notifications', e.target.checked)}
              />
              <span>Enable notifications</span>
            </label>
          </div>
          <div className="preference-item">
            <label className="preference-label">
              <input
                type="checkbox"
                checked={appPrefs.darkMode}
                onChange={(e) => changePref('darkMode', e.target.checked)}
              />
              <span>Dark mode (coming soon)</span>
            </label>
          </div>
          <div className="preference-item">
            <label className="preference-label">
              <input
                type="checkbox"
                checked={appPrefs.autoBackup}
                onChange={(e) => changePref('autoBackup', e.target.checked)}
              />
              <span>Auto backup data</span>
            </label>
          </div>
        </div>
      </div>

      <div className="data-management">
        <h2 className="section-title">💾 Data Management</h2>
        <div className="data-stats">
          <div className="data-info">
            <p><strong>Account active for:</strong> {myStats.daysSinceStart || 0} days</p>
            <p><strong>Total habits tracked:</strong> {myStats.totalHabits || 0}</p>
            <p><strong>Data size:</strong> ~{Math.round((JSON.stringify(localStorage).length / 1024) * 100) / 100} KB</p>
          </div>
          <div className="data-actions">
            <button onClick={downloadData} className="export-btn">
              📤 Export Data
            </button>
            <button onClick={wipeAllData} className="clear-btn">
              🗑️ Clear All Data
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
