import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../http';
import { ICourierOrder } from '@/types/courier.types';

export const courierApi = createApi({
  reducerPath: 'courierApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders(headers) {
      return headers;
    }
  }),
  tagTypes: ['COrder'],
  endpoints: (builder) => ({
    getCourierOrder: builder.query<ICourierOrder[], void>({
      query: () => ({
        url: `/order/courier`
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'COrder', id } as const)),
              { type: 'COrder', id: 'LIST' }
            ]
          : [{ type: 'COrder', id: 'LIST' }]
    }),
    acceptOrder: builder.mutation<void, number>({
      query: (id) => ({
        url: `/order/accept/${Number(id)}`,
        method: `PUT`
      }),
      invalidatesTags: [{ type: 'COrder', id: 'LIST' }]
    }),

    completeOrder: builder.mutation<void, number>({
      query: (id) => ({
        url: `/order/complete/${Number(id)}`,
        method: `PUT`
      }),
      invalidatesTags: [{ type: 'COrder', id: 'LIST' }]
    }),
    getAllConfirmedOrders: builder.query<ICourierOrder[], void>({
      query: () => ({
        url: `/order/confirmed`
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'COrder', id } as const)),
              { type: 'COrder', id: 'LIST' }
            ]
          : [{ type: 'COrder', id: 'LIST' }]
    })
  })
});

export const {
  useGetCourierOrderQuery,
  useAcceptOrderMutation,
  useCompleteOrderMutation,
  useGetAllConfirmedOrdersQuery,
  useLazyGetAllConfirmedOrdersQuery,
  useLazyGetCourierOrderQuery
} = courierApi;
