import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productsReducer
    }
  })
}

// TypeScript tanımları olmadan sadece store'u export ediyoruz
export const store = makeStore()