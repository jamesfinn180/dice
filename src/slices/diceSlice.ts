import { IDice, IDiceRolled, IRoll, IHistoryRoll } from '@datatypes/dice'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getDiceColour } from '@utils/utils'
import { AppThunk } from '../store'
import { setAllSavedRollsStorage, setSavedRollsStorage } from '@storage/storage'

interface IInitialState {
  dices: IDice[]
  rollsTotal: number | null
  modifier: number
  savedRolls: IRoll[]
  isGrid: boolean
  historyRolls: IHistoryRoll[]
  currentSavedRollName: string
}

export const initialDiceState: IInitialState = {
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
  rollsTotal: null,
  modifier: 0,
  savedRolls: [],
  isGrid: true,
  historyRolls: [],
  currentSavedRollName: '',
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

    clearHistory: (state) => {
      state.historyRolls = initialDiceState.historyRolls
    },

    clearRolls: (state) => {
      // Store roll in history
      if (state.rollsTotal !== null) {
        const historyRoll = {
          rollName: state.currentSavedRollName,
          dices: state.dices,
          modifier: state.modifier,
          rollsTotal: state.rollsTotal,
        } as IHistoryRoll
        state.historyRolls.unshift(historyRoll)
      }

      // Clear
      state.currentSavedRollName = initialDiceState.currentSavedRollName
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

    saveRoll: (
      state,
      action: PayloadAction<{ name: string; colour: string }>
    ) => {
      const roll = {} as IRoll
      roll.rollName = action.payload.name
      roll.colour = action.payload.colour
      roll.dices = state.dices
        .map((d) => {
          return { [d.name]: d.rolls.length }
        })
        .reduce((acc, current) => {
          return { ...acc, ...current }
        })
      roll.modifier = state.modifier
      setSavedRollsStorage(roll)

      state.savedRolls.push(roll)
    },

    deleteSavedRoll: (state, action: PayloadAction<string>) => {
      const newSavedRolls = state.savedRolls.filter(
        (roll) => roll.rollName !== action.payload
      )

      setAllSavedRollsStorage(newSavedRolls)
      state.savedRolls = newSavedRolls
    },

    setAllSavedRolls: (state, action: PayloadAction<IRoll[]>) => {
      state.savedRolls = action.payload
    },

    toggleIsGrid: (state) => {
      state.isGrid = !state.isGrid
    },

    setCurrentSavedRollName: (state, action: PayloadAction<string>) => {
      state.currentSavedRollName = action.payload
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

export const {
  setRolls,
  clearRolls,
  clearHistory,
  setModifier,
  calculateRollsTotal,
  saveRoll,
  setAllSavedRolls,
  deleteSavedRoll,
  toggleIsGrid,
  setCurrentSavedRollName,
} = diceSlice.actions

export default diceSlice.reducer
