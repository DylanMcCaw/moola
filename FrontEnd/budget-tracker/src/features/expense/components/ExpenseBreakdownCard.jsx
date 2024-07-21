import React, { useState } from 'react';
import { Text, Card, List, rem, Pagination } from '@mantine/core';
import "./ExpenseStyles.css";
import { PieChart } from '@mantine/charts';

function ExpenseBreakdownCard({ expenses }) {
    const pieChartData = expenses.map((expense) => ({
        name: expense.description,
        value: expense.amount,
        color: expense.iconColour 
      }));
      
  return (
    <Card withBorder radius="20" className="large-card">
    <Text size="xl" mb="md">Expense Breakdown</Text>
    {expenses.length > 0 ? (
      <PieChart 
        withTooltip
        tooltipDataSource="name"
        mx="auto"  
        data={pieChartData} 
        style={{ height: '220px', width: '220px' }}
        label={true}
        labelPosition="inside"
        labelOffset={-40}
      />
    ) : (
      <Text color="dimmed">No Expense data available</Text>
    )}
  </Card>
  );
}

export default ExpenseBreakdownCard;
