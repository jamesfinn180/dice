import { configureStore } from '@reduxjs/toolkit'
import diceReducer from './slices/diceSlice'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

const store = configureStore({
  reducer: {
    dices: diceReducer,
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
