import React, { useEffect, useState } from 'react'
import styles from './DiceGrid.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { IDice } from '@datatypes/dice'
import { d20, d12, d10, d8, d6, d4 } from '../../assets/img'
import { getRandNum } from '@utils/utils'
import { rollAndCalcTotal } from '@slices/diceSlice'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { revealAnimDelay } from '@consts/consts'

const imgUrls = {
  d20,
  d12,
  d10,
  d8,
  d6,
  d4,
}

export const DiceGrid: React.FC = () => {
  const { dices, isGrid } = useSelector((state: RootState) => state.dices)

  return (
    <div
      className={clsx(styles.Container, { [styles.Container_flat]: isGrid })}
    >
      {dices.map((d: IDice) => {
        return <Dice key={d.name} dice={d} isGrid={isGrid} />
      })}
    </div>
  )
}

interface IDiceProps {
  dice: IDice
  isGrid: boolean
}
const Dice: React.FC<IDiceProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { dice, isGrid } = props
  const { name, rolls, num, colour } = dice
  const [animTrigger, setAnimTrigger] = useState(0)

  useEffect(() => {
    if (dice.rolls.length > 0) {
      setAnimTrigger((prev) => prev + 1)
    }
  }, [dice])

  const rollDice = () => {
    const randNum = getRandNum(1, num)
    dispatch(rollAndCalcTotal({ dice: num, rolledNum: randNum }))
  }

  return (
    <button
      className={clsx(styles.Dice, { [styles.Dice_flat]: isGrid })}
      style={{ background: colour }}
      onClick={rollDice}
    >
      <span
        className={clsx(styles.Dice__Title, {
          [styles.Dice__Title_flat]: isGrid,
        })}
        style={{ color: colour }}
      >
        {num}
      </span>

      <motion.img
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 * animTrigger }}
        transition={{ duration: 0.8 }}
        className={clsx(styles.Dice__Img, { [styles.Dice__Img_flat]: isGrid })}
        src={imgUrls[name]}
        alt="dice"
      />

      {rolls.length > 0 && (
        <motion.span
          key={animTrigger}
          initial={{ opacity: 0, fontSize: 0 }}
          exit={{ opacity: 0, fontSize: 0 }}
          animate={{ opacity: 1, fontSize: '40px' }}
          transition={{ delay: revealAnimDelay }}
          className={styles.Dice__Result}
        >
          {rolls.at(-1)}
        </motion.span>
      )}

      <div
        className={clsx(styles.Dice__Rolls, {
          [styles.Dice__Rolls_flat]: isGrid,
        })}
      >
        <motion.aside
          key={animTrigger}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: revealAnimDelay }}
        >
          {rolls.length > 0 && (
            <>
              {rolls.join(', ')} <br />
              <span className={styles.Dice__Rolls__Total}>
                [ {rolls.reduce((a, b) => a + b)} ]
              </span>
            </>
          )}
        </motion.aside>
      </div>
    </button>
  )
}
