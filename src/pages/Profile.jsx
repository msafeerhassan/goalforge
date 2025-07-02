import React, { useState, useEffect } from 'react';

export default function Analytics() {
  const [goals, setGoals] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load goals from localStorage
    try {
      const storedGoals = JSON.parse(localStorage.getItem('goals')) || [];
      setGoals(storedGoals);
    } catch (error) {
      console.error('Error loading goals:', error);
    }

    // Fetch motivational quotes from API
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
        if (!response.ok) throw new Error('Failed to fetch quotes');
        const data = await response.json();
        
        // Transform posts into motivational format
        const transformedQuotes = data.map(post => ({
          id: post.id,
          text: post.title.charAt(0).toUpperCase() + post.title.slice(1),
          author: `User ${post.userId}`
        }));
        
        setQuotes(transformedQuotes);
        setCurrentQuote(transformedQuotes[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const getRandomQuote = () => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }
  };

  // Calculate analytics
  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.completed).length;
  const inProgressGoals = totalGoals - completedGoals;
  const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
  
  // Calculate streak (consecutive days with goal activity)
  const calculateStreak = () => {
    if (goals.length === 0) return 0;
    
    const sortedGoals = goals
      .filter(goal => goal.createdAt || goal.completedAt)
      .sort((a, b) => new Date(b.createdAt || b.completedAt) - new Date(a.createdAt || a.completedAt));
    
    if (sortedGoals.length === 0) return 0;
    
    let streak = 1;
    const today = new Date();
    const lastActivityDate = new Date(sortedGoals[0].createdAt || sortedGoals[0].completedAt);
    
    // Simple streak calculation (can be enhanced)
    const daysDiff = Math.floor((today - lastActivityDate) / (1000 * 60 * 60 * 24));
    return daysDiff <= 1 ? Math.min(streak + Math.floor(totalGoals / 3), 30) : 0;
  };

  const currentStreak = calculateStreak();

  // Goals by category analysis
  const categoryAnalysis = goals.reduce((acc, goal) => {
    const category = goal.text.toLowerCase().includes('exercise') || goal.text.toLowerCase().includes('workout') ? 'Fitness' :
                    goal.text.toLowerCase().includes('read') || goal.text.toLowerCase().includes('learn') ? 'Learning' :
                    goal.text.toLowerCase().includes('work') || goal.text.toLowerCase().includes('career') ? 'Career' :
                    'Other';
    
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  return (
    <>
      {/* Header Section */}
      <header className="app-header">
        <h1 className="app-title">
          Goal <span className="highlight">Analytics</span>
        </h1>
        <p className="app-subtitle">
          Track your progress and stay motivated
        </p>
        <div className="app-divider"></div>
      </header>

      {/* Main Stats Grid */}
      <div className="stats-grid animate-slideInLeft">
        <div className="stat-card">
          <div className="stat-number" style={{ color: 'var(--primary-600)' }}>{totalGoals}</div>
          <div className="stat-label">Total Goals</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: 'var(--success-600)' }}>{completedGoals}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: 'var(--warning-600)' }}>{inProgressGoals}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: 'var(--info-600)' }}>{completionRate}%</div>
          <div className="stat-label">Success Rate</div>
        </div>
      </div>

      {/* Streak and Motivation Section */}
      <div className="analytics-container">
        <div className="streak-card">
          <div className="streak-content">
            <div className="streak-icon">🔥</div>
            <div className="streak-info">
              <h3>Current Streak</h3>
              <div className="streak-number">{currentStreak} days</div>
              <p>Keep the momentum going!</p>
            </div>
          </div>
        </div>

        {/* Daily Motivation */}
        <div className="motivation-card">
          <h3>Daily Motivation</h3>
          {currentQuote && (
            <div className="quote-container">
              <p className="quote-text">"{currentQuote.text}"</p>
              <p className="quote-author">- {currentQuote.author}</p>
            </div>
          )}
          <button onClick={getRandomQuote} className="new-quote-btn">
            New Quote
          </button>
        </div>
      </div>

      {/* Category Breakdown */}
      {Object.keys(categoryAnalysis).length > 0 && (
        <div className="category-analysis">
          <h2 className="section-title">Goals by Category</h2>
          <div className="category-grid">
            {Object.entries(categoryAnalysis).map(([category, count]) => (
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

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2 className="section-title">Recent Activity</h2>
        {goals.length > 0 ? (
          <div className="activity-timeline">
            {goals.slice(-5).reverse().map((goal, index) => (
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
