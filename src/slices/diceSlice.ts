import { IDice, IDiceRolled } from '@datatypes/dice'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getDiceColour } from '@utils/utils'
import { AppThunk } from '../store'

interface IInitialState {
  dices: IDice[]
  rollsTotal: number
  modifier: number
}

const initialDiceState: IInitialState = {
  dices: [
    {
      name: 'd20',
      num: 20,
      rolls: [],
      colour: getDiceColour('d20'),
    },
    {
      name: 'd12',
      num: 12,
      rolls: [],
      colour: getDiceColour('d12'),
    },
    {
      name: 'd10',
      num: 10,
      rolls: [],
      colour: getDiceColour('d10'),
    },
    {
      name: 'd8',
      num: 8,
      rolls: [],
      colour: getDiceColour('d8'),
    },
    {
      name: 'd6',
      num: 6,
      rolls: [],
      colour: getDiceColour('d6'),
    },
    {
      name: 'd4',
      num: 4,
      rolls: [],
      colour: getDiceColour('d4'),
    },
  ],
  rollsTotal: 0,
  modifier: 0,
}

export const diceSlice = createSlice({
  name: 'diceAction',
  initialState: initialDiceState,
  reducers: {
    setRolls: (state, action: PayloadAction<IDiceRolled>) => {
      const d = state.dices.find((d) => d.num === action.payload.dice)
      if (d?.rolls) {
        d.rolls.push(action.payload.rolledNum)
      }
    },
    clearRolls: (state) => {
      state.dices = initialDiceState.dices
      state.rollsTotal = initialDiceState.rollsTotal
      state.modifier = initialDiceState.modifier
    },
    setModifier: (state, action: PayloadAction<number>) => {
      state.modifier = action.payload
    },
    calculateRollsTotal: (state) => {
      const total =
        state.dices.reduce((dSum, d) => {
          return (
            dSum +
            d.rolls.reduce((rollSum, roll) => {
              return rollSum + roll
            }, 0)
          )
        }, 0) + state.modifier
      state.rollsTotal = total
    },
  },
})

export const rollAndCalcTotal =
  (diceRolled: IDiceRolled): AppThunk =>
  (dispatch) => {
    dispatch(setRolls(diceRolled))
    dispatch(calculateRollsTotal())
  }

export const modifierAndCalcTotal =
  (modifier: number): AppThunk =>
  (dispatch) => {
    dispatch(setModifier(modifier))
    dispatch(calculateRollsTotal())
  }

export const { setRolls, clearRolls, setModifier, calculateRollsTotal } =
  diceSlice.actions

export default diceSlice.reducer
