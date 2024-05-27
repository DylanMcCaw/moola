import { Text, Card, RingProgress, Button, List, ThemeIcon, rem, Progress } from '@mantine/core';
import { IconPigMoney, IconChevronRight, IconPlane, IconHome} from '@tabler/icons-react';
import './HomePageCardStyle.css';

export function HomePageCard() {
  return (
    <Card withBorder radius="20" className="card" w="550">
      <div className="topRightText">
        <Text className="smallText" style={{ color: 'green' }}>
          ↑ 5% <span style={{color:"grey", fontSize: "10px"}}>vs last month</span>
        </Text>
      </div>
      <div className="icon">
        <IconPigMoney size={30} /> {/* Adjust the icon size if needed */}
      </div>
      <div className="inner">
        <div className="stats">
          <Text size="xl">
            Total Savings
          </Text>
          <div className="amountText">
            <Text size="30px" fw={700} c="#4333A1">
              £10,240.49
            </Text>
          </div>
          <div className="depositedWithdrawnContainer">
          <div className="depositedText">
            <Text size="13px">
            <span style={{ color: 'green' }}>↑</span> £10,596.00
            </Text>
            <Text size="13px" c="dimmed" style={{ paddingTop: '10px' }}>
            Total Deposited
            </Text>
          </div>
          <div className="withdrawnText">
            <Text size="13px">
            <span style={{ color: 'red' }}>↓</span> £259.40
            </Text>
            <Text size="13px" c="dimmed" style={{ paddingTop: '10px' }}>
            Total Withdrawn
            </Text>
          </div>
          </div>
        </div>
        <div className="ringProgress">
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[{ value: (20 / 100) * 100, color: "#4333A1" }]}
            label={
              <div>
                <Text ta="center" fz="lg">
                  {((20 / 100) * 100).toFixed(0)}%
                </Text>
                <Text ta="center" fz="xs" c="dimmed">
                  Completed
                </Text>
              </div>
            }
          />
        </div>
      </div>
      <div className="savingPotsList">
        <div className='savingPotsListTitle'><Text>Saving Pots:</Text></div>
        <List
          spacing="xs"
          size="m"
          center
        >
          <List.Item
            icon={
              <ThemeIcon color="orange" size={24} radius="xl">
                <IconPlane style={{ width: rem(16), height: rem(16) }} />
              </ThemeIcon>
            }
          >
             <div className="listItemContent">
            <div className="textItem"> 
              <Text size='13px'>Holiday</Text>
            </div>
            <div className="textItem"> 
              <Text className="textItem" c="dimmed" size='13px'>£495.34</Text>
            </div>
            <div className="progressContainer">
              <div className="progressLabel"><Text size='13px'>50%</Text></div>
              <Progress value={50} mt="s" color = "#4333A1" style={{ width: "300px"}}/> 
            </div>
            </div>
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color="red" size={24} radius="xl">
                <IconHome style={{ width: rem(16), height: rem(16) }} />
              </ThemeIcon>
            }
          >
             <div className="listItemContent">
            <div className="textItem"> 
              <Text size='13px'>New Home</Text>
            </div>
            <div className="textItem"> 
              <Text className="textItem" c="dimmed" size='13px'>£9,509.34</Text>
            </div>
            <div className="progressContainer">
              <div className="progressLabel"><Text size='13px'>78%</Text></div>
              <Progress value={78} mt="s" color = "#4333A1" style={{ width: "300px"}}/> 
            </div>
            </div>
          </List.Item>

    </List>
      </div>
      <div className="bottomRightButton">
        <Button variant="subtle" compact>
          <IconChevronRight color='#4333A1' size={16} />
        </Button>
      </div>
    </Card>
  );
}
