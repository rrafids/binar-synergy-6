import { createSlice } from '@reduxjs/toolkit';

interface tokenInitialState {
  token: string;
}

const initialState = {
  token: '',
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
    },
    deleteToken: (state) => {
      state.token = '';
    },
  },
});

export const { saveToken, deleteToken } = tokenSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectToken = (state: tokenInitialState): string => state.token;
export default tokenSlice.reducer;
