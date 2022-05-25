import styled from 'styled-components'
import Edit from 'assets/icons/subscriptions.svg'
import Cancel from 'assets/icons/cancel.svg'
import { COLORS } from 'constants/colors'

export const Container = styled.div`
  padding: 50px 60px 0 60px;
`

export const Table = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 8px;
`
interface IField {
  header?: boolean
}

export const Row = styled.div<IField>`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1.2fr 0.4fr;
  padding: 20px;
  background-color: ${(props) => (props.header ? 'rgba(0,0,0,0.03)' : '')};
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  font-weight: ${(props) => (props.header ? 'bold' : '')};
  font-size: ${(props) => (props.header ? '18px' : '')};
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`

export const Field = styled.div<IField>`
  margin: auto;
`

export const EditImage = styled.div`
  width: 20px;
  height: 20px;
  margin: auto;
  background: url(${Edit}) 50% 50% no-repeat;
  cursor: pointer;
  align-self: center;
`

export const CloseEdit = styled.div`
  width: 20px;
  height: 20px;
  //margin: auto;
  background: url(${Cancel}) 100% 100% no-repeat;
  cursor: pointer;
  align-self: center;
`

export const SubmitEdit = styled.button`
  cursor: pointer;
  background: none;
  color: ${COLORS.blue};
  font-size: 18px;
  font-weight: bold;

  &:disabled {
    color: ${COLORS.lightGrey};
    cursor: not-allowed;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  column-gap: 10px;
`

export const RoundSwitch = styled.span``

export const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  font-weight: bold;
`

export const Switch = styled.div`
  position: relative;
  width: 60px;
  height: 28px;
  background: #b3b3b3;
  border-radius: 32px;
  padding: 4px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: '';
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 35px;
    top: 50%;
    left: 4px;
    background: white;
    transform: translate(0, -50%);
  }
`

export const Input = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${Switch} {
    background: ${COLORS.blue};

    &:before {
      transform: translate(32px, -50%);
    }
  }
`
