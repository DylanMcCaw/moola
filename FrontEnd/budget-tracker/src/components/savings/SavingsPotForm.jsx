import React, { useState } from 'react';
import { Container, Grid, TextInput, Select, Button } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';

const SavingsPotForm = () => {
  const [formData, setFormData] = useState({
    userId: 1, // Assuming this is statically set for demonstration
    description: '',
    targetAmount: 0,
    currentAmount: 0,
    icon: '',
    iconColour: '',
    depositFrequency: 'Monthly',
    goalDate: new Date(),
    status: 'Active',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., call API to create savings pot)
    console.log(formData);
    // Reset form data or navigate away after submission
  };

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const depositFrequencyOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'].map((freq) => ({
    value: freq,
    label: freq,
  }));

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
              onChange={(e) => handleInputChange('targetAmount', e.target.value)}
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Icon"
              value={formData.icon}
              onChange={(e) => handleInputChange('icon', e.target.value)}
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Icon Colour"
              value={formData.iconColour}
              onChange={(e) => handleInputChange('iconColour', e.target.value)}
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <DateTimePicker
              label="Goal Date"
              value={formData.goalDate}
              onChange={(value) => handleInputChange('goalDate', value)}
              required
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Button type="submit" variant="filled" color="blue">
              Create Savings Pot
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Container>
  );
};

export default SavingsPotForm;
