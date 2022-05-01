import styled from 'styled-components'
import { COLORS } from 'constants/colors'

export const Container = styled.div`
  padding: 50px 60px 0 60px;
`

export const DropContainer = styled.div`
  padding: 40px;
  box-shadow: 0 8px 64px rgba(15, 34, 67, 0.05), 0 0 1px rgba(15, 34, 67, 0.08);
  border-radius: 8px;
  position: relative;
`

export const DropArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

export const SubmitButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  width: 140px;
  height: 40px;
  background: ${COLORS.blue};
  border-radius: 10px;
  user-select: none;
  color: ${COLORS.white};
  font-size: 16px;
  line-height: 140%;
  margin-left: 40px;
  &:disabled {
    background: ${COLORS.lightGrey};
  }
`
export const ErrorText = styled.div`
  margin-top: 20px;
  line-height: 140%;
  color: ${COLORS.errorRed};
  margin-bottom: 15px;
  font-size: 16px;
`
