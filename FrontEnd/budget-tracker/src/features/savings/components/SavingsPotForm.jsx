import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, TextInput, Select, Button } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import SavingsApi from '../../../api/SavingsApi';
import { notifications } from '@mantine/notifications';
import { addSavingsPot } from '../../../store/slices/savingsSlice'; // Import the addSavingsPot action

export function SavingsPotForm({ onClose }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.id);

  const [formData, setFormData] = useState({
    id: 0,
    userId: userId,
    description: '',
    targetAmount: 0,
    currentAmount: 0,
    icon: '',
    iconColour: '',
    depositFrequency: 0,
    goalDate: new Date(),
    status: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await SavingsApi.createSavingsPot(formData);
      console.log('Savings pot created successfully:', response);
      dispatch(addSavingsPot(response)); // Dispatch action to add new savings pot to Redux store
      notifications.show({
        title: 'Success notification',
        message: 'Savings Pot Successfully Created',
        color: "#4333A1"
      });
      onClose(); // Close the form modal
    } catch (error) {
      notifications.show({
        title: 'Error notification',
        message: 'Error creating savings pot',
        color: "red"
      });
      console.error('Error creating savings pot:', error);
    }
  };

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const isFormValid = () => {
    const { description, targetAmount, goalDate, icon, iconColour } = formData;
    return (
      description.trim() !== '' &&
      targetAmount > 0 &&
      goalDate !== null &&
      icon.trim() !== '' &&
      iconColour.trim() !== ''
    );
  };

  return (
    <Container size="sm">
      <form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              label="Description"
              value={formData.description}
              placeholder="e.g. Holiday"
              onChange={(e) => handleInputChange('description', e.target.value)}
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              type="number"
              label="Goal Amount (£)"
              value={formData.targetAmount}
              onChange={(e) => handleInputChange('targetAmount', parseFloat(e.target.value))}
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <DateInput
              label="Goal Date"
              value={formData.goalDate}
              onChange={(value) => handleInputChange('goalDate', value)}
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Icon"
              data={[
                { value: 'icon1', label: 'Icon 1' },
                { value: 'icon2', label: 'Icon 2' },
                // Add more icon options here
              ]}
              value={formData.icon}
              onChange={(value) => handleInputChange('icon', value)}
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Icon Colour"
              data={[
                { value: 'red', label: 'Red' },
                { value: 'blue', label: 'Blue' },
                // Add more color options here
              ]}
              value={formData.iconColour}
              onChange={(value) => handleInputChange('iconColour', value)}
              required
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Button type="submit" variant="filled" color="#4333A1" disabled={!isFormValid()}>
              Create Savings Pot
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Container>
  );
}