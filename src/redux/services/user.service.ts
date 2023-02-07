import { IUser, ICreateUserPhone, IProduct, IAddressData } from '@/types';
import { IEmployeeCreateLink } from '@/types/employee.types';
import { IUserFull, IUserFullCreate } from '@/types/users.types';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, OSM_URL } from '../http';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders(headers) {
      return headers;
    }
  }),
  tagTypes: ['Users', 'Link'],

  endpoints: (builder) => ({
    //получение всех пользоват
    getAllUsers: builder.query<IUserFull[], void>({
      query: () => ({
        url: `user`
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Users', id } as const)),
              { type: 'Users', id: 'LIST' }
            ]
          : [{ type: 'Users', id: 'LIST' }]
    }),
    getBirthdayUsers: builder.query<IUserFull[], void>({
      query: () => ({
        url: `user/birthday`
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Users', id } as const)),
              { type: 'Users', id: 'LIST' }
            ]
          : [{ type: 'Users', id: 'LIST' }]
    }),
    //Получить всех пользователей по активности /active/{isActive}
    getActiveUser: builder.query<IUserFull[], boolean>({
      query: (isActive) => ({
        url: `user/active/${isActive}`
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Users', id } as const)),
              { type: 'Users', id: 'LIST' }
            ]
          : [{ type: 'Users', id: 'LIST' }]
    }),
    //получить юзера по роли
    getUserROLE: builder.query<IUserFull[], string>({
      query: (role) => ({
        url: `user/role/${role}`
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Users', id } as const)),
              { type: 'Users', id: 'LIST' }
            ]
          : [{ type: 'Users', id: 'LIST' }]
    }),
    //юзер по ID
    getUserID: builder.query<IUserFull, number>({
      query: (id) => ({
        url: `user/${Number(id)}`
      }),
      providesTags: [{ type: 'Users', id: 'LIST' }]
    }),

    //api/user/me Получить текущего пользователя - находится в AUTH
    updateUserMe: builder.mutation<IUser, IUser>({
      query: (body) => ({
        url: `/user/me`,
        method: `PUT`,
        body
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),
    updateUser: builder.mutation<void, IUserFullCreate>({
      query: (body) => ({
        url: `user/${Number(body.id)}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `user/${Number(id)}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),

    //получение ссылок для реги
    createEmployeeLink: builder.mutation<string[], IEmployeeCreateLink>({
      query: (body) => ({
        url: `user?quantity=${body.quantity}&role=${body.role}&warehouseId=${body.warehouseId}`,
        method: 'POST'
      }),
      invalidatesTags: [{ type: 'Link', id: 'LIST' }]
    }),

    //регистрация курьеров
    createEmployee: builder.mutation<void, IUserFull>({
      query: (body) => ({
        url: `auth/register/employee/${body.token}`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Link', id: 'LIST' }]
    }),
    createCourier: builder.mutation<void, IUserFull>({
      query: (body) => ({
        url: `auth/register/courier/${body.token}`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Link', id: 'LIST' }]
    }),
    updateCourier: builder.mutation<void, IUserFull>({
      query: (body) => ({
        url: `user/courier/${Number(body.id)}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),
    //регистрация рабочего склада
    createWorker: builder.mutation<void, IUserFull>({
      query: (body) => ({
        url: `auth/register/warehouseWorker/${body.token}`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Link', id: 'LIST' }]
    }),
    updateWorker: builder.mutation<void, IUserFull>({
      query: (body) => ({
        url: `user/warehouseWorker/${Number(body.id)}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),

    //Регистрация пользователя
    createUserAccount: builder.mutation<void, IUser>({
      query: (body) => ({
        url: `/auth/register/user`,
        method: `POST`,
        body
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),
    //Получения кода для входа в аккаунт
    getUserCode: builder.mutation<void, ICreateUserPhone>({
      query: (body) => ({
        url: `/auth/generateCode`,
        method: `POST`,
        body
      })
    }),
    //получить свои избранные
    getUserFavorite: builder.query<IProduct[], void>({
      query: () => ({
        url: `/user/favorite`
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Users', id } as const)),
              { type: 'Users', id: 'LIST' }
            ]
          : [{ type: 'Users', id: 'LIST' }]
    }),
    //добавить товар в избран
    addFavorite: builder.mutation<void, number>({
      query: (id) => ({
        url: `/user/favorite/${Number(id)}`,
        method: `PUT`
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),
    deleteFavorite: builder.mutation<void, number>({
      query: (id) => ({
        url: `/user/favorite/${Number(id)}`,
        method: `DELETE`
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),

    findLocation: builder.query<IAddressData[], string>({
      query: (address) => ({
        url: `${OSM_URL}&query=${address},Nur-Sultan%20010000`
      })
    })
  })
});

export const {
  useGetAllUsersQuery,
  useGetBirthdayUsersQuery,
  useGetActiveUserQuery,
  useGetUserROLEQuery,
  useGetUserIDQuery,

  useUpdateUserMeMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useCreateCourierMutation,
  useCreateEmployeeMutation,
  useCreateUserAccountMutation,
  useCreateEmployeeLinkMutation,
  useCreateWorkerMutation,

  useGetUserCodeMutation,

  useUpdateCourierMutation,
  useUpdateWorkerMutation,

  useGetUserFavoriteQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,

  useFindLocationQuery
} = userApi;
