import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grid, NumberInput, Select, Button } from '@mantine/core';
import SavingsApi from '../../../api/SavingsApi';
import { notifications } from '@mantine/notifications';
import { updateSavingsPot } from '../../../store/slices/savingsSlice';
import { addTransaction } from '../../../store/slices/savingPotTransactionsSlice';

export function SavingsPotTransactionForm({ savingsPotId, onClose, currentAmount }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    transactionType: 'Deposit',
    amount: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { transactionType, amount } = formData;
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      notifications.show({
        title: 'Error',
        message: 'Invalid amount entered.',
        color: 'red'
      });
      return;
    }

    try {
      let response;

      // Perform API call based on transaction type
      if (transactionType === 'Deposit') {
        response = await SavingsApi.depositToSavingsPot(savingsPotId, numericAmount);
      } else if (transactionType === 'Withdraw') {
        response = await SavingsApi.withdrawFromSavingsPot(savingsPotId, numericAmount);
      } else {
        throw new Error('Invalid transaction type');
      }

      // Calculate the new amount
      const newAmount = transactionType === 'Deposit'
        ? currentAmount + numericAmount
        : currentAmount - numericAmount;

      // Update the savings pot in Redux
      dispatch(updateSavingsPot({
        id: savingsPotId,
        currentAmount: newAmount,
      }));

      // Dispatch the transaction to the Redux store
      dispatch(addTransaction({
        id: response.id,
        savingsPotId,
        transactionType,
        amount: numericAmount,
        transactionDate: response.transactionDate,
      }));

      // Show success notification
      notifications.show({
        title: 'Success',
        message: `Savings Pot Successfully ${transactionType === 'Deposit' ? 'Deposited' : 'Withdrawn'}`,
        color: "#4333A1"
      });

      // Close the form
      onClose();
    } catch (error) {
      // Show error notification
      notifications.show({
        title: 'Error',
        message: error.message || `Error ${transactionType === 'Deposit' ? 'depositing to' : 'withdrawing from'} savings pot`,
        color: "red"
      });
      console.error(`Error ${transactionType === 'Deposit' ? 'depositing to' : 'withdrawing from'} savings pot:`, error);
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
                { value: 'Deposit', label: 'Deposit' },
                { value: 'Withdraw', label: 'Withdraw' },
              ]}
              allowDeselect={false}
              value={formData.transactionType}
              onChange={(value) => handleInputChange('transactionType', value)}
              required
            />
          </Grid.Col>
          <Grid.Col span={12}>
          <NumberInput
              label="Amount"
              prefix="£"
              thousandSeparator=","
              value={formData.targetAmount}
              decimalScale={2}
              fixedDecimalScale
              defaultValue={0}
              onChange={(value) => handleInputChange('amount', value)}
              min={0}
              precision={2}
              required
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Button className="modal-buttons" type="submit" variant="filled" color="#4333A1" disabled={!isFormValid()}>
              {formData.transactionType === 'Deposit' ? 'Deposit' : 'Withdraw'}
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Container>
  );
}
