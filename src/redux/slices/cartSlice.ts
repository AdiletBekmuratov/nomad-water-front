// import { IProduct } from '@/types';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface CartSliceState {
//    totalPrice: number;
//    items: IProduct[];
// }
// const localStorageItems = localStorage.getItem('product') ? localStorage.getItem('product') : '';
// const items = localStorageItems ? JSON.parse(localStorageItems) : [];
// const totalPrice = 0;
// // const { items, totalPrice } = getCartFromLS()

// const initialState: CartSliceState = {
//    totalPrice,
//    items
// };

// const cartSlice = createSlice({
//    name: 'cart',
//    initialState,
//    reducers: {
//       addPizza(state, action: PayloadAction<IProduct>) {
//          const findItem = state.items.find
//             ((obj) => obj.id === action.payload.id);
//          if (findItem) {
//             findItem.quantity++
//          } else {
//             state.items.push({
//                ...action.payload,
//                quantity: 1
//             })
//          }
//          state.totalPrice = calcTotalPrice(state.items)
//       },

//       minusPizza(state, action: PayloadAction<string>) {
//          const findItem = state.items.find(obj => obj.id === action.payload)
//          if (findItem) {
//             findItem.count--
//          }
//       },
//       deleteItem(state, action: PayloadAction<string>) {
//          state.items = state.items.filter(obj => obj.id !== action.payload)
//          state.totalPrice = calcTotalPrice(state.items)
//       },
//       clearItem(state) {
//          state.items = []
//          state.totalPrice = 0
//       },
//    }
// })

// export const selectCart = (state: RootState) => state.cartSlice

// export const selectCartItemById = (id: string) => (state: RootState) =>
//    state.cartSlice.items.find(obj => obj.id === id)

// export const { addPizza, deleteItem, clearItem, minusPizza } = cartSlice.actions;

// export default cartSlice.reducer;
