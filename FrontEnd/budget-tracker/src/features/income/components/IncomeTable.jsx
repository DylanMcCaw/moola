import React, { useState } from 'react';
import { Text, Table, ThemeIcon, Pagination, ActionIcon, Tooltip, Modal, Card } from '@mantine/core';
import { IconMoneybag, IconEdit, IconPlus } from '@tabler/icons-react';
import IconComponents from '../../common/IconComponents';
import IncomeCategory from '../../income/components/IncomeCategory';
import formatCurrency from '../../../utils/formatCurrency';
import formatDate from '../../../utils/formatDate';
import { IncomeForm } from './IncomeForm';
import './IncomeStyles.css'

function IncomeTable({ incomes, onAddClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editOpened, setEditOpened] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);

  const incomesPerPage = 3;
  const totalPages = Math.ceil(incomes.length / incomesPerPage);
  const indexOfLastIncome = currentPage * incomesPerPage;
  const indexOfFirstIncome = indexOfLastIncome - incomesPerPage;
  const currentIncomes = incomes.slice(indexOfFirstIncome, indexOfLastIncome);

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

  const rows = currentIncomes.map((income) => {
    const IconComponent = IconComponents[income.icon] || IconMoneybag;
    return (
      <tr key={income.id} className="income-row">
        <td style={{ width: "60px" }}>
          <ThemeIcon color={income.iconColour} size="md" radius="xl">
            <IconComponent />
          </ThemeIcon>
        </td>
        <td className="name-column">
          {income.description} <span className='category-text'>{IncomeCategory[income.category]}</span>
        </td>
        <td className="amount-column">
          {formatCurrency(income.amount)} <span className='category-text'>{formatDate(income.startDate)}</span>
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
    <Card withBorder radius="20" className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Text size="xl">Total Income</Text>
        <Tooltip label="Add New Income" withArrow>
          <ActionIcon color="#4333A1" variant="outline" onClick={onAddClick}>
            <IconPlus size="1.125rem" />
          </ActionIcon>
        </Tooltip>
      </div>
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
      {incomes.length > 0 && (
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
      )}
      <Modal opened={editOpened} onClose={handleClose} title="Edit Income" size="lg" centered>
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