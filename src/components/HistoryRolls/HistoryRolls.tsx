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

export const HistoryRolls: React.FC = () => {
  const { historyRolls } = useSelector((state: RootState) => state.dices)

  return (
    <AnimatePresence>
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
          <motion.div
            key={hRoll.id}
            initial={{ opacity: 0, x: -200, height: 0 }}
            exit={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 30 }}
            //transition={{ duration: 0.2 }} // Duration of animation
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
  )
}
