import { IProfile } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../http';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders(headers) {
      return headers;
    }
  }),
  tagTypes: ['Profile'],

  endpoints: (builder) => ({
    //получение всех профилей юзера
    getALLProfiles: builder.query<IProfile[], void>({
      query: () => ({
        url: `user/profile`
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Profile', id } as const)),
            { type: 'Profile', id: 'LIST' }
          ]
          : [{ type: 'Profile', id: 'LIST' }]
    }),

    //получить профиль по ID
    getProfileID: builder.query<IProfile, number>({
      query: (id) => ({
        url: `user/profile/${Number(id)}`
      }),
      providesTags: [{ type: 'Profile', id: 'LIST' }]
    }),
    //создать профиль
    createProfile: builder.mutation<void, IProfile>({
      query: (body) => ({
        url: `user/profile`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Profile', id: 'LIST' }]
    }),
    //обновить профиль
    updateProfile: builder.mutation<void, IProfile>({
      query: (body) => ({
        url: `user/profile/${Number(body.id)}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'Profile', id: 'LIST' }]
    }),
    //удалить профиль
    deleteProfile: builder.mutation<void, number>({
      query: (id) => ({
        url: `user/profile/${Number(id)}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Profile', id: 'LIST' }]
    }),
  })
});

export const {
  useGetALLProfilesQuery,
  useGetProfileIDQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = profileApi;
