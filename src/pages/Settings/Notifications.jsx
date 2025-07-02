import React, { useState } from 'react';

export default function Notifications() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [goalDeadlines, setGoalDeadlines] = useState(true);

  const handleSave = () => {
    const notifications = {
      emailNotifications,
      pushNotifications,
      dailyReminders,
      goalDeadlines
    };
    localStorage.setItem('notificationSettings', JSON.stringify(notifications));
    alert('Notification settings saved!');
  };

  return (
    <div className="settings-section">
      <h2>Notification Settings</h2>
      <p>Manage how you want to be notified about your goals</p>

      <div className="settings-form">
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
            <span>Email notifications</span>
          </label>
          <p className="form-help">Receive goal updates via email</p>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={pushNotifications}
              onChange={(e) => setPushNotifications(e.target.checked)}
            />
            <span>Push notifications</span>
          </label>
          <p className="form-help">Get browser push notifications</p>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={dailyReminders}
              onChange={(e) => setDailyReminders(e.target.checked)}
            />
            <span>Daily reminders</span>
          </label>
          <p className="form-help">Daily reminders to check your goals</p>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={goalDeadlines}
              onChange={(e) => setGoalDeadlines(e.target.checked)}
            />
            <span>Goal deadline alerts</span>
          </label>
          <p className="form-help">Notifications for approaching deadlines</p>
        </div>

        <button onClick={handleSave} className="save-button">
          Save Changes
        </button>
      </div>
    </div>
  );
}
