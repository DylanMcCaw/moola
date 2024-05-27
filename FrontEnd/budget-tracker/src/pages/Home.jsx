import React from 'react'
import { SavingsHomePageCard } from '../components/HomePage/SavingsHomePageCard'
import { ExpensesHomePageCard } from '../components/HomePage/ExpensesHomePageCard'
{/*import { useAuth } from '../hooks' */}

function Home() {
  const containerStyle = {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div className="home-page">
      <div className="cards-container" style={containerStyle}>
        <SavingsHomePageCard />
        <ExpensesHomePageCard />
      </div>
    </div>
  );
}

export default Home