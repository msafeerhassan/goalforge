import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Analytics from './pages/Profile'; // Renamed from Profile to Analytics
import Habits from './pages/Habits';
import Settings from './pages/Settings';
import General from './pages/Settings/General';
import Notifications from './pages/Settings/Notifications';
import Account from './pages/Settings/Account';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/settings" element={<Settings />}>
            <Route path="general" element={<General />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
