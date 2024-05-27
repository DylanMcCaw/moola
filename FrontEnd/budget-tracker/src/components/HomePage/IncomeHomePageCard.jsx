import { useNavigate } from 'react-router-dom';
import { Text, Card, Button, Table, ThemeIcon } from '@mantine/core';
import { PieChart } from '@mantine/charts';
import { IconMoneybag, IconBriefcase, IconBrandSpotify, IconRouter } from '@tabler/icons-react';
import './HomePageCardStyle.css';

function ExpenseTable({ expenses }) {
  const rows = expenses.map((expense) => (
    <tr key={expense.name}>
      <td>
        <ThemeIcon color={expense.color} size="md" radius="xl">
          {expense.icon}
        </ThemeIcon>
      </td>
      <td className="name-column">{expense.name} <span className='category-text'>{expense.category}</span></td>
      <td className="amount-column">{expense.amount} <span className='category-text'>{expense.due}</span></td>
    </tr>
  ));

  return (
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
  );
}

export function IncomeHomePageCard() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/expenses');
  };

  const data = [
    { name: 'USA', value: 2500, color: 'green' },
    { name: 'India', value: 149, color: 'purple' },
  ];

  const expenseItems = [
    {
      icon: <IconBriefcase style={{ width: '16px', height: '16px' }} />,
      color: "green",
      name: "Salary",
      amount: "£2,500.00",
      due: "12/06/2024"
    },
    {
      icon: <IconMoneybag style={{ width: '16px', height: '16px' }} />,
      color: "purple",
      name: "Bonus",
      amount: "£149.00",
      due: "26/06/2024"
    },
  ];

  return (
    <Card withBorder radius="20" className="card">
      <div className="topRightText">
      <Text className="smallText" style={{ color: '#10A56D', fontWeight: "bold" }}>
          ▲ 4% <span style={{ color: "grey", fontSize: "10px" }}>vs last month</span>
        </Text>
      </div>
      <div className="icon">
        <IconMoneybag size={30} />
      </div>
      <div className="inner">
        <div className="stats">
          <Text size="xl">Total Income</Text>
          <div className="amountText">
            <Text size="30px" fw={700}>£2,649.00</Text> <span style={{ color: "grey", fontSize: "12px" }}>per month</span>
          </div>
        </div>
        <div className="pieChart">
          <PieChart 
            withTooltip
            tooltipDataSource="segment" 
            mx="auto"  
            data={data} 
            style={{ height: '220px', width: '220px' }} 
          />
        </div>
      </div>
      <div className="expenseTableContainer">
        <ExpenseTable expenses={expenseItems} />
      </div>
    </Card>
  );
}
