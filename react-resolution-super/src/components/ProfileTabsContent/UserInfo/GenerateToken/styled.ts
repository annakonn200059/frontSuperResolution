import styled from 'styled-components'
import { COLORS } from 'constants/colors'

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const Button = styled.button`
  padding: 5px 10px 5px 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #ddd;
  text-align: center;
  font-size: 16px;
  color: grey;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`

export const Description = styled.p`
  color: ${COLORS.blue};
  text-decoration: underline;
  cursor: pointer;
  margin-top: 20px;
`

interface InputProps {
  error?: string
}

export const NewPropertyInput = styled.input<InputProps>`
  padding: 0 0 3px 20px;
  width: 200px;
  height: 35px;
  border-radius: 16px;
  background: ${COLORS.white};
  font-size: 16px;
  line-height: 140%;
  border: 1px solid
    ${(props) => (props.error ? `${COLORS.red}` : `${COLORS.blue}`)};
  color: ${COLORS.lightGrey};
  margin-bottom: 30px;
`

export const InputLabel = styled.div`
  font-weight: 600;
  line-height: 1.5;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 10px;
  display: inline-block;
`

export const ErrorText = styled.div`
  font-size: 14px;
  line-height: 140%;
  color: ${COLORS.errorRed};
  margin-top: 15px;
`

export const TokenContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`

export const Token = styled.div`
  width: 100px;
`
export const CopyIcon = styled.p``
