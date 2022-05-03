import React, { useCallback, useEffect, useState } from 'react'
import * as ST from './styled'
import { IGetSubscriptions, ISubscriptionWithId } from 'types/subscription'
import {
  getProlongSubscription,
  getUnsubscribed,
  getUserSubscription,
} from 'api/userPurchase'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { PurchaseState } from 'types/purchaseSubscription'
import { accessToken, isPaidPurchase, purchase } from 'store/selectors'
import { getAllSubscriptions } from 'api/subscription'
import { SubscriptionCard } from '../../subscriptionCard'
import { SubscriptionOffers } from './SubscriptionOffers'
import { Preloader } from '../../preloader'
import { resetPurchase, setActivePurchase } from 'store/actions/purchase'

export const UserSubscriptions = () => {
  const dispatch = useDispatch()
  const [userSubscription, setUserSubscription] = useState<ISubscriptionWithId>(
    {
      id_subscription: -1,
    }
  )
  const [allSubscriptions, setAllSubscriptions] = useState<IGetSubscriptions>({
    subscriptions: [],
  })
  const [isLoading, setLoading] = useState<boolean>(false)
  const [responseModalText, setResponseModalText] = useState<string>('')
  const [errorText, setErrorText] = useState<string>('')
  const userPurchase: PurchaseState = useSelector<RootState, PurchaseState>(
    purchase
  )
  const [, update] = useState('')
  const token: string = useSelector<RootState, string>(accessToken)
  const isPaid: boolean = useSelector<RootState, boolean>(isPaidPurchase)

  const loadSubscription = useCallback(
    (idSubscr, userToken) => {
      getUserSubscription(idSubscr, userToken)
        .then((data) => setUserSubscription(data))
        .finally(() => {
          setLoading(false)
        })
    },
    [userSubscription]
  )

  const unsubscribeCallback = useCallback((): void => {
    getUnsubscribed(token)
      .then((resp) => {
        setResponseModalText('You have successfully unsubscribed')
        dispatch(resetPurchase())
      })
      .catch((err) => {
        setResponseModalText(err.response.data.msg)
      })
  }, [responseModalText])

  const loadAllSubscriptions = useCallback(() => {
    getAllSubscriptions()
      .then((data) => setAllSubscriptions(data))
      .finally(() => {
        setLoading(false)
      })
  }, [allSubscriptions])

  const prolongTheSubscription = useCallback(() => {
    getProlongSubscription(token)
      .then((res) => dispatch(setActivePurchase))
      .catch((err) => {
        setErrorText(err.response.data.msg)
      })
  }, [errorText])

  useEffect(() => {
    if (userPurchase.hasPurchase) {
      setLoading(true)
      loadSubscription(userPurchase.purchase.subscription_id, token)
    } else {
      setLoading(true)
      loadAllSubscriptions()
    }
  }, [])
  return (
    <ST.Wrapper>
      {!isLoading ? (
        userPurchase.hasPurchase ? (
          <ST.CardContainer>
            <ST.Header>Your subscription</ST.Header>
            <SubscriptionCard
              props={userSubscription}
              isAdmin={false}
              unsubscribe={unsubscribeCallback}
              responseModalText={responseModalText}
              showResponse={!!responseModalText}
              setResponseModalText={setResponseModalText}
              isPaid={isPaid}
              onProlong={prolongTheSubscription}
              payErrorText={errorText}
              //update={update}
            />
          </ST.CardContainer>
        ) : (
          <SubscriptionOffers />
        )
      ) : (
        <Preloader />
      )}
    </ST.Wrapper>
  )
}
