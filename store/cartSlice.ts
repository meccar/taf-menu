import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartItem[],
  reducers: {
    addItem(
      state,
      action: PayloadAction<Omit<CartItem, "qty"> & { qty?: number }>
    ) {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.qty += action.payload.qty || 1;
      } else {
        state.push({
          ...action.payload,
          qty: action.payload.qty || 1,
        });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      return state.filter((item) => item.id !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<{ id: string; qty: number }>) {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.qty = action.payload.qty;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
