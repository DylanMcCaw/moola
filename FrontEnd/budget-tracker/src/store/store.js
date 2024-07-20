import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import savingsReducer from './slices/savingsSlice';
import incomesReducer from './slices/incomesSlice';
import expensesReducer from './slices/expensesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    savings: savingsReducer,
    incomes: incomesReducer,
    expenses: expensesReducer,
  },
});