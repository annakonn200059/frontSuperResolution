import styled from 'styled-components'
import { COLORS } from 'constants/colors'
import Left from 'assets/icons/Calendar/chevron-left.svg'

export const ChartControlContainer = styled.div`
  padding: 40px;
  box-shadow: 0 8px 64px rgba(15, 34, 67, 0.05), 0 0 1px rgba(15, 34, 67, 0.08);
  border-radius: 8px;
  position: relative;
`

export const Container = styled.div``

export const Chart = styled.div`
  max-width: 100%;
  max-height: 100%;
  position: relative;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: flex-end;
  column-gap: 10px;
  border-radius: 10px;
  position: relative;
  margin-top: 10px;
`

const ZoomControlButton = styled.img`
  cursor: pointer;
  position: absolute;
  right: 0;
  height: 22px;
  width: 22px;
  :hover {
    cursor: pointer;
  }
`

export const ResetZoomButton = styled.div`
  color: ${COLORS.lightGrey};
  text-align: center;
  cursor: pointer;
  font-weight: 400;
  font-size: 16px;
  line-height: 110%;
`
export const ZoomInButton = styled(ZoomControlButton)`
  z-index: 1;
  top: 40px;
`
export const ZoomOutButton = styled(ZoomControlButton)`
  z-index: 2;
  top: 80px;
`

export const DatePickerContainer = styled.div`
  position: absolute;
  top: 40px;
  right: 60px;
  display: flex;
  align-items: center;
`

export const ButtonBack = styled.button`
  background: url(${Left}) center no-repeat;
  margin-right: 10px;
`
