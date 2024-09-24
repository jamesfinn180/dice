import React from 'react'
import styles from './RollsOutput.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import {
  DiceNotation,
  ModifierNotation,
} from '@components/DiceNotation/DiceNotation'

interface IRollsOutput {
  showSubtotal?: boolean
  showTotal?: boolean
}
export const RollsOutput: React.FC<IRollsOutput> = (props) => {
  const { rollsTotal, dices, modifier, currentSavedRollName } = useSelector(
    (state: RootState) => state.dices
  )
  const { showSubtotal = true, showTotal = true } = props
  const outComes = dices.filter((d) => !!d.rolls.length)

  if (rollsTotal === null) return null

  return (
    <p className={styles.Container}>
      {currentSavedRollName && (
        <span className={styles.Outcome__Name}>{currentSavedRollName}:</span>
      )}
      <DiceNotation dArr={outComes} showSubtotal={showSubtotal} />
      <>{!!modifier && <ModifierNotation modifier={modifier} />}</>
      {showTotal && (
        <>
          = <span className={styles.Outcome__Total}>[{rollsTotal}]</span>
        </>
      )}
    </p>
  )
}
