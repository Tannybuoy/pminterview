import { useState, useEffect, useCallback, useRef } from 'react'

export function useTimer(questionId) {
  const [time, setTime] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    setTime(0)

    intervalRef.current = setInterval(() => {
      setTime(t => t + 1)
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [questionId])

  const reset = useCallback(() => {
    setTime(0)
  }, [])

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const resume = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime(t => t + 1)
      }, 1000)
    }
  }, [])

  return { time, reset, pause, resume }
}
