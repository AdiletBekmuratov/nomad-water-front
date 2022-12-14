import { IUser } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import usersService from '../services/users.service';

export interface IUsersState {
  users: IUser[];
  isError: boolean | null;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

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
const initialState: IUsersState = {
  users: [],
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
      });
  }
});
export default usersSlice.reducer;

//export const { getAllUsers } = usersSlice.actions;

// export const usersApi = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: API_URL,
//     credentials: 'include',
//     prepareHeaders(headers) {
//       return headers;
//     }
//   }),
//   tagTypes: [],
//   endpoints: (builder) => ({
//     getAllUsers: builder.query({
//       query: () => `admin/user`
//     })
//   })
// });
