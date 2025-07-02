import React, { useState, useEffect } from 'react';
import GoalInput from '../components/GoalInput';
import GoalList from '../components/GoalList';

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedGoals = JSON.parse(localStorage.getItem('goals')) || [];
      setGoals(storedGoals);
    } catch (error) {
      console.error('Error loading goals from localStorage:', error);
      setGoals([]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('goals', JSON.stringify(goals));
      } catch (error) {
        console.error('Error saving goals to localStorage:', error);
      }
    }
  }, [goals, isLoaded]);

  const addGoal = (text) => {
    const newGoal = {
      id: `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text: text,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    setGoals([...goals, newGoal]);
  };

  const toggleComplete = (id) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id 
          ? { 
              ...goal, 
              completed: !goal.completed,
              completedAt: !goal.completed ? new Date().toISOString() : null
            } 
          : goal
      )
    );
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const updateGoal = (id, text) => {
    setGoals(
      goals.map((goal) => (goal.id === id ? { ...goal, text } : goal))
    );
  };

  const clearAllGoals = () => {
    if (window.confirm('Are you sure you want to delete all goals? This action cannot be undone.')) {
      setGoals([]);
    }
  };

  const clearCompleted = () => {
    if (window.confirm('Are you sure you want to delete all completed goals?')) {
      setGoals(goals.filter(goal => !goal.completed));
    }
  };

  const completedGoals = goals.filter(goal => goal.completed).length;

  return (
    <>
      {/* Header Section */}
      <header className="app-header">
        <h1 className="app-title">
          Manage Your <span className="highlight">Goals</span>
        </h1>
        <p className="app-subtitle">
          Transform your aspirations into achievements
        </p>
        <div className="app-divider"></div>
      </header>

      {/* Goal Input Section */}
      <div className="animate-slideInRight">
        <GoalInput onAdd={addGoal} />
      </div>

      {/* Goals List Section */}
      <div className="goals-container animate-scaleIn">
        {goals.length > 0 ? (
          <>
            <div className="goals-header">
              <h2 className="goals-title">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Your Goals ({goals.length})
              </h2>
              <div className="goals-actions">
                {completedGoals > 0 && (
                  <button
                    onClick={clearCompleted}
                    className="action-button"
                  >
                    Clear Completed
                  </button>
                )}
                <button
                  onClick={clearAllGoals}
                  className="action-button"
                >
                  Clear All
                </button>
              </div>
            </div>
            <GoalList goals={goals} onToggle={toggleComplete} onDelete={deleteGoal} onUpdate={updateGoal} />
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="empty-title">No goals yet</h3>
            <p className="empty-description">
              Start your journey by adding your first goal above. Every great achievement begins with a single step.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
