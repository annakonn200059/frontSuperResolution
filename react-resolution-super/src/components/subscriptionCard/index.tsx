import React, { useState } from 'react'
import * as ST from './styled'
import { IPatchSubscription, ISubscriptionWithId } from 'types/subscription'
import { deleteSubscription } from 'api/subscription'
import DefaultPopup from '../ui/Modals/defaultModal'
import { ConfirmDelete, ModalEditSubscription } from './ModalEitSubscription'

interface ICard {
  key?: number
  props: ISubscriptionWithId
  isAdmin: boolean
  deleteSubscriptionFromList?: (idSubscription: number) => void
  updateSubscriptionList?: (updatedSubscr: IPatchSubscription) => void
}

export const SubscriptionCard = ({
  props,
  isAdmin,
  deleteSubscriptionFromList,
  updateSubscriptionList,
}: ICard) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const handleDeleteModal = (): void => {
    setShowDeleteModal(!showDeleteModal)
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
          {!isAdmin && <ST.UnsubscribeButton>Unsubscribe</ST.UnsubscribeButton>}
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
    </>
  )
}
