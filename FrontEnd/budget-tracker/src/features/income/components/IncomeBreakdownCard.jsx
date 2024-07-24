import React, { useState } from 'react';
import { Text, Card, Center, rem, Pagination } from '@mantine/core';
import "./IncomeStyles.css";
import { PieChart } from '@mantine/charts';

function IncomeBreakdownCard({ incomes }) {
    const pieChartData = incomes.map((income) => ({
        name: income.description,
        value: income.amount,
        color: income.iconColour 
      }));
      
  return (
    <Card withBorder radius="20">
    <Text size="xl" mb="md">Income Breakdown</Text>
    {incomes.length > 0 ? (
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
      <Center style={{ height: '100px' , paddingTop:"50px" }}>
          <Text size="md" color="dimmed">No transactions to display.</Text>
        </Center>
    )}
  </Card>
  );
}

export default IncomeBreakdownCard;
