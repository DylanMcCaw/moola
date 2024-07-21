import React, { useState } from 'react';
import { Text, Card, List, rem, Pagination } from '@mantine/core';
import "./IncomeStyles.css";
import { PieChart } from '@mantine/charts';

function IncomeBreakdownCard({ incomes }) {
    const pieChartData = incomes.map((income) => ({
        name: income.description,
        value: income.amount,
        color: income.iconColour 
      }));
      
  return (
    <Card withBorder radius="20" className="large-card">
    <Text size="xl" mb="md">Income Breakdown</Text>
    {incomes.length > 0 ? (
      <PieChart 
        mx="auto"  
        data={pieChartData} 
        style={{ height: '300px', width: '300px' }}
        size={220}
        labelsType="percent" 
        withLabels
        labelPosition="outside"
        withTooltip
      />
    ) : (
      <Text color="dimmed">No income data available</Text>
    )}
  </Card>
  );
}

export default IncomeBreakdownCard;
