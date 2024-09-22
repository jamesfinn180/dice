import React from 'react'
import styles from './RollsOutput.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import {
  DiceNotation,
  ModifierNotation,
} from '@components/DiceNotation/DiceNotation'

export const RollsOutput: React.FC = () => {
  const { rollsTotal, dices, modifier } = useSelector(
    (state: RootState) => state.dices
  )
  const outComes = dices.filter((d) => !!d.rolls.length)

  if (rollsTotal === null) return null

  return (
    <p className={styles.Container}>
      <DiceNotation dArr={outComes} />
      <>{!!modifier && <ModifierNotation modifier={modifier} />}</> ={' '}
      <span className={styles.Outcome__Total}>[{rollsTotal}]</span>
    </p>
  )
}
