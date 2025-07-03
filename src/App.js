import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Analytics from './pages/Profile';
import Habits from './pages/Habits';
import ProfileLayout from './pages/ProfileLayout';
import ProfileOverview from './pages/Profile/Overview';
import ProfileAchievements from './pages/Profile/Achievements';
import ProfileSettings from './pages/Profile/Settings';

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
            <Route path="overview" element={<ProfileOverview />} />
            <Route path="achievements" element={<ProfileAchievements />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
