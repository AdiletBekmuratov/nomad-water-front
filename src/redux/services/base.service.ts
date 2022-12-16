import {
  IProduct,
  IProductCategoryCreate,
  IProductCreate,
  IWarehouse,
  IWarehouseUpdate
} from '@/types';
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
  tagTypes: ['Warehouses', 'Products', 'ProductCategory'],
  endpoints: (builder) => ({
    //Products
    getAllProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: `/admin/product`
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Products', id } as const)),
              { type: 'Products', id: 'LIST' }
            ]
          : [{ type: 'Products', id: 'LIST' }]
    }),
    createProduct: builder.mutation<IProduct, IProductCreate>({
      query: (body) => ({
        url: `/admin/product`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }]
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/admin/product/${Number(id)}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }]
    }),
    updateProduct: builder.mutation<void, IProduct>({
      query: (body) => ({
        url: `/admin/product/${Number(body.id)}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }]
    }),

    // Product Category
    createProductCategory: builder.mutation<void, IProductCategoryCreate>({
      query: (body) => ({
        url: `/admin/productCategory`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'ProductCategory', id: 'LIST' }]
    }),
    getProductCategory: builder.query<IProductCategoryCreate[], void>({
      query: () => ({
        url: `/admin/productCategory`
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Warehouses', id } as const)),
              { type: 'ProductCategory', id: 'LIST' }
            ]
          : [{ type: 'ProductCategory', id: 'LIST' }]
    }),
    updateProductCategory: builder.mutation<void, IProductCategoryCreate>({
      query: (body) => ({
        url: `/admin/productCategory/${Number(body.id)}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'ProductCategory', id: 'LIST' }]
    }),
    deleteProductCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/admin/productCategory/${Number(id)}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'ProductCategory', id: 'LIST' }]
    }),
    // Загрузка картинки на сервер с продуктами
    uploadProductImage: builder.mutation<void, { id: number; formData: FormData }>({
      query: (body) => ({
        url: `/admin/product/${Number(body.id)}/image`,
        method: 'PUT',
        body: body.formData
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }]
    }),

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
  useUpdateWarehouseMutation,
  // Products
  useGetAllProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,

  // Product Category
  useCreateProductCategoryMutation,
  useDeleteProductCategoryMutation,
  useGetProductCategoryQuery,
  useUpdateProductCategoryMutation,
  useUploadProductImageMutation
} = baseApi;
