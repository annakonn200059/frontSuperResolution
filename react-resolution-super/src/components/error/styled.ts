import styled from 'styled-components'
import { COLORS } from 'constants/colors'

export const ErrorWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${COLORS.backgroundGrey};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ErrorText = styled.div`
  font-size: 60px;
  font-weight: 600;
  color: ${COLORS.blue};
`
