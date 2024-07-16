import React, { useState, useEffect } from 'react';
import { Loader, MantineProvider } from '@mantine/core';
import ExpenseApi from './api/ExpenseApi';
import IncomeApi from './api/IncomeApi';
import SavingsApi from './api/SavingsApi';
import { Auth } from './pages/Auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import { Home, SavingPots } from './pages';
import { Navbar } from './components/NavBar/NavBar';
import UserMenu from './components/UserMenu';
import { jwtDecode } from 'jwt-decode';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import './App.css';

function AppContent() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [savings, setSavings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      console.log(token);
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUser({
            id: decodedToken.nameid,
            name: decodedToken.unique_name, // Adjust these fields based on your JWT structure
            email: decodedToken.email,
          });
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setAuthChecked(true);
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        setLoading(true);
        console.log(user);
        try {
          const userId = user.id;
          const [expensesData, incomesData, savingsData] = await Promise.all([
            ExpenseApi.getExpensesByUserId(userId),
            IncomeApi.getIncomesByUserId(userId),
            SavingsApi.getSavingsPotsByUserId(userId),
          ]);
          setExpenses(expensesData);
          setIncomes(incomesData);
          setSavings(savingsData);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const ProtectedRoute = ({ children }) => {
    if (!authChecked) return null; // Don't render anything while checking auth
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  if (!authChecked) {
    return (
      <div className="loader-container">
        <Loader size={75} color="#4333A1" />
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <header>
          <Navbar isAuthenticated={isAuthenticated} />
        </header>
        <div className="content-container">
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    {loading ? (
                      <div className="loader-container">
                        <Loader size={75} color="#4333A1" />
                      </div>
                    ) : error ? (
                      <div>Error: {error.message}</div>
                    ) : (
                      <Home savings={savings} expenses={expenses} incomes={incomes} />
                    )}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/savingpots"
                element={
                  <ProtectedRoute>
                    {loading ? (
                      <div className="loader-container">
                        <Loader size={75} color="#4333A1" />
                      </div>
                    ) : error ? (
                      <div>Error: {error.message}</div>
                    ) : (
                      <SavingPots initialSavings={savings} />
                    )}
                  </ProtectedRoute>
                }
              />
              {/* Add other protected routes here */}
            </Routes>
          </main>
          <footer>
            <div className="container"></div>
          </footer>
        </div>
        {isAuthenticated && user && (
          <div className="user-menu-container">
            <UserMenu user={user} setIsAuthenticated={setIsAuthenticated} />
          </div>
        )}
      </div>
    </Router>
  );
}

function App() {
  return (
    <MantineProvider>
      <Notifications />
      <AppContent />
    </MantineProvider>
  );
}

export default App;
