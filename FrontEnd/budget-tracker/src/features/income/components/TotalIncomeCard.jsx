import React from 'react';
import { Text, Card, Stack, Group, Box } from '@mantine/core';

// Main component to display the total savings card
export function TotalIncomeCard({ totalIncome }) {

  return (
    <Card 
      withBorder 
      radius="20" 
      style={{
        height: '250px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
      }}
    >
      <Text size="xl">Total Income</Text>
      <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Stack align="center" spacing="xs">
          <Text size="50px" fw={700}>{totalIncome}</Text>
          <Text size="18px" color="gray.6">
             per month
          </Text>
        </Stack>
      </Box>
    </Card>
  );
}