import React from 'react'

export const onEnterSubmit = (
  e: React.KeyboardEvent<HTMLInputElement>,
  callBack: () => void
) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.stopPropagation()
    callBack()
  }
}
