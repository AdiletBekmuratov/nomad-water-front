import { IWarehouse, IWarehouseUpdate } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../http';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders(headers) {
      return headers;
    }
  }),
  tagTypes: ['Warehouses'],
  endpoints: (builder) => ({
    // Warehouses
    getAllWarehouses: builder.query<IWarehouse[], void>({
      query: () => ({
        url: `/admin/warehouse`
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Warehouses', id } as const)),
              { type: 'Warehouses', id: 'LIST' }
            ]
          : [{ type: 'Warehouses', id: 'LIST' }]
    }),
    createWarehouse: builder.mutation<void, IWarehouseUpdate>({
      query: (body) => ({
        url: `/admin/warehouse`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Warehouses', id: 'LIST' }]
    }),
    deleteWarehouse: builder.mutation<void, number>({
      query: (id) => ({
        url: `/admin/warehouse/${Number(id)}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Warehouses', id: 'LIST' }]
    }),
    updateWarehouse: builder.mutation<void, IWarehouseUpdate>({
      query: (body) => ({
        url: `/admin/warehouse/${Number(body.id)}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'Warehouses', id: 'LIST' }]
    })
  })
});

export const {
  // Warehouses
  useGetAllWarehousesQuery,
  useCreateWarehouseMutation,
  useDeleteWarehouseMutation,
  useUpdateWarehouseMutation
} = baseApi;
