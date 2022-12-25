import { IEmployeeCreate, IEmployeeResponse } from './../../types/employee.types';
// import { IWorker } from './../../types/warehouseWorker.types';
// import { IEmployee } from './../../types/employee.types';
// import { ICouriers, ICouriersCreate } from '@/types/couriers.types';

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
import { IEmployeeCreateLink, IWorker } from '@/types/employee.types';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders(headers) {
      return headers;
    }
  }),
  tagTypes: ['Users', 'Warehouses', 'Couriers', 'Products', 'ProductCategory', 'Worker', 'Link'],

  endpoints: (builder) => ({
    //получение ссылок для реги
    createEmployeeLink: builder.mutation<string[], IEmployeeCreateLink>({
      query: (body) => ({
        url: `admin/user?quantity=${body.quantity}&role=${body.role}&warehouseId=${body.warehouseId}`,
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
    getUserID: builder.query<IUserFull, number>({
      query: (id) => ({
        url: `/admin/user/${Number(id)}`
      }),
      providesTags: [{ type: 'Users' }]
    }),
    getUserROLE: builder.query<IUserFull[], string>({
      query: (role) => ({
        url: `/admin/userWithRole/${role}`
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

    // //Couriers
    // createCourier: builder.mutation<number, ICouriersCreate>({
    //   query: (body) => ({
    //     url: `/admin/courier`,
    //     method: 'POST',
    //     body
    //   }),
    //   invalidatesTags: [{ type: 'Couriers', id: 'LIST' }]
    // }),
    // getAllCouriers: builder.query<ICouriers[], void>({
    //   query: () => ({
    //     url: `/admin/courier`
    //   }),
    //   providesTags: (result) =>
    //     result
    //       ? [
    //           ...result.map(({ id }) => ({ type: 'Couriers', id } as const)),
    //           { type: 'Couriers', id: 'LIST' }
    //         ]
    //       : [{ type: 'Couriers', id: 'LIST' }]
    // }),
    // getCourier: builder.query<ICouriers[], number>({
    //   query: (id) => ({
    //     url: `/admin/courier${Number(id)}`
    //   }),
    //   providesTags: [{ type: 'Couriers' }]
    // }),

    // deleteCourier: builder.mutation<void, number>({
    //   query: (id) => ({
    //     url: `/admin/courier/${Number(id)}`,
    //     method: 'DELETE'
    //   }),
    //   invalidatesTags: [{ type: 'Couriers', id: 'LIST' }]
    // }),
    // updateCourier: builder.mutation<void, ICouriersCreate>({
    //   query: (body) => ({
    //     url: `/admin/courier/${Number(body.car)}`,
    //     method: 'PUT',
    //     body
    //   }),
    //   invalidatesTags: [{ type: 'Couriers', id: 'LIST' }]
    // }),

    // Warehouse keeper
    createWarehouseWorker: builder.mutation<void, IWorker>({
      query: (body) => ({
        url: `/admin/warehouseWorker`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Worker', id: 'LIST' }]
    }),
    updateWarehouseWorker: builder.mutation<void, IWorker>({
      query: (body) => ({
        url: `/admin/warehouseWorker/${Number(body.id)}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'Worker', id: 'LIST' }]
    }),
    getAllWorker: builder.query<IWorker[], void>({
      query: () => ({
        url: `/admin/warehouseWorker`
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Worker', id } as const)),
            { type: 'Worker', id: 'LIST' }
          ]
          : [{ type: 'Worker', id: 'LIST' }]
    }),
    deleteWorker: builder.mutation<void, number>({
      query: (id) => ({
        url: `/admin/warehouseWorker/${Number(id)}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Worker', id: 'LIST' }]
    })
  })
});

export const {
  //users
  useCreateEmployeeLinkMutation,
  useCreateEmployeeMutation,
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
  // useGetAllCouriersQuery,
  // useCreateCourierMutation,
  // useDeleteCourierMutation,
  // useUpdateCourierMutation,

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
  useUploadProductImageMutation,

  //Worker
  useGetAllWorkerQuery,
  useCreateWarehouseWorkerMutation,
  useUpdateWarehouseWorkerMutation,
  useDeleteWorkerMutation
} = baseApi;
