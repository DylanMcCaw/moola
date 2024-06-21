import React, { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { TotalSavingsCard } from '../components/savings/TotalSavingsCard';
import { SavingsGraphCard } from '../components/savings/SavingsGraphCard';
import SavingsPotListCard from '../components/savings/SavingPotsListCard';
import { SavingsPotForm } from '../components/savings/SavingsPotForm';

function SavingPots({ initialSavings }) {
  const [savings, setSavings] = useState(initialSavings);
  const [opened, { open, close }] = useDisclosure(false);

  // Calculate total savings
  const totalSavings = savings.reduce((total, pot) => total + pot.currentAmount, 0).toFixed(2);

  // Prepare data for the graph (example)
  const savingsData = savings.map((pot) => ({
    date: new Date(pot.goalDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
    Savings: pot.currentAmount,
  }));

  // Prepare data for the savings pot list
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
    close(); // Close the modal
  };

  return (
    <div>
      <h1 style={{ fontWeight: 'bold', position: 'absolute', top: '60px', left: '850px' }}>Savings</h1>
      <TotalSavingsCard totalSavings={`£${totalSavings}`} />
      <SavingsGraphCard data={savingsData} />
      <SavingsPotListCard savingPots={savingPots} />

      <Modal opened={opened} onClose={close} title="Create New Savings Pot" size="lg" centered>
        <SavingsPotForm onNewSavingsPot={handleNewSavingsPot} />
      </Modal>

      <Button onClick={open} color='#4333A1'>Create New Savings Pot</Button>
    </div>
  );
}

export default SavingPots;
