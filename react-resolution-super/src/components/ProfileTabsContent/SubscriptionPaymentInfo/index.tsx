import React, { FC, useState } from 'react'
import { ISubscriptionWithId } from 'types/subscription'
import * as ST from './styled'
import { useFormik } from 'formik'
import { yupErrorHandler } from 'utils/yupErrorHandler'
import { useTranslation } from 'react-i18next'

interface IPayment {
  closeModal: () => void
  onSubmitPay?: () => Promise<any>
  payErrorText?: string
  subscriptionInfo?: ISubscriptionWithId
  setShowSubmitModal?: React.Dispatch<React.SetStateAction<boolean>>
  showSubmitModal?: boolean
  dispatchFunction?: () => void
}

export const SubscriptionPaymentInfo: FC<IPayment> = ({
  closeModal,
  onSubmitPay,
  payErrorText,
  subscriptionInfo,
  setShowSubmitModal,
  showSubmitModal,
  dispatchFunction,
}: IPayment) => {
  const { t } = useTranslation(['profile'])
  const [errorText, setErrorText] = useState<string>('')
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const handleIsDisabled = (): void => {
    setIsDisabled((prevState) => !prevState)
  }

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: { cost: subscriptionInfo?.cost || 0 },
    onSubmit: async () => {
      handleIsDisabled()
      if (onSubmitPay) {
        await onSubmitPay()
          .then((resp) => {
            if (dispatchFunction) {
              dispatchFunction()
            }
            handleIsDisabled()
            if (setShowSubmitModal) {
              setShowSubmitModal(!showSubmitModal)
            }
            closeModal()
          })
          .catch((err) => {
            handleIsDisabled()
            setErrorText(err.response.data.msg || t('error'))
          })
      }
    },
  })

  return (
    <>
      <ST.HeaderPayment>{t('review')}</ST.HeaderPayment>
      <ST.SubscriptionWrapper>
        <ST.FieldsWrapper>
          <ST.SubscriptionName>
            {t('subscrName')}:{`\n`}
            <ST.Name>{subscriptionInfo?.subscription_name}</ST.Name>
          </ST.SubscriptionName>
          <ST.InputsContainer>
            <ST.InputLabel>
              <label htmlFor="cost">{t('cost')}:</label>
            </ST.InputLabel>
            <ST.Cost>{subscriptionInfo?.cost + ''}</ST.Cost>
          </ST.InputsContainer>
        </ST.FieldsWrapper>
        <ST.SubmitPayButton
          type="submit"
          disabled={isDisabled}
          onClick={() => {
            handleSubmit()
          }}
        >
          {t('pay')}
        </ST.SubmitPayButton>
        <ST.ErrorText>
          {errorText ? errorText : yupErrorHandler(errors)}
        </ST.ErrorText>
      </ST.SubscriptionWrapper>
    </>
  )
}
