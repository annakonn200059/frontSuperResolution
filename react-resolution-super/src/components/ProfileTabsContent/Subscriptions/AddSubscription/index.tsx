import React, { FC, useState } from 'react'
import * as ST from './styled'
import DefaultPopup from '../../../ui/Modals/defaultModal'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { postSubscription } from 'api/subscription'
import { onEnterSubmit } from 'utils/onEnterSubmit'
import {
  ISubscription,
  IAddSubscription,
  IAddSubscriptionsInputs,
} from 'types/subscription'
import { yupErrorHandler } from '../../../../utils/yupErrorHandler'

const AddContactInputs: FC<IAddSubscriptionsInputs> = ({
  setSubscriptionList,
  closeModal,
}: IAddSubscriptionsInputs) => {
  const [errorText, setErrorText] = useState<string>('')

  const handleIsDisabled = (): boolean => {
    return false
  }

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      subscription_name: '',
      cost: -1,
      //subsription_type: -1,
      downloads_amount: -1,
      description: '',
    },
    onSubmit: async () => {
      const newContact: ISubscription = {
        subscription_name: values.subscription_name,
        cost: values.cost,
        subsription_type: 1,
        downloads_amount: values.downloads_amount,
        description: values.description,
      }
      postSubscription({ ...newContact })
        .then(({ id_subscription }) => {
          setSubscriptionList({ id_subscription, ...newContact })
          closeModal()
        })
        .catch((e) => {
          setErrorText(e.response.data)
        })
    },
    validationSchema: Yup.object().shape({
      subscription_name: Yup.string().required('Name field missed'),
      cost: Yup.number().min(0).required('Cost field missed'),
      downloads_amount: Yup.number()
        .min(0)
        .required('Downloads amount field missed'),
      description: Yup.string().required('Description field missed'),
    }),
  })
  //TODO вынести input в ui
  console.log(errors)
  return (
    <>
      <h3>Add new subscription</h3>
      <ST.InputsContainer>
        <ST.InputWrapper>
          <label htmlFor="subscription_name">Subscription name</label>
          <ST.Input
            placeholder={''}
            value={values.subscription_name}
            onChange={handleChange}
            id={'subscription_name'}
            name={'subscription_name'}
          />
        </ST.InputWrapper>

        <ST.InputWrapper>
          <label htmlFor="cost">Cost</label>
          <ST.Input
            placeholder={''}
            value={values.cost < 0 ? '' : values.cost}
            onChange={handleChange}
            id={'cost'}
            name={'cost'}
          />
        </ST.InputWrapper>

        <ST.InputWrapper>
          <label htmlFor="downloads_amount">Downloads amount</label>
          <ST.Input
            placeholder={''}
            value={values.downloads_amount < 0 ? '' : values.downloads_amount}
            onChange={handleChange}
            id={'downloads_amount'}
            name={'downloads_amount'}
          />
        </ST.InputWrapper>

        <ST.InputWrapper>
          <label htmlFor="description">Description</label>
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
        <ST.ErrorText>
          {errorText ? errorText : yupErrorHandler(errors)}
        </ST.ErrorText>
      </ST.InputsContainer>
      <ST.SubmitButton
        type={'submit'}
        disabled={handleIsDisabled()}
        onClick={() => {
          handleSubmit()
        }}
      >
        Add
      </ST.SubmitButton>
    </>
  )
}

export const AddSubscription: FC<IAddSubscription> = ({
  setSubscriptionList,
}: IAddSubscription) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const handleModal = (): void => {
    setShowModal(!showModal)
  }
  return (
    <>
      <ST.AddContactContainer>
        <ST.AddContactButton onClick={() => handleModal()}>
          ADD SUBSCRIPTION
        </ST.AddContactButton>
        <DefaultPopup
          children={
            <AddContactInputs
              setSubscriptionList={setSubscriptionList}
              closeModal={() => {
                handleModal()
              }}
            />
          }
          show={showModal}
          onClose={handleModal}
        />
      </ST.AddContactContainer>
    </>
  )
}
