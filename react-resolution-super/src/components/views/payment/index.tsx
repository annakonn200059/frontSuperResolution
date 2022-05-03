import React, { FC, useCallback, useState } from 'react'
import * as ST from './styled'
// @ts-ignore
import Card from 'reactjs-credit-card/card'
// @ts-ignore
import { useCardForm } from 'reactjs-credit-card'
import { ISubscriptionWithId } from '../../../types/subscription'
import { SubscriptionPaymentInfo } from '../../ProfileTabsContent/SubscriptionPaymentInfo'

interface IPayment {
  closeModal: () => void
  onSubmitPay?: () => void
  payErrorText?: string
  subscriptionInfo?: ISubscriptionWithId
  setShowSubmitModal?: React.Dispatch<React.SetStateAction<boolean>>
  showSubmitModal?: boolean
  dispatchFunction?: () => void
}

export const Payment: FC<IPayment> = ({
  closeModal,
  onSubmitPay,
  payErrorText,
  subscriptionInfo,
  setShowSubmitModal,
  showSubmitModal,
  dispatchFunction,
}: IPayment) => {
  const getFormData = useCardForm()
  const [numberValid, setNumberValid] = useState(true)
  const [validationError, setValidationError] = useState('')
  const [resultSubmit, setResultSubmit] = useState(true)

  const [showPaymentData, setShowPaymentData] = useState<boolean>(false)

  const handleValidateCardData = async (e: any) => {
    e.preventDefault()
    const [data, isValid] = getFormData()

    console.log(data, isValid) //log all form data and verification results

    if (!data.number.isValid) setNumberValid(false) //we'll set a hook to show a error if card number is invalid
    if (!isValid) setValidationError('Invalid data')
    if (isValid) {
      //const isError = await prolongTheSubscription()
      if (!validationError) {
        setShowPaymentData(true)
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
      {!showPaymentData ? (
        <>
          <ST.HeaderPayment>Payment information</ST.HeaderPayment>
          <ST.CardWrapper>
            <Card />
            <ST.CardFieldsForm
              onSubmit={(event) => handleSubmitCardData(event)}
            >
              <ST.StyledCardNumber
                name="cardnumber"
                autocomplete="cc-number"
                placeholder="0000 0000 0000 0000"
                onFocus={handleFocus}
              />
              <ST.StyledCardHolder placeholder="Owner" />
              <ST.DateWrapper>
                <ST.StyledValidThruMonth />
                <ST.StyledValidThruYear />
              </ST.DateWrapper>
              <ST.StyledCardSecurityCode
                placeholder="CVC"
                className="input-text semi"
                name="cvc"
                autocomplete="cc-csc"
              />
              <ST.SubmitPayButton type="submit">Submit</ST.SubmitPayButton>
              {validationError && (
                <ST.ErrorText>{validationError}</ST.ErrorText>
              )}
            </ST.CardFieldsForm>
          </ST.CardWrapper>
        </>
      ) : (
        <SubscriptionPaymentInfo
          closeModal={closeModal}
          subscriptionInfo={subscriptionInfo}
          setShowSubmitModal={setShowSubmitModal}
          showSubmitModal={showSubmitModal}
          dispatchFunction={dispatchFunction}
        />
      )}
    </ST.PaymentWrapper>
  )
}
