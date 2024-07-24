import React, { useState } from 'react';
import { Text, Table, ThemeIcon, Pagination, ActionIcon, Modal, Card, Tooltip, Center, Button, Badge } from '@mantine/core';
import { IconMoneybag, IconEdit, IconPlus } from '@tabler/icons-react';
import { expenseIconOptions } from '../../common/incomeExpenseIconOptions';
import ExpenseCategory from '../../expense/components/ExpenseCategory';
import formatCurrency from '../../../utils/formatCurrency';
import formatDate from '../../../utils/formatDate';
import calculateDueDate from '../../../utils/calculateDueDate';
import { ExpenseForm } from './ExpenseForm'; 
import './ExpenseStyles.css'

function ExpenseTable({ expenses, onAddClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editOpened, setEditOpened] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const expensesPerPage = 3;

  // Sort expenses by due date
  const sortedExpenses = [...expenses].sort((a, b) => {
    const dateA = calculateDueDate(a.startDate);
    const dateB = calculateDueDate(b.startDate);
    return dateA - dateB;
  });

  const totalPages = Math.ceil(sortedExpenses.length / expensesPerPage);
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = sortedExpenses.slice(indexOfFirstExpense, indexOfLastExpense);

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

  const getIconComponent = (iconName) => {
    const iconOption = expenseIconOptions.find(option => option.value === iconName);
    return iconOption ? iconOption.icon : null;
  };

  const getDueBadge = (date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const threeDaysFromNow = new Date(now.setDate(now.getDate() + 3));
    
    if (date.getDate() === today.getDate()) {
      return <Badge variant="outline" color="red" size="xs" style={{ marginRight: '4px' }}>Due Today</Badge>;
    } else if (date <= threeDaysFromNow) {
      return <Badge variant="outline" color="red" size="xs" style={{ marginRight: '4px' }}>Due Soon</Badge>;
    }
    return null;
  };

  const rows = currentExpenses.map((expense) => {
    const IconComponent = getIconComponent(expense.icon);
    const dueDate = calculateDueDate(expense.startDate);
    const formattedDueDate = formatDate(dueDate);
    return (
      <tr key={expense.id} className="expense-row">
        <td style={{ width: "60px" }}>
          <ThemeIcon color={expense.iconColour} size="md" radius="xl">
            {IconComponent && <IconComponent size={16} />}
          </ThemeIcon>
        </td>
        <td className="name-column">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{paddingRight:"10px"}}>{expense.description}</span>
            {getDueBadge(dueDate)}
          </div>
          <span className='category-text'>{ExpenseCategory[expense.category]}</span>
        </td>
        <td className="amount-column">
          {formatCurrency(expense.amount)} 
          <span className='category-text'>
            {formattedDueDate}
          </span>
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
    <Card withBorder radius="20">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Text size="xl">Expenses</Text>
        {sortedExpenses.length > 0 && (
          <Tooltip label="Add New Expense" withArrow>
            <ActionIcon color="#4333A1" variant="outline" onClick={onAddClick}>
              <IconPlus size="1.125rem" />
            </ActionIcon>
          </Tooltip>
        )}
      </div>
      {sortedExpenses.length === 0 ? (
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