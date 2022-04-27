import { useEffect, MutableRefObject } from 'react'

export function useOutsideClick(
  ref: MutableRefObject<HTMLDivElement | null>,
  callback: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}
