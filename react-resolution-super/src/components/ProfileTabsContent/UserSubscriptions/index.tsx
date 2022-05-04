import React from 'react'
import * as ST from './styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { PurchaseState } from 'types/purchaseSubscription'
import { accessToken, purchase } from 'store/selectors'
import { SubscriptionOffers } from './SubscriptionOffers'
import { ExistingSubscription } from './ExistingSubscription'

export const UserSubscriptions = () => {
  const userPurchase: PurchaseState = useSelector<RootState, PurchaseState>(
    purchase
  )

  const token: string = useSelector<RootState, string>(accessToken)

  return (
    <ST.Wrapper>
      {userPurchase.hasPurchase ? (
        <ExistingSubscription token={token} userPurchase={userPurchase} />
      ) : (
        <SubscriptionOffers token={token} />
      )}
    </ST.Wrapper>
  )
}
