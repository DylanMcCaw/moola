import React, { useState } from 'react';
import { Text, Card, Table, ThemeIcon, Pagination } from '@mantine/core';
import { PieChart } from '@mantine/charts';
import { IconMoneybag } from '@tabler/icons-react';
import IconComponents from '../IconComponents';
import IncomeCategory from '../income/IncomeCategory';
import './HomePageCardStyle.css';

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

function IncomeTable({ incomes }) {
  const [currentPage, setCurrentPage] = useState(1);
  const incomesPerPage = 4;

  // Calculate total number of pages
  const totalPages = Math.ceil(incomes.length / incomesPerPage);

  // Calculate index of the first and last income for the current page
  const indexOfLastIncome = currentPage * incomesPerPage;
  const indexOfFirstIncome = indexOfLastIncome - incomesPerPage;
  const currentIncomes = incomes.slice(indexOfFirstIncome, indexOfLastIncome);

  const rows = currentIncomes.map((income) => {
    // Check if the icon exists in IconComponents, default to IconMoneybag if not found
    const IconComponent = IconComponents[income.icon] || IconMoneybag;
    return (
      <tr key={income.id}>
        <td style={{width:"60px"}}>
          <ThemeIcon color={income.iconColour} size="md" radius="xl">
            <IconComponent />
          </ThemeIcon>
        </td>
        <td className="name-column">
          {income.description} <span className='category-text'>{IncomeCategory[income.category]}</span>
        </td>
        <td className="amount-column">
          {formatCurrency(income.amount)} <span className='category-text'>{formatDate(income.startDate)}</span>
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
            <th className="name-column"><span style={{ color: "grey", fontSize: "12px" }}>Income</span></th>
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

export function IncomeHomePageCard({ incomes }) {

  // Calculate the total amount of incomes
  const totalIncomes = incomes.reduce((acc, income) => acc + income.amount, 0);

  // Format data for PieChart
  const data = incomes.map((income) => ({
    name: income.description,
    value: income.amount,
    color: income.iconColour 
  }));

  return (
    <Card withBorder radius="20" className="card">
      <div className="inner">
        <div className="stats">
          <Text size="xl">Total Income</Text>
          <div className="amountText">
            <Text size="30px" fw={700}>{formatCurrency(totalIncomes)}</Text> <span style={{ color: "grey", fontSize: "12px" }}>per month</span>
          </div>
        </div>
        <div className="pieChart">
          <PieChart 
            withTooltip
            tooltipDataSource="name"
            mx="auto"  
            data={data} 
            style={{ height: '220px', width: '220px' }}
            label={true}
            labelPosition="inside"
            labelOffset={-40}
          />
        </div>
      </div>
      <div className="tableContainer">
        <IncomeTable incomes={incomes} />
      </div>
    </Card>
  );
}
