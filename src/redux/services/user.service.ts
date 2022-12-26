import { IEmployeeCreate, IEmployeeCreateLink } from '@/types/employee.types';
import { IUserFull, IUserFullCreate } from '@/types/users.types';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../http';

export const userApi = createApi({
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
    //получение ссылок для реги
    createEmployeeLink: builder.mutation<string[], IEmployeeCreateLink>({
      query: (body) => ({
        url: `user?quantity=${body.quantity}&role=${body.role}&warehouseId=${body.warehouseId}`,
        method: 'POST'
      }),
      invalidatesTags: [{ type: 'Link', id: 'LIST' }]
    }),
    //юзер по ID
    getUserID: builder.query<IUserFull, number>({
      query: (id) => ({
        url: `user/${Number(id)}`
      }),
      providesTags: [{ type: 'Users', id: 'LIST' }]
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
    ///api/user/active/{isActive}
    ///api/user/favorite
    //api/user/favorite/{id}
    //api/user/favorite/{id}

    //api/user/me Получить текущего пользователя - находится в AUTH
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
    updateUserMe: builder.mutation<IUserFull, void>({
      query: (body) => ({
        url: `/user/me`,
        method: `PUT`,
        body
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
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
    })
  })
});

export const {
  useCreateEmployeeLinkMutation,
  useGetAllUsersQuery,
  useGetUserIDQuery,
  useGetUserROLEQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdateUserMeMutation,
  useCreateEmployeeMutation,
  useCreateUserAccountMutation
} = userApi;

// createUser: builder.mutation<void, IUserFullCreate>({
//   query: (body) => ({
//     url: `user`,
//     method: 'POST',
//     body
//   }),
//   invalidatesTags: [{ type: 'Users', id: 'LIST' }]
// }),
