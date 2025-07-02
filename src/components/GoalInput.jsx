import React, { useState } from 'react';

export default function GoalInput({ onAdd }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (text.trim() === '') {
      setError('Please enter a goal');
      return;
    }
    
    if (text.trim().length < 3) {
      setError('Goal must be at least 3 characters long');
      return;
    }
    
    if (text.trim().length > 200) {
      setError('Goal must be less than 200 characters');
      return;
    }
    
    setError('');
    onAdd(text.trim());
    setText('');
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <div className="goal-input-container">
      <form onSubmit={handleSubmit} className="goal-input-form">
        <div className="input-group">
          <label htmlFor="goal-input" className="input-label">
            What's your next goal?
          </label>
          <input
            id="goal-input"
            type="text"
            placeholder="e.g., Read 20 pages daily, Exercise for 30 minutes..."
            value={text}
            onChange={handleInputChange}
            className={`goal-input ${error ? 'error' : ''}`}
            maxLength={200}
            autoComplete="off"
          />
          {error && (
            <div className="input-error">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
          <div className="input-counter">
            {text.length}/200 characters
          </div>
        </div>
        <button 
          type="submit"
          disabled={!text.trim() || text.trim().length < 3}
          className="add-button"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Goal
        </button>
      </form>
    </div>
  );
}


// Close GoalInput Component
// This component is used to input new goals and add them to the list.