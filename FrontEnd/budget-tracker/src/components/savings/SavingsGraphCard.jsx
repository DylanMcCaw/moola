import { Text, Card, RingProgress} from '@mantine/core';
import { LineChart } from '@mantine/charts';
import "./SavingsStyles.css"


export function SavingsGraphCard() {
  const data = [
    {
      date: 'Mar 22',
      Apples: 110,
    },
    {
      date: 'Mar 23',
      Apples: 60,
    },
    {
      date: 'Mar 24',
      Apples: 80,
    },
    {
      date: 'Mar 25',
      Apples: null,
    },
    {
      date: 'Mar 26',
      Apples: null,
    },
    {
      date: 'Mar 27',
      Apples: 40,
    },
    {
      date: 'Mar 28',
      Apples: 120,
    },
    {
      date: 'Mar 29',
      Apples: 80,
    },
  ];

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
      series={[{ name: 'Apples', color: '#4333A1' }]}
      curveType="linear"
      connectNulls
    />
    </Card>
  );
}
