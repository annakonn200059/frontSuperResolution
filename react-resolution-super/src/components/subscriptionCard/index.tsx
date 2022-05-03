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
  onProlong?: () => void
  payErrorText?: string
  update?: React.Dispatch<React.SetStateAction<string>>
}

export const SubscriptionCard = ({
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
  payErrorText,
  update,
}: ICard) => {
  const hunel = new HunelCreditCard()
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [showUnsubscribeModal, setUnsubscribeModal] = useState<boolean>(false)
  const [showPayModal, setPayModal] = useState<boolean>(false)
  const [showResultModal, setResultModal] = useState<boolean | undefined>(false)
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false)

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

  const handleModal = (): void => {
    setShowSubmitModal(!showSubmitModal)
  }

  return (
    <>
      <ST.SubscriptionCard>
        <ST.CardHeader>
          <ST.SubscriptionName>{props.subscription_name}</ST.SubscriptionName>
          {isAdmin && <ST.EditContact onClick={() => handleEditModal()} />}
          {isAdmin && <ST.DeleteContact onClick={() => handleDeleteModal()} />}
        </ST.CardHeader>
        <ST.CardBody>
          <ST.Price>
            {props.cost}
            {'₽'}
            <span style={{ color: '#6c757d' }}>/mo</span>
          </ST.Price>
          <ST.SubscriptionInfoList>
            <ST.InfoItem>
              <ST.AmountSpan>
                {props.subsription_type === 0
                  ? props.downloads_amount
                  : 'Infinite'}
              </ST.AmountSpan>
              {' uploads a day'}
            </ST.InfoItem>
            <ST.InfoItem>{'All coefficients are available'}</ST.InfoItem>
            <ST.InfoItem>{props.description}</ST.InfoItem>
          </ST.SubscriptionInfoList>
          <ST.ActionsButtonsContainer>
            {!isPaid && (
              <ST.ProlongButton onClick={() => handlePayModal()}>
                Pay to prolong
              </ST.ProlongButton>
            )}
            {!isAdmin && (
              <ST.UnsubscribeButton onClick={() => handleUnsubscribeModal()}>
                Unsubscribe
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
                payErrorText={payErrorText}
                setShowSubmitModal={setShowSubmitModal}
                showSubmitModal={showSubmitModal}
                //update={update}
              />
            </HunelProvider>
          }
          show={showPayModal}
          onClose={handlePayModal}
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
