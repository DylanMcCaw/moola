import "./SavingsStyles.css";
import { Text, Card, RingProgress, List, ThemeIcon, rem, Progress } from '@mantine/core';
import { IconPigMoney, IconPlane, IconHome } from '@tabler/icons-react';

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

  
export function SavingsPotListCard() {
  return (
    <Card withBorder radius="20" className="large-card">
      <div className="inner">
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
    </Card>
  );
}
