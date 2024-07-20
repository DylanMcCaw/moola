import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const incomesSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {
    setIncomes: (state, action) => {
      return action.payload;
    },
    addIncome: (state, action) => {
      state.push(action.payload);
    },
    updateIncome: (state, action) => {
      const index = state.findIndex(income => income.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteIncome: (state, action) => {
      return state.filter(income => income.id !== action.payload);
    },
  },
});

export const { setIncomes, addIncome, updateIncome, deleteIncome } = incomesSlice.actions;

export default incomesSlice.reducer;