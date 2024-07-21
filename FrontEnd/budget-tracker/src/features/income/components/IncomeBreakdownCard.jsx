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
      <Text color="dimmed">No income data available</Text>
    )}
  </Card>
  );
}

export default IncomeBreakdownCard;
