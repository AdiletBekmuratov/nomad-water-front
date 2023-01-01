import { IOrderQuality, IProduct } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartSliceState {
   cartItems: IProduct[];
   total: number;
   orderProductsDto: IOrderQuality[];
};
const initialState: CartSliceState = {
   cartItems: [],
   orderProductsDto: [],
   total: 0
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem(state, action: PayloadAction<IProduct>) {
         state.cartItems.push(action.payload);
         //state.orderProductsDto = [...state.orderProductsDto, action.payload];
         //  state.items = state.items + state.items.find(obj => obj.id !== action.payload.id)
         //state.items.push(action.payload);
      },
      deleteItem(state, action: PayloadAction<number>) {
         state.cartItems = state.cartItems.filter((obj) => obj.id !== action.payload);
      },
      clearItems(state) {
         state.cartItems = [];
      },

      // changeTotal(state, action) { state.total = state.total}
   }
});
// export const selectCart = (state: RootState) => state.cartSlice

// export const selectCartItemById = (id: string) => (state: RootState) =>
//    state.cartSlice.items.find(obj => obj.id === id)

export const { addItem, deleteItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
