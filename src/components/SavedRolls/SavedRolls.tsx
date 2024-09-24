import React from 'react'
import styles from './SavedRolls.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { DiceNames, IRoll } from '@datatypes/dice'
import {
  setModifier,
  rollAndCalcTotal,
  deleteSavedRoll,
  clearRolls,
  setCurrentSavedRollName,
} from '@slices/diceSlice'
import { getNumFromDice, getRandNum } from '@utils/utils'
import clsx from 'clsx'

export const SavedRolls: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { savedRolls } = useSelector((state: RootState) => state.dices)

  const clickSavedRoll = (name: string) => {
    dispatch(clearRolls())
    dispatch(setCurrentSavedRollName(name))
    const savedRoll = savedRolls.find((roll) => roll.rollName === name) as IRoll

    dispatch(setModifier(savedRoll.modifier || 0))

    const rollEntries = Object.entries(savedRoll?.dices || {}).filter(
      (r): r is [DiceNames, number] => {
        return r[1] > 0
      }
    )

    rollEntries.forEach((r: [DiceNames, number]) => {
      for (let i = 0; i < r[1]; i++) {
        const diceNum = getNumFromDice(r[0])
        const randNum = getRandNum(1, diceNum)
        dispatch(rollAndCalcTotal({ dice: diceNum, rolledNum: randNum }))
      }
    })
  }

  const clickDeleteSave = (name: string) => {
    dispatch(deleteSavedRoll(name))
  }

  return (
    <div className={styles.Container}>
      {savedRolls.length > 0 &&
        savedRolls.map((roll: IRoll) => {
          return (
            <span
              key={roll.rollName}
              className={styles.SavedRoll}
              style={{ background: roll.colour }}
            >
              <button
                className={clsx(
                  styles.SavedRoll__Btn,
                  styles.SavedRoll__Btn_save
                )}
                onClick={() => clickSavedRoll(roll.rollName)}
              >
                {roll.rollName}
              </button>
              <button
                className={clsx(
                  styles.SavedRoll__Btn,
                  styles.SavedRoll__Btn_delete
                )}
                onClick={() => clickDeleteSave(roll.rollName)}
              >
                x
              </button>
            </span>
          )
        })}
    </div>
  )
}
