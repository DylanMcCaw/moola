import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, TextInput, Select, Button, Group, NumberInput, Modal, Text, ColorInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { parseISO } from 'date-fns';
import IncomeApi from '../../../api/IncomeApi';
import { notifications } from '@mantine/notifications';
import { addIncome, updateIncome, deleteIncome } from '../../../store/slices/incomesSlice';
import { incomeIconOptions  } from '../../common/incomeExpenseIconOptions';

export function IncomeForm({ onClose, editMode = false, initialData = null }) {
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
        category: initialData.category?.toString() ?? '0', 
        icon: initialData.icon ?? 'icon1',
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
      <form onSubmit={handleSubmit} key={editMode ? initialData?.id : 'new'}>
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              label="Description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder='e.g. Salary'
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
              key={formData.category}
              label="Category"
              data={[
                { value: '0', label: 'Salary' },
                { value: '1', label: 'Bonus' },
                { value: '2', label: 'Rental' },
                { value: '3', label: 'Investment' },
                { value: '4', label: 'Government' },
                { value: '5', label: 'Other' },
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
              key={formData.icon}
              label="Icon"
              data={incomeIconOptions.map(option => ({
                value: option.value,
                label: option.label,
                icon: <option.icon size={18} />,  // Add icon to the select options
              }))}
              value={formData.icon}
              placeholder='Select an icon'
              allowDeselect={false}
              onChange={(value) => handleInputChange('icon', value)}
              required
              itemComponent={({ label, icon }) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {icon}
                  <span style={{ marginLeft: '10px' }}>{label}</span>
                </div>
              )}
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
        radius={20}
      >
        <Text>Are you sure you want to {actionType} this income?</Text>
        <Group className="modal-buttons" position="apart" mt="md">
          <Button onClick={() => setConfirmModalOpen(false)} variant="outline" color="#4333A1">Cancel</Button>
          <Button onClick={handleConfirm} color={actionType === 'delete' ? 'red' : '#4333A1'}>Confirm</Button>
        </Group>
      </Modal>
    </Container>
  );
}
