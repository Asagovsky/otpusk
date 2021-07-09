import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authenticateUser, validateToken, getUser } from '../../app/sdk';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password, rememberMe }) => {
    try {
      const response = await authenticateUser(email, password);
      const parsedResponse = await response.json();
      if (rememberMe && localStorage) {
        localStorage.setItem('token', parsedResponse.token);
      }
      parsedResponse.loggedIn = true;
      return parsedResponse;
    } catch (error) {
      const parsedError = await error.json();
      return parsedError;
    }
  },
);

export const validateAndAuth = createAsyncThunk(
  'auth/validateAndLogin',
  async () => {
    if (localStorage && localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (await validateToken(token)) {
        const user = await getUser(token);
        user.token = token;
        user.loggedIn = true;
        return user;
      }
    }
    return initialState;
  },
);

const initialState = {
  email: '',
  token: '',
  error: '',
  message: '',
  loggedIn: false,
};

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => ({
      ...state,
      email: payload.email,
      token: payload.token,
      error: payload.error,
      message: payload.message,
      loggedIn: payload.loggedIn,
    }));
    builder.addCase(validateAndAuth.fulfilled, (state, { payload }) => ({
      ...state,
      email: payload.email,
      token: payload.token,
      loggedIn: payload.loggedIn,
    }));
  },
});

export default authReducer.reducer;
