import { useRef } from "react"

export const useDebounce = <T extends (...args: Parameters<T>) => void>(cb: T, delay: number) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  return (...args: Parameters<T>) => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => cb.apply(this, args), delay)
  }
}
