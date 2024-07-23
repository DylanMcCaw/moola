import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, TextInput, Select, Button, Group, NumberInput, Modal, Text, ColorInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { parseISO } from 'date-fns';
import ExpenseApi from '../../../api/ExpenseApi';
import { notifications } from '@mantine/notifications';
import { addExpense, updateExpense, deleteExpense } from '../../../store/slices/expensesSlice';

export function ExpenseForm({ onClose, editMode = false, initialData = null }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.id);

  const [formData, setFormData] = useState({
    userId: userId,
    description: '',
    amount: 0,
    category: '',
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
        icon: initialData.icon ?? 'icon1',
        category: initialData.category?.toString() ?? '0',  // Convert category to string
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
        const response = await ExpenseApi.updateExpense(formData.id, submissionData);
        dispatch(updateExpense(response));
        notifications.show({
          title: 'Success',
          message: 'Expense Successfully Updated',
          color: "#4333A1"
        });
      } else if (actionType === 'create') {
        const submissionData = {
          ...formData,
          startDate: formData.startDate.toISOString(),
        };
        const response = await ExpenseApi.createExpense(submissionData);
        dispatch(addExpense(response));
        notifications.show({
          title: 'Success',
          message: 'Expense Successfully Created',
          color: "#4333A1"
        });
      } else if (actionType === 'delete') {
        await ExpenseApi.deleteExpenseById(formData.id);
        dispatch(deleteExpense(formData.id));
        notifications.show({
          title: 'Success',
          message: 'Expense Successfully Deleted',
          color: "#4333A1"
        });
      }
      setConfirmModalOpen(false);
      onClose?.();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: `Error ${actionType}ing Expense`,
        color: "red"
      });
      console.error(`Error ${actionType}ing Expense:`, error);
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
              placeholder='e.g. Mortgage'
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <NumberInput
              label="Amount"
              prefix="£"
              thousandSeparator=","
              value={formData.amount}
              decimalScale={2}
              fixedDecimalScale
              defaultValue={0}
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
                { value: '0', label: 'Housing' },
                { value: '1', label: 'Transportation' },
                { value: '2', label: 'Food' },
                { value: '3', label: 'Healthcare' },
                { value: '4', label: 'Credit Card' },
                { value: '5', label: 'Entertainment' },
                { value: '6', label: 'Personal Care' },
                { value: '7', label: 'Education' },
                { value: '8', label: 'Other' }
              ]}
              value={formData.category}
              placeholder='Select a category'
              allowDeselect={false}
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
              placeholder='Select an icon'
              allowDeselect={false}
              onChange={(value) => handleInputChange('icon', value)}
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <ColorInput 
              label="Icon Colour"
              disallowInput
              withEyeDropper={false}
              swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
              value={formData.iconColour}
              placeholder="Select an icon colour"
              allowDeselect={false}
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
            <Group className="modal-buttons" position="apart">
              <Button type="submit" color="#4333A1" disabled={!isFormValid()}>
                {editMode ? 'Update' : 'Create'} Expense
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
        size="lg"
        radius={20}
      >
        <Text>Are you sure you want to {actionType} this Expense?</Text>
        <Group className="modal-buttons" position="apart" mt="md">
          <Button onClick={() => setConfirmModalOpen(false)} variant="outline" color="#4333A1">Cancel</Button>
          <Button onClick={handleConfirm} color={actionType === 'delete' ? 'red' : '#4333A1'}>Confirm</Button>
        </Group>
      </Modal>
    </Container>
  );
}
