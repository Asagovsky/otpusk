import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/login/loginSlice';
import ticketsSlice from '../features/tickets/ticketsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tickets: ticketsSlice,
  },
});

export default store;
