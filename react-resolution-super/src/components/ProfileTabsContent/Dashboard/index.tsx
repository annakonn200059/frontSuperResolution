import React, { useState } from 'react'
import * as ST from './styled'
import { ChartControl } from './ChartsControl'

export const Dashboard = () => {
  return (
    <ST.Container>
      <ChartControl />
    </ST.Container>
  )
}
