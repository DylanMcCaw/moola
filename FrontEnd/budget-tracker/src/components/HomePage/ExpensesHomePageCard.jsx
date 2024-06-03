import React, { useState } from 'react';
import { Text, Card, Table, ThemeIcon, Button } from '@mantine/core';
import { PieChart } from '@mantine/charts';
import { IconWallet } from '@tabler/icons-react';
import IconComponents from '../IconComponents';
import ExpenseCategory from '../expense/ExpenseCategory';
import './HomePageCardStyle.css';
import { Pagination } from '@mantine/core';

// Function to format amount as currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(amount);
};

// Function to format date to dd/mm/yyyy
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB').format(date);
};

function ExpenseTable({ expenses }) {
  const [currentPage, setCurrentPage] = useState(1);
  const expensesPerPage = 5;

  // Calculate total number of pages
  const totalPages = Math.ceil(expenses.length / expensesPerPage);

  // Calculate index of the first and last expense for the current page
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

  const rows = currentExpenses.map((expense) => {
    // Check if the icon exists in IconComponents, default to IconWallet if not found
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
 <div className="paginationContainer">
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={handlePageChange}
          color='#4333A1'
          size="sm"
        />
      </div>
    </div>
  );
}

export function ExpensesHomePageCard({ expenses }) {

  // Calculate the total amount of expenses
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  // Format data for PieChart
  const data = expenses.map((expense) => ({
    name: expense.description,
    value: expense.amount,
    color: expense.iconColour // Use expense.iconColour for color
  }));

  return (
    <Card withBorder radius="20" className="card">
      <div className="topRightText">
        <Text className="smallText" style={{ color: '#F45656', fontWeight: "bold" }}>
          ▲ 17% <span style={{ color: "grey", fontSize: "10px" }}>vs last month</span>
        </Text>
      </div>
      <div className="icon">
        <IconWallet size={30} />
      </div>
      <div className="inner">
        <div className="stats">
          <Text size="xl">Total Expenses</Text>
          <div className="amountText">
            <Text size="30px" fw={700}>{formatCurrency(totalExpenses)}</Text> <span style={{ color: "grey", fontSize: "12px" }}>per month</span>
          </div>
        </div>
        <div className="pieChart">
        <PieChart 
          withTooltip
          tooltipDataSource="description" // Set tooltipDataSource to "name"
          mx="auto"  
          data={data} 
          style={{ height: '220px', width: '220px' }}
          label={true}
          labelPosition="inside"
          labelOffset={-40}
        />
        </div>
      </div>
      <div className="expenseTableContainer">
        <ExpenseTable expenses={expenses} />
      </div>
    </Card>
  );
}
