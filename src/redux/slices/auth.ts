import { IAuthState, ILoginForm, IUser } from '@/types';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import authService from '../services/auth.service';

const initialState: IAuthState = {
  user: null,
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: ''
};

export const getMe = createAsyncThunk<IUser, undefined, { rejectValue: string }>(
  'auth/me',
  async (_, thunkAPI) => {
    try {
      return await authService.getMe();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// Login user
export const login = createAsyncThunk<IUser, ILoginForm, { rejectValue: string }>(
  'api/auth/login',
  async (user, thunkAPI) => {
    try {
      await authService.login(user);
      return authService.getMe();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const logout = createAsyncThunk<{ message: string }, undefined, { rejectValue: string }>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      return await authService.logout();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        if (action.payload) {
          state.message = action.payload;
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload) {
          state.message = action.payload;
        }
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        if (action.payload) {
          state.message = action.payload;
        }
      });
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
