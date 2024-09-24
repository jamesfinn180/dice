import React, { useEffect, useState } from 'react'
import styles from './HistoryRolls.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { IHistoryRoll, IDice } from '@datatypes/dice'
import {
  DiceNotation,
  ModifierNotation,
} from '@components/DiceNotation/DiceNotation'
import clsx from 'clsx'

export const HistoryRolls: React.FC = () => {
  const { historyRolls } = useSelector((state: RootState) => state.dices)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    if (historyRolls.length > 0) {
      setShouldAnimate(true)

      const timer = setTimeout(() => {
        setShouldAnimate(false)
      }, 750)

      return () => clearTimeout(timer)
    }
  }, [historyRolls])

  return (
    <div className={styles.HistoryContainer}>
      {historyRolls.map((hRoll: IHistoryRoll, i) => {
        const dArr = hRoll.dices.filter((d: IDice) => d.rolls.length > 0)
        dArr
          .map((d) => {
            return { [d.name]: d.rolls.length }
          })
          .reduce((acc, current) => {
            return { ...acc, ...current }
          })
        return (
          <p
            key={i}
            className={clsx(styles.HistoryPara, {
              [styles.HistoryPara_anim]: i === 0 && shouldAnimate,
            })}
          >
            {hRoll.rollName && (
              <span className={styles.HistoryTitle}>{hRoll.rollName}:</span>
            )}
            <DiceNotation dArr={dArr} showSubtotal={false} />
            {hRoll.modifier !== 0 && (
              <ModifierNotation modifier={hRoll.modifier} />
            )}{' '}
            = {hRoll.rollsTotal}
          </p>
        )
      })}
    </div>
  )
}
