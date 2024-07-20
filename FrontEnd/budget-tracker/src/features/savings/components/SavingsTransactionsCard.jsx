import React, { useState } from 'react';
import { Text, Card, Table, Pagination, ThemeIcon } from '@mantine/core';
import { useSelector } from 'react-redux';
import { IconPlane, IconHome } from '@tabler/icons-react';
import formatCurrency from '../../../utils/formatCurrency';
import formatDate from '../../../utils/formatDate';
import './SavingsStyles.css';

export function SavingsTransactionsCard() {
  const transactions = useSelector((state) => state.savingPotTransactions) || [];
  const savingPots = useSelector((state) => state.savings) || [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = sortedTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getSavingPotIcon = (icon) => {
    if (icon === 'icon2') return <IconPlane size={16} />;
    if (icon === 'icon1') return <IconHome size={16} />;
    return null;
  };

  const rows = currentTransactions.map((transaction) => {
    const isDeposit = transaction.transactionType === 'Deposit';
    const textColor = isDeposit ? '#10A56D' : '#F45656';
    const sign = isDeposit ? '+' : '-';

    const savingPot = savingPots.find(pot => pot.id === transaction.savingsPotId);
    return (
      <Table.Tr key={transaction.id}>
        <Table.Td>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ThemeIcon color={savingPot?.iconColour || 'gray'} size={24} radius="xl">
              {getSavingPotIcon(savingPot?.icon)}
            </ThemeIcon>
            <span>{savingPot?.description || 'Unknown'}</span>
          </div>
        </Table.Td>
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
      <div style={{ marginBottom: '10px' }}>
        <Text size="xl">Transactions</Text>
      </div>
      <Table style={{ marginBottom: '20px' }}>
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