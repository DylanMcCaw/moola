import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Title } from '@mantine/core';
import { TotalExpenseCard } from './components/TotalExpenseCard.jsx';
import ExpenseBreakdownCard  from './components/ExpenseBreakdownCard.jsx' 
import ExpenseTable from './components/ExpenseTable';
import { ExpenseForm } from './components/ExpenseForm';
import { addExpense } from '../../store/slices/expensesSlice.js';
import formatCurrency from '../../utils/formatCurrency.js';
import './components/ExpenseStyles.css';

function Expense() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses) || [];
  const [opened, { open, close }] = useDisclosure(false);

  const totalExpense = expenses.length > 0 
    ? expenses.reduce((total, expense) => total + (expense.amount || 0), 0).toFixed(2)
    : "0.00";

  const handleNewExpense = (newExpense) => {
    dispatch(addExpense(newExpense));
    close();
  };

  return (
    <div className="savings-page">
      <Title className="dashboard-title">Expenses</Title>
      <div className="center-wrapper">
        <div className="cards-container">
          <div className="full-width-card">
            <TotalExpenseCard           
              totalExpense={formatCurrency(totalExpense)} 
            />
          </div>
          <div className="bottom-cards-container-savings">
            <div className="half-width-card">
              <ExpenseTable expenses={expenses} onAddClick={open} />
            </div>
            <div className="half-width-card">
              <ExpenseBreakdownCard expenses={expenses} />
            </div>
          </div>
        </div>
      </div>

      <Modal opened={opened} onClose={close} title="Create Expense" size="lg" centered>
        <ExpenseForm onNewExpense={handleNewExpense} />
      </Modal>
    </div>
  );
}

export default Expense;