import React, { useState } from 'react';

export default function GoalInput({ onAdd }) {
  const [inputText, setInputText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const submitGoal = (e) => {
    e.preventDefault();
    
    if (inputText.trim() === '') {
      setErrorMsg('Please enter a goal');
      return;
    }
    
    if (inputText.trim().length < 3) {
      setErrorMsg('Goal must be at least 3 characters long');
      return;
    }
    
    if (inputText.trim().length > 200) {
      setErrorMsg('Goal must be less than 200 characters');
      return;
    }
    
    setErrorMsg('');
    onAdd(inputText.trim());
    setInputText('');
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
    if (errorMsg) setErrorMsg('');
  };

  return (
    <div className="goal-input-container">
      <form onSubmit={submitGoal} className="goal-input-form">
        <div className="input-group">
          <label htmlFor="goal-input" className="input-label">
            What's your next goal?
          </label>
          <input
            id="goal-input"
            type="text"
            placeholder="e.g., Read 20 pages daily, Exercise for 30 minutes..."
            value={inputText}
            onChange={handleChange}
            className={`goal-input ${errorMsg ? 'error' : ''}`}
            maxLength={200}
            autoComplete="off"
          />
          {errorMsg && (
            <div className="input-error">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errorMsg}
            </div>
          )}
          <div className="input-counter">
            {inputText.length}/200 characters
          </div>
        </div>
        <button 
          type="submit"
          disabled={!inputText.trim() || inputText.trim().length < 3}
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