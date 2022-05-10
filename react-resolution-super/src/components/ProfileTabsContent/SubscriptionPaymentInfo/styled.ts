import styled from 'styled-components'
import { COLORS } from 'constants/colors'
import back from 'assets/Vector.svg'

export const HeaderPayment = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: grey;
  padding-left: 50px;
  text-shadow: 0 4px 20px rgb(0 0 0 / 20%);
`

export const SubscriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  column-gap: 70px;
  padding: 60px 0 40px 0;
`

interface IBackGround {
  rotate: string
}

export const BackGround = styled.div<IBackGround>`
  position: absolute;
  top: ${(props) => (props.rotate === 'right' ? `150px` : `-20px`)};
  left: ${(props) => (props.rotate === 'right' ? null : `-190px`)};
  right: ${(props) => (props.rotate === 'right' ? `-190px` : null)};
  width: 70%;
  height: 70%;
  transform: ${(props) =>
    props.rotate === 'right' ? `rotate(-90deg)` : `rotate(90deg)`};
  background-image: url(${back});
  background-size: 100% 100%;
  background-position: 0 0;
  background-repeat: no-repeat;
`

export const SubscriptionName = styled.div`
  white-space: pre-wrap;
  font-weight: 600;
  line-height: 1.5;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.65);
`
export const Name = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
`

export const InputLabel = styled.div`
  font-weight: 600;
  line-height: 1.5;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 10px;
  display: inline-block;
`

export const SubmitPayButton = styled.button`
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #ddd;
  text-align: center;
  font-size: 16px;
  color: grey;
  font-weight: 600;
  width: 100px;
  margin-top: 20px;
  color: rgba(0, 0, 0, 0.5);
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`

export const ErrorText = styled.div`
  position: absolute;
  bottom: 30px;
  left: 100px;
  font-size: 14px;
  line-height: 140%;
  color: ${COLORS.errorRed};
  text-align: center;
  margin-top: 20px;
`

export const InputsContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`

export const Cost = styled.div`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;
  line-height: 1.5;
`

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const Input = styled.input`
  padding: 0 0 3px 10px;
  width: calc(100% - 20px);
  max-width: 100px;
  min-width: 100px;
  height: 30px;
  border-radius: 5px;
  background: ${COLORS.white};
  font-size: 16px;
  line-height: 140%;
  border: 1px solid ${COLORS.blue};
  color: ${COLORS.lightGrey};
  margin-bottom: 30px;
  &::placeholder {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.5);
  }
`
