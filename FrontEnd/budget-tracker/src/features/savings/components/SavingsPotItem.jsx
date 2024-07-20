import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, List, ThemeIcon, rem, Progress, Button, Modal } from '@mantine/core';
import { IconPlane, IconHome, IconEdit, IconCash } from '@tabler/icons-react';
import { SavingsPotTransactionForm } from './SavingsPotTransactionForm';
import "./SavingsStyles.css";

function SavingPotItem({ id, icon, color, title, onEditClick }) {
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  
  // Get the latest data for this specific savings pot from Redux
  const pot = useSelector(state => state.savings.find(pot => pot.id === id));
  
  console.log(pot);
  const amount = pot ? `£${pot.currentAmount.toFixed(2)}` : '£0.00';
  const goal = pot ? `£${pot.targetAmount.toFixed(2)}` : '£0.00';
  const progress = pot && pot.targetAmount > 0 
    ? ((pot.currentAmount / pot.targetAmount) * 100).toFixed(2)
    : '0.00';

  const handleDepositClick = () => {
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
  };

  return (
    <List.Item
      icon={
        <ThemeIcon color={color} size={24} radius="xl">
          {icon}
        </ThemeIcon>
      }
      className="savingPotItem"
    >
      <div className="listItemContent">
        <div className="textAndButtons">
          <div className="textItem">
            <Text style={{ paddingBottom: "5px " }} size='13px'>{title}</Text>
            <Text className="textItem" c="dimmed" size='13px'>{amount} / {goal}</Text>
          </div>
          <div className="buttonContainer">
            <Button size="xs" onClick={handleDepositClick} color='#4333A1'>Deposit/Withdraw</Button>
            <Button size="xs" variant="outline" color='#4333A1' onClick={onEditClick} leftIcon={<IconEdit size={14} />}>Edit</Button>
          </div>
        </div>
        <div className="progressContainer" style={{ width: "600px " }}>
          <div className="progressLabel"><Text size='13px'>{progress}%</Text></div>
          <Progress value={parseFloat(progress)} mt="s" color="#4333A1" style={{ width: "600px " }} />
        </div>
      </div>

      <Modal opened={opened} onClose={handleClose} title="Deposit/Withdraw Funds" size="lg" centered>
        <SavingsPotTransactionForm 
          savingsPotId={id} 
          onClose={handleClose} 
          currentAmount={pot ? pot.currentAmount : 0}
        />
      </Modal>
    </List.Item>
  );
}

export default SavingPotItem;