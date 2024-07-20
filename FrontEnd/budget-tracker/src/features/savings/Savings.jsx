import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Title } from '@mantine/core';
import { TotalSavingsCard } from './components/TotalSavingsCard'
import { SavingsGraphCard } from './components/SavingsGraphCard';
import SavingsPotListCard from './components/SavingPotsListCard';
import { SavingsPotForm } from './components/SavingsPotForm';
import { addSavingsPot } from '../../store/slices/savingsSlice'; // Import the action
import formatCurrency from '../../utils/formatCurrency';
import './components/SavingsStyles.css';

function SavingPots() {
  const dispatch = useDispatch();
  const savings = useSelector((state) => state.savings) || [];
  const [opened, { open, close }] = useDisclosure(false);

  console.log(savings);

  const totalSavings = savings.length > 0 
    ? savings.reduce((total, pot) => total + (pot.currentAmount || 0), 0).toFixed(2)
    : "0.00";
  
  const totalGoal = savings.length > 0
    ? savings.reduce((total, pot) => total + (pot.targetAmount || 0), 0).toFixed(2)
    : "0.00";

  // Calculate total savings per month
  const savingsData = savings.reduce((acc, pot) => {
    if (pot.goalDate) {
      const date = new Date(pot.goalDate);
      const monthYear = date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
      
      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }
      acc[monthYear] += (pot.currentAmount || 0);
    }
    return acc;
  }, {});

  // Convert the savingsData object to an array of objects
  const savingsDataArray = Object.entries(savingsData).map(([date, Savings]) => ({
    date,
    Savings
  })).sort((a, b) => new Date(a.date) - new Date(b.date));

  const savingPots = savings.map((pot) => ({
    id: pot.id,
    icon: pot.icon === 'icon1',
    color: pot.iconColour,
    title: pot.description,
    amount: `£${(pot.currentAmount || 0).toFixed(2)}`,
    goal: `£${(pot.targetAmount || 0).toFixed(2)}`,
    progress: pot.targetAmount > 0 
      ? ((pot.currentAmount || 0) / pot.targetAmount * 100).toFixed(2)
      : "0.00",
  }));

  const handleNewSavingsPot = (newSavingsPot) => {
    dispatch(addSavingsPot(newSavingsPot));
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