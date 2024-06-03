import React, { useState, useEffect } from 'react';
import { Loader } from '@mantine/core'; // Import Loader from Mantine
import ExpenseApi from './api/ExpenseApi';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Home, SavingPots } from './pages';
import { Navbar } from './components/NavBar/NavBar';
import UserMenu from './components/UserMenu'; // Import the UserMenu component
import '@mantine/core/styles.css';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const userId = 0; // Replace with the actual user ID
        const data = await ExpenseApi.getExpensesByUserId(userId);
        setExpenses(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <MantineProvider>
      <Router>
        <div className="app-container">
          <header>
            <Navbar />
          </header>
          <div className="content-container">
            <main className="main-content">
              {/* Conditional rendering of loader */}
              {loading && (
                <div className="loader-container">
                  <Loader size={75} color="#4333A1" />
                </div>
              )}
              {/* Conditional rendering of error */}
              {error && <div>Error: {error.message}</div>}
              {!loading && !error && (
                <Routes>
                  <Route path="/" element={<Home expenses={expenses} />} />
                  <Route path="/savingpots" element={<SavingPots />} />
                  {/* 
                  <GuestRoute path="/login" element={<Auth key="login" />} />
                  <AuthRoute path="/settings" element={<Settings />} />
                  <AuthRoute path="/editor" element={<Editor />} />
                  <Route path="/editor/:slug" element={<Editor />} />
                  <Route path="/article/:slug" element={<Article />} />
                  <Route path="/profile/:username" element={<Profile />} />
                  <AuthRoute path="/@:username" element={<Profile />} />
                  */}
                </Routes>
              )}
            </main>
            <footer>
              <div className="container"></div>
            </footer>
          </div>
          <div className="user-menu-container">
            <UserMenu />
          </div>
        </div>
      </Router>
    </MantineProvider>
  );
}

export default App;
