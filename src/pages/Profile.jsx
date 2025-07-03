import React, { useState, useEffect } from 'react';

export default function Analytics() {
  const [myGoals, setMyGoals] = useState([]);
  const [quoteList, setQuoteList] = useState([]);
  const [todayQuote, setTodayQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    try {
      const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
      setMyGoals(savedGoals);
    } catch (error) {
      console.error('Error loading goals:', error);
    }

    const loadQuotes = async () => {
      try {
        setIsLoading(true);
        
        const motivationalQuotes = [
          {
            id: 1,
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
          },
          {
            id: 2,
            text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            author: "Winston Churchill"
          },
          {
            id: 3,
            text: "The future belongs to those who believe in the beauty of their dreams.",
            author: "Eleanor Roosevelt"
          },
          {
            id: 4,
            text: "It is during our darkest moments that we must focus to see the light.",
            author: "Aristotle"
          },
          {
            id: 5,
            text: "Success is walking from failure to failure with no loss of enthusiasm.",
            author: "Winston Churchill"
          },
          {
            id: 6,
            text: "The way to get started is to quit talking and begin doing.",
            author: "Walt Disney"
          },
          {
            id: 7,
            text: "Don't be afraid to give up the good to go for the great.",
            author: "John D. Rockefeller"
          },
          {
            id: 8,
            text: "Innovation distinguishes between a leader and a follower.",
            author: "Steve Jobs"
          },
          {
            id: 9,
            text: "The only impossible journey is the one you never begin.",
            author: "Tony Robbins"
          },
          {
            id: 10,
            text: "Your time is limited, don't waste it living someone else's life.",
            author: "Steve Jobs"
          }
        ];
        
        setQuoteList(motivationalQuotes);
        setTodayQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuotes();
  }, []);

  const getRandomQuote = () => {
    if (quoteList.length > 0) {
      const randomIndex = Math.floor(Math.random() * quoteList.length);
      setTodayQuote(quoteList[randomIndex]);
    }
  };

  const allGoals = myGoals.length;
  const doneGoals = myGoals.filter(goal => goal.completed).length;
  const activeGoals = allGoals - doneGoals;
  const successRate = allGoals > 0 ? Math.round((doneGoals / allGoals) * 100) : 0;
  
  const calculateStreak = () => {
    if (myGoals.length === 0) return 0;
    
    const sortedGoals = myGoals
      .filter(goal => goal.createdAt || goal.completedAt)
      .sort((a, b) => new Date(b.createdAt || b.completedAt) - new Date(a.createdAt || a.completedAt));
    
    if (sortedGoals.length === 0) return 0;
    
    let streak = 1;
    const today = new Date();
    const lastActivityDate = new Date(sortedGoals[0].createdAt || sortedGoals[0].completedAt);
    
    const daysDiff = Math.floor((today - lastActivityDate) / (1000 * 60 * 60 * 24));
    return daysDiff <= 1 ? Math.min(streak + Math.floor(allGoals / 3), 30) : 0;
  };

  const streakDays = calculateStreak();

  const categoryData = myGoals.reduce((acc, goal) => {
    const category = goal.text.toLowerCase().includes('exercise') || goal.text.toLowerCase().includes('workout') ? 'Fitness' :
                    goal.text.toLowerCase().includes('read') || goal.text.toLowerCase().includes('learn') ? 'Learning' :
                    goal.text.toLowerCase().includes('work') || goal.text.toLowerCase().includes('career') ? 'Career' :
                    'Other';
    
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  return (
    <>
      <header className="app-header">
        <h1 className="app-title">
          Goal <span className="highlight">Analytics</span>
        </h1>
        <p className="app-subtitle">
          Track your progress and stay motivated
        </p>
        <div className="app-divider"></div>
      </header>

      <div className="stats-grid animate-slideInLeft">
        <div className="stat-card">
          <div className="stat-number" style={{ color: 'var(--primary-600)' }}>{allGoals}</div>
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
          <div className="stat-number" style={{ color: 'var(--info-600)' }}>{successRate}%</div>
          <div className="stat-label">Success Rate</div>
        </div>
      </div>

      <div className="analytics-container">
        <div className="streak-card">
          <div className="streak-content">
            <div className="streak-icon">🔥</div>
            <div className="streak-info">
              <h3>Current Streak</h3>
              <div className="streak-number">{streakDays} days</div>
              <p>Keep the momentum going!</p>
            </div>
          </div>
        </div>

        <div className="motivation-card">
          <h3>Daily Motivation</h3>
          {todayQuote && (
            <div className="quote-container">
              <p className="quote-text">"{todayQuote.text}"</p>
              <p className="quote-author">- {todayQuote.author}</p>
            </div>
          )}
          <button onClick={getRandomQuote} className="new-quote-btn">
            New Quote
          </button>
        </div>
      </div>

      {Object.keys(categoryData).length > 0 && (
        <div className="category-analysis">
          <h2 className="section-title">Goals by Category</h2>
          <div className="category-grid">
            {Object.entries(categoryData).map(([category, count]) => (
              <div key={category} className="category-card">
                <div className="category-icon">
                  {category === 'Fitness' ? '💪' : 
                   category === 'Learning' ? '📚' : 
                   category === 'Career' ? '💼' : '🎯'}
                </div>
                <div className="category-info">
                  <h4>{category}</h4>
                  <p>{count} goal{count !== 1 ? 's' : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="recent-activity">
        <h2 className="section-title">Recent Activity</h2>
        {myGoals.length > 0 ? (
          <div className="activity-timeline">
            {myGoals.slice(-5).reverse().map((goal, index) => (
              <div key={goal.id} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <p className="activity-text">
                    {goal.completed ? '✅ Completed' : '🎯 Created'}: "{goal.text}"
                  </p>
                  <p className="activity-time">
                    {new Date(goal.completedAt || goal.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No activity yet. Start by creating your first goal!</p>
          </div>
        )}
      </div>
    </>
  );
}
