import React, { useState } from 'react';
import { Text, Card, List, rem, Pagination, ActionIcon, Tooltip} from '@mantine/core';
import { IconPlane, IconHome, IconPlus } from '@tabler/icons-react';
import SavingPotItem from './SavingsPotItem';
import "./SavingsStyles.css";

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

  return (
    <Card withBorder radius="20" className="large-card">
      <div className="savingPotsList">
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text size="xl">Saving Pots</Text>
          <Tooltip label="Create New Savings Pot" withArrow>
          <ActionIcon color="#4333A1" variant="outline" onClick={onAddClick}>
            <IconPlus size="1.125rem" />
          </ActionIcon>
          </Tooltip>
        </div>
        <List spacing="lg" size="m" center>
          {currentSavings.map((pot, index) => (
            <SavingPotItem
              id={pot.id}
              key={index}
              icon={pot.icon === 'IconPlane' ? <IconPlane style={{ width: rem(16), height: rem(16) }} /> : <IconHome style={{ width: rem(16), height: rem(16) }} />}
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
      </div>
    </Card>
  );
}

export default SavingsPotListCard;