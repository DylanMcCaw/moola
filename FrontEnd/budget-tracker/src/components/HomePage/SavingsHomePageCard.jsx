import { Text, Card, RingProgress, List, ThemeIcon, rem, Progress } from '@mantine/core';
import { IconPigMoney, IconPlane, IconHome } from '@tabler/icons-react';
import './HomePageCardStyle.css';

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

function SavingPotItem({ icon, color, title, amount, goal, progress }) {
  return (
    <List.Item
      icon={
        <ThemeIcon color={color} size={24} radius="xl">
          {icon}
        </ThemeIcon>
      }
    >
      <div className="listItemContent">
        <div className="textItem">
          <Text size='13px'>{title}</Text>
        </div>
        <div className="textItem">
          <Text className="textItem" c="dimmed" size='13px'>{amount} / {goal}</Text>
        </div>
        <div className="progressContainer">
          <div className="progressLabel"><Text size='13px'>{progress}%</Text></div>
          <Progress value={progress} mt="s" color="#4333A1" style={{ width: "600px" }} />
        </div>
      </div>
    </List.Item>
  );
}

export function SavingsHomePageCard() {
  return (
    <Card withBorder radius="20" className="large-card">
      <div className="topRightText">
        <Text className="smallText" style={{ color: '#10A56D', fontWeight: "bold" }}>
          ▲ 5% <span style={{ color: "grey", fontSize: "10px" }}>vs last month</span>
        </Text>
      </div>
      <div className="icon">
        <IconPigMoney size={30} />
      </div>
      <div className="inner">
        <div className="left-section">
          <div className="stats">
            <div>
              <Text size="xl">Total Savings</Text>
              <div className="amountText">
                <Text size="30px" fw={700}>£10,240.49</Text>
              </div>
            </div>
            <div className="depositedWithdrawnContainer">
              <StatText label="Total Deposited" value="£10,596.00" color="#10A56D" highlight="▲" />
              <StatText label="Total Withdrawn" value="£259.40" color="#F45656" highlight="▼" />
            </div>
          </div>
          <div className="savingPotsList">
            <div className='savingPotsListTitle'><Text>Saving Pots:</Text></div>
            <List spacing="lg" size="m" center>
              <SavingPotItem
                icon={<IconPlane style={{ width: rem(16), height: rem(16) }} />}
                color="orange"
                title="Holiday"
                amount="£495.34"
                goal="£1,000.00"
                progress={50}
              />
              <SavingPotItem
                icon={<IconHome style={{ width: rem(16), height: rem(16) }} />}
                color="red"
                title="New Home"
                amount="£9,509.34"
                goal="£11,000.00"
                progress={78}
              />
            </List>
          </div>
        </div>
        <div className="ringProgress">
          <RingProgress
            roundCaps
            thickness={15}
            size={290}
            sections={[{ value: 58, color: "#4333A1" }]}
            label={
              <div>
                <Text ta="center" fz="lg">58%</Text>
                <Text ta="center" fz="s" c="dimmed">Goal Reached</Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
}
