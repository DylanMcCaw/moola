import React, { useState } from 'react';
import { Text, Card, List, ThemeIcon, rem, Progress, Pagination } from '@mantine/core';
import { IconPlane, IconHome } from '@tabler/icons-react';
import "./SavingsStyles.css";

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
          <Progress value={progress} mt="s" color="#4333A1" style={{ width: "450px" }} />
        </div>
      </div>
    </List.Item>
  );
}


function SavingsPotListCard({ savingPots }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

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

  return (
    <Card withBorder radius="20" className="large-card">
        <div className="savingPotsList">
        <div style={{ marginBottom: '20px' }}>
        <Text size="xl">Saving Pots</Text>
      </div>
          <List spacing="lg" size="m" center>
            {currentSavings.map((pot, index) => (
              <SavingPotItem
                key={index}
                icon={pot.icon === 'IconPlane' ? <IconPlane style={{ width: rem(16), height: rem(16) }} /> : <IconHome style={{ width: rem(16), height: rem(16) }} />}
                color={pot.color}
                title={pot.title}
                amount={pot.amount}
                goal={pot.goal}
                progress={pot.progress}
              />
            ))}
          </List>
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={handlePageChange}
            color='#4333A1'
            size="sm"
            className="pagination"
          />
        </div>
    </Card>
  );
}

export default SavingsPotListCard;
