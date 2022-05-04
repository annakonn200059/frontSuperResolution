import React, { useCallback, useEffect, useState } from 'react'
import * as ST from './styled'
import { IPatchSubscription, ISubscriptionWithId } from 'types/subscription'
import SubscriptionCard from '../../subscriptionCard'
import { AddSubscription } from './AddSubscription'
import { Preloader } from '../../preloader'
import useGetAllSubscriptions from 'customHooks/useGetAllSubscriptions'

export const Subscriptions = () => {
  const [isLoading, setLoading] = useState(false)
  const [allSubscriptions, setAllSubscriptions] =
    useGetAllSubscriptions(setLoading)

  const addToSubscriptionList = useCallback(
    (res: ISubscriptionWithId) => {
      const copyArr = allSubscriptions.subscriptions.slice()
      copyArr.push(res)
      setAllSubscriptions({ subscriptions: copyArr })
    },
    [allSubscriptions]
  )

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

  return (
    <ST.Container>
      {!isLoading ? (
        <>
          <AddSubscription setSubscriptionList={addToSubscriptionList} />
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
        </>
      ) : (
        <Preloader />
      )}
    </ST.Container>
  )
}
