import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authenticateUser } from '../../app/sdk';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    try {
      const response = await authenticateUser(email, password);
      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (error) {
      const parsedError = await error.json();
      return parsedError;
    }
  },
);

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    email: '',
    token: '',
    errors: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => ({
      ...state,
      email: payload.email,
      token: payload.token,
      error: payload.error,
      message: payload.message,
    }));
  },
});

export default authReducer.reducer;
