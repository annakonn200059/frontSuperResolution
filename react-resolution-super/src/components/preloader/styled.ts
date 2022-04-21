import styled from 'styled-components'
import { COLORS } from 'constants/colors'

export const StyledPreloaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Loader = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(${COLORS.backgroundGrey}, transparent);
  animation: rotating 1s linear infinite;

  &:before {
    content: '';
    position: absolute;
    width: 80px;
    height: 80px;
    top: 20px;
    left: 20px;
    border-radius: 50%;
    background: ${COLORS.white};
  }

  @keyframes rotating {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`
