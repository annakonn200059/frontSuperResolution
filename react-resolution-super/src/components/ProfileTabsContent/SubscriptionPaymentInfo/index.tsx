import React, { FC, useState } from 'react'
import { ISubscriptionWithId } from 'types/subscription'
import * as ST from './styled'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { yupErrorHandler } from 'utils/yupErrorHandler'

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
            setErrorText(err.response.data.msg || 'Error')
          })
      }
    },
    validationSchema: Yup.object().shape({
      cost: Yup.number()
        .required('Missed cost field')
        .test((val) => val === subscriptionInfo?.cost),
    }),
  })

  return (
    <>
      <ST.HeaderPayment>Review & Confirm</ST.HeaderPayment>
      <ST.SubscriptionWrapper>
        <ST.BackGround rotate={'left'} />
        <ST.BackGround rotate={'right'} />
        <ST.FieldsWrapper>
          <ST.SubscriptionName>
            Subscription name:{`\n`}
            <ST.Name>{subscriptionInfo?.subscription_name}</ST.Name>
          </ST.SubscriptionName>
          <ST.InputsContainer>
            <ST.InputLabel>
              <label htmlFor="cost">Cost:</label>
            </ST.InputLabel>
            <ST.Input
              placeholder={subscriptionInfo?.cost + ''}
              value={values.cost}
              onChange={handleChange}
              disabled={isDisabled}
              id={'cost'}
              name={'cost'}
            />
          </ST.InputsContainer>
        </ST.FieldsWrapper>
        <ST.SubmitPayButton
          type="submit"
          disabled={isDisabled}
          onClick={() => {
            handleSubmit()
          }}
        >
          PAY
        </ST.SubmitPayButton>
        <ST.ErrorText>
          {errorText ? errorText : yupErrorHandler(errors)}
        </ST.ErrorText>
      </ST.SubscriptionWrapper>
    </>
  )
}
