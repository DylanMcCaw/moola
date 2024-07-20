import React, { useState } from 'react';
import { Text, Card, Table, Pagination } from '@mantine/core';
import { useSelector } from 'react-redux';
import formatCurrency from '../../../utils/formatCurrency';
import formatDate from '../../../utils/formatDate';
import './SavingsStyles.css'; // Ensure you have CSS for pagination and styling

export function SavingsTransactionsCard() {
  const transactions = useSelector((state) => state.savingPotTransactions) || [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page

  // Calculate total number of pages
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  // Calculate index of the first and last transaction for the current page
  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Define table rows from current transactions with conditional styles
  const rows = currentTransactions.map((transaction) => {
    const isDeposit = transaction.transactionType === 'Deposit';
    const textColor = isDeposit ? '#10A56D' : '#F45656';
    const sign = isDeposit ? '+' : '-';

    return (
      <Table.Tr key={transaction.id}>
        <Table.Td>{transaction.savingsPotId}</Table.Td>
        <Table.Td>{transaction.transactionType}</Table.Td>
        <Table.Td>{formatDate(transaction.transactionDate)}</Table.Td>
        <Table.Td style={{ color: textColor }}>
          {sign} {formatCurrency(transaction.amount)}
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Card 
      withBorder 
      radius="20" 
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ marginBottom: '33px' }}>
        <Text size="xl">Transactions</Text>
      </div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Savings Pot</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Amount</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows}
        </Table.Tbody>
      </Table>
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
    </Card>
  );
}
