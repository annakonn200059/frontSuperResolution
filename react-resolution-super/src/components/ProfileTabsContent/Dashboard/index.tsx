import React, { useState } from 'react'
import * as ST from './styled'
import { Charts } from './Charts'

export const Dashboard = () => {
  return (
    <ST.Container>
      <Charts />
    </ST.Container>
  )
}
