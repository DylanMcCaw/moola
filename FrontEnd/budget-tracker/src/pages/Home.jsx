import React, { useState, useEffect } from 'react';
import { SavingsHomePageCard } from '../components/HomePage/SavingsHomePageCard';
import { ExpensesHomePageCard } from '../components/HomePage/ExpensesHomePageCard';
import { IncomeHomePageCard } from '../components/HomePage/IncomeHomePageCard';
import { Title } from '@mantine/core';
import './HomePageStyle.css';

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
