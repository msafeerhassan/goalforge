import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Analytics from './pages/Profile';
import Habits from './pages/Habits';
import ProfileLayout from './pages/ProfileLayout';
import UserOverview from './pages/Profile/Overview';
import UserAchievements from './pages/Profile/Achievements';
import UserSettings from './pages/Profile/Settings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/profile" element={<ProfileLayout />}>
            <Route path="overview" element={<UserOverview />} />
            <Route path="achievements" element={<UserAchievements />} />
            <Route path="settings" element={<UserSettings />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
