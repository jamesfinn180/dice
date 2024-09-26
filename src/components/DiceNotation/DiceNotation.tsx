import React from 'react'
import styles from './DiceNotation.module.scss'
import { IDice } from '@datatypes/dice'
import { getDiceColour, sumArray } from '@utils/utils'
import { RootState } from 'src/store'
import { useSelector } from 'react-redux'

interface IDiceNotation {
  dArr: IDice[]
  showSubtotal?: boolean
}
export const DiceNotation: React.FC<IDiceNotation> = (props) => {
  const { dArr, showSubtotal = true } = props
  const { swatchIndex } = useSelector((state: RootState) => state.dices)
  const dLength = dArr.length

  return (
    <>
      {dArr.map((d: IDice, i: number) => {
        const rollsLength = d.rolls.length
        return (
          <span key={d.name}>
            <span
              className={styles.Outcome}
              style={{ borderColor: getDiceColour(d.name, swatchIndex) }}
            >
              <span className={styles.Outcome__Label}>
                {rollsLength}
                {d.name}
              </span>

              {showSubtotal && (
                <span className={styles.Outcome__Subtitle}>
                  [{sumArray(d.rolls)}]
                </span>
              )}
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
