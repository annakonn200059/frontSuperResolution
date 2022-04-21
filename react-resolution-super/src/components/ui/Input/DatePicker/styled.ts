import styled from 'styled-components'
import { COLORS } from 'constants/colors'
import Right from 'assets/icons/Calendar/chevron-right.svg'
import Left from 'assets/icons/Calendar/chevron-left.svg'

export const Input = styled.input`
  width: 100px;
  outline: none;
  text-align: center;
  border: 0;
  border-radius: 10px;
  font-size: 16px;
  line-height: 140%;
  color: ${COLORS.black};
`

export const ButtonCalendarContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
`

export const ButtonForward = styled.button`
  background: url(${Right}) center no-repeat;
  margin-left: 10px;
`

export const ButtonBack = styled.button`
  background: url(${Left}) center no-repeat;
  margin-right: 10px;
`

export const HeaderText = styled.div`
  color: ${COLORS.black};
  font-size: 14px;
  line-height: 20px;
`
