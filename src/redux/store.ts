import { courierApi } from './services/courier.service';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { baseApi } from './services/base.service';
import authReducer from './slices/auth';
import { userApi } from './services/user.service';
import { employeeApi } from './services/employee.service';

import cartSlice from './slices/cartSlice';

const rootReducer = combineReducers({
  cart: cartSlice,
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [courierApi.reducerPath]: courierApi.reducer,
  [employeeApi.reducerPath]: employeeApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      baseApi.middleware,
      userApi.middleware,
      courierApi.middleware,
      employeeApi.middleware
    ]),
  devTools: import.meta.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
