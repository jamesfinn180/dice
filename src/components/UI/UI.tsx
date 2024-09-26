import React, { useState, useRef, useEffect } from 'react'
import styles from './UI.module.scss'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import {
  clearRolls,
  clearHistory,
  saveRoll,
  toggleIsGrid,
  updateSwatch,
  toggleAudio,
} from '@slices/diceSlice'
import { SelectBox } from '@components/SelectBox/SelectBox'
import { Modal } from '@components/Modal/Modal'
import { RollsOutput } from '@components/RollsOutput/RollsOutput'
import { RxRows, RxColumns } from 'react-icons/rx'
import { BiVolumeMute, BiVolumeFull } from 'react-icons/bi'
import { getDiceColour } from '@utils/utils'
import { COLOURS } from '@consts/consts'

export const UI: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const { rollsTotal, isGrid, historyRolls, swatchIndex, isAudio } =
    useSelector((state: RootState) => state.dices)
  const closeModal = () => {
    setShowModal(false)
  }
  const [nextSwatch, setNextSwatch] = useState(1)

  useEffect(() => {
    setNextSwatch(swatchIndex === COLOURS.length - 1 ? 0 : swatchIndex + 1)
  }, [swatchIndex])

  return (
    <div className={styles.Container}>
      {/* Modifier */}
      {/* ROW 1 */}

      <button
        className={clsx(styles.Button, styles.Button_swatch)}
        onClick={() => dispatch(updateSwatch())}
      >
        <span
          style={{ background: getDiceColour('d20', nextSwatch) }}
          className={styles.ColourBlock}
        ></span>
        <span
          style={{ background: getDiceColour('d12', nextSwatch) }}
          className={styles.ColourBlock}
        ></span>
        <span
          style={{ background: getDiceColour('d10', nextSwatch) }}
          className={styles.ColourBlock}
        ></span>
        <span
          style={{ background: getDiceColour('d8', nextSwatch) }}
          className={styles.ColourBlock}
        ></span>
        <span
          style={{ background: getDiceColour('d6', nextSwatch) }}
          className={styles.ColourBlock}
        ></span>
        <span
          style={{ background: getDiceColour('d4', nextSwatch) }}
          className={styles.ColourBlock}
        ></span>
      </button>
      <SelectBox />

      <button
        className={clsx(styles.Button, styles.Button_clear)}
        onClick={() => dispatch(clearRolls())}
      >
        Clear
      </button>

      {/*  ROW 2*/}
      <button
        className={clsx(styles.Button, styles.Button_grid)}
        onClick={() => {
          dispatch(toggleIsGrid())
        }}
      >
        {isGrid ? <RxRows /> : <RxColumns />}
      </button>

      <button
        className={clsx(styles.Button, styles.Button_audio)}
        onClick={() => {
          dispatch(toggleAudio())
        }}
      >
        {isAudio ? (
          <BiVolumeFull style={{ fontSize: '18px' }} />
        ) : (
          <BiVolumeMute style={{ fontSize: '18px' }} />
        )}
      </button>

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
        className={clsx(styles.Button, styles.Button_clearHistory)}
        onClick={() => dispatch(clearHistory())}
        disabled={historyRolls.length === 0}
      >
        Clear History
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
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [saveColour, setSaveColour] = useState('#cf4646')

  const radioHighlight = '0 0 0 2px white, 0 0 0 4px red'
  const colours = [
    'black',
    '#cf4646',
    '#2d9b2d',
    '#4e4eff',
    '#aa9041',
    '#9c41aa',
  ]

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSave = () => {
    dispatch(saveRoll({ name: inputValue, colour: saveColour }))
    closeModal()
  }

  return (
    <>
      <RollsOutput showSubtotal={false} showTotal={false} />
      <p className={styles.ModalTitle}>
        Save Roll as:{' '}
        <div
          className={styles.InputContainer}
          style={{ background: saveColour }}
        >
          <input
            type="text"
            className={styles.Input}
            placeholder="roll name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            ref={inputRef}
          />
        </div>
      </p>

      <div className={styles.ColourContainer}>
        {colours.map((colour) => {
          return (
            <label
              key={colour}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <input
                type="radio"
                name="color"
                value={colour}
                checked={saveColour === colour}
                onChange={() => setSaveColour(colour)}
                style={{ display: 'none' }}
              />
              <div
                role="button"
                tabIndex={0}
                aria-label={`Select ${colour}`}
                className={styles.RadioBtn}
                style={{
                  background: colour,
                  boxShadow: saveColour === colour ? radioHighlight : '',
                }}
                onClick={() => setSaveColour(colour)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSaveColour(colour)
                  }
                }}
              ></div>
            </label>
          )
        })}
      </div>

      <div className={styles.BtnContainer}>
        <button className={styles.Btn} onClick={closeModal}>
          Close
        </button>
        <button
          className={styles.Btn}
          onClick={handleSave}
          disabled={inputValue.length === 0}
        >
          Save
        </button>
      </div>
    </>
  )
}
