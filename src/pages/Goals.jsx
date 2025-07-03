import React, { useState, useEffect } from 'react';
import GoalInput from '../components/GoalInput';
import GoalList from '../components/GoalList';

export default function Goals() {
  const [myGoals, setMyGoals] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
      setMyGoals(savedGoals);
    } catch (error) {
      console.error('Error loading goals:', error);
      setMyGoals([]);
    }
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      try {
        localStorage.setItem('goals', JSON.stringify(myGoals));
      } catch (error) {
        console.error('Error saving goals:', error);
      }
    }
  }, [myGoals, dataLoaded]);

  const createGoal = (text) => {
    const newGoal = {
      id: `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text: text,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    setMyGoals([...myGoals, newGoal]);
  };

  const markComplete = (id) => {
    setMyGoals(
      myGoals.map((goal) =>
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

  const removeGoal = (id) => {
    setMyGoals(myGoals.filter((goal) => goal.id !== id));
  };

  const editGoal = (id, text) => {
    setMyGoals(
      myGoals.map((goal) => (goal.id === id ? { ...goal, text } : goal))
    );
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to delete all goals? This action cannot be undone.')) {
      setMyGoals([]);
    }
  };

  const clearFinished = () => {
    if (window.confirm('Are you sure you want to delete all completed goals?')) {
      setMyGoals(myGoals.filter(goal => !goal.completed));
    }
  };

  const finishedCount = myGoals.filter(goal => goal.completed).length;

  return (
    <>
      <header className="app-header">
        <h1 className="app-title">
          Manage Your <span className="highlight">Goals</span>
        </h1>
        <p className="app-subtitle">
          Transform your aspirations into achievements
        </p>
        <div className="app-divider"></div>
      </header>

      <div className="animate-slideInRight">
        <GoalInput onAdd={createGoal} />
      </div>

      <div className="goals-container animate-scaleIn">
        {myGoals.length > 0 ? (
          <>
            <div className="goals-header">
              <h2 className="goals-title">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Your Goals ({myGoals.length})
              </h2>
              <div className="goals-actions">
                {finishedCount > 0 && (
                  <button
                    onClick={clearFinished}
                    className="action-button"
                  >
                    Clear Completed
                  </button>
                )}
                <button
                  onClick={clearAll}
                  className="action-button"
                >
                  Clear All
                </button>
              </div>
            </div>
            <GoalList goals={myGoals} onToggle={markComplete} onDelete={removeGoal} onUpdate={editGoal} />
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
