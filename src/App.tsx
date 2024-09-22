import React from 'react'
import styles from './App.module.scss'
import { DiceGrid } from '@components/DiceGrid/DiceGrid'
import { RollsOutput } from '@components/RollsOutput/RollsOutput'
import { UI } from '@components/UI/UI'
import useFullHeight from '@hooks/useHullHeight'

const App: React.FC = () => {
  useFullHeight()

  return (
    <div className={styles.App}>
      <div className={styles.Page}>
        <DiceGrid />
        <RollsOutput />
        <div className={styles.UIContainer}>
          <div className={styles.Gap} />
          <UI />
          {/* SavedRolls */}
          {/* Reset & Modifier */}
        </div>
      </div>
    </div>
  )
}

export default App
