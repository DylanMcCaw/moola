import React, { useState } from 'react';
import { Text, Card, Table, Pagination, ThemeIcon , Badge} from '@mantine/core';
import { useSelector } from 'react-redux';
import { IconPlane, IconHome } from '@tabler/icons-react';
import formatCurrency from '../../../utils/formatCurrency';
import formatDate from '../../../utils/formatDate';
import './SavingsStyles.css';

export function SavingsTransactionsCard() {
  const transactions = useSelector((state) => state.savingPotTransactions) || [];
  const savingPots = useSelector((state) => state.savings) || [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
    const savingPot = savingPots.find(pot => pot.id === transaction.savingsPotId);
    const isDeposit = transaction.transactionType === 'Deposit';
    const sign = isDeposit ? '+' : '-';
    return (
      <Table.Tr key={transaction.id}>
        <Table.Td>{formatDate(transaction.transactionDate)}</Table.Td>
        <Table.Td>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ThemeIcon color={savingPot?.iconColour || 'gray'} size={24} radius="xl">
              {getSavingPotIcon(savingPot?.icon)}
            </ThemeIcon>
            <span>{savingPot?.description || 'Unknown'}</span>
          </div>
        </Table.Td>
        <Table.Td>{transaction.transactionType == "Deposit" ? <Badge variant="outline" color="teal">Deposit</Badge> : <Badge variant="outline" color="red">Withdraw</Badge>}</Table.Td>
        <Table.Td>
          <span style={{fontWeight:"bold"}}>
          {sign} {formatCurrency(transaction.amount)}
          </span>
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
      <Table style={{ marginBottom: '0px' }} verticalSpacing="sm">
      <thead className='table-header'>
          <tr>
          <th className="name-column"><span style={{ color: "grey", fontSize: "12px", paddingLeft:"10px"}}>Date</span></th>
            <th className="name-column"><span style={{ color: "grey", fontSize: "12px", paddingLeft:"10px"}}>Savings Pot</span></th>
            <th className="name-column"><span style={{ color: "grey", fontSize: "12px", paddingLeft:"10px"}}>Transaction Type</span></th>
            <th className="amount-column"><span style={{ color: "grey", fontSize: "12px", paddingLeft:"10px", float:"left"}}>Amount</span></th>
          </tr>
        </thead>
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