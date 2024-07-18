import { Text, Card } from '@mantine/core';
import { LineChart } from '@mantine/charts';

export function SavingsGraphCard({ data }) {
  return (
    <Card 
      withBorder 
      radius="20" 
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ marginBottom: '33px' }}>
        <Text size="xl">Total Trend</Text>
      </div>
      <LineChart
        h={300}
        data={data}
        dataKey="date"
        series={[{ name: 'Savings', color: '#4333A1' }]}
        curveType="linear"
        connectNulls
      />
      <div style={{ paddingBottom: '25px' }}></div>
    </Card>
  );
}