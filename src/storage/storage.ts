// import { LOCAL_STORAGE_PREFIX } from '@consts/game'
import { APP_LOCAL_STORAGE_PREFIX } from '@consts/consts'
import { IRoll } from '@datatypes/dice'
import { initialDiceState } from '@slices/diceSlice'

export const SAVED_ROLLS_STORAGE = `${APP_LOCAL_STORAGE_PREFIX}savedRolls`

export const getSavedRollsStorage = () => {
  let savedRollsStr = localStorage.getItem(SAVED_ROLLS_STORAGE)
  if (!savedRollsStr) {
    savedRollsStr = JSON.stringify(initialDiceState.savedRolls)
  }
  return JSON.parse(savedRollsStr)
}

export const setSavedRollsStorage = (newSavedRoll: IRoll) => {
  const savedRolls = getSavedRollsStorage()
  savedRolls.push(newSavedRoll)
  localStorage.setItem(SAVED_ROLLS_STORAGE, JSON.stringify(savedRolls))
}
