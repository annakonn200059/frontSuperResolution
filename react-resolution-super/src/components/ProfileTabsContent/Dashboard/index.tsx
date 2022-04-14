import React, { useState } from 'react'
import * as ST from './styled'
import { ChartControl } from './Charts'

export const Dashboard = () => {
  return (
    <ST.Container>
      <ChartControl />
    </ST.Container>
  )
}
