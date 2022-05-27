import React, { FC, useEffect, useRef, useState } from 'react'
import * as ST from '../styled'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  registerables as registerablesJS,
} from 'chart.js'
import { registerLocale } from 'react-datepicker'
import { Line } from 'react-chartjs-2'
import enGB from 'date-fns/locale/en-GB'
import zoomPlugin from 'chartjs-plugin-zoom'
import { DateTime } from 'luxon'
import ZoomIn from 'assets/icons/Chart/zoom-in.svg'
import ZoomOut from 'assets/icons/Chart/zoom-out.svg'
import { DatePickerCalendar } from '../../../../ui/Input/DatePicker'
import { useTranslation } from 'react-i18next'

ChartJS.register(zoomPlugin)
ChartJS.register(...registerablesJS)
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  ArcElement,
  Tooltip
)

interface IChartModel {
  chartData: any[]
  labelOption: string
}

export const ChartModel: FC<IChartModel> = ({
  chartData,
  labelOption,
}: IChartModel) => {
  const { t } = useTranslation(['profile'])
  const chartRef = useRef<any | null>(null)
  const [startDate, setStartDate] = useState<Date | null>(() => {
    let date = new Date()
    return new Date(date.setDate(date.getDate() - 3))
  })
  const [endDate, setEndDate] = useState<Date | null>(new Date())

  useEffect(() => {
    registerLocale('en-GB', enGB)
  }, [])

  const getDateTime = (curDate: Date) => {
    return DateTime.fromJSDate(curDate)
  }

  const getLocaleStringFromDate = (curDate: Date) => {
    return getDateTime(curDate).toLocaleString()
  }

  const getDatePlusDay = (curDate: Date) => {
    return getDateTime(curDate).plus({ day: 1 })
  }

  const findDaysArr = (startDayDate: Date, endDayDate: Date) => {
    const ansArr: string[] = []
    let curDate = startDayDate
    while (
      getLocaleStringFromDate(curDate) !== getLocaleStringFromDate(endDayDate)
    ) {
      const nextDay = getDatePlusDay(curDate)
      ansArr.push(nextDay.toLocaleString())
      curDate = nextDay.toJSDate()
    }
    return ansArr
  }

  const findLabels = () => {
    let daysArr
    if (startDate && endDate) {
      daysArr = findDaysArr(startDate, endDate)
    } else {
      daysArr = ['']
    }
    return daysArr
  }

  const findDateElements = (labels: string[]) => {
    return labels.map((date: String) => {
      const item = chartData.find((element: any) => element.x === date)
      return item ? item.y : 0
    })
  }

  const [labels, setLabels] = useState<string[]>(findLabels())

  useEffect(() => {
    setLabels(findLabels())
  }, [startDate, endDate])

  const data2 = {
    labels: labels,
    datasets: [
      {
        label: labelOption,
        data: findDateElements(labels),
        fill: false,
        borderColor: '#5561FF',
        tension: 0.1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      zoom: {
        limits: {
          y: { min: -10 },
        },
        pan: {
          enabled: true,
          threshold: 5,
        },
        /*zoom: {
          wheel: { enabled: true },
          //drag: { enabled: true },
          onZoomComplete({ chart }: any) {
            chart.update('none')
          },
        },*/
        speed: 0.001,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: `${t('timePeriod')}`,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: `${t('amount')}`,
        },
      },
    },
  }

  const resetZoom = () => {
    chartRef.current.resetZoom()
  }
  const zoomIn = () => {
    chartRef.current.zoom(1.1)
  }
  const zoomOut = () => {
    chartRef.current.zoom(0.7)
  }

  return (
    <ST.Container>
      <ST.DatePickerContainer>
        <DatePickerCalendar
          setStartDate={setStartDate}
          startDate={startDate}
          endDate={endDate}
          isFirst={true}
        />
        {'-'}
        <DatePickerCalendar
          setEndDate={setEndDate}
          startDate={startDate}
          endDate={endDate}
          isFirst={false}
        />
      </ST.DatePickerContainer>
      <ST.ButtonContainer>
        <ST.ResetZoomButton onClick={resetZoom}>
          {t('resetZoom')}
        </ST.ResetZoomButton>
        <ST.ZoomInButton
          src={ZoomIn}
          alt={'zoom in'}
          onClick={() => zoomIn()}
        />
        <ST.ZoomOutButton
          onClick={() => zoomOut()}
          alt={'zoom out'}
          src={ZoomOut}
        />
      </ST.ButtonContainer>
      <ST.Chart>
        <Line data={data2} options={options} ref={chartRef} />
      </ST.Chart>
    </ST.Container>
  )
}
