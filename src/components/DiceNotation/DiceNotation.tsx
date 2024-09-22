import React from 'react'
import styles from './DiceNotation.module.scss'
import { IDice } from '@datatypes/dice'
import { getDiceColour, sumArray } from '@utils/utils'

interface IDiceNotation {
  dArr: IDice[]
}
export const DiceNotation: React.FC<IDiceNotation> = (props) => {
  const { dArr } = props
  const dLength = dArr.length

  return (
    <>
      {dArr.map((d: IDice, i: number) => {
        const rollsLength = d.rolls.length
        return (
          <span key={d.name}>
            <span
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
          </span>
        )
      })}
    </>
  )
}

interface IModifierNotation {
  modifier: number
}
export const ModifierNotation: React.FC<IModifierNotation> = (props) => {
  const { modifier } = props
  const sign = modifier > 0 ? '+' : '-'

  return (
    <>
      {sign}{' '}
      <span className={styles.Outcome__Modifier}>{Math.abs(modifier)}</span>
    </>
  )
}
