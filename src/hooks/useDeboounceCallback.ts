import { useEffect, useRef } from 'react'

export const useDebouncedCallback = <T extends (...args: any[]) => void>(
  callback: T,
  debounce: number = 500
) => {
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    debounced: (...args: Parameters<T>): void => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => callback(...args), debounce)
    },
    cancel: () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    },
  }
}
