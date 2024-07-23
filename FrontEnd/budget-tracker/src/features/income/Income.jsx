import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Title } from '@mantine/core';
import { TotalIncomeCard } from './components/TotalIncomeCard.jsx';
import IncomeBreakdownCard  from './components/IncomeBreakdownCard.jsx' 
import IncomeTable from './components/IncomeTable';
import { IncomeForm } from './components/IncomeForm';
import { addIncome } from '../../store/slices/incomesSlice';
import formatCurrency from '../../utils/formatCurrency';
import './components/IncomeStyles.css';

function Income() {
  const dispatch = useDispatch();
  const incomes = useSelector((state) => state.incomes) || [];
  const [opened, { open, close }] = useDisclosure(false);

  const totalIncome = incomes.length > 0 
    ? incomes.reduce((total, income) => total + (income.amount || 0), 0).toFixed(2)
    : "0.00";

  const handleNewIncome = (newIncome) => {
    dispatch(addIncome(newIncome));
    close();
  };

  return (
    <div className="savings-page">
      <Title className="dashboard-title">Incomes</Title>
      <div className="center-wrapper">
        <div className="cards-container">
          <div className="full-width-card">
            <TotalIncomeCard           
              totalIncome={formatCurrency(totalIncome)} 
            />
          </div>
          <div className="bottom-cards-container-savings">
            <div className="half-width-card">
              <IncomeTable incomes={incomes} onAddClick={open} />
            </div>
            <div className="half-width-card">
              <IncomeBreakdownCard incomes={incomes} />
            </div>
          </div>
        </div>
      </div>

      <Modal opened={opened} onClose={close} title="Create New Income" size="lg" centered radius={20}> 
        <IncomeForm onNewIncome={handleNewIncome} />
      </Modal>
    </div>
  );
}

export default Income;