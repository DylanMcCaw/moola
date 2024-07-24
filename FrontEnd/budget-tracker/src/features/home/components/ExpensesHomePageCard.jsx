import React, { useState } from 'react';
import { Text, Card, Table, ThemeIcon, Button, Pagination, rem, Badge } from '@mantine/core';
import { PieChart } from '@mantine/charts';
import { useNavigate } from 'react-router-dom';
import { expenseIconOptions } from '../../common/incomeExpenseIconOptions';
import ExpenseCategory from '../../expense/components/ExpenseCategory';
import formatCurrency from '../../../utils/formatCurrency';
import formatDate from '../../../utils/formatDate';
import calculateDueDate from '../../../utils/calculateDueDate';
import './HomePageCardStyle.css';

function getIconComponent(iconName) {
  const iconOption = expenseIconOptions.find(option => option.value === iconName);
  if (iconOption) {
    const IconComponent = iconOption.icon;
    return <IconComponent style={{ width: rem(16), height: rem(16) }} />;
  }
  return null;
}

const getDueBadge = (date) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const threeDaysFromNow = new Date(now.setDate(now.getDate() + 3));
  
  if (date.getDate() === today.getDate()) {
    return <Badge variant="outline" color="red" size="xs" style={{ marginRight: '4px' }}>Due Today</Badge>;
  } else if (date <= threeDaysFromNow) {
    return <Badge variant="outline" color="red" size="xs" style={{ marginRight: '4px' }}>Due Soon</Badge>;
  }
  return null;
};

function ExpenseTable({ expenses }) {
  const [currentPage, setCurrentPage] = useState(1);
  const expensesPerPage = 3;

  // Sort expenses by due date
  const sortedExpenses = [...expenses].sort((a, b) => {
    const dateA = calculateDueDate(a.startDate);
    const dateB = calculateDueDate(b.startDate);
    return dateA - dateB;
  });

  const totalPages = Math.ceil(sortedExpenses.length / expensesPerPage);
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = sortedExpenses.slice(indexOfFirstExpense, indexOfLastExpense);

  const rows = currentExpenses.map((expense) => {
    const dueDate = calculateDueDate(expense.startDate);
    return (
      <tr key={expense.id}>
        <td>
          <ThemeIcon color={expense.iconColour} size="md" radius="xl">
            {getIconComponent(expense.icon)}
          </ThemeIcon>
        </td>
        <td className="name-column">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{paddingRight:"10px"}}>{expense.description}</span>
            {getDueBadge(dueDate)}
          </div>
          <span className='category-text'>{ExpenseCategory[expense.category]}</span>
        </td>
        <td className="amount-column">
          {formatCurrency(expense.amount)} 
          <span className='category-text'>
            {formatDate(dueDate)}
          </span>
        </td>
      </tr>
    );
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Table>
        <thead className='table-header'>
          <tr>
            <th className="name-column"><span style={{ color: "grey", fontSize: "12px" }}>Expense</span></th>
            <th></th>
            <th className="amount-column"><span style={{ color: "grey", fontSize: "12px" }}>Amount</span></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      {sortedExpenses.length > 0 && (
        <div className="paginationContainer">
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={handlePageChange}
            color='#4333A1'
            size="sm"
          />
        </div>
      )}
    </div>
  );
}

export function ExpensesHomePageCard({ expenses }) {
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const navigate = useNavigate();

  function handleGoToExpensesClick() {
    navigate('/expenses');
  }

  const data = expenses.map((expense) => ({
    name: expense.description,
    value: expense.amount,
    color: expense.iconColour
  }));

  return (
    <Card withBorder radius="20" className="card">
      <div className="inner">
        <div className="stats">
          <Text size="xl">Total Expenses</Text>
          <div className="amountText">
            <Text size="30px" fw={700}>{formatCurrency(totalExpenses)}</Text> <span style={{ color: "grey", fontSize: "12px" }}>per month</span>
          </div>
        </div>
        <div className="pieChart">
          {expenses.length > 0 ? (
            <PieChart 
              withTooltip
              tooltipDataSource="name"
              mx="auto"  
              data={data} 
              style={{ height: '220px', width: '400px' }}
              labelsType="percent" 
              withLabels
              labelPosition="outside"
            />
          ) : (
            <div>
            </div>
          )}
        </div>
      </div>
      <div className="tableContainer">
        {expenses.length === 0 ? (
          <div className="no-data-content">
            <Text size="md" color="dimmed" mb="md">Start by adding your first expense!</Text>
            <Button color="#4333A1" onClick={handleGoToExpensesClick}>Go To Expenses</Button>
          </div>
        ) : (
          <ExpenseTable expenses={expenses} />
        )}
      </div>
    </Card>
  );
}