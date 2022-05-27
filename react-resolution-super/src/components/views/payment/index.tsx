import React, { FC, useCallback, useEffect, useState } from 'react'
import * as ST from './styled'
// @ts-ignore
import Card from 'reactjs-credit-card/card'
// @ts-ignore
import { useCardForm } from 'reactjs-credit-card'
import { ISubscriptionWithId } from 'types/subscription'
import { SubscriptionPaymentInfo } from '../../ProfileTabsContent/SubscriptionPaymentInfo'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'

interface IPayment {
  closeModal: () => void
  onSubmitPay?: () => Promise<any>
  subscriptionInfo?: ISubscriptionWithId
  setShowSubmitModal?: React.Dispatch<React.SetStateAction<boolean>>
  showSubmitModal?: boolean
  dispatchFunction?: () => void
}

export const Payment: FC<IPayment> = ({
  closeModal,
  onSubmitPay,
  subscriptionInfo,
  setShowSubmitModal,
  showSubmitModal,
  dispatchFunction,
}: IPayment) => {
  const { t } = useTranslation(['profile'])
  const getFormData = useCardForm()
  const [dataForm, setDataForm] = useState<any>('')
  const [numberValid, setNumberValid] = useState(true)
  const [validationError, setValidationError] = useState('')
  const [showPaymentData, setShowPaymentData] = useState<boolean>(false)

  const handleValidateCardData = async (e: any) => {
    e.preventDefault()
    if (!validationError) {
      setShowPaymentData(true)
    }
  }

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: { cardnumber: '', owner: '', cvc: '' },
    onSubmit: async () => {},
  })

  useEffect(() => {
    const [data, isValid] = getFormData()
    setDataForm(data)
    if (!isValid) setValidationError(t('invalid'))
    else {
      setValidationError('')
    }
  }, [values.cvc, values.owner, values.cardnumber])

  const handleSubmitCardData = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleValidateCardData(e)
  }

  function handleFocus() {
    setNumberValid(true)
  }

  return (
    <ST.PaymentWrapper>
      {!showPaymentData ? (
        <>
          <ST.HeaderPayment>{t('paymentInfo')}</ST.HeaderPayment>
          <ST.CardWrapper>
            <Card />
            <ST.CardFieldsForm
              onSubmit={(event) => handleSubmitCardData(event)}
            >
              <ST.StyledCardNumber
                name="cardnumber"
                autoComplete="cc-number"
                placeholder="0000 0000 0000 0000"
                value={values.cardnumber}
                onChange={handleChange}
                id={'cardnumber'}
                onFocus={handleFocus}
              />
              <ST.StyledCardHolder
                placeholder={t('owner')}
                value={values.owner}
                onChange={handleChange}
                id={'owner'}
              />
              <ST.DateWrapper>
                <ST.StyledValidThruMonth />
                <ST.StyledValidThruYear />
              </ST.DateWrapper>
              <ST.StyledCardSecurityCode
                placeholder="CVC"
                className="input-text semi"
                name="cvc"
                autoComplete="cc-csc"
                value={values.cvc}
                onChange={handleChange}
                id={'cvc'}
              />
              <ST.SubmitPayButton type="submit">
                {t('submitPayment')}
              </ST.SubmitPayButton>
              {validationError && (
                <ST.ErrorText>{validationError}</ST.ErrorText>
              )}
            </ST.CardFieldsForm>
          </ST.CardWrapper>
        </>
      ) : (
        <>
          <ST.BackGround rotate={'left'} />
          <ST.BackGround rotate={'right'} />
          <SubscriptionPaymentInfo
            closeModal={closeModal}
            subscriptionInfo={subscriptionInfo}
            setShowSubmitModal={setShowSubmitModal}
            showSubmitModal={showSubmitModal}
            dispatchFunction={dispatchFunction}
            onSubmitPay={onSubmitPay}
          />
        </>
      )}
    </ST.PaymentWrapper>
  )
}
