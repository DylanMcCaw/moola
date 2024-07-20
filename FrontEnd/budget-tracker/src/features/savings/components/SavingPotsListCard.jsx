import React, { useState } from 'react';
import { Text, Card, List, rem, Pagination } from '@mantine/core';
import { IconPlane, IconHome } from '@tabler/icons-react';
import SavingPotItem from './SavingsPotItem';
import "./SavingsStyles.css";

function SavingsPotListCard({ savingPots }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of items per page

  // Calculate total number of pages
  const totalPages = Math.ceil(savingPots.length / itemsPerPage);

  // Calculate index of the first and last saving pot for the current page
  const indexOfLastSaving = currentPage * itemsPerPage;
  const indexOfFirstSaving = indexOfLastSaving - itemsPerPage;
  const currentSavings = savingPots.slice(indexOfFirstSaving, indexOfLastSaving);

  // Handle page change
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
        <div style={{ marginBottom: '20px' }}>
          <Text size="xl">Saving Pots</Text>
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
