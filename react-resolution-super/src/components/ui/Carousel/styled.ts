import styled from 'styled-components'
import { ReactComponent as Arrow } from 'assets/icons/arrow.svg'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  width: 100%;
`

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`

export const Content = styled.div`
  display: flex;
  transition: all 250ms linear;

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
  transform: ${(props) => (props.isRight ? null : `rotate(-180deg)`)};
  width: 20px;
  height: 20px;
  cursor: pointer;
`
