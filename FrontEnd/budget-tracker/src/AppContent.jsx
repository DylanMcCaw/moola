import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { setUser, clearUser } from './store/slices/userSlice';
import { setSavings } from './store/slices/savingsSlice';
import { setExpenses } from './store/slices/expensesSlice';
import { setIncomes } from './store/slices/incomesSlice';
import { setTransactions } from './store/slices/savingPotTransactionsSlice';
import ExpenseApi from './api/ExpenseApi';
import IncomeApi from './api/IncomeApi';
import SavingsApi from './api/SavingsApi';
import { Auth } from './features/auth/Auth';
import Home from './features/home/Home';
import SavingPots from './features/savings/Savings';
import Income from './features/income/Income';
import Expense from './features/expense/Expense'
import Settings from './features/settings/Settings'
import { Navbar } from './features/navbar/NavBar';
import UserMenu from './features/home/UserMenu';
import './styles/App.css'
import DarkModeSwitch from './features/home/components/DarkModeSwitch';
import { useMantineColorScheme } from '@mantine/core';

function AppContent() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const savings = useSelector((state) => state.savings);
  const incomes = useSelector((state) => state.incomes);
  const expenses = useSelector((state) => state.expenses);
  const { colorScheme } = useMantineColorScheme();


  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          dispatch(setUser({
            id: decodedToken.nameid,
            name: decodedToken.unique_name,
            email: decodedToken.email,
          }));
        } catch (error) {
          console.error('Invalid token:', error);
          handleLogout();
        }
      } else {
        handleLogout();
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchData();
    }
  }, [isAuthenticated, user]);

  const fetchData = async () => {
    try {
      const userId = user.id;
      const [expensesData, incomesData, savingsData, transactionsData] = await Promise.all([
        ExpenseApi.getExpensesByUserId(userId),
        IncomeApi.getIncomesByUserId(userId),
        SavingsApi.getSavingsPotsByUserId(userId),
        SavingsApi.getSavingsPotTransactionsByUserId(userId),
      ]);
      dispatch(setExpenses(expensesData));
      dispatch(setIncomes(incomesData));
      dispatch(setSavings(savingsData));
      dispatch(setTransactions(transactionsData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem('token');
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className={`app-container ${colorScheme}`}>
      <div className="app-container">
        <header className='navbar'>
          <Navbar isAuthenticated={isAuthenticated} colorScheme={colorScheme} />
        </header>
        <div className="content-container">
          <main className="main-content">
            <Routes>
              <Route 
                path="/login" 
                element={
                  isAuthenticated ? <Navigate to="/" replace /> : <Auth />
                } 
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home savings={savings} expenses={expenses} incomes={incomes} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/savings"
                element={
                  <ProtectedRoute>
                    <SavingPots initialSavings={savings} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/income"
                element={
                  <ProtectedRoute>
                    <Income initialIncomes={incomes} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/expenses"
                element={
                  <ProtectedRoute>
                    <Expense initialExpenses={expenses} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <footer>
            <div className="container"></div>
          </footer>
        </div>
        {isAuthenticated && user && (
          <div className="user-menu-container">
            <DarkModeSwitch />
            <UserMenu 
              user={user} 
              handleLogout={handleLogout}
            />
          </div>
        )}
      </div>
      </div>
    </Router>
  );
}

export default AppContent;
