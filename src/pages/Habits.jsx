import React, { useState, useEffect } from 'react';

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];
      setHabits(storedHabits);
    } catch (error) {
      console.error('Error loading habits:', error);
    }

    fetchTips();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('habits', JSON.stringify(habits));
    } catch (error) {
      console.error('Error saving habits:', error);
    }
  }, [habits]);

  const fetchTips = async () => {
    setLoading(true);
    try {
      const productivityTips = [
        {
          id: 1,
          title: "Break tasks into smaller chunks",
          content: "Big projects feel overwhelming. Break them down into bite-sized pieces that you can actually tackle.",
          category: "Productivity"
        },
        {
          id: 2,
          title: "Two-minute rule",
          content: "If something takes less than 2 minutes, just do it now instead of adding it to your todo list.",
          category: "Focus"
        },
        {
          id: 3,
          title: "Time blocking works",
          content: "Schedule specific time slots for different types of work. Helps you stay focused and avoid multitasking.",
          category: "Productivity"
        },
        {
          id: 4,
          title: "Take actual breaks",
          content: "Pomodoro technique is popular for a reason - 25 mins work, 5 min break. Don't skip the breaks.",
          category: "Wellness"
        },
        {
          id: 5,
          title: "Do the hard stuff first",
          content: "Tackle your most challenging task when you're fresh. Don't save it for when you're tired.",
          category: "Success"
        },
        {
          id: 6,
          title: "Kill the distractions",
          content: "Turn off notifications, close unnecessary tabs, put your phone in another room if you have to.",
          category: "Focus"
        },
        {
          id: 7,
          title: "SMART goals actually work",
          content: "Specific, Measurable, Achievable, Relevant, Time-bound. Sounds corporate but it's effective.",
          category: "Motivation"
        },
        {
          id: 8,
          title: "Daily review habit",
          content: "Spend 5-10 minutes each evening reviewing what you did and planning tomorrow. Game changer.",
          category: "Success"
        }
      ];
      
      const shuffled = productivityTips.sort(() => 0.5 - Math.random());
      const selectedTips = shuffled.slice(0, 5);
      
      setTips(selectedTips);
    } catch (error) {
      console.error('Error fetching tips:', error);
    } finally {
      setLoading(false);
    }
  };

  const addHabit = (e) => {
    e.preventDefault();
    if (newHabit.trim() === '') return;

    const habit = {
      id: `habit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: newHabit.trim(),
      streak: 0,
      completedToday: false,
      completedDates: [],
      createdAt: new Date().toISOString(),
      lastCompleted: null
    };

    setHabits([...habits, habit]);
    setNewHabit('');
  };

  const toggleHabitToday = (id) => {
    const today = new Date().toDateString();
    
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const isAlreadyCompleted = habit.completedToday;
        const updatedCompletedDates = isAlreadyCompleted
          ? habit.completedDates.filter(date => date !== today)
          : [...habit.completedDates, today];

        return {
          ...habit,
          completedToday: !isAlreadyCompleted,
          completedDates: updatedCompletedDates,
          streak: !isAlreadyCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1),
          lastCompleted: !isAlreadyCompleted ? new Date().toISOString() : habit.lastCompleted
        };
      }
      return habit;
    }));
  };

  const deleteHabit = (id) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      setHabits(habits.filter(habit => habit.id !== id));
    }
  };

  const getStreakEmoji = (streak) => {
    if (streak >= 30) return '🏆';
    if (streak >= 14) return '🔥';
    if (streak >= 7) return '⭐';
    if (streak >= 3) return '💪';
    return '🌱';
  };

  return (
    <>
      {/* Header Section */}
      <header className="app-header">
        <h1 className="app-title">
          Daily <span className="highlight">Habits</span>
        </h1>
        <p className="app-subtitle">
          Build consistency, achieve greatness
        </p>
        <div className="app-divider"></div>
      </header>

      {/* Add New Habit */}
      <div className="habit-input-container">
        <form onSubmit={addHabit} className="habit-form">
          <input
            type="text"
            placeholder="Enter a new habit (e.g., Drink 8 glasses of water)"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            className="habit-input"
            maxLength={100}
          />
          <button type="submit" className="add-habit-btn">
            Add Habit
          </button>
        </form>
      </div>

      {/* Habits List */}
      <div className="habits-container">
        <h2 className="section-title">Your Habits ({habits.length})</h2>
        {habits.length > 0 ? (
          <div className="habits-grid">
            {habits.map(habit => (
              <div key={habit.id} className={`habit-card ${habit.completedToday ? 'completed' : ''}`}>
                <div className="habit-header">
                  <h3 className="habit-name">{habit.name}</h3>
                  <button 
                    onClick={() => deleteHabit(habit.id)}
                    className="delete-habit-btn"
                    title="Delete habit"
                  >
                    ×
                  </button>
                </div>
                
                <div className="habit-stats">
                  <div className="stat-item">
                    <span className="stat-emoji">{getStreakEmoji(habit.streak)}</span>
                    <span className="stat-text">{habit.streak} day streak</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-emoji">📅</span>
                    <span className="stat-text">{habit.completedDates.length} total</span>
                  </div>
                </div>

                <div className="habit-actions">
                  <button
                    onClick={() => toggleHabitToday(habit.id)}
                    className={`complete-btn ${habit.completedToday ? 'completed' : ''}`}
                  >
                    {habit.completedToday ? '✅ Done Today' : '⭕ Mark Complete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🌱</div>
            <h3 className="empty-title">No habits yet</h3>
            <p className="empty-description">
              Start building positive habits by adding your first one above.
            </p>
          </div>
        )}
      </div>

      {/* Productivity Tips */}
      <div className="tips-container">
        <div className="tips-header">
          <h2 className="section-title">Productivity Tips</h2>
          <button onClick={fetchTips} className="refresh-tips-btn" disabled={loading}>
            {loading ? '🔄' : '🔄'} Refresh
          </button>
        </div>
        
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="tips-grid">
            {tips.map(tip => (
              <div key={tip.id} className="tip-card">
                <div className="tip-category">{tip.category}</div>
                <h4 className="tip-title">{tip.title}</h4>
                <p className="tip-content">{tip.content.substring(0, 120)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
