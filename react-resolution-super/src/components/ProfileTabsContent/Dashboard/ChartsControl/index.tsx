import React, { useCallback, useEffect, useState } from 'react'
import { getChartsData } from 'api/dashboard'
import * as ST from './styled'
import BaseSelect from '../../../ui/BaseSelect'
import { ChartModel } from './ChartModel'
import { useTranslation } from 'react-i18next'

interface ICharts {
  loginChart: any[]
  registerChart: any[]
  subscriptionsChart: any[]
}

export const ChartControl = () => {
  const { t } = useTranslation(['profile'])
  const [chartData, setChartData] = useState<ICharts>({
    loginChart: [],
    registerChart: [],
    subscriptionsChart: [],
  })
  const [chosenChart, setChosenChart] = useState<number>(0)
  const labels = [
    `${t('logins')}`,
    `${t('registers')}`,
    `${t('subscriptionsPurchases')}`,
  ]
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
