import React, { useState, useEffect } from 'react';
import { SavingsHomePageCard } from '../components/HomePage/SavingsHomePageCard';
import { ExpensesHomePageCard } from '../components/HomePage/ExpensesHomePageCard';
import { IncomeHomePageCard } from '../components/HomePage/IncomeHomePageCard';
import ExpenseApi from '../api/ExpenseApi';
import './HomePageStyle.css';

function Home({ expenses }) {

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
