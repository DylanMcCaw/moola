import React, { useState } from 'react';
import { Text, Card, Table, ThemeIcon, Pagination, Button } from '@mantine/core';
import { PieChart } from '@mantine/charts';
import { IconMoneybag } from '@tabler/icons-react';
import IconComponents from '../../common/IconComponents';
import IncomeCategory from '../../income/components/IncomeCategory';
import formatCurrency from '../../../utils/formatCurrency';
import formatDate from '../../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import './HomePageCardStyle.css';

function IncomeTable({ incomes }) {
  const [currentPage, setCurrentPage] = useState(1);
  const incomesPerPage = 4;

  const totalPages = Math.ceil(incomes.length / incomesPerPage);
  const indexOfLastIncome = currentPage * incomesPerPage;
  const indexOfFirstIncome = indexOfLastIncome - incomesPerPage;
  const currentIncomes = incomes.slice(indexOfFirstIncome, indexOfLastIncome);

  const rows = currentIncomes.map((income) => {
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
      {incomes.length > 0 && (
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

export function IncomeHomePageCard({ incomes }) {
  const totalIncomes = incomes.reduce((acc, income) => acc + income.amount, 0);

  const navigate = useNavigate();

  function handleGoToIncomesClick(){
    navigate('/'); 
  }

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
          {incomes.length > 0 ? (
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
          ) : (
            <div>
            </div>
          )}
        </div>
      </div>
      <div className="tableContainer">
        {incomes.length === 0 ? (
          <div className="no-incomes-content">
            <Text size="md" color="dimmed" mb="md">Start by adding your first income source!</Text>
            <Button color="#4333A1" onClick={handleGoToIncomesClick()}>Go To Incomes</Button>
          </div>
        ) : (
          <IncomeTable incomes={incomes} />
        )}
      </div>
    </Card>
  );
}