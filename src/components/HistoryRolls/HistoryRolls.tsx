import React from 'react'
import styles from './HistoryRolls.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { IHistoryRoll, IDice } from '@datatypes/dice'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DiceNotation,
  ModifierNotation,
} from '@components/DiceNotation/DiceNotation'
import clsx from 'clsx'
import { HISTORY_AMOUNT_BUFFER } from '@consts/consts'

export const HistoryRolls: React.FC = () => {
  const { historyRolls } = useSelector((state: RootState) => state.dices)

  return (
    <div className={styles.HistoryContainer}>
      <AnimatePresence>
        {historyRolls.map((hRoll: IHistoryRoll) => {
          const dArr = hRoll.dices.filter((d: IDice) => d.rolls.length > 0)
          dArr
            .map((d) => {
              return { [d.name]: d.rolls.length }
            })
            .reduce((acc, current) => {
              return { ...acc, ...current }
            }, {})
          return (
            <motion.div
              key={hRoll.id}
              initial={{ opacity: 0, x: -200, height: 0 }}
              exit={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 25 }}
            >
              <p className={clsx(styles.HistoryPara)}>
                {hRoll.rollName && (
                  <span className={styles.HistoryTitle}>{hRoll.rollName}:</span>
                )}
                <DiceNotation dArr={dArr} showSubtotal={false} />
                {hRoll.modifier !== 0 && (
                  <ModifierNotation modifier={hRoll.modifier} />
                )}{' '}
                = {hRoll.rollsTotal}
              </p>
            </motion.div>
          )
        })}
      </AnimatePresence>
      {historyRolls.length > HISTORY_AMOUNT_BUFFER && (
        <div className={styles.HistoryBuffer} />
      )}
    </div>
  )
}
