import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice'
import getConfig from '../../utils/getConfig';

export const favoritesSlice = createSlice({
		name: 'favorites',
    initialState: [],
    reducers: {
        setFavorites : (state, action) => {
          return action.payload
        }
    }
})


export const getFavoritesTHunk = () => dispatch => {
  dispatch(setIsLoading(true))

  axios
  .get('https://e-commerce-api.academlo.tech/api/v1/cart/', getConfig())
  .then(res => dispatch(setFavorites(res.data.data)))
  .catch(error => console.error(error))
  .finally(() => dispatch(setIsLoading(false)))
}

export const createFavoriteThunk = (news) => (dispatch) => {
  dispatch(setIsLoading(true))
  axios
  .post('https://e-commerce-api.academlo.tech/api/v1/cart/', news, getConfig())
  .then((res) => dispatch(getFavoritesTHunk()))
  .catch(error => console.error(error))
  .finally(() => dispatch(setIsLoading(false)))
}

export const { setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;