import { configureStore } from '@reduxjs/toolkit'
import storeReducer from './slices/storeSlice'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

const store = configureStore({
  reducer: {
    game: storeReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
