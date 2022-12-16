import { ICouriers, ICouriersUpdate } from '@/types/couriers.types';
import { IUserFull, IUserFullCreate } from '@/types/users.types';
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
  tagTypes: ['Users', 'Warehouses', 'Couriers', 'Products', 'ProductCategory'],

  endpoints: (builder) => ({
    //Users
    getAllUsers: builder.query<IUserFull[], void>({
      query: () => ({
        url: `admin/user`
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Users', id } as const)),
            { type: 'Users', id: 'LIST' }
          ]
          : [{ type: 'Users', id: 'LIST' }]
    }),
    getUserID: builder.query<IUserFull[], number>({
      query: (id) => ({
        url: `/user/${Number(id)}`
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Users', id } as const)),
            { type: 'Users', id: 'LIST' }
          ]
          : [{ type: 'Users', id: 'LIST' }]
    }),
    getUserROLE: builder.query<IUserFull[], string>({
      query: (role) => ({
        url: `/userWithRole/${role}`
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Users', id } as const)),
            { type: 'Users', id: 'LIST' }
          ]
          : [{ type: 'Users', id: 'LIST' }]
    }),
    createUser: builder.mutation<void, IUserFullCreate>({
      query: (body) => ({
        url: `admin/user`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),
    updateUser: builder.mutation<void, IUserFullCreate>({
      query: (body) => ({
        url: `admin/user/${Number(body.id)}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `admin/user/${Number(id)}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),
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
    }),

    //Couriers
    getAllCouriers: builder.query<ICouriers[], void>({
      query: () => ({
        url: `/admin/courier`
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Couriers', id } as const)),
            { type: 'Couriers', id: 'LIST' }
          ]
          : [{ type: 'Couriers', id: 'LIST' }]
    }),
    createCourier: builder.mutation<void, ICouriers>({
      query: (body) => ({
        url: `/admin/courier`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Couriers', id: 'LIST' }]
    }),
    deleteCourier: builder.mutation<void, number>({
      query: (id) => ({
        url: `/admin/courier/${Number(id)}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Couriers', id: 'LIST' }]
    }),
    updateCourier: builder.mutation<void, ICouriersUpdate>({
      query: (body) => ({
        url: `/admin/courier/${Number(body.id)}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'Couriers', id: 'LIST' }]
    })
  }),
});

export const {
  //users
  useGetAllUsersQuery,
  useGetUserIDQuery,
  useGetUserROLEQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  // Warehouses
  useGetAllWarehousesQuery,
  useCreateWarehouseMutation,
  useDeleteWarehouseMutation,
  useUpdateWarehouseMutation,
  //Couriers
  useGetAllCouriersQuery,
  useCreateCourierMutation,
  useDeleteCourierMutation,
  useUpdateCourierMutation,

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
