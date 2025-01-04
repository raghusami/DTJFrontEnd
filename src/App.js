// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Authentication/LoginPage';
import SignupPage from './pages/Authentication/SignupPage';  // Fixed import path
import ForgotPasswordPage from './pages/Authentication/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import DailyJournalEntry from '././pages/DailyJournalEntry';
import TradeLog from './pages/TradeLog';
import OpenTradePosition from './pages/OpenTradePosition';
import NotebookPage from './pages/NotebookPage';
import TradeReplayPage from './pages/TradeReplayPage';
import MasterLayout from './components/MasterLayout'; // A component to handle the layout with Sidebar and Navbar

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/auth/register" element={<SignupPage onLogin={handleLogin} />} />
            <Route path="/auth/recover" element={<ForgotPasswordPage onLogin={handleLogin} />} />
            {/* Redirect to login page if the user tries to access any protected route */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <Route element={<MasterLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/daily-journal" element={<DailyJournalEntry />} />
            <Route path="/open-positions" element={<OpenTradePosition />} />
            <Route path="/trade-log" element={<TradeLog />} />
            <Route path="/trade-replay" element={<TradeReplayPage />} />
            {/* Redirect to dashboard if the route does not match */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
