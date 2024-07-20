import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const savingsSlice = createSlice({
  name: 'savings',
  initialState,
  reducers: {
    setSavings: (state, action) => {
      return action.payload;
    },
    addSavingsPot: (state, action) => {
      state.push(action.payload);
    },
    updateSavingsPot: (state, action) => {
      const index = state.findIndex(pot => pot.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteSavingsPot: (state, action) => {
      return state.filter(pot => pot.id !== action.payload);
    },
  },
});

export const { setSavings, addSavingsPot, updateSavingsPot, deleteSavingsPot } = savingsSlice.actions;

export default savingsSlice.reducer;