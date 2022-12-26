import { IEmployeeCreate, IEmployeeCreateLink, IWorker } from './../../types/employee.types';
// import { IWorker } from './../../types/warehouseWorker.types';
// import { IEmployee } from './../../types/employee.types';
// import { ICouriers, ICouriersCreate } from '@/types/couriers.types';

import { IUserFull, IUserFullCreate } from '@/types/users.types';
import {
  IOrder,
  IProduct,
  IProductCategoryCreate,
  IProductCreate,
  IWarehouse,
  IWarehouseUpdate,
  IuserCreate
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
  tagTypes: [
    'Users',
    'Warehouses',
    'Couriers',
    'Products',
    'ProductCategory',
    'Worker',
    'Link',
    'Phone',
    'Order'
  ],

  endpoints: (builder) => ({
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
    //Users
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
    getUserID: builder.query<IUserFull, number>({
      query: (id) => ({
        url: `user/${Number(id)}`
      }),
      providesTags: [{ type: 'Users' }]
    }),
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
        url: `product`
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
        url: `product`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }]
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `product/${Number(id)}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }]
    }),
    updateProduct: builder.mutation<void, IProduct>({
      query: (body) => ({
        url: `product/${Number(body.id)}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }]
    }),

    // Product Category
    createProductCategory: builder.mutation<void, IProductCategoryCreate>({
      query: (body) => ({
        url: `productCategory`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'ProductCategory', id: 'LIST' }]
    }),
    getProductCategory: builder.query<IProductCategoryCreate[], void>({
      query: () => ({
        url: `productCategory`
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
        url: `productCategory/${Number(body.id)}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'ProductCategory', id: 'LIST' }]
    }),
    deleteProductCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `productCategory/${Number(id)}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'ProductCategory', id: 'LIST' }]
    }),
    // Загрузка картинки на сервер с продуктами
    uploadProductImage: builder.mutation<void, { id: number; formData: FormData }>({
      query: (body) => ({
        url: `product/${Number(body.id)}/image`,
        method: 'PUT',
        body: body.formData
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }]
    }),

    // Warehouses
    getAllWarehouses: builder.query<IWarehouse[], void>({
      query: () => ({
        url: `warehouse`
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
        url: `warehouse`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Warehouses', id: 'LIST' }]
    }),
    deleteWarehouse: builder.mutation<void, number>({
      query: (id) => ({
        url: `warehouse/${Number(id)}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Warehouses', id: 'LIST' }]
    }),
    updateWarehouse: builder.mutation<void, IWarehouseUpdate>({
      query: (body) => ({
        url: `warehouse/${Number(body.id)}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'Warehouses', id: 'LIST' }]
    }),

    // //Couriers
    // createCourier: builder.mutation<number, ICouriersCreate>({
    //   query: (body) => ({
    //     url: `courier`,
    //     method: 'POST',
    //     body
    //   }),
    //   invalidatesTags: [{ type: 'Couriers', id: 'LIST' }]
    // }),
    // getAllCouriers: builder.query<ICouriers[], void>({
    //   query: () => ({
    //     url: `courier`
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
    //     url: `courier${Number(id)}`
    //   }),
    //   providesTags: [{ type: 'Couriers' }]
    // }),

    // deleteCourier: builder.mutation<void, number>({
    //   query: (id) => ({
    //     url: `courier/${Number(id)}`,
    //     method: 'DELETE'
    //   }),
    //   invalidatesTags: [{ type: 'Couriers', id: 'LIST' }]
    // }),
    // updateCourier: builder.mutation<void, ICouriersCreate>({
    //   query: (body) => ({
    //     url: `courier/${Number(body.car)}`,
    //     method: 'PUT',
    //     body
    //   }),
    //   invalidatesTags: [{ type: 'Couriers', id: 'LIST' }]
    // }),

    // Warehouse keeper
    createWarehouseWorker: builder.mutation<void, IWorker>({
      query: (body) => ({
        url: `warehouseWorker`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Worker', id: 'LIST' }]
    }),
    updateWarehouseWorker: builder.mutation<void, IWorker>({
      query: (body) => ({
        url: `warehouseWorker/${Number(body.id)}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'Worker', id: 'LIST' }]
    }),
    getAllWorker: builder.query<IWorker[], void>({
      query: () => ({
        url: `warehouseWorker`
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
        url: `warehouseWorker/${Number(id)}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Worker', id: 'LIST' }]
    }),

    //Получения кода для входа в аккаунт
    getUserCode: builder.mutation<void, IuserCreate>({
      query: (body) => ({
        url: `/auth/generateCode`,
        method: `POST`,
        body
      }),
      invalidatesTags: [{ type: 'Phone', id: 'LIST' }]
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

    // Order
    getUserOrder: builder.query<IOrder[], void>({
      query: () => ({
        url: `order/user`
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Order', id } as const)),
              { type: 'Order', id: 'LIST' }
            ]
          : [{ type: 'Order', id: 'LIST' }]
    })
  })
});

export const {
  useGetUserOrderQuery,
  //users
  useCreateEmployeeLinkMutation,
  useCreateEmployeeMutation,
  useGetAllUsersQuery,
  useGetUserIDQuery,
  useGetUserROLEQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserCodeMutation,
  useCreateUserAccountMutation,
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
