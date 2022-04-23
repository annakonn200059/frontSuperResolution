import React, { useCallback, useEffect, useMemo, useState } from 'react'
import * as ST from './styled'
import { getAllSubscriptions } from 'api/subscription'
import {
  IGetSubscriptions,
  IPatchSubscription,
  ISubscriptionWithId,
} from 'types/subscription'
import { SubscriptionCard } from '../../subscriptionCard'

export const Subscriptions = () => {
  const [allSubscriptions, setAllSubscriptions] = useState<IGetSubscriptions>({
    subscriptions: [],
  })

  const onChangeSubscriptions = useCallback(() => {
    getAllSubscriptions().then((data) => setAllSubscriptions(data))
  }, [allSubscriptions])

  const deleteSubscriptionFromList = useCallback(
    (idSubscription: number) => {
      const newArraySubscriptions: ISubscriptionWithId[] =
        allSubscriptions.subscriptions.filter((subscr) => {
          return subscr.id_subscription !== idSubscription
        })
      setAllSubscriptions({ subscriptions: newArraySubscriptions })
    },
    [allSubscriptions]
  )

  const updateSubscriptionList = useCallback(
    (updatedSubscr: IPatchSubscription) => {
      setAllSubscriptions({
        subscriptions: allSubscriptions.subscriptions.map((subscr) =>
          subscr.id_subscription === updatedSubscr.idSubscription
            ? {
                ...subscr,
                ...updatedSubscr.args,
              }
            : { ...subscr }
        ),
      })
    },
    [allSubscriptions]
  )

  useEffect(() => {
    onChangeSubscriptions()
  }, [])

  return (
    <ST.Container>
      <ST.CardsContainer>
        {allSubscriptions.subscriptions.map((subscription) => (
          <SubscriptionCard
            key={subscription.id_subscription}
            props={subscription}
            isAdmin={true}
            deleteSubscriptionFromList={deleteSubscriptionFromList}
            updateSubscriptionList={updateSubscriptionList}
          />
        ))}
      </ST.CardsContainer>
    </ST.Container>
  )
}
