import { Text, Card, Stack } from '@mantine/core';


function StatText({ label, value, color, highlight }) {
  return (
    <div className="depositedText">
      <Text size="15px">
        <span style={{ color }}>{highlight}</span> {value}
      </Text>
      <Text size="13px" c="dimmed" style={{ paddingTop: '10px' }}>
        {label}
      </Text>
    </div>
  );
}

export function TotalSavingsCard({ totalSavings, totalGoal }) {
  return (
    <Card 
      withBorder 
      radius="20" 
      style={{
        height: '200px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
            <div className="topRightText">
        <Text className="smallText" style={{ color: '#10A56D', fontWeight: "bold" }}>
          ▲ 5% <span style={{ color: "grey", fontSize: "10px" }}>vs last month</span>
        </Text>
      </div>
      <Text 
        size="xl" 
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
        }}
      >
        Total Savings
      </Text>
      <Stack align="center" spacing="xs" style={{ height: '100%', justifyContent: 'center' }}>
        <Text size="50px" fw={700}>{totalSavings}</Text>
        <Text size="18px" color="gray.6">
          /{totalGoal} goal
        </Text>
      </Stack>
              <StatText label="Total Deposited" value={"£1,400.00"} color="#10A56D" highlight="▲" />
              <StatText label="Total Withdrawn" value={"£50.00"} color="#F45656" highlight="▼" />

    </Card>
  );
}