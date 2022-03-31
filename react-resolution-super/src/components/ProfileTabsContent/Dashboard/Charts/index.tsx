import React, { useCallback, useEffect, useMemo, useState } from 'react'
import * as ST from './styled'
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
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import * as zoom from 'chartjs-plugin-zoom'
import { Chart, Pie, Line } from 'react-chartjs-2'
import enGB from 'date-fns/locale/en-GB'
import { getChartsData } from 'api/dashboard'
import zoomPlugin from 'chartjs-plugin-zoom'
import { DateTime } from 'luxon'

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

function range(start: any, end: any) {
  return (
    Array(end - start + 1)
      //.fill()
      .map((_, idx) => start + idx)
  )
}
interface ICharts {
  loginChart: any[]
  registerChart: any[]
}

export const Charts = () => {
  const [startDate, setStartDate] = useState<Date | null>(() => {
    let date = new Date()
    return new Date(date.setDate(date.getDate() - 3))
  })
  const [endDate, setEndDate] = useState<Date | null>(new Date())
  const [chartData, setChartData] = useState<ICharts>({
    loginChart: [],
    registerChart: [],
  })

  const onChangeDashboard = useCallback(() => {
    getChartsData().then((data) => setChartData(data))
  }, [chartData])

  useEffect(() => {
    registerLocale('en-GB', enGB)
  }, [])

  useEffect(() => {
    onChangeDashboard()
  }, [])

  const zoomOptions = {
    pan: {
      enabled: true,
      mode: 'xy',
    },
    zoom: {
      wheel: {
        enabled: true,
      },
      pinch: {
        enabled: true,
      },
      mode: 'xy',
      /*onZoomComplete({ chart }) {
        // This update is needed to display up to date zoom level in the title.
        // Without this, previous zoom level is displayed.
        // The reason is: title uses the same beforeUpdate hook, and is evaluated before zoom.
        chart.update('none')
      },*/
    },
  }
  /* const options = {
    responsive: true,
    scales: {
      x: {
        //type: 'time',
        //min: startDate?.toDateString(),
        //max: endDate?.toDateString(),
      },
    },
    pan: {
      enabled: true,
      mode: 'xy',
    },
    zoom: {
      enabled: true,
      mode: 'xy',
    },
    title: {
      display: false,
    },

    legend: {
      display: false,
    },
    plugins: {},
  }*/
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
      const item = chartData.loginChart.find(
        (element: any) => element.x === date
      )
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
        //label: labels,
        data: findDateElements(labels),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  const options = {}

  return (
    <ST.Container>
      <DatePicker
        className="datepicker"
        locale={'en-GB'}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        dateFormat="dd/MM/yyyy"
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        className="datepicker"
        locale={'en-GB'}
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat="dd/MM/yyyy"
      />
      <ST.Chart>
        <Line data={data2} options={options} />
      </ST.Chart>
    </ST.Container>
  )
}
