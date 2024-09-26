import React, { useState, useEffect } from 'react'
import styles from './RollsOutput.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import {
  DiceNotation,
  ModifierNotation,
} from '@components/DiceNotation/DiceNotation'
import { motion, AnimatePresence } from 'framer-motion'
import { revealAnimDelay } from '@consts/consts'

interface IRollsOutput {
  showSubtotal?: boolean
  showTotal?: boolean
}
export const RollsOutput: React.FC<IRollsOutput> = (props) => {
  const { rollsTotal, dices, modifier, currentSavedRollName } = useSelector(
    (state: RootState) => state.dices
  )
  const { showSubtotal = true, showTotal = true } = props
  const [animTrigger, setAnimTrigger] = useState(0)
  const outComes = dices.filter((d) => !!d.rolls.length)

  useEffect(() => {
    setAnimTrigger((prev) => prev + 1)
  }, [rollsTotal])

  if (rollsTotal === null) return <p className={styles.Container}>...</p>

  return (
    <div style={{ background: 'white', height: '75px' }}>
      <AnimatePresence>
        <motion.p
          key={animTrigger}
          initial={{ rotateX: 90 }}
          animate={{ rotateX: 720 }}
          transition={{ delay: revealAnimDelay, duration: 0.8 }}
          className={styles.Container}
        >
          {currentSavedRollName && (
            <span className={styles.Outcome__Name}>
              {currentSavedRollName}:
            </span>
          )}
          <DiceNotation dArr={outComes} showSubtotal={showSubtotal} />
          <>{!!modifier && <ModifierNotation modifier={modifier} />}</>
          {showTotal && (
            <>
              = <span className={styles.Outcome__Total}>[{rollsTotal}]</span>
            </>
          )}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
