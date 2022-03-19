import styled from 'styled-components'
import { COLORS } from 'constants/colors'

export const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const HeaderText = styled.div``

export const PopupCloseButton = styled.button`
  margin-top: 20px;
  background-color: ${COLORS.blue};
  padding: 4px 30px;
  border-radius: 10px;
  color: ${COLORS.white};
  font-weight: 600;
  font-size: 16px;
`
