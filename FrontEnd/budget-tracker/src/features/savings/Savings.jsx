import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Title } from '@mantine/core';
import { TotalSavingsCard } from './components/TotalSavingsCard'
import { SavingsTransactionsCard } from './components/SavingsTransactionsCard';
import SavingsPotListCard from './components/SavingPotsListCard';
import { SavingsPotForm } from './components/SavingsPotForm';
import { addSavingsPot } from '../../store/slices/savingsSlice';
import formatCurrency from '../../utils/formatCurrency';
import './components/SavingsStyles.css';

function SavingPots() {
  const dispatch = useDispatch();
  const savings = useSelector((state) => state.savings) || [];
  const [opened, { open, close }] = useDisclosure(false);

  const totalSavings = savings.length > 0 
    ? savings.reduce((total, pot) => total + (pot.currentAmount || 0), 0).toFixed(2)
    : "0.00";
  
  const totalGoal = savings.length > 0
    ? savings.reduce((total, pot) => total + (pot.targetAmount || 0), 0).toFixed(2)
    : "0.00";

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
              <SavingsPotListCard savingPots={savingPots} onAddClick={open} />
            </div>
            <div className="half-width-card">
              <SavingsTransactionsCard />
            </div>
          </div>
        </div>
      </div>

      <Modal opened={opened} onClose={close} title="Create New Savings Pot" size="lg" centered>
        <SavingsPotForm onNewSavingsPot={handleNewSavingsPot} />
      </Modal>
    </div>
  );
}

export default SavingPots;