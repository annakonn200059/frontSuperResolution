import React, { useCallback, useEffect, useState } from 'react'
import { getChartsData } from 'api/dashboard'
import * as ST from './styled'
import BaseSelect from '../../../ui/BaseSelect'
import { ChartModel } from './ChartModel'

interface ICharts {
  loginChart: any[]
  registerChart: any[]
  subscriptionsChart: any[]
}

export const ChartControl = () => {
  const [chartData, setChartData] = useState<ICharts>({
    loginChart: [],
    registerChart: [],
    subscriptionsChart: [],
  })
  const [chosenChart, setChosenChart] = useState<number>(0)
  const labels = ['logins', 'registers', 'subscriptions purchases']
  const chosenChartData = Object.values(chartData)[chosenChart]

  const onChangeDashboard = useCallback(() => {
    getChartsData().then((data) => setChartData(data))
  }, [chartData])

  useEffect(() => {
    onChangeDashboard()
  }, [])

  return (
    <ST.ChartControlContainer>
      <BaseSelect
        isSmallSelect={true}
        placeHolder={labels[chosenChart]}
        listItems={labels}
        name={'chart'}
        setIndex={setChosenChart}
      />
      <ChartModel
        chartData={chosenChartData}
        labelOption={labels[chosenChart]}
      />
    </ST.ChartControlContainer>
  )
}
