import React, { useCallback, useEffect, useState } from 'react'
import * as ST from './styled'
import { IGetSubscriptions, ISubscriptionWithId } from 'types/subscription'
import { getUserSubscription } from 'api/userPurchase'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { PurchaseState } from 'types/purchaseSubscription'
import { accessToken, purchase } from 'store/selectors'
import { getAllSubscriptions } from 'api/subscription'
import { SubscriptionCard } from '../../subscriptionCard'
import { SubscriptionOffers } from './SubscriptionOffers'
import { Preloader } from '../../preloader'

export const UserSubscriptions = () => {
  const [userSubscription, setUserSubscription] = useState<ISubscriptionWithId>(
    {
      id_subscription: -1,
    }
  )
  const [allSubscriptions, setAllSubscriptions] = useState<IGetSubscriptions>({
    subscriptions: [],
  })
  const [isLoading, setLoading] = useState(false)
  const userPurchase: PurchaseState = useSelector<RootState, PurchaseState>(
    purchase
  )
  const token: string = useSelector<RootState, string>(accessToken)

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

  const loadAllSubscriptions = useCallback(() => {
    getAllSubscriptions()
      .then((data) => setAllSubscriptions(data))
      .finally(() => {
        setLoading(false)
      })
  }, [allSubscriptions])

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
            <SubscriptionCard props={userSubscription} isAdmin={false} />
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
