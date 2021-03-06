import React, { useEffect, useState } from 'react'
import * as ST from './styled'
import { IPatchSubscription, ISubscriptionWithId } from 'types/subscription'
import { deleteSubscription } from 'api/subscription'
import DefaultPopup from '../ui/Modals/defaultModal'
import {
  ConfirmDelete,
  ModalEditSubscription,
  ConfirmUnsubscribe,
  ResultUnsubscribe,
} from './ModalEitSubscription'
import { Payment } from '../views/payment'
// @ts-ignore
import { HunelProvider, HunelCreditCard } from 'reactjs-credit-card'
import InformModal from '../ui/Modals/InfromModal'
import {
  getPurchase,
  setActivePurchase,
  setUserPurchase,
} from '../../store/actions/purchase'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

interface ICard {
  key?: number
  props: ISubscriptionWithId
  isAdmin: boolean
  deleteSubscriptionFromList?: (idSubscription: number) => void
  updateSubscriptionList?: (updatedSubscr: IPatchSubscription) => void
  unsubscribe?: () => void
  responseModalText?: string
  showResponse?: boolean
  setResponseModalText?: React.Dispatch<React.SetStateAction<string>>
  isPaid?: boolean
  onProlong?: () => Promise<any>
  update?: React.Dispatch<React.SetStateAction<string>>
  shouldNotTransform?: boolean
  onBuySubscription?: () => Promise<any>
}

