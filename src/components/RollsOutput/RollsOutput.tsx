import React from 'react'
import styles from './RollsOutput.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { getDiceColour, sumArray } from '@utils/utils'
import { IDice } from '@datatypes/dice'

export const RollsOutput: React.FC = () => {
  const { rollsTotal, dices, modifier } = useSelector(
    (state: RootState) => state.dices
  )
  const outComes = dices.filter((d) => !!d.rolls.length)

  if (!rollsTotal) return null

  const formatDiceNotations = (dArr: IDice[]) => {
    const dLength = dArr.length
    return dArr.map((d, i) => {
      const rollsLength = d.rolls.length
      return (
        <>
          <span
            key={d.name}
            className={styles.Outcome}
            style={{ borderColor: getDiceColour(d.name) }}
          >
            <span className={styles.Outcome__Label}>
              {rollsLength}
              {d.name}
            </span>

            <span>[{sumArray(d.rolls)}]</span>
          </span>
          {i !== dLength - 1 && ' + '}
        </>
      )
    })
  }

  const formatModifier = (mod: number) => {
    const sign = mod > 0 ? '+' : '-'
    return (
      <>
        {sign} <span className={styles.Outcome__Modifier}>{Math.abs(mod)}</span>
      </>
    )
  }

  return (
    <p className={styles.Container}>
      <>{formatDiceNotations(outComes)}</>
      <>{!!modifier && formatModifier(modifier)}</> ={' '}
      <span className={styles.Outcome__Total}>[{rollsTotal}]</span>
    </p>
  )
}
