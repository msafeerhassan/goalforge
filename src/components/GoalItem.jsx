import React, { useState } from 'react';

export default function GoalItem({ goal, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(goal.text);

  const handleUpdate = () => {
    if (text.trim() === '') return;
    onUpdate(goal.id, text.trim());
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUpdate();
    }
    if (e.key === 'Escape') {
      setText(goal.text);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={goal.completed}
          onChange={() => onToggle(goal.id)}
          className="h-6 w-6 rounded-full text-primary-600 focus:ring-primary-500 border-gray-300"
        />
        <div className="ml-4">
          {isEditing ? (
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={handleUpdate}
              onKeyDown={handleKeyDown}
              className="border-b-2 border-primary-500 focus:outline-none"
              autoFocus
            />
          ) : (
            <p className={`text-lg ${goal.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {goal.text}
            </p>
          )}
          <p className="text-sm text-gray-500">
            {new Date(goal.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="p-2 text-gray-400 hover:text-primary-500"
          title="Edit goal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 5.232z" />
          </svg>
        </button>
        <button 
          onClick={() => onDelete(goal.id)} 
          className="p-2 text-gray-400 hover:text-red-500"
          title="Delete goal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
