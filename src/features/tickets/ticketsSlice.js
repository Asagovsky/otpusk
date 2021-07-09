import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFlights } from '../../app/sdk';

const initialState = {
  flights: {},
};

export const getFlightsAsync = createAsyncThunk(
  'tickets/getFlights',
  async token => {
    try {
      const tickets = await getFlights(token);
      const ticketsParsed = await tickets.json();
      return ticketsParsed.data;
    } catch (error) {
      const errors = await error.json();
      return errors;
    }
  },
);

const ticketsReducer = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getFlightsAsync.fulfilled, (state, { payload }) => {
      state.flights = payload;
    });
  },
});

export default ticketsReducer.reducer;
