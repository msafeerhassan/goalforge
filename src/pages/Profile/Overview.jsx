import React, { useState, useEffect } from 'react';

export default function ProfileOverview() {
  const [userStats, setUserStats] = useState({});

  useEffect(() => {
    calculateUserStats();
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

  return (
    <div className="profile-section">
      <h2>Profile Overview</h2>
      
      {/* User Stats */}
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

      {/* Account Info */}
      <div className="account-info">
        <h3>Account Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Account active for:</span>
            <span className="info-value">{userStats.daysSinceStart || 0} days</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total habits tracked:</span>
            <span className="info-value">{userStats.totalHabits || 0}</span>
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
              {userStats.daysSinceStart > 0 ? 
                new Date(Date.now() - userStats.daysSinceStart * 24 * 60 * 60 * 1000).toLocaleDateString() : 
                'Today'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
