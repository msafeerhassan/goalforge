import React, { useState, useEffect } from 'react';

export default function ProfileAchievements() {
  const [badgeList, setBadgeList] = useState([]);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = () => {
    const goalsList = JSON.parse(localStorage.getItem('goals')) || [];
    const habitsList = JSON.parse(localStorage.getItem('habits')) || [];
    const badges = [];

    if (goalsList.length >= 1) badges.push({ 
      name: "First Goal", 
      icon: "🎯", 
      description: "Created your first goal",
      unlocked: true,
      date: goalsList[0]?.createdAt
    });
    
    if (goalsList.length >= 5) badges.push({ 
      name: "Goal Setter", 
      icon: "📋", 
      description: "Created 5 goals",
      unlocked: true
    });
    
    if (goalsList.length >= 10) badges.push({ 
      name: "Goal Master", 
      icon: "🎖️", 
      description: "Created 10 goals",
      unlocked: goalsList.length >= 10
    });
    
    if (goalsList.filter(g => g.completed).length >= 1) badges.push({ 
      name: "First Victory", 
      icon: "✅", 
      description: "Completed your first goal",
      unlocked: true
    });
    
    if (goalsList.filter(g => g.completed).length >= 5) badges.push({ 
      name: "Achiever", 
      icon: "🏅", 
      description: "Completed 5 goals",
      unlocked: goalsList.filter(g => g.completed).length >= 5
    });
    
    if (habitsList.length >= 1) badges.push({ 
      name: "Habit Builder", 
      icon: "🔄", 
      description: "Started tracking habits",
      unlocked: habitsList.length >= 1
    });
    
    if (habitsList.some(h => h.streak >= 3)) badges.push({ 
      name: "Consistent", 
      icon: "💪", 
      description: "3-day habit streak",
      unlocked: habitsList.some(h => h.streak >= 3)
    });
    
    if (habitsList.some(h => h.streak >= 7)) badges.push({ 
      name: "Week Warrior", 
      icon: "🔥", 
      description: "7-day habit streak",
      unlocked: habitsList.some(h => h.streak >= 7)
    });
    
    if (habitsList.some(h => h.streak >= 30)) badges.push({ 
      name: "Monthly Master", 
      icon: "🏆", 
      description: "30-day habit streak",
      unlocked: habitsList.some(h => h.streak >= 30)
    });

    const finishedGoals = goalsList.filter(g => g.completed).length;
    const allGoals = goalsList.length;
    if (allGoals >= 5 && (finishedGoals / allGoals) >= 0.8) {
      badges.push({
        name: "Perfectionist",
        icon: "⭐",
        description: "80% goal completion rate",
        unlocked: true
      });
    }

    setBadgeList(badges);
  };

  const unlockedBadges = badgeList.filter(a => a.unlocked);
  const lockedBadges = badgeList.filter(a => !a.unlocked);

  return (
    <div className="profile-section">
      <h2>Achievements</h2>
      <p>Track your progress and unlock new achievements!</p>
      
      <div className="achievement-stats">
        <div className="achievement-summary">
          <span className="achievement-count">{unlockedBadges.length}</span>
          <span className="achievement-total">/ {badgeList.length}</span>
          <span className="achievement-label">Unlocked</span>
        </div>
      </div>

      {unlockedBadges.length > 0 && (
        <div className="achievements-group">
          <h3>🏆 Unlocked Achievements</h3>
          <div className="achievements-grid">
            {unlockedBadges.map((badge, index) => (
              <div key={index} className="achievement-card unlocked">
                <div className="achievement-icon">{badge.icon}</div>
                <div className="achievement-info">
                  <h4 className="achievement-name">{badge.name}</h4>
                  <p className="achievement-desc">{badge.description}</p>
                  {badge.date && (
                    <p className="achievement-date">
                      Unlocked: {new Date(badge.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {lockedBadges.length > 0 && (
        <div className="achievements-group">
          <h3>🔒 Locked Achievements</h3>
          <div className="achievements-grid">
            {lockedBadges.map((badge, index) => (
              <div key={index} className="achievement-card locked">
                <div className="achievement-icon">🔒</div>
                <div className="achievement-info">
                  <h4 className="achievement-name">{badge.name}</h4>
                  <p className="achievement-desc">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {badgeList.length === 0 && (
        <div className="empty-state">
          <h3>No achievements yet</h3>
          <p>Start creating goals and building habits to unlock achievements!</p>
        </div>
      )}
    </div>
  );
}
