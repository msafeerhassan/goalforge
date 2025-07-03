import React, { useState } from 'react';

export default function GoalList({ goals, onToggle, onDelete, onUpdate }) {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [editingGoal, setEditingGoal] = useState(null);
  const [editText, setEditText] = useState('');
  const [showConfirm, setShowConfirm] = useState(null);

  const getFilteredGoals = () => {
    if (currentFilter === 'completed') return goals.filter(g => g.completed);
    if (currentFilter === 'active') return goals.filter(g => !g.completed);
    return goals;
  };

  const startEditing = (goal) => {
    setEditingGoal(goal.id);
    setEditText(goal.text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      onUpdate(editingGoal, editText.trim());
    }
    setEditingGoal(null);
    setEditText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') {
      setEditingGoal(null);
      setEditText('');
    }
  };

  const confirmDelete = (id) => {
    onDelete(id);
    setShowConfirm(null);
  };

  const filteredGoals = getFilteredGoals();

  return (
    <div className="goal-list-container">
      {goals.length > 0 && (
        <div className="filter-buttons">
          <button 
            onClick={() => setCurrentFilter('all')}
            className={currentFilter === 'all' ? 'active' : ''}
          >
            All ({goals.length})
          </button>
          <button 
            onClick={() => setCurrentFilter('active')}
            className={currentFilter === 'active' ? 'active' : ''}
          >
            Active ({goals.filter(g => !g.completed).length})
          </button>
          <button 
            onClick={() => setCurrentFilter('completed')}
            className={currentFilter === 'completed' ? 'active' : ''}
          >
            Done ({goals.filter(g => g.completed).length})
          </button>
        </div>
      )}

      <div className="goals-container">
        {filteredGoals.map(goal => (
          <div key={goal.id} className={`goal-row ${goal.completed ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              checked={goal.completed}
              onChange={() => onToggle(goal.id)}
              className="goal-checkbox"
            />
            
            <div className="goal-content">
              {editingGoal === goal.id ? (
                <input 
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={saveEdit}
                  onKeyDown={handleKeyPress}
                  className="edit-input"
                  autoFocus
                />
              ) : (
                <div>
                  <span className="goal-text">{goal.text}</span>
                  <small className="goal-date">
                    {new Date(goal.createdAt).toLocaleDateString()}
                  </small>
                </div>
              )}
            </div>
            
            {editingGoal !== goal.id && (
              <div className="goal-actions">
                <button onClick={() => startEditing(goal)} className="edit-btn">
                  ✏️
                </button>
                <button onClick={() => setShowConfirm(goal.id)} className="delete-btn">
                  🗑️
                </button>
              </div>
            )}
            
            {showConfirm === goal.id && (
              <div className="confirm-dialog">
                <span>Delete this goal?</span>
                <button onClick={() => confirmDelete(goal.id)}>Yes</button>
                <button onClick={() => setShowConfirm(null)}>No</button>
              </div>
            )}
          </div>
        ))}
        
        {filteredGoals.length === 0 && goals.length > 0 && (
          <div className="empty-message">
            No {currentFilter} goals found.
          </div>
        )}
      </div>
    </div>
  );
}
