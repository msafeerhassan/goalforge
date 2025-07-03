import React, { useState, useEffect } from 'react';

export default function ProfileAchievements() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    calculateAchievements();
  }, []);

  const calculateAchievements = () => {
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    const habits = JSON.parse(localStorage.getItem('habits')) || [];
    const achievements = [];

    // Goal-based achievements
    if (goals.length >= 1) achievements.push({ 
      name: "First Goal", 
      icon: "🎯", 
      description: "Created your first goal",
      unlocked: true,
      date: goals[0]?.createdAt
    });
    
    if (goals.length >= 5) achievements.push({ 
      name: "Goal Setter", 
      icon: "📋", 
      description: "Created 5 goals",
      unlocked: true
    });
    
    if (goals.length >= 10) achievements.push({ 
      name: "Goal Master", 
      icon: "🎖️", 
      description: "Created 10 goals",
      unlocked: goals.length >= 10
    });
    
    if (goals.filter(g => g.completed).length >= 1) achievements.push({ 
      name: "First Victory", 
      icon: "✅", 
      description: "Completed your first goal",
      unlocked: true
    });
    
    if (goals.filter(g => g.completed).length >= 5) achievements.push({ 
      name: "Achiever", 
      icon: "🏅", 
      description: "Completed 5 goals",
      unlocked: goals.filter(g => g.completed).length >= 5
    });
    
    // Habit-based achievements
    if (habits.length >= 1) achievements.push({ 
      name: "Habit Builder", 
      icon: "🔄", 
      description: "Started tracking habits",
      unlocked: habits.length >= 1
    });
    
    if (habits.some(h => h.streak >= 3)) achievements.push({ 
      name: "Consistent", 
      icon: "💪", 
      description: "3-day habit streak",
      unlocked: habits.some(h => h.streak >= 3)
    });
    
    if (habits.some(h => h.streak >= 7)) achievements.push({ 
      name: "Week Warrior", 
      icon: "🔥", 
      description: "7-day habit streak",
      unlocked: habits.some(h => h.streak >= 7)
    });
    
    if (habits.some(h => h.streak >= 30)) achievements.push({ 
      name: "Monthly Master", 
      icon: "🏆", 
      description: "30-day habit streak",
      unlocked: habits.some(h => h.streak >= 30)
    });

    // Special achievements
    const totalCompleted = goals.filter(g => g.completed).length;
    const totalGoals = goals.length;
    if (totalGoals >= 5 && (totalCompleted / totalGoals) >= 0.8) {
      achievements.push({
        name: "Perfectionist",
        icon: "⭐",
        description: "80% goal completion rate",
        unlocked: true
      });
    }

    setAchievements(achievements);
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <div className="profile-section">
      <h2>Achievements</h2>
      <p>Track your progress and unlock new achievements!</p>
      
      <div className="achievement-stats">
        <div className="achievement-summary">
          <span className="achievement-count">{unlockedAchievements.length}</span>
          <span className="achievement-total">/ {achievements.length}</span>
          <span className="achievement-label">Unlocked</span>
        </div>
      </div>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div className="achievements-group">
          <h3>🏆 Unlocked Achievements</h3>
          <div className="achievements-grid">
            {unlockedAchievements.map((achievement, index) => (
              <div key={index} className="achievement-card unlocked">
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-info">
                  <h4 className="achievement-name">{achievement.name}</h4>
                  <p className="achievement-desc">{achievement.description}</p>
                  {achievement.date && (
                    <p className="achievement-date">
                      Unlocked: {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div className="achievements-group">
          <h3>🔒 Locked Achievements</h3>
          <div className="achievements-grid">
            {lockedAchievements.map((achievement, index) => (
              <div key={index} className="achievement-card locked">
                <div className="achievement-icon">🔒</div>
                <div className="achievement-info">
                  <h4 className="achievement-name">{achievement.name}</h4>
                  <p className="achievement-desc">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {achievements.length === 0 && (
        <div className="empty-state">
          <h3>No achievements yet</h3>
          <p>Start creating goals and building habits to unlock achievements!</p>
        </div>
      )}
    </div>
  );
}
