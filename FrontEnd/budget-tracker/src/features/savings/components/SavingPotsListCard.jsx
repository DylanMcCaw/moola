import React, { useState } from 'react';
import { Text, Card, List, rem, Pagination, ActionIcon, Tooltip, Button, Center } from '@mantine/core';
import { IconPlus, IconPigMoney } from '@tabler/icons-react';
import SavingPotItem from './SavingsPotItem';
import "./SavingsStyles.css";
import { savingsIconOptions } from '../../common/savingsIconOptions';

function SavingsPotListCard({ savingPots, onAddClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(savingPots.length / itemsPerPage);
  const indexOfLastSaving = currentPage * itemsPerPage;
  const indexOfFirstSaving = indexOfLastSaving - itemsPerPage;
  const currentSavings = savingPots.slice(indexOfFirstSaving, indexOfLastSaving);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (index) => {
    console.log(`Edit clicked for pot ${index}`);
  };

  const handleDepositClick = (index) => {
    console.log(`Deposit/Withdraw clicked for pot ${index}`);
  };

  const getIconComponent = (iconName) => {
    if (!iconName || iconName === false) {
      // Default icon if no icon name is provided or if false is passed
      return <IconPigMoney style={{ width: rem(16), height: rem(16) }} />;
    }

    const iconOption = savingsIconOptions.find(option => option.value === iconName);
    if (iconOption) {
      const IconComponent = iconOption.icon;
      return <IconComponent style={{ width: rem(16), height: rem(16) }} />;
    }

    // If no matching icon is found, return the default icon
    return <IconPigMoney style={{ width: rem(16), height: rem(16) }} />;
  };

  return (
    <Card withBorder radius="20">
      <div className="savingPotsList">
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text size="xl">Saving Pots</Text>
          {savingPots.length > 0 && (
            <Tooltip label="Create New Savings Pot" withArrow>
              <ActionIcon color="#4333A1" variant="outline" onClick={onAddClick}>
                <IconPlus size="1.125rem" />
              </ActionIcon>
            </Tooltip>
          )}
        </div>
        {savingPots.length === 0 ? (
          <Center style={{ height: '100%', flexDirection: 'column', paddingTop:"40px"}}>
            <Text size="md" color="dimmed" mb="md">Start saving by creating your first savings pot!</Text>
            <Button color="#4333A1" onClick={onAddClick}>Create Savings Pot</Button>
          </Center>
        ) : (
          <>
            <List spacing="lg" size="m" center>
              {currentSavings.map((pot, index) => (
                <SavingPotItem
                  id={pot.id}
                  key={index}
                  icon={getIconComponent(pot.icon)}
                  color={pot.color}
                  title={pot.title}
                  amount={pot.amount}
                  goal={pot.goal}
                  progress={pot.progress}
                  onEditClick={() => handleEditClick(index)}
                  onDepositClick={() => handleDepositClick(index)}
                />
              ))}
            </List>
            <div className='paginationContainer'>
              <Pagination
                total={totalPages}
                value={currentPage}
                onChange={handlePageChange}
                color='#4333A1'
                size="sm"
                className="pagination"
              />
            </div>
          </>
        )}
      </div>
    </Card>
  );
}

export default SavingsPotListCard;