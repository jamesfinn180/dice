import { IStore } from '@datatypes/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { AppThunk } from '../store'

const initialStoreState: IStore = {
  name: 'James',
  project: '',
}

export const storeSlice = createSlice({
  name: 'storeAction',
  initialState: initialStoreState,
  reducers: {
    setProject: (state, action: PayloadAction<string>) => {
      state.project = action.payload
    },
  },
})

export const { setProject } = storeSlice.actions

export default storeSlice.reducer

// Example Redux Thunk
/*
export const submitGuessAndCheckStatus =
  (): AppThunk => (dispatch, getState) => {
    const { guesses } = getState().game
    const lastGuess = guesses[guesses.length - 1]

    if (lastGuess.length === GAME_NUM_CODE) {
      dispatch(setGameStatus())
      dispatch(submitGuess())
    }
  }
*/
