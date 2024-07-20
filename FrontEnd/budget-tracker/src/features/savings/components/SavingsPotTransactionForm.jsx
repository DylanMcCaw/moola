import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grid, TextInput, Select, Button } from '@mantine/core';
import SavingsApi from '../../../api/SavingsApi';
import { notifications } from '@mantine/notifications';
import { updateSavingsPot } from '../../../store/slices/savingsSlice';

export function SavingsPotTransactionForm({ savingsPotId, onClose, currentAmount }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    transactionType: 'deposit',
    amount: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { transactionType, amount } = formData;
      const numericAmount = parseFloat(amount);
      
      if (isNaN(numericAmount) || numericAmount <= 0) {
        throw new Error('Invalid amount');
      }

      let response;

      if (transactionType === 'deposit') {
        response = await SavingsApi.depositToSavingsPot(savingsPotId, numericAmount);
      } else if (transactionType === 'withdraw') {
        response = await SavingsApi.withdrawFromSavingsPot(savingsPotId, numericAmount);
      } else {
        throw new Error('Invalid transaction type');
      }

      console.log(`Savings pot ${transactionType} successful:`, response);
      
      // Calculate the new amount
      const newAmount = transactionType === 'deposit' 
        ? currentAmount + numericAmount 
        : currentAmount - numericAmount;

      dispatch(updateSavingsPot({
        id: savingsPotId,
        currentAmount: newAmount,
        ...response
      }));

      notifications.show({
        title: 'Success',
        message: `Savings Pot Successfully ${transactionType === 'deposit' ? 'Deposited' : 'Withdrawn'}`,
        color: "#4333A1"
      });
      onClose();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error.message || `Error ${formData.transactionType === 'deposit' ? 'depositing to' : 'withdrawing from'} savings pot`,
        color: "red"
      });
      console.error(`Error ${formData.transactionType === 'deposit' ? 'depositing to' : 'withdrawing from'} savings pot:`, error);
    }
  };

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const isFormValid = () => {
    const amount = parseFloat(formData.amount);
    return !isNaN(amount) && amount > 0;
  };

  return (
    <Container size="sm">
      <form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Col span={12}>
            <Select
              label="Transaction Type"
              data={[
                { value: 'deposit', label: 'Deposit' },
                { value: 'withdraw', label: 'Withdraw' },
              ]}
              value={formData.transactionType}
              onChange={(value) => handleInputChange('transactionType', value)}
              required
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              type="number"
              label="Amount (£)"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}  // Store as string
              required
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Button type="submit" variant="filled" color="#4333A1" disabled={!isFormValid()}>
              {formData.transactionType === 'deposit' ? 'Deposit' : 'Withdraw'}
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Container>
  );
}