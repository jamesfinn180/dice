import { IDice, IDiceRolled, IRoll, IHistoryRoll } from '@datatypes/dice'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../store'
import { setAllSavedRollsStorage, setSavedRollsStorage } from '@storage/storage'
import { v4 as uuid } from 'uuid'
import { COLOURS } from '@consts/consts'

interface IInitialState {
  dices: IDice[]
  rollsTotal: number | null
  modifier: number
  savedRolls: IRoll[]
  isGrid: boolean
  historyRolls: IHistoryRoll[]
  currentSavedRollName: string
  swatchIndex: number
  isAudio: boolean
}

export const initialDiceState: IInitialState = {
  dices: [
    {
      name: 'd20',
      num: 20,
      rolls: [],
    },
    {
      name: 'd12',
      num: 12,
      rolls: [],
    },
    {
      name: 'd10',
      num: 10,
      rolls: [],
    },
    {
      name: 'd8',
      num: 8,
      rolls: [],
    },
    {
      name: 'd6',
      num: 6,
      rolls: [],
    },
    {
      name: 'd4',
      num: 4,
      rolls: [],
    },
  ],
  rollsTotal: null,
  modifier: 0,
  savedRolls: [],
  isGrid: true,
  historyRolls: [],
  currentSavedRollName: '',
  swatchIndex: 0,
  isAudio: true,
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
          id: uuid(),
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

    updateSwatch: (state) => {
      const newSwatchIndex =
        state.swatchIndex === COLOURS.length - 1 ? 0 : state.swatchIndex + 1
      state.swatchIndex = newSwatchIndex
    },

    toggleAudio: (state) => {
      state.isAudio = !state.isAudio
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
  updateSwatch,
  toggleAudio,
} = diceSlice.actions

export default diceSlice.reducer
