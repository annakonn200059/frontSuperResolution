import React, { FC, useCallback, useState } from 'react'
import * as ST from './styled'
import { PurchaseState } from 'types/purchaseSubscription'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { accessToken, purchase } from 'store/selectors'
// @ts-ignore
import Card from 'reactjs-credit-card/card'
// @ts-ignore
import { useCardForm } from 'reactjs-credit-card'
import { getProlongSubscription } from '../../../api/userPurchase'
import { setActivePurchase } from '../../../store/actions/purchase'

interface IPayment {
  closeModal: () => void
  onSubmitPay?: () => void
  cost?: number
  payErrorText?: string
}

export const Payment: FC<IPayment> = ({
  closeModal,
  cost,
  onSubmitPay,
  payErrorText,
}: IPayment) => {
  const getFormData = useCardForm()
  const [numberValid, setNumberValid] = useState(true)
  const [validationError, setValidationError] = useState('')
  const [resultSubmit, setResultSubmit] = useState(true)
  const token: string = useSelector<RootState, string>(accessToken)
  const [errorText, setErrorText] = useState<string>('')
  const dispatch = useDispatch()

  const prolongTheSubscription = async () => {
    let isError = false
    await getProlongSubscription(token)
      .then((res) => dispatch(setActivePurchase))
      .catch((err) => {
        setErrorText(err.response.data.msg || 'Error')
        isError = true
      })
    return isError
  }

  const handleValidateCardData = async (e: any) => {
    e.preventDefault()
    const [data, isValid] = getFormData()

    console.log(data, isValid) //log all form data and verification results

    if (!data.number.isValid) setNumberValid(false) //we'll set a hook to show a error if card number is invalid
    if (!isValid) setValidationError('Invalid data')
    if (isValid) {
      const isError = await prolongTheSubscription()
      if (!isError) {
        //closeModal()
      }
    }
  }

  const handleSubmitCardData = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleValidateCardData(e)
    //console.log(resultSubmit)
  }

  function handleFocus() {
    setNumberValid(true)
  }

  return (
    <ST.PaymentWrapper>
      <ST.HeaderPayment>Payment information</ST.HeaderPayment>
      <ST.CardWrapper>
        <Card />
        <ST.CardFieldsForm onSubmit={(event) => handleSubmitCardData(event)}>
          <ST.StyledCardNumber placeholder="Number" onFocus={handleFocus} />
          <ST.StyledCardHolder placeholder="Owner" />
          <ST.DateWrapper>
            <ST.StyledValidThruMonth />
            <ST.StyledValidThruYear />
          </ST.DateWrapper>
          <ST.StyledCardSecurityCode
            placeholder="CVV"
            className="input-text semi"
          />
          <ST.SubmitPayButton type="submit">Submit</ST.SubmitPayButton>
          {(errorText || validationError) && (
            <ST.ErrorText>{errorText || validationError}</ST.ErrorText>
          )}
        </ST.CardFieldsForm>
      </ST.CardWrapper>
    </ST.PaymentWrapper>
  )
}
