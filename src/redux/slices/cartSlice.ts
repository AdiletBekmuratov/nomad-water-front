import { IOrderQuality, IProduct } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartSliceState {
   cartItems: IProduct[];
   orderDto: IOrderQuality[];
   total: number;
};
const initialState: CartSliceState = {
   cartItems: [],
   orderDto: [],
   total: 0
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem(state, action: PayloadAction<IProduct>) {
         state.cartItems.push(action.payload);
         // state.total = action.payload;
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
      getOrderDto(state, action: PayloadAction<IOrderQuality>) {
         state.orderDto.push(action.payload);
         //state.orderDto = state.orderDto.filter((obj) => obj.productId === action.payload.productId);
      },
      getTotal(state, action: PayloadAction<number>) {
         state.total = state.total + action.payload;
      }
   }
});

// export const selectCartItemById = (id: string) => (state: RootState) =>
//    state.cartSlice.items.find(obj => obj.id === id)

export const { addItem, deleteItem, clearItems, getOrderDto, getTotal } = cartSlice.actions;

export default cartSlice.reducer;
