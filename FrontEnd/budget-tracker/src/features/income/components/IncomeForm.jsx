import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, TextInput, Select, Button, Group, NumberInput, Modal, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { parseISO } from 'date-fns';
import IncomeApi from '../../../api/IncomeApi';
import { notifications } from '@mantine/notifications';
import { addIncome, updateIncome, deleteIncome } from '../../../store/slices/incomesSlice';

export function IncomeForm({ onClose, editMode = false, initialData = null }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.id);

  const [formData, setFormData] = useState({
    userId: userId,
    description: '',
    amount: 0,
    category: 0,
    icon: '',
    iconColour: '',
    startDate: new Date(),
  });

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    if (editMode && initialData) {
      setFormData({
        ...initialData,
        startDate: initialData.startDate ? parseISO(initialData.startDate) : new Date(),
      });
    }
  }, [editMode, initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionType(editMode ? 'update' : 'create');
    setConfirmModalOpen(true);
  };

  const handleDelete = () => {
    setActionType('delete');
    setConfirmModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      if (actionType === 'update') {
        const submissionData = {
          ...formData,
          startDate: formData.startDate.toISOString(),
        };
        const response = await IncomeApi.updateIncome(formData.id, submissionData);
        dispatch(updateIncome(response));
        notifications.show({
          title: 'Success',
          message: 'Income Successfully Updated',
          color: "#4333A1"
        });
      } else if (actionType === 'create') {
        const submissionData = {
          ...formData,
          startDate: formData.startDate.toISOString(),
        };
        const response = await IncomeApi.createIncome(submissionData);
        dispatch(addIncome(response));
        notifications.show({
          title: 'Success',
          message: 'Income Successfully Created',
          color: "#4333A1"
        });
      } else if (actionType === 'delete') {
        await IncomeApi.deleteIncomeById(formData.id);
        dispatch(deleteIncome(formData.id));
        notifications.show({
          title: 'Success',
          message: 'Income Successfully Deleted',
          color: "#4333A1"
        });
      }
      setConfirmModalOpen(false);
      onClose?.();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: `Error ${actionType}ing income`,
        color: "red"
      });
      console.error(`Error ${actionType}ing income:`, error);
    }
  };

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const isFormValid = () => {
    const { description, amount, category, startDate, icon, iconColour } = formData;
    return (
      description.trim() !== '' &&
      amount > 0 &&
      category !== '' &&
      startDate instanceof Date &&
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
              onChange={(e) => handleInputChange('description', e.target.value)}
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <NumberInput
              label="Amount (£)"
              value={formData.amount}
              onChange={(value) => handleInputChange('amount', value)}
              min={0}
              precision={2}
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Category"
              data={[
                { value: '0', label: 'Salary' },
                { value: '1', label: 'Freelance' },
                { value: '3', label: 'Investment' },
                // Add more category options as needed
              ]}
              value={formData.category}
              onChange={(value) => handleInputChange('category', value)}
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Icon"
              data={[
                { value: 'icon1', label: 'Briefcase' },
                { value: 'icon2', label: 'Money' },
                // Add more icon options as needed
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
                { value: 'green', label: 'Green' },
                { value: 'yellow', label: 'Yellow' },
                // Add more color options as needed
              ]}
              value={formData.iconColour}
              onChange={(value) => handleInputChange('iconColour', value)}
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <DateInput
              label="Start Date"
              value={formData.startDate}
              onChange={(value) => handleInputChange('startDate', value)}
              required
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Group position="apart">
              <Button type="submit" color="#4333A1" disabled={!isFormValid()}>
                {editMode ? 'Update' : 'Create'} Income
              </Button>
              {editMode && (
                <Button variant="outline" color="red" onClick={handleDelete}>
                  Delete
                </Button>
              )}
            </Group>
          </Grid.Col>
        </Grid>
      </form>

      <Modal
        opened={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Confirm Action"
      >
        <Text>Are you sure you want to {actionType} this income?</Text>
        <Group position="apart" mt="md">
          <Button onClick={() => setConfirmModalOpen(false)} variant="outline">Cancel</Button>
          <Button onClick={handleConfirm} color={actionType === 'delete' ? 'red' : '#4333A1'}>Confirm</Button>
        </Group>
      </Modal>
    </Container>
  );
}