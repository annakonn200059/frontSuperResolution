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
import { yupErrorHandler } from 'utils/yupErrorHandler'
import BaseSelect from '../../../ui/BaseSelect'
import { useTranslation } from 'react-i18next'

const AddContactInputs: FC<IAddSubscriptionsInputs> = ({
  setSubscriptionList,
  closeModal,
}: IAddSubscriptionsInputs) => {
  const { t } = useTranslation(['profile'])
  const [errorText, setErrorText] = useState<string>('')
  const [, setInfiniteType] = useState(false)
  const isFiniteDownloadsAmountList = [`${t('finite')}`, `${t('infinite')}`]
  const handleIsDisabled = (): boolean => {
    return false
  }

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      subscription_name: '',
      cost: -1,
      subsription_type: 0,
      downloads_amount: -1,
      descriptionEng: '',
      descriptionRus: '',
    },
    onSubmit: async () => {
      const newContact: ISubscription = {
        subscription_name: values.subscription_name,
        cost: values.cost,
        subsription_type: values.subsription_type,
        downloads_amount: values.downloads_amount,
        descriptionEng: values.descriptionEng,
        descriptionRus: values.descriptionRus,
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
      downloads_amount: Yup.number().required('Downloads amount field missed'),
      descriptionEng: Yup.string().required('Description field missed'),
      descriptionRus: Yup.string().required('Description field missed'),
    }),
  })
  //TODO ?????????????? input ?? ui
  return (
    <>
      <h3>{t('addNewSubscr')}</h3>
      <ST.InputsContainer>
        <ST.InputWrapper>
          <ST.InputLabel>
            <label htmlFor="subscription_name">{t('subscrName')}</label>
          </ST.InputLabel>
          <ST.Input
            placeholder={''}
            value={values.subscription_name}
            onChange={handleChange}
            id={'subscription_name'}
            name={'subscription_name'}
            error={errors.subscription_name}
          />
        </ST.InputWrapper>

        <ST.InputWrapper>
          <ST.InputLabel>
            <label htmlFor="cost">{t('cost')}</label>
          </ST.InputLabel>
          <ST.Input
            placeholder={''}
            value={values.cost < 0 ? '' : values.cost}
            onChange={handleChange}
            id={'cost'}
            name={'cost'}
            error={errors.cost}
          />
        </ST.InputWrapper>

        <ST.InputWrapper>
          <ST.SelectWrapper>
            <ST.InputLabel>
              <label htmlFor="subsription_type">{t('isInfinite')}</label>
            </ST.InputLabel>
            <BaseSelect
              isSmallSelect={true}
              placeHolder={isFiniteDownloadsAmountList[values.subsription_type]}
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
            <label htmlFor="downloads_amount">{t('downloads')}</label>
          </ST.InputLabel>
          <ST.Input
            disabled={values.subsription_type === 1}
            placeholder={''}
            value={values.downloads_amount < 0 ? '' : values.downloads_amount}
            onChange={handleChange}
            id={'downloads_amount'}
            name={'downloads_amount'}
            error={errors.downloads_amount}
          />
        </ST.InputWrapper>

        <ST.InputWrapper>
          <ST.InputLabel>
            <label htmlFor="descriptionEng">{t('descriptionEng')}</label>
          </ST.InputLabel>
          <ST.Input
            placeholder={''}
            value={values.descriptionEng}
            onChange={handleChange}
            id={'descriptionEng'}
            name={'descriptionEng'}
            error={errors.descriptionEng}
          />
        </ST.InputWrapper>

        <ST.InputWrapper>
          <ST.InputLabel>
            <label htmlFor="descriptionRus">{t('descriptionRus')}</label>
          </ST.InputLabel>
          <ST.Input
            placeholder={''}
            value={values.descriptionRus}
            onChange={handleChange}
            id={'descriptionRus'}
            name={'descriptionRus'}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              onEnterSubmit(e, handleSubmit)
            }
            error={errors.descriptionRus}
          />
        </ST.InputWrapper>
        <ST.ErrorText>{errorText}</ST.ErrorText>
      </ST.InputsContainer>
      <ST.SubmitButton
        type={'submit'}
        disabled={handleIsDisabled()}
        onClick={() => {
          handleSubmit()
        }}
      >
        {t('save')}
      </ST.SubmitButton>
    </>
  )
}

export const AddSubscription: FC<IAddSubscription> = ({
  setSubscriptionList,
}: IAddSubscription) => {
  const { t } = useTranslation(['profile'])
  const [showModal, setShowModal] = useState<boolean>(false)
  const handleModal = (): void => {
    setShowModal(!showModal)
  }
  return (
    <>
      <ST.AddContactContainer>
        <ST.AddContactButton onClick={() => handleModal()}>
          {t('addSubcr')}
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
