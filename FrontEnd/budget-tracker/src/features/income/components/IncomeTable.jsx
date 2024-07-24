import React, { useState } from 'react';
import { Text, Table, ThemeIcon, Pagination, ActionIcon, Tooltip, Modal, Card, Center, Button } from '@mantine/core';
import { IconMoneybag, IconEdit, IconPlus } from '@tabler/icons-react';
import { incomeIconOptions } from '../../common/incomeExpenseIconOptions';
import IncomeCategory from '../../income/components/IncomeCategory';
import formatCurrency from '../../../utils/formatCurrency';
import formatDate from '../../../utils/formatDate';
import calculateDueDate from '../../../utils/calculateDueDate';
import { IncomeForm } from './IncomeForm';
import './IncomeStyles.css'

function IncomeTable({ incomes, onAddClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editOpened, setEditOpened] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);

  const incomesPerPage = 3;

  // Sort incomes by amount in descending order
  const sortedIncomes = [...incomes].sort((a, b) => b.amount - a.amount);

  const totalPages = Math.ceil(sortedIncomes.length / incomesPerPage);
  const indexOfLastIncome = currentPage * incomesPerPage;
  const indexOfFirstIncome = indexOfLastIncome - incomesPerPage;
  const currentIncomes = sortedIncomes.slice(indexOfFirstIncome, indexOfLastIncome);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (income) => {
    setSelectedIncome(income);
    setEditOpened(true);
  };

  const handleClose = () => {
    setEditOpened(false);
    setSelectedIncome(null);
  };

  const getIconComponent = (iconName) => {
    const iconOption = incomeIconOptions.find(option => option.value === iconName);
    return iconOption ? iconOption.icon : null;
  };

  const rows = currentIncomes.map((income) => {
    const IconComponent = getIconComponent(income.icon);
    return (
      <tr key={income.id} className="income-row">
        <td style={{ width: "60px" }}>
          <ThemeIcon color={income.iconColour} size="md" radius="xl">
            {IconComponent && <IconComponent size={16} />}
          </ThemeIcon>
        </td>
        <td className="name-column">
          {income.description} <span className='category-text'>{IncomeCategory[income.category]}</span>
        </td>
        <td className="amount-column">
          {formatCurrency(income.amount)} <span className='category-text'>{formatDate(calculateDueDate(income.startDate))}</span>
        </td>
        <td style={{ width: "60px", paddingLeft:"20px"}}>
          <Tooltip label="Edit" withArrow>
            <ActionIcon size="md" variant="outline" color='#4333A1' onClick={() => handleEditClick(income)}>
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>
        </td>
      </tr>
    );
  });

  return (
    <Card withBorder radius="20">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Text size="xl">Incomes</Text>
        {sortedIncomes.length > 0 && (
          <Tooltip label="Add New Income" withArrow>
            <ActionIcon color="#4333A1" variant="outline" onClick={onAddClick}>
              <IconPlus size="1.125rem" />
            </ActionIcon>
          </Tooltip>
        )}
      </div>
      {sortedIncomes.length === 0 ? (
        <Center style={{ height: '200px', flexDirection: 'column' }}>
          <Text size="md" color="dimmed" mb="md">Start tracking your incomes by adding your first income!</Text>
          <Button color="#4333A1" onClick={onAddClick}>Create Income</Button>
        </Center>
      ) : (
        <>
          <Table>
            <thead className='table-header'>
              <tr>
                <th className="name-column"><span style={{ color: "grey", fontSize: "12px" }}>Income</span></th>
                <th></th>
                <th className="amount-column"><span style={{ color: "grey", fontSize: "12px" }}>Amount</span></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
          <div className='paginationContainer'>
            <Pagination
              total={totalPages}
              value={currentPage}
              onChange={handlePageChange}
              className="pagination"
              color='#4333A1'
              size="sm"
            />
          </div>
        </>
      )}
      <Modal opened={editOpened} onClose={handleClose} title="Edit Income" size="lg" centered radius={20}>
        {selectedIncome && (
          <IncomeForm 
            editMode={true}
            initialData={selectedIncome}
            onClose={handleClose}
          />
        )}
      </Modal>
    </Card>
  );
}

export default IncomeTable;