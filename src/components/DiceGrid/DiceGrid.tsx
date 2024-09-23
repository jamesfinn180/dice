import React from 'react'
import styles from './DiceGrid.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { IDice } from '@datatypes/dice'
import { d20, d20i, d12, d10, d8, d6, d4 } from '../../assets/img'
import { getRandNum } from '@utils/utils'
import { rollAndCalcTotal } from '@slices/diceSlice'
import clsx from 'clsx'

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
      <span className={styles.Dice__Title} style={{ color: colour }}>
        {num}
      </span>

      <img className={styles.Dice__Img} src={imgUrls[name]} alt="dice" />
      {/* <img className={styles.Dice__Img} src={d20i} alt="dice" /> */}

      {rolls.length > 0 && (
        <span className={styles.Dice__Result}>{rolls.at(-1)}</span>
      )}

      <aside className={styles.Dice__Rolls}>
        {rolls.length > 0 && (
          <>
            {rolls.join(', ')} <br />
            <span className={styles.Dice__Rolls__Total}>
              [ {rolls.reduce((a, b) => a + b)} ]
            </span>
          </>
        )}
      </aside>
    </button>
  )
}
