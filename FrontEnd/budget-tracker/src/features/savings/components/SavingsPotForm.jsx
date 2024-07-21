import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, TextInput, Select, Button, Group, NumberInput, Modal, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { parseISO } from 'date-fns';
import SavingsApi from '../../../api/SavingsApi';
import { notifications } from '@mantine/notifications';
import { addSavingsPot, updateSavingsPot, deleteSavingsPot } from '../../../store/slices/savingsSlice';
import { removeTransactionsBySavingsPotId } from '../../../store/slices/savingPotTransactionsSlice'

export function SavingsPotForm({ onClose, editMode = false, initialData = null }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.id);

  const [formData, setFormData] = useState({
    id: 0,
    userId: userId,
    description: '',
    targetAmount: 0,
    icon: '',
    iconColour: '',
    goalDate: new Date(),
  });

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    if (editMode && initialData) {
      setFormData({
        ...initialData,
        goalDate: initialData.goalDate ? parseISO(initialData.goalDate) : new Date(),
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
          depositFrequency: parseInt(formData.depositFrequency),
          goalDate: formData.goalDate.toISOString(),
        };
        const response = await SavingsApi.updateSavingsPot(formData.id, submissionData);
        dispatch(updateSavingsPot(response));
        notifications.show({
          title: 'Success',
          message: 'Savings Pot Successfully Updated',
          color: "#4333A1"
        });
      } else if (actionType === 'create') {
        const submissionData = {
          ...formData,
          depositFrequency: parseInt(formData.depositFrequency),
          goalDate: formData.goalDate.toISOString(),
        };
        const response = await SavingsApi.createSavingsPot(submissionData);
        dispatch(addSavingsPot(response));
        notifications.show({
          title: 'Success',
          message: 'Savings Pot Successfully Created',
          color: "#4333A1"
        });
      } else if (actionType === 'delete') {
        await SavingsApi.deleteSavingsPotById(formData.id);
        dispatch(deleteSavingsPot(formData.id));
        dispatch(removeTransactionsBySavingsPotId(formData.id));
        notifications.show({
          title: 'Success',
          message: 'Savings Pot Successfully Deleted',
          color: "#4333A1"
        });
      }
      setConfirmModalOpen(false);
      onClose?.();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: `Error ${actionType}ing savings pot`,
        color: "red"
      });
      console.error(`Error ${actionType}ing savings pot:`, error);
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
      goalDate instanceof Date &&
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
              label="Target Amount (£)"
              value={formData.targetAmount}
              onChange={(value) => handleInputChange('targetAmount', value)}
              min={0}
              precision={2}
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Icon"
              data={[
                { value: 'icon1', label: 'Home' },
                { value: 'icon2', label: 'Plane' },
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
              label="Goal Date"
              value={formData.goalDate}
              onChange={(value) => handleInputChange('goalDate', value)}
              required
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Group className="modal-buttons" position="apart">
              <Button type="submit" color="#4333A1" disabled={!isFormValid()}>
                {editMode ? 'Update' : 'Create'} Savings Pot
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
        <Text>Are you sure you want to {actionType} this savings pot?</Text>
        <Group className="modal-buttons" position="apart" mt="md">
          <Button onClick={() => setConfirmModalOpen(false)} variant="outline">Cancel</Button>
          <Button onClick={handleConfirm} color={actionType === 'delete' ? 'red' : '#4333A1'}>Confirm</Button>
        </Group>
      </Modal>
    </Container>
  );
}