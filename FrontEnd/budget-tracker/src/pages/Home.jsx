import React from 'react'
import { SavingsHomePageCard } from '../components/HomePage/SavingsHomePageCard'
import { ExpensesHomePageCard } from '../components/HomePage/ExpensesHomePageCard'
import { IncomeHomePageCard } from '../components/HomePage/IncomeHomePageCard';
import "./HomePageStyle.css"
{/*import { useAuth } from '../hooks' */}

function Home() {
  return (
    <div className="home-page">
      <div className="cards-container">
        <IncomeHomePageCard />
        <ExpensesHomePageCard />
        <SavingsHomePageCard />
      </div>
    </div>
  );
}

export default Home