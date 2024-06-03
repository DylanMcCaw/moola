// src/pages/Home.js

import React, { useState, useEffect } from 'react';
import { SavingsHomePageCard } from '../components/HomePage/SavingsHomePageCard';
import { ExpensesHomePageCard } from '../components/HomePage/ExpensesHomePageCard';
import { IncomeHomePageCard } from '../components/HomePage/IncomeHomePageCard';
import ExpenseApi from '../api/ExpenseApi';
import './HomePageStyle.css';

function Home() {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="home-page">
      <div className="cards-container">
        <div className="full-width-card">
          <SavingsHomePageCard />
        </div>
        <div className="half-width-card">
          <IncomeHomePageCard />
        </div>
        <div className="half-width-card">
          <ExpensesHomePageCard expenses={expenses} />
        </div>
      </div>
    </div>
  );
}

export default Home;
