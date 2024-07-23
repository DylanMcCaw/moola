import React, { useState } from 'react';
import { Text, Card, Table, ThemeIcon, Button, Pagination } from '@mantine/core';
import { PieChart } from '@mantine/charts';
import { IconWallet } from '@tabler/icons-react';
import IconComponents from '../../common/IconComponents';
import ExpenseCategory from '../../expense/components/ExpenseCategory';
import formatCurrency from '../../../utils/formatCurrency';
import formatDate from '../../../utils/formatDate';
import './HomePageCardStyle.css';

function ExpenseTable({ expenses }) {
  const [currentPage, setCurrentPage] = useState(1);
  const expensesPerPage = 3;

  const totalPages = Math.ceil(expenses.length / expensesPerPage);
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

  const rows = currentExpenses.map((expense) => {
    const IconComponent = IconComponents[expense.icon] || IconWallet;
    return (
      <tr key={expense.id}>
        <td>
          <ThemeIcon color={expense.iconColour} size="md" radius="xl">
            <IconComponent />
          </ThemeIcon>
        </td>
        <td className="name-column">
          {expense.description} <span className='category-text'>{ExpenseCategory[expense.category]}</span>
        </td>
        <td className="amount-column">
          {formatCurrency(expense.amount)} <span className='category-text'>{formatDate(expense.startDate)}</span>
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
      {expenses.length > 0 && (
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
            <Button color="#4333A1">Go To Expenses</Button>
          </div>
        ) : (
          <ExpenseTable expenses={expenses} />
        )}
      </div>
    </Card>
  );
}