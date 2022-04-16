import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import * as ST from './styled'
import 'react-datepicker/dist/react-datepicker.css'
import './styled.css'
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
import { Line } from 'react-chartjs-2'
import enGB from 'date-fns/locale/en-GB'
import { getChartsData } from 'api/dashboard'
import zoomPlugin from 'chartjs-plugin-zoom'
import { DateTime } from 'luxon'
import BaseSelect from '../../../ui/BaseSelect'
import { COLORS } from 'constants/colors'
import ZoomIn from 'assets/icons/Chart/zoom-in.svg'
import ZoomOut from 'assets/icons/Chart/zoom-out.svg'

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

interface ICharts {
  loginChart: any[]
  registerChart: any[]
}

interface IChartModel {
  chartData: any[]
  labelOption: string
}

const ChartModel: FC<IChartModel> = ({
  chartData,
  labelOption,
}: IChartModel) => {
  const chartRef = useRef<any | null>(null)
  const [startDate, setStartDate] = useState<Date | null>(() => {
    let date = new Date()
    return new Date(date.setDate(date.getDate() - 3))
  })
  const [endDate, setEndDate] = useState<Date | null>(new Date())
  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ]
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
        },
        zoom: {
          wheel: { enabled: true, speed: 0.05, mode: 'xy' },
          drag: { enabled: true },
          onZoomComplete({ chart }: any) {
            chart.update('none')
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time period',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: `Amount of ${labelOption}`,
        },
      },
    },
  }

  const resetZoom = () => {
    chartRef.current.resetZoom()
  }
  const zoomIn = () => {
    chartRef.current.zoom(1.3)
  }
  const zoomOut = () => {
    chartRef.current.zoom(0.7)
  }

  return (
    <ST.Container>
      <ST.DatePickerContainer>
        <DatePicker
          className="datepicker"
          locale={'en-GB'}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          dateFormat="dd.MM.yyyy"
          customInput={<ST.Input />}
          startDate={startDate}
          endDate={endDate}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            increaseYear,
            decreaseYear,
            prevMonthButtonDisabled,
          }) => (
            <div
              style={{
                margin: 5,
                marginBottom: 10,
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: `${COLORS.white}`,
              }}
            >
              <ST.ButtonCalendarContainer>
                <ST.ButtonBack
                  style={{
                    backgroundColor: `${COLORS.white}`,
                  }}
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                />
                <ST.HeaderText>{months[date.getMonth()]}</ST.HeaderText>
                <ST.ButtonForward
                  onClick={increaseMonth}
                  style={{
                    backgroundColor: `${COLORS.white}`,
                  }}
                />
              </ST.ButtonCalendarContainer>
              <ST.ButtonCalendarContainer>
                <ST.ButtonBack
                  onClick={decreaseYear}
                  style={{
                    backgroundColor: `${COLORS.white}`,
                  }}
                />
                <ST.HeaderText>{date.getFullYear()}</ST.HeaderText>
                <ST.ButtonForward
                  onClick={increaseYear}
                  style={{
                    backgroundColor: `${COLORS.white}`,
                  }}
                />
              </ST.ButtonCalendarContainer>
            </div>
          )}
        />
        {'-'}
        <DatePicker
          className="datepicker"
          locale={'en-GB'}
          selected={endDate}
          customInput={<ST.Input />}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd.MM.yyyy"
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            increaseYear,
            decreaseYear,
          }) => (
            <div
              style={{
                margin: 5,
                marginBottom: 10,
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: `${COLORS.white}`,
              }}
            >
              <ST.ButtonCalendarContainer>
                <ST.ButtonBack
                  style={{
                    backgroundColor: `${COLORS.white}`,
                  }}
                  onClick={decreaseMonth}
                />
                <ST.HeaderText>{months[date.getMonth()]}</ST.HeaderText>
                <ST.ButtonForward
                  onClick={increaseMonth}
                  style={{
                    backgroundColor: `${COLORS.white}`,
                  }}
                />
              </ST.ButtonCalendarContainer>
              <ST.ButtonCalendarContainer>
                <ST.ButtonBack
                  onClick={decreaseYear}
                  style={{
                    backgroundColor: `${COLORS.white}`,
                  }}
                />
                <ST.HeaderText>{date.getFullYear()}</ST.HeaderText>
                <ST.ButtonForward
                  onClick={increaseYear}
                  style={{
                    backgroundColor: `${COLORS.white}`,
                  }}
                />
              </ST.ButtonCalendarContainer>
            </div>
          )}
        />
      </ST.DatePickerContainer>
      <ST.ButtonContainer>
        <ST.ResetZoomButton onClick={resetZoom}>Reset Zoom </ST.ResetZoomButton>
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

export const ChartControl = () => {
  const [chartData, setChartData] = useState<ICharts>({
    loginChart: [],
    registerChart: [],
  })
  const [chosenChart, setChosenChart] = useState<number>(0)
  const labels: string[] = ['logins', 'registers']
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
