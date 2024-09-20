import React, { useEffect } from 'react'
import styles from './App.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { setProject } from '@slices/storeSlice'

const App: React.FC = () => {
  const { name, project } = useSelector((state: RootState) => state.game)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(setProject('Boilerplate'))
  }, [])

  return (
    <div className={styles.App}>
      <h1 className={styles.Title}>
        {name} : {project}
      </h1>
    </div>
  )
}

export default App
