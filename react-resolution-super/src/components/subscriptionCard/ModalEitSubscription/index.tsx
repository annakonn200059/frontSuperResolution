import React, { FC, useState } from 'react'
import * as ST from './styled'
import { useFormik } from 'formik'
import { patchSubscription } from 'api/subscription'
import { onEnterSubmit } from 'utils/onEnterSubmit'
import { IPatchSubscription, ISubscription } from 'types/subscription'
import BaseSelect from '../../ui/BaseSelect'

interface IConfirmDelete {
  onDelete: () => void
  closeModal: () => void
}

interface IConfirmUnsubscribe {
  onUnsubscribe: () => void
  closeModal: () => void
}

interface IResulModal {
  responseModalText?: string
  closeModal: () => void
}

interface IEditSubscription {
  idSubscription: number
  closeModal: () => void
  subscriptionInfo: ISubscription
  updateSubscriptionList?: (updatedSubscr: IPatchSubscription) => void
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

export const ConfirmUnsubscribe: FC<IConfirmUnsubscribe> = ({
  onUnsubscribe,
  closeModal,
}: IConfirmUnsubscribe) => {
  return (
    <>
      <ST.ModalText>Do you really want to unsubscribe?</ST.ModalText>
      <ST.ConfirmButton
        onClick={() => {
          onUnsubscribe()
          closeModal()
        }}
      >
        Yes
      </ST.ConfirmButton>
    </>
  )
}

export const ResultUnsubscribe: FC<IResulModal> = ({
  responseModalText,
  closeModal,
}: IResulModal) => {
  return (
    <>
      <ST.ModalText>{responseModalText}</ST.ModalText>
      <ST.ConfirmButton
        onClick={() => {
          closeModal()
        }}
      >
        OK
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
  const [, setInfiniteType] = useState(false)
  const isFiniteDownloadsAmountList = ['Finite', 'Infinite']

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: { ...subscriptionInfo },
    onSubmit: async () => {
      const changedFields: ISubscription = {}
      Object.keys(subscriptionInfo).forEach((subscriptionField) => {
        if (
          values[subscriptionField] ||
          subscriptionField === 'subsription_type'
        )
          changedFields[subscriptionField] = values[subscriptionField]
        else
          changedFields[subscriptionField] = subscriptionInfo[subscriptionField]
      })
      patchSubscription({ idSubscription: idSubscription, args: changedFields })
        .then((resp) => {
          if (updateSubscriptionList) {
            updateSubscriptionList({
              idSubscription: idSubscription,
              args: changedFields,
            })
          }
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
          <ST.InputLabel>
            <label htmlFor="subscription_name">Subscription name</label>
          </ST.InputLabel>
          <ST.Input
            placeholder={''}
            value={values.subscription_name}
            onChange={handleChange}
            id={'subscription_name'}
            name={'subscription_name'}
          />
        </ST.InputWrapper>

        <ST.InputWrapper>
          <ST.InputLabel>
            <label htmlFor="cost">Cost</label>
          </ST.InputLabel>
          <ST.Input
            placeholder={''}
            value={values.cost}
            onChange={handleChange}
            id={'cost'}
            name={'cost'}
          />
        </ST.InputWrapper>

        <ST.InputWrapper>
          <ST.SelectWrapper>
            <ST.InputLabel>
              <label htmlFor="subsription_type">
                Is infinite downloads amount
              </label>
            </ST.InputLabel>
            <BaseSelect
              isSmallSelect={true}
              placeHolder={
                values.subsription_type || values.subsription_type === 0
                  ? isFiniteDownloadsAmountList[values.subsription_type]
                  : ''
              }
              listItems={isFiniteDownloadsAmountList}
              name={'subsription_type'}
              value={values.subsription_type}
              typeSelect={'subsription_type'}
              setChosen={(num) =>
                (values.subsription_type = isFiniteDownloadsAmountList.indexOf(
                  num + ''
                ))
              }
              onChange={() => setInfiniteType((prevState) => !prevState)}
            />
          </ST.SelectWrapper>
        </ST.InputWrapper>

        <ST.InputWrapper>
          <ST.InputLabel>
            <label htmlFor="downloads_amount">Downloads amount</label>
          </ST.InputLabel>
          <ST.Input
            placeholder={''}
            disabled={values.subsription_type === 1}
            value={values.downloads_amount}
            onChange={handleChange}
            id={'downloads_amount'}
            name={'downloads_amount'}
          />
        </ST.InputWrapper>

        <ST.InputWrapper>
          <ST.InputLabel>
            <label htmlFor="description">Description</label>
          </ST.InputLabel>
          <ST.Input
            placeholder={''}
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
