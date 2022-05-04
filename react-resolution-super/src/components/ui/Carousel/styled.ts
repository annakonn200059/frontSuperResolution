import styled from 'styled-components'
import { COLORS } from 'constants/colors'
import { ReactComponent as Arrow } from 'assets/icons/arrow.svg'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`

export const ContentWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  &:hover {
    transition: transform 0.3s ease;
    transform: scale(1.1);
  }

  &:not(:hover) {
    transition: transform 0.3s ease;
  }
`

export const Content = styled.div`
  display: flex;
  transition: all 250ms linear;
  -ms-overflow-style: none; /* hide scrollbar in IE and Edge */
  scrollbar-width: none; /* hide scrollbar in Firefox */

  > * {
    width: 99.5%;
    flex-shrink: 0;
    flex-grow: 1;
    border-radius: 8px 8px 0 0;
  }
`

interface IButtonSwap {
  isRight: boolean
}

export const ButtonSwap = styled(Arrow)<IButtonSwap>`
  position: absolute;
  top: 50%;
  left: ${(props) => (props.isRight ? null : `-70px`)};
  right: ${(props) => (props.isRight ? '-70px' : null)};
  transform: ${(props) => (props.isRight ? null : `rotate(-180deg)`)};
  width: 20px;
  height: 20px;
  cursor: pointer;
`
