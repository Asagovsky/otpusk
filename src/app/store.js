import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/login/loginSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice
  },
});

export default store
