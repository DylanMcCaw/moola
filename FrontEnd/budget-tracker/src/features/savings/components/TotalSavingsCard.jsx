import { Text, Card, Stack, Group, Box } from '@mantine/core';

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

export function TotalSavingsCard({ totalSavings, totalGoal }) {
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
          <StatText label="Total Deposited" value={"£1,400.00"} color="#10A56D" highlight="▲" />
          <StatText label="Total Withdrawn" value={"£50.00"} color="#F45656" highlight="▼" />
        </Group>
      </Box>
    </Card>
  );
}