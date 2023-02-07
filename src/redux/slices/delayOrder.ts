import {  IProduct } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IDelayOrder = {
  products: IProduct [];
};
const initialState: IDelayOrder = {
  products:
    localStorage.getItem('delayOrder') !== null ? JSON.parse(localStorage.getItem('delayOrder')!).products : [],
};

const delayOrder = createSlice({
  name: 'delayOrder',
  initialState,
  reducers: {
    addItemDelayOrder: (state, action: PayloadAction<IProduct>) => {
      let products = state.products.slice();
      products.push(action.payload);
      state.products = products;
      localStorage.setItem('delayOrder', JSON.stringify(state));
    },
    deleteItemDelayOrder: (state, action: PayloadAction<number>) => {
      let products = state.products.slice();
      products = products.filter((item) => item.id !== action.payload);
      state.products = products;
      localStorage.setItem('delayOrder', JSON.stringify(state));
    },
  }
});

export const { addItemDelayOrder, deleteItemDelayOrder } =  delayOrder.actions;

export default delayOrder.reducer;
