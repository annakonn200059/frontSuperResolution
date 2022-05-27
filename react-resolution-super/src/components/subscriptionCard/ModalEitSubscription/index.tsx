import React, { FC, useState } from 'react'
import * as ST from './styled'
import { useFormik } from 'formik'
import { patchSubscription } from 'api/subscription'
import { onEnterSubmit } from 'utils/onEnterSubmit'
import { IPatchSubscription, ISubscription } from 'types/subscription'
import BaseSelect from '../../ui/BaseSelect'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation(['profile,common'])
  return (
    <>
      <ST.ModalText>{t('profile:agreeDelete')}</ST.ModalText>
      <ST.ConfirmButton
        onClick={() => {
          onDelete()
          closeModal()
        }}
      >
        {t('common:yes')}
      </ST.ConfirmButton>
    </>
  )
}

export const ConfirmUnsubscribe: FC<IConfirmUnsubscribe> = ({
  onUnsubscribe,
  closeModal,
}: IConfirmUnsubscribe) => {
  const { t } = useTranslation(['profile, common'])
  return (
    <>
      <ST.ModalText>{t('profile:confirmUnsubscribe')}</ST.ModalText>
      <ST.ConfirmButton
        onClick={() => {
          onUnsubscribe()
          closeModal()
        }}
      >
        {t('common:yes')}
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
  const { t } = useTranslation(['profile'])
  const [errorText, setErrorText] = useState<string>('')
  const [, setInfiniteType] = useState(false)
  const isFiniteDownloadsAmountList = [`${t('finite')}`, `${t('infinite')}`]

  const { handleChange, handleSubmit, values, errors } = useFormik({
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
      <ST.ModalText>{t('editSubscr')}</ST.ModalText>
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
            value={values.cost}
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
            <label htmlFor="downloads_amount">{t('downloads')}</label>
          </ST.InputLabel>
          <ST.Input
            placeholder={''}
            disabled={values.subsription_type === 1}
            value={values.downloads_amount}
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
        {t('editSubscr')}
      </ST.SubmitButton>
    </>
  )
}
