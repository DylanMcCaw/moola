import { useNavigate } from 'react-router-dom';
import { Text, Card, Button, Table, ThemeIcon } from '@mantine/core';
import { PieChart } from '@mantine/charts';
import { IconWallet, IconCar, IconBrandNetflix, IconBrandSpotify, IconRouter } from '@tabler/icons-react';
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
          <th className="name-column"><span style={{ color: "grey", fontSize: "12px" }}>Expense</span></th>
          <th></th>
          <th className="amount-column"><span style={{ color: "grey", fontSize: "12px" }}>Amount</span></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export function ExpensesHomePageCard() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/expenses');
  };

  const data = [
    { name: 'USA', value: 400, color: 'indigo.6' },
    { name: 'India', value: 300, color: 'yellow.6' },
    { name: 'Japan', value: 300, color: 'teal.6' },
    { name: 'Other', value: 200, color: 'gray.6' },
  ];

  const expenseItems = [
    {
      icon: <IconBrandNetflix style={{ width: '16px', height: '16px' }} />,
      color: "red",
      name: "Netflix",
      category: "Entertainment",
      amount: "£15.99",
      due: "12/06/2024"
    },
    {
      icon: <IconBrandSpotify style={{ width: '16px', height: '16px' }} />,
      color: "green",
      name: "Spotify",
      category: "Entertainment",
      amount: "£13.99",
      due: "26/06/2024"
    },
    {
      icon: <IconCar style={{ width: '16px', height: '16px' }} />,
      color: "blue",
      name: "Car",
      category: "Transport",
      amount: "£249.00",
      due: "12/06/2024"
    },
    {
      icon: <IconRouter style={{ width: '16px', height: '16px' }} />,
      color: "yellow",
      name: "Internet",
      category: "Utilites",
      amount: "£35.99",
      due: "26/06/2024"
    },
  ];

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
            <Text size="30px" fw={700}>£1,189.00</Text> <span style={{ color: "grey", fontSize: "12px" }}>per month</span>
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
