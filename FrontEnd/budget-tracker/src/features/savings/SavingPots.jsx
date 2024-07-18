import React, { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Container, Grid, Box, Title } from '@mantine/core';
import {TotalSavingsCard} from './components/TotalSavingsCard'
import { SavingsGraphCard } from './components/SavingsGraphCard';
import SavingsPotListCard from './components/SavingPotsListCard';
import { SavingsPotForm } from './components/SavingsPotForm';

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const handleNewSavingsPot = (newSavingsPot) => {
    setSavings((prevSavings) => [...prevSavings, newSavingsPot]);
    close();
  };

  return (
    <Container size="xl">
      <Box mb={30}>
        <Title order={1} style={{ fontSize: '36px', fontWeight: 800, marginBottom: '1.5rem' }}>
          Savings
        </Title>
        <TotalSavingsCard           
          totalSavings={formatCurrency(totalSavings)} 
          totalGoal={formatCurrency(totalGoal)} 
        />
      </Box>
      
      <Grid gutter="md">
        <Grid.Col span={6}>
          <SavingsGraphCard data={savingsDataArray} />
        </Grid.Col>
        
        <Grid.Col span={6}>
          <SavingsPotListCard savingPots={savingPots} />
        </Grid.Col>
      </Grid>

      <Box mt={30} style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={open} color='#4333A1'>Create New Savings Pot</Button>
      </Box>

      <Modal opened={opened} onClose={close} title="Create New Savings Pot" size="lg" centered>
        <SavingsPotForm onNewSavingsPot={handleNewSavingsPot} />
      </Modal>
    </Container>
  );
}

export default SavingPots;