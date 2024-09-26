import React, { useEffect } from 'react'
import styles from './App.module.scss'
import { DiceGrid } from '@components/DiceGrid/DiceGrid'
import { RollsOutput } from '@components/RollsOutput/RollsOutput'
import { UI } from '@components/UI/UI'
import useFullHeight from '@hooks/useHullHeight'
import { SavedRolls } from '@components/SavedRolls/SavedRolls'
import { getSavedRollsStorage } from '@storage/storage'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'
import { setAllSavedRolls } from '@slices/diceSlice'
import { HistoryRolls } from '@components/HistoryRolls/HistoryRolls'
import useSFX from '@hooks/useSFX'
import { diceHasRolled } from '@utils/utils'

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { isAudio, dices } = useSelector((state: RootState) => state.dices)
  useFullHeight()
  const { play } = useSFX()

  useEffect(() => {
    const initialSavedRolls = getSavedRollsStorage()
    dispatch(setAllSavedRolls(initialSavedRolls))
  }, [])

  useEffect(() => {
    if (diceHasRolled(dices) && isAudio) {
      play()
    }
  }, [dices, isAudio])

  return (
    <div className={styles.App}>
      <div className={styles.Page}>
        <DiceGrid />
        <RollsOutput />
        <HistoryRolls />
        <div className={styles.UIContainer}>
          <SavedRolls />
          <UI />
        </div>
      </div>
    </div>
  )
}

export default App
