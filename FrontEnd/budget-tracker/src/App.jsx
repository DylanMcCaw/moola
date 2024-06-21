import React, { useState, useEffect } from 'react';
import { Loader } from '@mantine/core'; // Import Loader from Mantine
import ExpenseApi from './api/ExpenseApi';
import IncomeApi from './api/IncomeApi';
import SavingsApi from './api/SavingsApi'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Home, SavingPots } from './pages';
import { Navbar } from './components/NavBar/NavBar';
import UserMenu from './components/UserMenu'; // Import the UserMenu component
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [savings, setSavings] = useState([]);
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

    const fetchIncomes = async () => {
      try {
        const userId = 0; // Replace with the actual user ID
        const data = await IncomeApi.getIncomesByUserId(userId);
        setIncomes(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSavngs = async () => {
      try {
        const userId = 0; // Replace with the actual user ID
        const data = await SavingsApi.getSavingsPotsByUserId(userId);
        setSavings(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
    fetchIncomes();
    fetchSavngs();
  }, []);

  return (
    <MantineProvider>
      <Notifications />
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
                  <Route path="/" element={<Home savings={savings} expenses={expenses} incomes={incomes} />} />
                  <Route path="/savingpots" element={<SavingPots initialSavings={savings} />} />
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
