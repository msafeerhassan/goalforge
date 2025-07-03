import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [goalsList, setGoalsList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
      setGoalsList(savedGoals);
    } catch (error) {
      console.error('Error loading goals:', error);
      setGoalsList([]);
    }
    setLoaded(true);
  }, []);

  const doneGoals = goalsList.filter(goal => goal.completed).length;
  const activeGoals = goalsList.length - doneGoals;
  const latestGoals = goalsList.slice(-3).reverse();

  const calculateSuccessRate = () => {
    if (goalsList.length === 0) return 0;
    return Math.round((doneGoals / goalsList.length) * 100);
  };

  return (
    <>
      <header className="app-header">
        <h1 className="app-title">
          Welcome to Goal<span className="highlight">Forge</span>
        </h1>
        <p className="app-subtitle">
          Your personal goal tracking dashboard
        </p>
        <div className="app-divider"></div>
      </header>

      <div className="stats-grid animate-slideInLeft">
        <div className="stat-card">
          <div className="stat-number" style={{ color: 'var(--primary-600)' }}>{goalsList.length}</div>
          <div className="stat-label">Total Goals</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: 'var(--success-600)' }}>{doneGoals}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: 'var(--warning-600)' }}>{activeGoals}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: 'var(--info-600)' }}>
            {calculateSuccessRate()}%
          </div>
          <div className="stat-label">Success Rate</div>
        </div>
      </div>

      <div className="goals-container animate-scaleIn">
        <div className="goals-header">
          <h2 className="goals-title">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Recent Goals
          </h2>
        </div>
        
        {latestGoals.length > 0 ? (
          <div className="recent-goals">
            {latestGoals.map((goal) => (
              <div key={goal.id} className={`goal-item ${goal.completed ? 'completed' : ''}`}>
                <div className="goal-status">
                  {goal.completed ? '✅' : '🎯'}
                </div>
                <div className="goal-content">
                  <span className="goal-text">{goal.text}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="empty-title">No goals yet</h3>
            <p className="empty-description">
              Start your journey by visiting the Goals page to add your first goal.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
