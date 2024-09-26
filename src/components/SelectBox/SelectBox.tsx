import React, { useState } from 'react'
import styles from './SelectBox.module.scss'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { modifierAndCalcTotal } from '@slices/diceSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { modalAnimTime } from '@consts/consts'

const options = [
  { value: '6', text: '+6' },
  { value: '7', text: '+7' },
  { value: '8', text: '+8' },
  { value: '9', text: '+9' },
  { value: '10', text: '+10' },
  { value: '1', text: '+1' },
  { value: '2', text: '+2' },
  { value: '3', text: '+3' },
  { value: '4', text: '+4' },
  { value: '5', text: '+5' },
  { value: '0', text: '0' },
  { value: '-1', text: '-1' },
  { value: '-2', text: '-2' },
  { value: '-3', text: '-3' },
  { value: '-4', text: '-4' },
  { value: '-5', text: '-5' },
  { value: '-6', text: '-6' },
  { value: '-7', text: '-7' },
  { value: '-8', text: '-8' },
  { value: '-9', text: '-9' },
  { value: '-10', text: '-10' },
]

export const SelectBox: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { modifier } = useSelector((state: RootState) => state.dices)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSelectChange = (value: string) => {
    dispatch(modifierAndCalcTotal(parseInt(value)))
    setIsModalOpen(false)
  }

  return (
    <div className={styles.customSelect}>
      <button
        className={styles.selectButton}
        onClick={() => setIsModalOpen(true)}
      >
        Modifier: <span className={styles.modifier}>{modifier}</span>
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ rotateX: 90 }}
            animate={{ rotateX: 0 }}
            exit={{ rotateX: 90 }}
            transition={{ duration: modalAnimTime }}
            className={styles.modal}
          >
            <div className={styles.modalContent}>
              <p style={{ gridColumn: '1/6' }}>Select Modifier:</p>
              <div className={styles.options}>
                {options.map((option) => (
                  <button
                    key={option.value}
                    className={clsx(styles.optionButton, {
                      [styles.selected]: option.value === modifier.toString(),
                      [styles.centreSelect]: option.value === '0',
                    })}
                    onClick={() => handleSelectChange(option.value)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
              <button
                className={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
