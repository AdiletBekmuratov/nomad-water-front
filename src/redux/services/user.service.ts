import { IUserCreate } from '@/types';
import { IEmployeeCreate, IEmployeeCreateLink } from '@/types/employee.types';
import { IUserFull, IUserFullCreate } from '@/types/users.types';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../http';

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
    //Получить всех пользователей по активности /active/{isActive}
    getActiveUser: builder.query<IUserFull[], boolean>({
      query: (isActive) => ({
        url: `userWithRole/${isActive}`
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
        url: `userWithRole/${role}`
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
    updateUserMe: builder.mutation<IUserFull, void>({
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
    ///api/user/favorite
    //api/user/favorite/{id}
    //api/user/favorite/{id}

    //получение ссылок для реги
    createEmployeeLink: builder.mutation<string[], IEmployeeCreateLink>({
      query: (body) => ({
        url: `user?quantity=${body.quantity}&role=${body.role}&warehouseId=${body.warehouseId}`,
        method: 'POST'
      }),
      invalidatesTags: [{ type: 'Link', id: 'LIST' }]
    }),
    //регистрация работников
    createEmployee: builder.mutation<void, IEmployeeCreate>({
      query: (body) => ({
        url: `auth/register/employee/${body.token}`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Link', id: 'LIST' }]
    }),
    //Регистрация пользователя
    createUserAccount: builder.mutation<void, IUserFull>({
      query: (body) => ({
        url: `/auth/register/user`,
        method: `POST`,
        body
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),
    //Получения кода для входа в аккаунт
    getUserCode: builder.mutation<void, IUserCreate>({
      query: (body) => ({
        url: `/auth/generateCode`,
        method: `POST`,
        body
      }),
      invalidatesTags: [{ type: 'Phone', id: 'LIST' }]
    })
  })
});

export const {
  useGetAllUsersQuery,
  useGetActiveUserQuery,
  useGetUserROLEQuery,
  useGetUserIDQuery,

  useUpdateUserMeMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,

  useCreateEmployeeMutation,
  useCreateUserAccountMutation,
  useCreateEmployeeLinkMutation,
  useGetUserCodeMutation
} = userApi;
