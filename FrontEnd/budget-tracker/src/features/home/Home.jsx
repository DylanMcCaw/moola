import React from 'react';
import { SavingsHomePageCard } from './components/SavingsHomePageCard';
import { ExpensesHomePageCard } from './components/ExpensesHomePageCard';
import { IncomeHomePageCard } from './components/IncomeHomePageCard';
import { Title } from '@mantine/core';
import './components/HomePageCardStyle.css';

function Home({ savings, expenses, incomes }) {

  return (
    <div className="home-page">
      <Title style={{ fontWeight: '800', position: 'absolute', top: '60px', left: '850px' }}>Dashboard</Title>
      <div className="cards-container">
        <div className="full-width-card">
          <SavingsHomePageCard savings={savings} />
        </div>
        <div className="half-width-card">
          <IncomeHomePageCard incomes={incomes} />
        </div>
        <div className="half-width-card">
          <ExpensesHomePageCard expenses={expenses} />
        </div>
      </div>
    </div>
  );
}

export default Home;
