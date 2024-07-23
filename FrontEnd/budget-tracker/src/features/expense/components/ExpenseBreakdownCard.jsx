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
      mx="auto"  
      data={pieChartData} 
      style={{ height: '300px', width: '350px' }}
      size={220}
      labelsType="percent" 
      withLabels
      labelPosition="outside"
      withTooltip
      />
    ) : (
      <Text color="dimmed" style={{alignSelf:"center", paddingTop:"60px"}}>No Expense data available</Text>
    )}
  </Card>
  );
}

export default ExpenseBreakdownCard;
