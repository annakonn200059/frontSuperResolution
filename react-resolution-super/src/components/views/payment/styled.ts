import styled from 'styled-components'
import { COLORS } from 'constants/colors'
import back from 'assets/blue_background.png'
// @ts-ignore
import { CardHolder } from 'reactjs-credit-card/form'
// @ts-ignore
import { CardNumber } from 'reactjs-credit-card/form'
// @ts-ignore
import { CardSecurityCode } from 'reactjs-credit-card/form'
// @ts-ignore
import { ValidThruMonth } from 'reactjs-credit-card/form'
// @ts-ignore
import { ValidThruYear } from 'reactjs-credit-card/form'

export const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 40px 100px;
`

export const HeaderPayment = styled.h1`
  padding-left: 50px;
  font-size: 30px;
  font-weight: 600;
  color: grey;
  text-shadow: 0 4px 20px rgb(0 0 0 / 20%);
`

export const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 50px;
  padding: 50px;
`

export const CardFieldsForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
`

export const StyledCardHolder = styled(CardHolder)`
  padding: 0 10px 0 10px;
  width: calc(100% - 20px);
  max-width: 250px;
  min-width: 220px;
  height: 35px;
  border-radius: 5px;
  background: ${COLORS.white};
  font-size: 16px;
  line-height: 140%;
  border: 1px solid ${COLORS.lightGrey};
  color: ${COLORS.lightGrey};
  //margin-bottom: 10px;
`
export const StyledCardNumber = styled(CardNumber)`
  padding: 0 10px 0 10px;
  width: calc(100% - 20px);
  max-width: 250px;
  min-width: 220px;
  height: 35px;
  border-radius: 5px;
  background: ${COLORS.white};
  font-size: 16px;
  line-height: 140%;
  border: 1px solid ${COLORS.lightGrey};
  color: ${COLORS.lightGrey};
  //margin-bottom: 10px;
`
export const StyledCardSecurityCode = styled(CardSecurityCode)`
  padding: 0 8px 0 8px;
  width: 50px;
  height: 30px;
  text-align: center;
  border-radius: 5px;
  background: ${COLORS.white};
  font-size: 16px;
  line-height: 140%;
  border: 1px solid ${COLORS.lightGrey};
  color: ${COLORS.lightGrey};
  //margin-bottom: 10px;
`

export const DateWrapper = styled.div`
  display: flex;
  justify-items: center;
  flex-wrap: nowrap;
  column-gap: 10px;
  margin-top: -5px;
  margin-bottom: -5px;
`
export const StyledValidThruMonth = styled(ValidThruMonth)`
  border: none;
`
export const StyledValidThruYear = styled(ValidThruYear)`
  border: none;
`

export const SubmitPayButton = styled.button`
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #ddd;
  text-align: center;
  font-size: 14px;
  color: grey;
  font-weight: 600;
  width: 100px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`

export const ErrorText = styled.div`
  font-size: 14px;
  line-height: 140%;
  color: ${COLORS.errorRed};
  text-align: center;
`
