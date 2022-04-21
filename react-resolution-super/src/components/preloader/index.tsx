import React from 'react'
import * as ST from './styled'

export const Preloader = () => {
  return (
    <ST.StyledPreloaderWrapper>
      <ST.Loader />
    </ST.StyledPreloaderWrapper>
  )
}
