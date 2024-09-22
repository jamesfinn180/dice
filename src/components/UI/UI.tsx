import React from 'react'
import styles from './UI.module.scss'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { clearRolls } from '@slices/diceSlice'
import { SelectBox } from '@components/SelectBox/SelectBox'

export const UI: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className={styles.Container}>
      <SelectBox />
      <button
        className={clsx(styles.Button, styles.Button_save)}
        onClick={() => alert('Coming Soon')}
      >
        Save Roll
      </button>
      <button
        className={clsx(styles.Button, styles.Button_clear)}
        onClick={() => dispatch(clearRolls())}
      >
        Clear
      </button>
    </div>
  )
}
