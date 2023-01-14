import { ICart, IProduct } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ICart = {
  products:
    localStorage.getItem('cart') !== null ? JSON.parse(localStorage.getItem('cart')!).products : [],
  total: localStorage.getItem('cart') !== null ? JSON.parse(localStorage.getItem('cart')!).total : 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IProduct & { quantity: number }>) => {
      let products = state.products.slice();
      products.push(action.payload);
      state.products = products;
      state.total = products.reduce((prev, curr) => prev + curr.productPrice, 0);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      let products = state.products.slice();
      products = products.filter((item) => item.id !== action.payload);
      state.products = products;
      state.total = products.reduce((prev, curr) => prev + curr.productPrice, 0);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearItems: (state) => {
      localStorage.setItem('cart', '[]');
      state.products = [];
      state.total = 0;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      let products = state.products.slice();
      products = products.map((item) =>
        item.id == action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
      state.products = products;
      state.total = products.reduce((prev, curr) => prev + curr.productPrice * curr.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      let products = state.products.slice();
      products = products.map((item) =>
        item.id == action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      state.products = products;
      state.total = products.reduce((prev, curr) => prev + curr.productPrice * curr.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }
});

// export const selectCartItemById = (id: string) => (state: RootState) =>
//    state.cartSlice.items.find(obj => obj.id === id)

export const { addItem, deleteItem, clearItems, incrementQuantity, decrementQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
