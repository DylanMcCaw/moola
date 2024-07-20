import React from 'react';
import { useSelector } from 'react-redux';
import { Text, Card, Stack, Group, Box } from '@mantine/core';
import { parseISO, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

// Helper function to calculate totals for the current month
const getMonthlyTotals = (transactions) => {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);

  let totalDeposited = 0;
  let totalWithdrawn = 0;

  transactions.forEach(transaction => {
    if (!transaction.transactionDate || !transaction.transactionType) {
      console.error('Invalid transaction data:', transaction);
      return; // Skip this transaction
    }

    try {
      const transactionDate = parseISO(transaction.transactionDate);

      if (isWithinInterval(transactionDate, { start, end })) {
        if (transaction.transactionType.toLowerCase() === 'deposit') {
          totalDeposited += transaction.amount;
        } else if (transaction.transactionType.toLowerCase() === 'withdraw') {
          totalWithdrawn += transaction.amount;
        }
      }
    } catch (error) {
      console.error('Error parsing transaction date:', transaction.transactionDate, error);
    }
  });

  return { totalDeposited, totalWithdrawn };
};

// Stateless component to display stat text
function StatText({ label, value, color, highlight }) {
  return (
    <div className="depositedText" style={{ textAlign: 'left' }}>
      <Text size="15px">
        <span style={{ color }}>{highlight}</span> {value}
      </Text>
      <Text size="13px" c="dimmed" style={{ paddingTop: '5px' }}>
        {label}
      </Text>
    </div>
  );
}

// Main component to display the total savings card
export function TotalSavingsCard({ totalSavings, totalGoal }) {
  // Fetch transactions from Redux state
  const transactions = useSelector((state) => state.savingPotTransactions) || [];

  // Calculate totals for the current month
  const { totalDeposited, totalWithdrawn } = getMonthlyTotals(transactions);

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
      <div className="topRightText" style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <Text className="smallText" style={{ color: '#10A56D', fontWeight: "bold" }}>
          ▲ 5% <span style={{ color: "grey", fontSize: "10px" }}>vs last month</span>
        </Text>
      </div>
      <Text size="xl">Total Savings</Text>
      <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Stack align="center" spacing="xs">
          <Text size="50px" fw={700}>{totalSavings}</Text>
          <Text size="18px" color="gray.6">
            /{totalGoal} goal
          </Text>
        </Stack>
        <Group position="center" spacing="xl" style={{ marginLeft: '100px', marginTop: '40px', width: '100%', maxWidth: '300px' }}>
          <StatText label="Total Deposited" value={`£${totalDeposited.toFixed(2)}`} color="#10A56D" highlight="▲" />
          <StatText label="Total Withdrawn" value={`£${totalWithdrawn.toFixed(2)}`} color="#F45656" highlight="▼" />
        </Group>
      </Box>
    </Card>
  );
}
