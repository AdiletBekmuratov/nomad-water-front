import { ICourierOrder } from './../../types/courier.types';
import { API_URL } from '../http';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders(header) {
      return header;
    }
  }),
  tagTypes: ['Accept'],

  endpoints: (builder) => ({
    acceptOrders: builder.mutation({
      query: (id: number) => ({
        url: `/order/confirm/${Number(id)}`,
        method: `PUT`
      }),
      invalidatesTags: [{ type: 'Accept', id: 'LIST' }]
    }),
    getPendingOrders: builder.query<ICourierOrder[], void>({
      query: () => ({
        url: `/order/pending`
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: number }) => ({ type: 'Accept', id } as const)),
              { type: 'Accept', id: 'LIST' }
            ]
          : [{ type: 'Accept', id: 'LIST' }]
    })
  })
});

export const { useAcceptOrdersMutation, useGetPendingOrdersQuery } = employeeApi;
