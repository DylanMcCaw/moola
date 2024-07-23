import React, { useState } from 'react';
import { Text, Table, ThemeIcon, Pagination, ActionIcon, Modal, Card, Tooltip, Center, Button } from '@mantine/core';
import { IconMoneybag, IconEdit, IconPlus } from '@tabler/icons-react';
import IconComponents from '../../common/IconComponents';
import ExpenseCategory from '../../expense/components/ExpenseCategory';
import formatCurrency from '../../../utils/formatCurrency';
import formatDate from '../../../utils/formatDate';
import { ExpenseForm } from './ExpenseForm'; 
import './ExpenseStyles.css'

function ExpenseTable({ expenses, onAddClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editOpened, setEditOpened] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const expensesPerPage = 3;
  const totalPages = Math.ceil(expenses.length / expensesPerPage);
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (expense) => {
    setSelectedExpense(expense);
    setEditOpened(true);
  };

  const handleClose = () => {
    setEditOpened(false);
    setSelectedExpense(null);
  };

  const rows = currentExpenses.map((expense) => {
    const IconComponent = IconComponents[expense.icon] || IconMoneybag;
    return (
      <tr key={expense.id} className="expense-row">
        <td style={{ width: "60px" }}>
          <ThemeIcon color={expense.iconColour} size="md" radius="xl">
            <IconComponent />
          </ThemeIcon>
        </td>
        <td className="name-column">
          {expense.description} <span className='category-text'>{ExpenseCategory[expense.category]}</span>
        </td>
        <td className="amount-column">
          {formatCurrency(expense.amount)} <span className='category-text'>{formatDate(expense.startDate)}</span>
        </td>
        <td style={{ width: "60px", paddingLeft:"20px"}}>
          <Tooltip label="Edit" withArrow>
            <ActionIcon size="md" variant="outline" color='#4333A1' onClick={() => handleEditClick(expense)}>
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
        <Text size="xl">Expenses</Text>
        {expenses.length > 0 && (
          <Tooltip label="Add New Expense" withArrow>
            <ActionIcon color="#4333A1" variant="outline" onClick={onAddClick}>
              <IconPlus size="1.125rem" />
            </ActionIcon>
          </Tooltip>
        )}
      </div>
      {expenses.length === 0 ? (
        <Center style={{ height: '200px', flexDirection: 'column' }}>
          <Text size="md" color="dimmed" mb="md">Start tracking your expenses by adding your first expense!</Text>
          <Button color="#4333A1" onClick={onAddClick}>Create Expense</Button>
        </Center>
      ) : (
        <>
          <Table>
            <thead className='table-header'>
              <tr>
                <th className="name-column"><span style={{ color: "grey", fontSize: "12px" }}>Expense</span></th>
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
      <Modal opened={editOpened} onClose={handleClose} title="Edit Expense" size="lg" centered radius={20}>
        {selectedExpense && (
          <ExpenseForm 
            editMode={true}
            initialData={selectedExpense}
            onClose={handleClose}
          />
        )}
      </Modal>
    </Card>
  );
}

export default ExpenseTable;