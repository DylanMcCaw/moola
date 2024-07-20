import React, { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Title } from '@mantine/core';
import { TotalSavingsCard } from './components/TotalSavingsCard'
import { SavingsGraphCard } from './components/SavingsGraphCard';
import SavingsPotListCard from './components/SavingPotsListCard';
import { SavingsPotForm } from './components/SavingsPotForm';
import formatCurrency from '../../utils/formatCurrency';
import './components/SavingsStyles.css'; // We'll create this CSS file

function SavingPots({ initialSavings }) {
  const [savings, setSavings] = useState(initialSavings);
  const [opened, { open, close }] = useDisclosure(false);

  const totalSavings = savings.reduce((total, pot) => total + pot.currentAmount, 0).toFixed(2);
  const totalGoal = savings.reduce((total, pot) => total + pot.targetAmount, 0).toFixed(2);

  // Calculate total savings per month
  const savingsData = savings.reduce((acc, pot) => {
    const date = new Date(pot.goalDate);
    const monthYear = date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = 0;
    }
    acc[monthYear] += pot.currentAmount;
    return acc;
  }, {});

  // Convert the savingsData object to an array of objects
  const savingsDataArray = Object.entries(savingsData).map(([date, Savings]) => ({
    date,
    Savings
  })).sort((a, b) => new Date(a.date) - new Date(b.date));

  const savingPots = savings.map((pot) => ({
    icon: pot.icon === 'icon1',
    color: pot.iconColour,
    title: pot.description,
    amount: `£${pot.currentAmount.toFixed(2)}`,
    goal: `£${pot.targetAmount.toFixed(2)}`,
    progress: ((pot.currentAmount / pot.targetAmount) * 100).toFixed(2),
  }));

  const handleNewSavingsPot = (newSavingsPot) => {
    setSavings((prevSavings) => [...prevSavings, newSavingsPot]);
    close();
  };

  return (
    <div className="savings-page">
      <Title className="dashboard-title">Savings</Title>
      <div className="center-wrapper">
        <div className="cards-container">
          <div className="full-width-card">
            <TotalSavingsCard           
              totalSavings={formatCurrency(totalSavings)} 
              totalGoal={formatCurrency(totalGoal)} 
            />
          </div>
          <div className="bottom-cards-container-savings">
            <div className="half-width-card">
              <SavingsGraphCard data={savingsDataArray} />
            </div>
            <div className="half-width-card">
              <SavingsPotListCard savingPots={savingPots} />
            </div>
          </div>
        </div>
      </div>

      <div className="create-button-container">
        <Button onClick={open} color='#4333A1'>Create New Savings Pot</Button>
      </div>

      <Modal opened={opened} onClose={close} title="Create New Savings Pot" size="lg" centered>
        <SavingsPotForm onNewSavingsPot={handleNewSavingsPot} />
      </Modal>
    </div>
  );
}

export default SavingPots;