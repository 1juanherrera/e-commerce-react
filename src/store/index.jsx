import { configureStore } from '@reduxjs/toolkit'
import isLoadingSlice from './slices/isLoading.slice'
import productsSlice from './slices/products.slice'
import favoritesSlice from './slices/favorites.slice'
import cartSlice from './slices/cart.slice'

export default configureStore({
  reducer: {
        products : productsSlice,
        isLoading : isLoadingSlice,
        favorites : favoritesSlice,
        cart : cartSlice
	}
})