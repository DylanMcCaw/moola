import { Text, Card } from '@mantine/core';
import { LineChart } from '@mantine/charts';
import "./SavingsStyles.css";

export function SavingsGraphCard({ data }) {
  return (
    <Card withBorder radius="20" className="totalTrendCard">
      <div className="inner">
        <div className="left-section">
          <Text size="xl">Total Trend</Text>
        </div>
      </div>
      <LineChart
        h={300}
        data={data}
        dataKey="date"
        series={[{ name: 'Savings', color: '#4333A1' }]}
        curveType="linear"
        connectNulls
      />
    </Card>
  );
}
