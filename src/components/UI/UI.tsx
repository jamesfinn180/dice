import React, { useState, useRef, useEffect } from 'react'
import styles from './UI.module.scss'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { clearRolls, saveRoll } from '@slices/diceSlice'
import { SelectBox } from '@components/SelectBox/SelectBox'
import { Modal } from '@components/Modal/Modal'

export const UI: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const { rollsTotal } = useSelector((state: RootState) => state.dices)
  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div className={styles.Container}>
      <SelectBox />
      <button
        className={clsx(styles.Button, styles.Button_save)}
        disabled={rollsTotal === null}
        onClick={() => {
          setShowModal(true)
        }}
      >
        Save Roll
      </button>
      <button
        className={clsx(styles.Button, styles.Button_clear)}
        onClick={() => dispatch(clearRolls())}
      >
        Clear
      </button>

      {showModal && (
        <Modal>
          <SaveModal closeModal={closeModal} />
        </Modal>
      )}
    </div>
  )
}

interface ISaveModal {
  closeModal: () => void
}
const SaveModal: React.FC<ISaveModal> = (props) => {
  const { closeModal } = props
  const dispatch = useDispatch<AppDispatch>()
  const { dices, modifier } = useSelector((state: RootState) => state.dices)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const formatRoll = () => {
    return dices
      .filter((d) => {
        return d.rolls.length > 0
      })
      .map((d) => {
        return `${d.rolls.length}${d.name}`
      })
      .join(' + ')
  }

  const handleSave = () => {
    dispatch(saveRoll(inputValue))
    closeModal()
  }

  return (
    <>
      <h2>Save Rolls as...</h2>
      <p>
        {formatRoll()} {modifier !== 0 && modifier}
      </p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        ref={inputRef}
      />
      <button onClick={handleSave}>SAVE</button>
      <button onClick={closeModal}>CLOSE</button>
    </>
  )
}
