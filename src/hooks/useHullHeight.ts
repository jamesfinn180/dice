import { useEffect } from 'react'

/*
Insure that the following CSS is in parent container
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
*/
const useFullHeight = () => {
  useEffect(() => {
    const setFullHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setFullHeight()

    window.addEventListener('resize', setFullHeight)

    return () => {
      window.removeEventListener('resize', setFullHeight)
    }
  }, [])
}

export default useFullHeight
