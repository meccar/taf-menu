import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CartItem = {
  id: string
  name: string
  price: number
  qty: number
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartItem[],
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      state.push(action.payload)
    },
  },
})

export const { addItem } = cartSlice.actions
export default cartSlice.reducer