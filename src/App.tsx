import React, { useEffect } from 'react'
import styles from './App.module.scss'
import { DiceGrid } from '@components/DiceGrid/DiceGrid'
import { RollsOutput } from '@components/RollsOutput/RollsOutput'
import { UI } from '@components/UI/UI'
import useFullHeight from '@hooks/useHullHeight'
import { SavedRolls } from '@components/SavedRolls/SavedRolls'
import { getSavedRollsStorage } from '@storage/storage'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './store'
import { setAllSavedRolls } from '@slices/diceSlice'
import { HistoryRolls } from '@components/HistoryRolls/HistoryRolls'

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  useFullHeight()

  useEffect(() => {
    const initialSavedRolls = getSavedRollsStorage()
    dispatch(setAllSavedRolls(initialSavedRolls))
  }, [])

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
