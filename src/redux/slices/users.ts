import { IUser } from '@/types';
import { IUsersState, user } from '@/types/users.types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import usersService from '../services/users.service';

export const getAllUsers = createAsyncThunk<IUser[], undefined, { rejectValue: string }>(
  `users/getAllUsers`,
  async (_, thunkAPI) => {
    try {
      return await usersService.getAllUsers();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const getUserMe = createAsyncThunk<IUser, string | number, { rejectValue: string }>(
  `users/getUserMe`,
  async (id, thunkAPI) => {
    try {
      return await usersService.getUserMe(id);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

const initialState: IUsersState = {
  users: [],
  user: user,
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: ''
};
const usersSlice = createSlice({
  name: 'users',
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
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.users = [];
        if (action.payload) {
          state.message = action.payload;
        }
      })
      .addCase(getUserMe.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getUserMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUserMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = user;
        if (action.payload) {
          state.message = action.payload;
        }
      });
  }
});

export default usersSlice.reducer;
