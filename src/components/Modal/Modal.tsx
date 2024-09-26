import React, { ReactNode } from 'react'
import styles from './Modal.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { modalAnimTime } from '@consts/consts'

interface IModal {
  children: ReactNode
}
export const Modal: React.FC<IModal> = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ rotateX: 90 }}
        exit={{ rotateX: 90 }}
        animate={{ rotateX: 0 }}
        transition={{ duration: modalAnimTime }}
        className={styles.Modal}
      >
        <div className={styles.Modal__Content}>{children}</div>
      </motion.div>
    </AnimatePresence>
  )
}
