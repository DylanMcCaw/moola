import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { TotalSavingsCard } from '../components/savings/TotalSavingsCard'
import { SavingsGraphCard } from '../components/savings/SavingsGraphCard'
import { SavingsPotListCard } from '../components/savings/SavingPotsListCard'
import { SavingsPotForm } from '../components/savings/SavingsPotForm'


function SavingPots() {

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
            <h1 style={{ fontWeight: 'bold', position: 'absolute', top: '60px', left: '850px' }}>Savings</h1>
      <TotalSavingsCard />
      <SavingsGraphCard />
      <SavingsPotListCard />

      <Modal opened={opened} onClose={close} title="Create New Savings Pot" size = "lg" centered>
        <SavingsPotForm />
      </Modal>

      <Button onClick={open}  color='#4333A1'>Create New Savings Pot</Button>
    </div>
  )
}

export default SavingPots
