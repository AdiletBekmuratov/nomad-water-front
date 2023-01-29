import { IBalance, IWarehouseUpdate, IWarehouseUpdateBalance } from '@/types/warehouse.type';
import {
  IOrder,
  IWorker,
  IProduct,
  IProductCategoryCreate,
  IProductCreate,
  IWarehouse,

  IUsersOrder
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
  tagTypes: ['Products', 'ProductCategory', 'Warehouses', 'Worker', 'Order'],

  endpoints: (builder) => ({
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
    // /product/productCategory/{productCategoryId}
    //получение продуктов по id категории
    getProductsCategId: builder.query<IProduct[], number>({
      query: (id) => ({
        url: `/product/productCategory/${id}`
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
    //Получить изображение продукта по id
    getProductImageID: builder.mutation<void, { id: number; formData: FormData }>({
      query: (body) => ({
        url: `product/${Number(body.id)}/image`,
        method: 'GET',
        body: body.formData
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }]
    }),
    // Загрузка картинки на сервер с продуктами product/{id}/image
    uploadProductImage: builder.mutation<void, { id: number; formData: FormData }>({
      query: (body) => ({
        url: `product/${Number(body.id)}/image`,
        method: 'PUT',
        body: body.formData
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
    getProductCategoryID: builder.query<IProductCategoryCreate[], number>({
      query: (id) => ({
        url: `productCategory/${Number(id)}`
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
    getWarehouseID: builder.query<IWarehouse, number>({
      query: (id) => ({
        url: `warehouse/${Number(id)}`
      }),
      providesTags: [{ type: 'Warehouses', id: 'LIST' }]
    }),
    createWarehouse: builder.mutation<void, IWarehouseUpdate>({
      query: (body) => ({
        url: `warehouse`,
        method: 'POST',
        body
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
    deleteWarehouse: builder.mutation<void, number>({
      query: (id) => ({
        url: `warehouse/${Number(id)}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Warehouses', id: 'LIST' }]
    }),

    // Warehouses Balance 
    addProductToWarehouse: builder.mutation<void, IBalance>({

      query: (body) => ({
        url: `warehouse/${Number(body.warehouseId)}/balance`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Warehouses', id: 'LIST' }]
    }),
    updateWarehouseBalance: builder.mutation<void, IWarehouseUpdateBalance>({
      query: (body) => {
        return {
          url: `warehouse/${body.id}/balance`,
          method: 'PUT',
          body
        }
      },
      invalidatesTags: [{ type: 'Warehouses', id: 'LIST' }]
    }),
    // updateWarehouseBalance: builder.mutation<IWarehouse, IWarehouseBalance[]>({
    //   query: (body) => {
    //     const idArray = body.map(item => item.productId);
    //     const id: number = idArray[0];

    //     const url = `warehouse/${id}/balance`;
    //     return {
    //       url: url,
    //       method: 'PUT',
    //       body
    //     }
    //   },
    //   invalidatesTags: [{ type: 'Warehouses', id: 'LIST' }]
    // }),
    // updateWarehouseBalance: builder.mutation<IWarehouse, { id: number; warehouseBalance: IWarehouseBalance[] }>({

    //   query: (body) => ({
    //     url: `warehouse/${Number(body.id)}/balance`,
    //     method: 'PUT',
    //     body:body.warehouseBalance
    //   }),
    //   invalidatesTags: [{ type: 'Warehouses', id: 'LIST' }]
    // }),
    deleteProductFromWarehouse: builder.mutation<IBalance, IBalance>({
      query: ({ warehouseId, productId }) => ({
        url: `warehouse/${Number(warehouseId)}/balance/${Number(productId)}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Warehouses', id: 'LIST' }]
    }),


    // Warehouse keeper
    createWarehouseWorker: builder.mutation<void, IWorker>({
      query: (body) => ({
        url: `warehouseWorker`,
        method: 'POST',
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

    // Order
    createOrder: builder.mutation<void, IUsersOrder>({
      query: (body) => ({
        url: `/order`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Order', id: 'LIST' }]
    }),
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
  // Products
  useGetAllProductsQuery,
  useGetProductsCategIdQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductImageIDMutation,
  useUploadProductImageMutation,
  // Product Category
  useCreateProductCategoryMutation,
  useDeleteProductCategoryMutation,
  useGetProductCategoryIDQuery,
  useGetProductCategoryQuery,
  useUpdateProductCategoryMutation,
  // Warehouses
  useGetAllWarehousesQuery,
  useGetWarehouseIDQuery,
  useCreateWarehouseMutation,
  useDeleteWarehouseMutation,
  useUpdateWarehouseMutation,
  // Warehouses Balance
  useAddProductToWarehouseMutation,
  useUpdateWarehouseBalanceMutation,
  useDeleteProductFromWarehouseMutation,

  //orders
  useGetUserOrderQuery,
  useCreateOrderMutation,
  useLazyGetUserOrderQuery,

  //Worker
  useGetAllWorkerQuery,
  useCreateWarehouseWorkerMutation,
  // useUpdateWarehouseWorkerMutation,
  useDeleteWorkerMutation
} = baseApi;
