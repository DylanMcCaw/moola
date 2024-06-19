import { Text, Card } from '@mantine/core';
import "./SavingsStyles.css";

export function TotalSavingsCard() {
  return (
    <Card withBorder radius="20" className="large-card">
      <div className="inner">
        <div className="left-section">
          <Text size="xl">Total Savings</Text>
        </div>
        <div className="totalText">
          <Text size="30px" fw={700}>£10,240.49</Text>
        </div>
      </div>
    </Card>
  );
}
