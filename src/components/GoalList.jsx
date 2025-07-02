import React, { useState } from 'react';

export default function GoalList({ goals, onToggle, onDelete, onUpdate }) {
  const [filter, setFilter] = useState('all'); // all, completed, active
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const filteredGoals = goals.filter(goal => {
    if (filter === 'completed') return goal.completed;
    if (filter === 'active') return !goal.completed;
    return true;
  });

  const handleEdit = (goal) => {
    setEditingId(goal.id);
    setEditText(goal.text);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onUpdate(editingId, editText.trim());
    }
    setEditingId(null);
    setEditText('');
  };

  const handleDeleteConfirm = (id) => {
    onDelete(id);
    setShowDeleteConfirm(null);
  };

  return (
    <div>
      {/* Filter Buttons */}
      {goals.length > 0 && (
        <div className="filter-container">
          {['all', 'active', 'completed'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`filter-button ${filter === filterType ? 'active' : ''}`}
            >
              {filterType === 'all' ? 'All' : filterType === 'active' ? 'In Progress' : 'Completed'}
              <span className="ml-1 text-xs opacity-75">
                ({filterType === 'all' ? goals.length : 
                  filterType === 'active' ? goals.filter(g => !g.completed).length : 
                  goals.filter(g => g.completed).length})
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Goals List */}
      <div className="goals-list">
        {filteredGoals.length === 0 && filter !== 'all' ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="empty-title">No {filter} goals</h3>
            <p className="empty-description">
              {filter === 'completed' ? "You haven't completed any goals yet. Keep working!" : 
               "All your goals are completed! Add more goals to keep growing."}
            </p>
          </div>
        ) : (
          filteredGoals.map((goal, index) => (
            <div 
              key={goal.id} 
              className={`goal-item ${goal.completed ? 'completed' : ''} animate-slideInLeft`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="goal-content">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => onToggle(goal.id)}
                  className="goal-checkbox"
                />
                
                {/* Goal Badge */}
                <div className={`goal-badge ${goal.completed ? 'completed' : 'active'}`}>
                  {goal.completed ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                
                {/* Goal Text and Meta */}
                <div className="goal-text-container">
                  {editingId === goal.id ? (
                    <div className="edit-container">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveEdit();
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                        className="edit-input"
                        autoFocus
                        placeholder="Enter your goal..."
                      />
                      <div className="edit-actions">
                        <button
                          onClick={handleSaveEdit}
                          className="edit-button save"
                          title="Save changes"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="edit-button cancel"
                          title="Cancel editing"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className={`goal-text ${goal.completed ? 'completed' : ''}`}>
                        {goal.text}
                      </p>
                      <div className="goal-meta">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Added {formatDate(goal.createdAt)}
                        </span>
                        {goal.completed && goal.completedAt && (
                          <span className="flex items-center gap-1" style={{ color: 'var(--success-600)' }}>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Completed {formatDate(goal.completedAt)}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="goal-actions">
                  {!goal.completed && editingId !== goal.id && (
                    <button
                      onClick={() => handleEdit(goal)}
                      className="icon-button edit"
                      title="Edit goal"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 5.232z" />
                      </svg>
                    </button>
                  )}
                  
                  {showDeleteConfirm === goal.id ? (
                    <div className="delete-confirmation">
                      <button
                        onClick={() => handleDeleteConfirm(goal.id)}
                        className="confirm-button delete"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="confirm-button cancel"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowDeleteConfirm(goal.id)}
                      className="icon-button delete"
                      title="Delete goal"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// End of the GoalList component
// This component takes in a list of goals and a delete function as props