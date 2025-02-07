import React from 'react';
import { SavingsHomePageCard } from './components/SavingsHomePageCard';
import { ExpensesHomePageCard } from './components/ExpensesHomePageCard';
import { IncomeHomePageCard } from './components/IncomeHomePageCard';
import { Title } from '@mantine/core';
import './components/HomePageCardStyle.css';
import { useSelector } from 'react-redux';

function Home() {

  const savings = useSelector((state) => state.savings);
  const expenses = useSelector((state) => state.expenses);
  const incomes = useSelector((state) => state.incomes);
  return (
    <div className="home-page">
      <Title className="dashboard-title">Dashboard</Title>
      <div className="center-wrapper">
        <div className="cards-container">
          <div className="full-width-card">
            <SavingsHomePageCard savings={savings} />
          </div>
          <div className="bottom-cards-container">
            <div className="half-width-card">
              <IncomeHomePageCard incomes={incomes} />
            </div>
            <div className="half-width-card">
              <ExpensesHomePageCard expenses={expenses} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;