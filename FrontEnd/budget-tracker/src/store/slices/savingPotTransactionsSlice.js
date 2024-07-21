import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const savingsPotTransactionsSlice = createSlice({
  name: 'savingsPotTransactions',
  initialState,
  reducers: {
    // Set all transactions, replaces the entire state
    setTransactions: (state, action) => {
      return action.payload;
    },
    // Add a new transaction to the state
    addTransaction: (state, action) => {
      state.push(action.payload);
    },
    // Update an existing transaction by id
    updateTransaction: (state, action) => {
      const index = state.findIndex(transaction => transaction.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      } else {
        console.warn(`Transaction with id ${action.payload.id} not found for update.`);
      }
    },
    // Delete a transaction by id
    deleteTransaction: (state, action) => {
      return state.filter(transaction => transaction.id !== action.payload);
    },
    removeTransactionsBySavingsPotId: (state, action) => {
      return state.filter(transaction => transaction.savingsPotId !== action.payload);
    },
  },
});

// Export actions
export const { setTransactions, addTransaction, updateTransaction, deleteTransaction, removeTransactionsBySavingsPotId } = savingsPotTransactionsSlice.actions;

// Export reducer
export default savingsPotTransactionsSlice.reducer;
