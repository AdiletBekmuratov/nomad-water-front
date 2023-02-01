import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth';
import cartSlice from './slices/cartSlice';
import delayOrder from './slices/delayOrder';
import { baseApi } from './services/base.service';
import { userApi } from './services/user.service';
import { courierApi } from './services/courier.service';
import { employeeApi } from './services/employee.service';
import { profileApi } from './services/profile.service';

const rootReducer = combineReducers({
  cart: cartSlice,
  auth: authReducer,
  delayOrder: delayOrder,
  [baseApi.reducerPath]: baseApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
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
      employeeApi.middleware,
      profileApi.middleware
    ]),
  devTools: import.meta.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
