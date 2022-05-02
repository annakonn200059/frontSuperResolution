import styled from 'styled-components'
import { COLORS } from 'constants/colors'

export const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: pre-line;
`

export const HeaderText = styled.div`
  text-align: center;
  white-space: pre-wrap;
`

export const PopupCloseButton = styled.button`
  margin-top: 20px;
  background-color: ${COLORS.blue};
  padding: 4px 30px;
  border-radius: 10px;
  color: ${COLORS.white};
  font-weight: 600;
  font-size: 16px;
`
