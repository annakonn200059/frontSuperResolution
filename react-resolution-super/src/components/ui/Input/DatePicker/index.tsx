import React, { useEffect } from 'react'
import * as ST from './styled'
import 'react-datepicker/dist/react-datepicker.css'
import './styled.css'
import DatePicker, { registerLocale } from 'react-datepicker'
import enGB from 'date-fns/locale/en-GB'
import { COLORS } from 'constants/colors'

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

interface Props {
  setStartDate?: React.Dispatch<React.SetStateAction<Date | null>>
  setEndDate?: React.Dispatch<React.SetStateAction<Date | null>>
  startDate?: Date | null
  endDate: Date | null
  isFirst: boolean
}

export const DatePickerCalendar = ({
  setStartDate,
  setEndDate,
  startDate,
  endDate,
  isFirst,
}: Props) => {
  useEffect(() => {
    registerLocale('en-GB', enGB)
  }, [])

  return (
    <DatePicker
      className="datepicker"
      locale={'en-GB'}
      selected={isFirst ? startDate : endDate}
      onChange={
        isFirst
          ? (date) => (setStartDate ? setStartDate(date) : null)
          : (date) => (setEndDate ? setEndDate(date) : null)
      }
      selectsStart={isFirst}
      selectsEnd={!isFirst}
      dateFormat="dd.MM.yyyy"
      customInput={<ST.Input />}
      startDate={startDate}
      endDate={endDate}
      minDate={isFirst ? null : startDate}
      maxDate={isFirst ? endDate : null}
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
  )
}
