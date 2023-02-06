import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../http';
import { ICourierOrder } from '@/types/courier.types';
import { IRouteSheet } from '@/types/routeSheet.types';

export const courierApi = createApi({
  reducerPath: 'courierApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders(headers) {
      return headers;
    }
  }),
  tagTypes: ['COrder', 'routeSheet'],
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
    }),
    getAllRouteSheet: builder.query<IRouteSheet[], void>({
      query: () => ({
        url: '/user/routeSheet'
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'routeSheet', id } as const)),
              { type: 'routeSheet', id: 'LIST' }
            ]
          : [{ type: 'routeSheet', id: 'LIST' }]
    }),
    getCurrentCourierRouteSheet: builder.query<IRouteSheet, string>({
      query: (date) => ({
        url: `/user/routeSheet/${date}`
      }),
      providesTags: [{ type: 'routeSheet', id: 'LIST' }]
    }),
    getCourierRouteSheetOrders: builder.query<IRouteSheet, { id: number; date: string }>({
      query: ({ id, date }) => ({
        url: `/user/routeSheet/${id}/${date}`
      })
    })
  })
});

export const {
  useGetCourierOrderQuery,
  useLazyGetCourierOrderQuery,
  
  useAcceptOrderMutation,
  useCompleteOrderMutation,
  
  useGetAllConfirmedOrdersQuery,
  useLazyGetAllConfirmedOrdersQuery,
  
  useGetAllRouteSheetQuery,
  useGetCurrentCourierRouteSheetQuery,
  useLazyGetCurrentCourierRouteSheetQuery,
  useGetCourierRouteSheetOrdersQuery,
  useLazyGetCourierRouteSheetOrdersQuery
} = courierApi;