const SubscriptionCard = ({
  props,
  isAdmin,
  deleteSubscriptionFromList,
  updateSubscriptionList,
  unsubscribe,
  responseModalText,
  showResponse,
  setResponseModalText,
  isPaid,
  onProlong,
  shouldNotTransform,
  onBuySubscription,
}: ICard) => {
  const { t } = useTranslation(['profile'])
  const curLang = localStorage.getItem('i18nextLng')
  const hunel = new HunelCreditCard()
  const dispatch = useDispatch()
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [showUnsubscribeModal, setUnsubscribeModal] = useState<boolean>(false)
  const [showPayModal, setPayModal] = useState<boolean>(false)
  const [showBuySubscriptionModal, setBuySubscriptionModal] =
    useState<boolean>(false)
  const [showResultModal, setResultModal] = useState<boolean | undefined>(false)
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false)

  const dispatchProlong = () => {
    dispatch(setActivePurchase() as any)
  }
  const dispatchBuy = () => {
    dispatch(
      setUserPurchase({
        subscription_id: props.id_subscription,
        is_paid: true,
        payment_date: new Date().toDateString(),
      })
    )
  }

  useEffect(() => {
    setResultModal(showResponse)
  }, [showResponse])

  const handleDeleteModal = (): void => {
    setShowDeleteModal(!showDeleteModal)
  }

  const handleResultModal = (): void => {
    setResultModal(false)
    if (setResponseModalText) {
      setResponseModalText('')
    }
  }

  const deleteContactItem = (idSubscription: number): void => {
    if (deleteSubscriptionFromList) {
      deleteSubscription(idSubscription).then((resp) =>
        deleteSubscriptionFromList(idSubscription)
      )
    }
  }
  const handleEditModal = (): void => {
    setShowEditModal(!showEditModal)
  }

  const handleUnsubscribeModal = (): void => {
    setUnsubscribeModal(!showUnsubscribeModal)
  }

  const handlePayModal = (): void => {
    setPayModal(!showPayModal)
  }
  const handleBuySubscriptionModal = (): void => {
    setBuySubscriptionModal(!showBuySubscriptionModal)
  }

  const handleModal = (): void => {
    setShowSubmitModal(!showSubmitModal)
  }

  return (
    <>
      <ST.SubscriptionCard
        shouldNotTransform={shouldNotTransform}
        isAdmin={isAdmin}
      >
        <ST.CardHeader>
          <ST.SubscriptionName>{props.subscription_name}</ST.SubscriptionName>
          {isAdmin && <ST.EditContact onClick={() => handleEditModal()} />}
          {isAdmin && <ST.DeleteContact onClick={() => handleDeleteModal()} />}
        </ST.CardHeader>
        <ST.CardBody>
          <ST.Price>
            {props.cost}
            {'???'}
            <span style={{ color: '#6c757d' }}>/m</span>
          </ST.Price>
          <ST.SubscriptionInfoList>
            <ST.InfoItem>
              <ST.AmountSpan>
                {props.subsription_type === 0
                  ? props.downloads_amount + ' '
                  : `${t('infinite')} `}
              </ST.AmountSpan>
              {t('uploadsADay')}
            </ST.InfoItem>
            <ST.InfoItem>{t('firstDescr')}</ST.InfoItem>
            <ST.InfoItem>
              {curLang === 'en' ? props.descriptionEng : props.descriptionRus}
            </ST.InfoItem>
          </ST.SubscriptionInfoList>
          <ST.ActionsButtonsContainer>
            {onProlong && !isPaid && (
              <ST.ProlongButton onClick={() => handlePayModal()}>
                {t('payProlong')}
              </ST.ProlongButton>
            )}
            {unsubscribe && !isAdmin && (
              <ST.UnsubscribeButton onClick={() => handleUnsubscribeModal()}>
                {t('unsubscribe')}
              </ST.UnsubscribeButton>
            )}
            {onBuySubscription && !isAdmin && (
              <ST.UnsubscribeButton
                onClick={() => handleBuySubscriptionModal()}
              >
                {t('buy')}
              </ST.UnsubscribeButton>
            )}
          </ST.ActionsButtonsContainer>
        </ST.CardBody>
      </ST.SubscriptionCard>
      {isAdmin && (
        <DefaultPopup
          children={
            <ModalEditSubscription
              idSubscription={props.id_subscription}
              subscriptionInfo={props}
              updateSubscriptionList={updateSubscriptionList}
              closeModal={() => handleEditModal()}
            />
          }
          show={showEditModal}
          onClose={handleEditModal}
        />
      )}

      {isAdmin && (
        <DefaultPopup
          children={
            <ConfirmDelete
              onDelete={() => deleteContactItem(props.id_subscription)}
              closeModal={() => handleDeleteModal()}
            />
          }
          show={showDeleteModal}
          onClose={handleDeleteModal}
        />
      )}

      {unsubscribe && (
        <DefaultPopup
          children={
            <ConfirmUnsubscribe
              onUnsubscribe={() => unsubscribe()}
              closeModal={() => handleUnsubscribeModal()}
            />
          }
          show={showUnsubscribeModal}
          onClose={handleUnsubscribeModal}
        />
      )}
      {showResultModal && (
        <DefaultPopup
          children={
            <ResultUnsubscribe
              responseModalText={responseModalText}
              closeModal={() => handleResultModal()}
            />
          }
          show={showResultModal}
          onClose={handleResultModal}
        />
      )}
      {showPayModal && (
        <DefaultPopup
          children={
            <HunelProvider config={hunel}>
              <Payment
                closeModal={() => handlePayModal()}
                subscriptionInfo={props}
                onSubmitPay={onProlong}
                setShowSubmitModal={setShowSubmitModal}
                showSubmitModal={showSubmitModal}
                dispatchFunction={dispatchProlong}
              />
            </HunelProvider>
          }
          show={showPayModal}
          onClose={handlePayModal}
        />
      )}
      {showBuySubscriptionModal && (
        <DefaultPopup
          children={
            <HunelProvider config={hunel}>
              <Payment
                closeModal={() => handleBuySubscriptionModal()}
                subscriptionInfo={props}
                onSubmitPay={onBuySubscription}
                setShowSubmitModal={setShowSubmitModal}
                showSubmitModal={showSubmitModal}
                dispatchFunction={dispatchBuy}
              />
            </HunelProvider>
          }
          show={showBuySubscriptionModal}
          onClose={handleBuySubscriptionModal}
        />
      )}
      <InformModal
        text={'Thanks for your payment!'}
        show={showSubmitModal}
        onClose={handleModal}
      />
    </>
  )
}

export default SubscriptionCard
