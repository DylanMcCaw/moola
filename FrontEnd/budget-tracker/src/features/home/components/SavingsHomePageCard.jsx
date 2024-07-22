import React, { useState } from 'react';
import { Text, Card, RingProgress, List, ThemeIcon, rem, Progress, Pagination, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconPlane } from '@tabler/icons-react';
import './HomePageCardStyle.css';
import formatCurrency from '../../../utils/formatCurrency';

function SavingPotItem({ icon, color, title, amount, goal, progress, onClick }) {
  return (
    <List.Item
      icon={
        <ThemeIcon color={color} size={24} radius="xl">
          {icon}
        </ThemeIcon>
      }
      className="savingPotItem"
      onClick={onClick}
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

export function SavingsHomePageCard({ savings }) {
  const totalSavings = savings.reduce((acc, pot) => acc + pot.currentAmount, 0);
  const totalGoal = savings.length > 0
  ? savings.reduce((total, pot) => total + (pot.targetAmount || 0), 0).toFixed(2)
  : "0.00";
  const goalReachedPercentage = savings.length > 0
    ? (totalSavings / savings.reduce((acc, pot) => acc + pot.targetAmount, 0)) * 100
    : 0;

  const [currentPage, setCurrentPage] = useState(1);
  const savingsPerPage = 3;

  const totalPages = Math.ceil(savings.length / savingsPerPage);
  const indexOfLastSaving = currentPage * savingsPerPage;
  const indexOfFirstSaving = indexOfLastSaving - savingsPerPage;
  const currentSavings = savings.slice(indexOfFirstSaving, indexOfLastSaving);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();

  function handleGoToSavingsClick(){
    navigate('/savings'); 
  }

  return (
    <Card withBorder radius="20" className="large-card">
      <div className="inner">
        <div className="left-section">
          <div className="stats">
            <div>
              <Text size="xl">Total Savings</Text>
              <div className="amountText">
                <Text size="30px" fw={700}>£{totalSavings.toFixed(2)} <span style={{fontSize:"15px", color:"gray", fontWeight:"normal"}}> / {formatCurrency(totalGoal)} goal</span></Text>
              </div>
            </div>
          </div>
          <div className="savingPotsList">
            <div className='savingPotsListTitle'><Text>Saving Pots:</Text></div>
            {savings.length === 0 ? (
              <div className="no-savings-content">
                <Text size="md" color="dimmed" mb="md">Start saving by creating your first savings pot!</Text>
                <Button color="#4333A1" onClick={handleGoToSavingsClick}>Go To Savings</Button>
              </div>
            ) : (
              <List spacing="lg" size="m" center>
                {currentSavings.map((pot, index) => (
                  <SavingPotItem
                    key={index}
                    icon={<IconPlane style={{ width: rem(16), height: rem(16) }} />}
                    color="orange"
                    title={pot.description}
                    amount={`£${pot.currentAmount.toFixed(2)}`}
                    goal={`£${pot.targetAmount.toFixed(2)}`}
                    progress={(pot.currentAmount / pot.targetAmount) * 100}
                  />
                ))}
              </List>
            )}
          </div>
          {savings.length > 0 && (
            <div className="paginationContainer">
              <Pagination
                total={totalPages}
                value={currentPage}
                onChange={handlePageChange}
                color='#4333A1'
                size="sm"
              />
            </div>
          )}
        </div>
        {savings.length > 0 && (
        <div className="ringProgress">
          <RingProgress
            roundCaps
            thickness={15}
            size={320}
            sections={[{ value: goalReachedPercentage, color: "#4333A1" }]}
            label={
              <div>
                <Text ta="center" fz="lg">{goalReachedPercentage.toFixed(0)}%</Text>
                <Text ta="center" fz="s" c="dimmed">Goal Reached</Text>
              </div>
            }
          />
        </div>
        )}
      </div>
    </Card>
  );
}