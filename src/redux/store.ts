import { courierApi } from './services/courier.service';
// import { userApi } from './services/user.service';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { baseApi } from './services/base.service';
import authReducer from './slices/auth';

const rootReducer = combineReducers({
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [courierApi.reducerPath]: courierApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, courierApi.middleware),
  devTools: import.meta.env.NODE_ENV !== 'production'
});

// import { baseApi } from './services/base.service';
// import { userApi } from './services/user.service';
// import authReducer from './slices/auth';

// const rootReducer = combineReducers({
//   auth: authReducer,
//   [baseApi.reducerPath]: baseApi.reducer,
//   [userApi.reducerPath]: userApi.reducer
// });

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat([baseApi.middleware, userApi.middleware]),
//   devTools: import.meta.env.NODE_ENV !== 'production'
// });
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
