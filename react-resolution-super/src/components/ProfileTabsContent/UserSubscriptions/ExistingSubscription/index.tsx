import React, { useCallback, useEffect, useState } from 'react'
import * as ST from './styled'
import SubscriptionCard from '../../../subscriptionCard'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { isPaidPurchase } from 'store/selectors'
import {
  getProlongSubscription,
  getUnsubscribed,
  getUserSubscription,
} from 'api/userPurchase'
import { resetPurchase } from 'store/actions/purchase'
import { ISubscriptionWithId } from 'types/subscription'
import { PurchaseState } from 'types/purchaseSubscription'
import { Preloader } from '../../../preloader'
import { COLORS } from 'constants/colors'

interface IExistingSubscription {
  token: string
  userPurchase: PurchaseState
}

export const ExistingSubscription = ({
  token,
  userPurchase,
}: IExistingSubscription) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [responseModalText, setResponseModalText] = useState<string>('')
  const isPaid: boolean = useSelector<RootState, boolean>(isPaidPurchase)
  const dispatch = useDispatch()
  const [userSubscription, setUserSubscription] = useState<ISubscriptionWithId>(
    {
      id_subscription: -1,
    }
  )
  const loadSubscription = (idSubscr: number, userToken: string) => {
    getUserSubscription(idSubscr, userToken)
      .then((data) => setUserSubscription(data))
      .finally(() => {
        setLoading(false)
      })
  }

  const unsubscribeCallback = useCallback((): void => {
    getUnsubscribed(token)
      .then((resp) => {
        setResponseModalText('You have successfully unsubscribed')
        dispatch(resetPurchase() as any)
      })
      .catch((err) => {
        setResponseModalText(err.response.data.msg)
      })
  }, [responseModalText])

  const prolongTheSubscription = (): Promise<any> => {
    return getProlongSubscription(token)
  }

  useEffect(() => {
    setLoading(true)
    loadSubscription(userPurchase.purchase.subscription_id, token)
  }, [])

  return (
    <ST.CardContainer>
      {!isLoading ? (
        <>
          <ST.Header>
            <span style={{ color: `${COLORS.yellow}` }}>Your</span> subscription
          </ST.Header>
          <SubscriptionCard
            props={userSubscription}
            isAdmin={false}
            unsubscribe={unsubscribeCallback}
            responseModalText={responseModalText}
            showResponse={!!responseModalText}
            setResponseModalText={setResponseModalText}
            isPaid={isPaid}
            onProlong={prolongTheSubscription}
          />
        </>
      ) : (
        <Preloader />
      )}
    </ST.CardContainer>
  )
}
