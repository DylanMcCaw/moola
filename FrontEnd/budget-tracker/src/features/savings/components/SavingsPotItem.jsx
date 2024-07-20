import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, List, ThemeIcon, Progress, Button, Modal } from '@mantine/core';
import { IconPlane, IconHome, IconEdit, IconCash } from '@tabler/icons-react';
import { SavingsPotTransactionForm } from './SavingsPotTransactionForm';
import { SavingsPotForm } from './SavingsPotForm';
import "./SavingsStyles.css";

function SavingPotItem({ id, icon, color, title, onEditClick }) {
  const [depositOpened, setDepositOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const dispatch = useDispatch();
  
  const pot = useSelector(state => state.savings.find(pot => pot.id === id));
  
  const amount = pot ? `£${pot.currentAmount.toFixed(2)}` : '£0.00';
  const goal = pot ? `£${pot.targetAmount.toFixed(2)}` : '£0.00';
  const progress = pot && pot.targetAmount > 0 
    ? ((pot.currentAmount / pot.targetAmount) * 100).toFixed(2)
    : '0.00';

  const handleDepositClick = () => {
    setDepositOpened(true);
  };

  const handleEditClick = () => {
    setEditOpened(true);
  };

  const handleClose = () => {
    setDepositOpened(false);
    setEditOpened(false);
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
            <Button size="xs" variant="outline" color='#4333A1' onClick={handleEditClick} leftIcon={<IconEdit size={14} />}>Edit</Button>
          </div>
        </div>
        <div className="progressContainer" style={{ width: "600px " }}>
          <div className="progressLabel"><Text size='13px'>{progress}%</Text></div>
          <Progress value={parseFloat(progress)} mt="s" color="#4333A1" style={{ width: "600px " }} />
        </div>
      </div>

      <Modal opened={depositOpened} onClose={handleClose} title="Deposit/Withdraw Funds" size="lg" centered>
        <SavingsPotTransactionForm 
          savingsPotId={id} 
          onClose={handleClose} 
          currentAmount={pot ? pot.currentAmount : 0}
        />
      </Modal>

      <Modal opened={editOpened} onClose={handleClose} title="Edit Savings Pot" size="lg" centered>
        <SavingsPotForm 
          editMode={true}
          initialData={pot}
          onClose={handleClose}
        />
      </Modal>
    </List.Item>
  );
}

export default SavingPotItem;