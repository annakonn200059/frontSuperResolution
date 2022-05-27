import styled from 'styled-components'
import { COLORS } from 'constants/colors'
import { BreakPoints } from 'constants/breakPoints'

export const AddContactContainer = styled.div``

//TODO create button ui component
export const AddContactButton = styled.button`
  cursor: pointer;
  background-color: ${COLORS.blue};
  padding: 10px 20px;
  border-radius: 10px;
  color: ${COLORS.white};
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 50px;
  @media (max-width: ${BreakPoints.PHONE320}) {
    font-size: 14px;
  }
`

export const InputsContainer = styled.div`
  margin-top: 30px;
`
export const InputWrapper = styled.div``

export const SelectWrapper = styled.div`
  margin-bottom: 15px;
`

export const InputLabel = styled.div`
  margin-bottom: 10px;
  display: inline-block;
`

interface InputProps {
  error?: string
}

export const Input = styled.input<InputProps>`
  padding: 0 20px 3px 20px;
  width: calc(100% - 40px);
  max-width: 480px;
  min-width: 220px;
  height: 47px;
  border-radius: 16px;
  background: ${COLORS.white};
  font-size: 16px;
  line-height: 140%;
  border: 1px solid
    ${(props) => (props.error ? `${COLORS.red}` : `${COLORS.blue}`)};

  color: ${COLORS.black};
  margin-bottom: 30px;
  &:last-of-type {
    margin-bottom: 15px;
  }
  &:disabled {
    background-color: ${COLORS.lightGreyBackground};
    border: 1px solid ${COLORS.lightGrey};
  }
`

export const ErrorText = styled.div`
  font-size: 14px;
  line-height: 140%;
  color: ${COLORS.errorRed};
  margin-bottom: 15px;
`

export const SubmitButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px 40px;
  width: 280px;
  height: 48px;
  background: ${COLORS.blue};
  border-radius: 50px;
  user-select: none;
  color: ${COLORS.white};
  font-size: 16px;
  line-height: 140%;
  &:disabled {
    background: ${COLORS.lightGrey};
  }
`
