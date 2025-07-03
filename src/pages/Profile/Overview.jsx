import React, { useState, useEffect } from 'react';

export default function ProfileOverview() {
  const [myStats, setMyStats] = useState({});

  useEffect(() => {
    loadStats();
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

  return (
    <div className="profile-section">
      <h2>Profile Overview</h2>
      
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

      <div className="account-info">
        <h3>Account Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Account active for:</span>
            <span className="info-value">{myStats.daysSinceStart || 0} days</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total habits tracked:</span>
            <span className="info-value">{myStats.totalHabits || 0}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Data storage used:</span>
            <span className="info-value">
              ~{Math.round((JSON.stringify(localStorage).length / 1024) * 100) / 100} KB
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Member since:</span>
            <span className="info-value">
              {myStats.daysSinceStart > 0 ? 
                new Date(Date.now() - myStats.daysSinceStart * 24 * 60 * 60 * 1000).toLocaleDateString() : 
                'Today'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
