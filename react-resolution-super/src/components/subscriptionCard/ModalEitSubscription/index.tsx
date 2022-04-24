import React, { FC, useState } from 'react'
import * as ST from './styled'
import { useFormik } from 'formik'
import { patchSubscription } from 'api/subscription'
import { onEnterSubmit } from 'utils/onEnterSubmit'
import { IPatchSubscription, ISubscription } from 'types/subscription'

interface IConfirmDelete {
  onDelete: () => void
  closeModal: () => void
}

interface IEditSubscription {
  idSubscription: number
  closeModal: () => void
  subscriptionInfo: ISubscription
  updateSubscriptionList: (updatedSubscr: IPatchSubscription) => void
}

export const ConfirmDelete: FC<IConfirmDelete> = ({
  onDelete,
  closeModal,
}: IConfirmDelete) => {
  return (
    <>
      <ST.ModalText>
        Do you really want to delete this subscription?
      </ST.ModalText>
      <ST.ConfirmButton
        onClick={() => {
          onDelete()
          closeModal()
        }}
      >
        Yes
      </ST.ConfirmButton>
    </>
  )
}

export const ModalEditSubscription: FC<IEditSubscription> = ({
  idSubscription,
  closeModal,
  subscriptionInfo,
  updateSubscriptionList,
}: IEditSubscription) => {
  const [errorText, setErrorText] = useState<string>('')

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: { ...subscriptionInfo },
    onSubmit: async () => {
      const changedFields: ISubscription = {}
      Object.keys(subscriptionInfo).forEach((subscriptionField) => {
        if (values[subscriptionField])
          changedFields[subscriptionField] = values[subscriptionField]
        else
          changedFields[subscriptionField] = subscriptionInfo[subscriptionField]
      })
      patchSubscription({ idSubscription: idSubscription, args: changedFields })
        .then((resp) => {
          updateSubscriptionList({
            idSubscription: idSubscription,
            args: changedFields,
          })
          closeModal()
        })
        .catch((e) => {
          setErrorText(e.response.data)
        })
    },
  })

  const handleIsDisabled = (): boolean => {
    return false
  }

  return (
    <>
      <ST.ModalText>Edit this subscription</ST.ModalText>
      <ST.InputsContainer>
        <ST.InputWrapper>
          <label htmlFor="subscription_name">Subscription name</label>
          <ST.Input
            placeholder={'X15'}
            value={values.subscription_name}
            onChange={handleChange}
            id={'subscription_name'}
            name={'subscription_name'}
          />
        </ST.InputWrapper>

        <ST.InputWrapper>
          <label htmlFor="cost">Cost</label>
          <ST.Input
            placeholder={'100'}
            value={values.cost}
            onChange={handleChange}
            id={'cost'}
            name={'cost'}
          />
        </ST.InputWrapper>

        <ST.InputWrapper>
          <label htmlFor="downloads_amount">Downloads amount</label>
          <ST.Input
            placeholder={'15'}
            value={values.downloads_amount}
            onChange={handleChange}
            id={'downloads_amount'}
            name={'downloads_amount'}
          />
        </ST.InputWrapper>

        <ST.InputWrapper>
          <label htmlFor="description">Description</label>
          <ST.Input
            placeholder={'100'}
            value={values.description}
            onChange={handleChange}
            id={'description'}
            name={'description'}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              onEnterSubmit(e, handleSubmit)
            }
          />
        </ST.InputWrapper>
        <ST.ErrorText>{errorText ? errorText : ''}</ST.ErrorText>
      </ST.InputsContainer>
      <ST.SubmitButton
        type={'submit'}
        disabled={handleIsDisabled()}
        onClick={() => {
          handleSubmit()
        }}
      >
        Edit
      </ST.SubmitButton>
    </>
  )
}
