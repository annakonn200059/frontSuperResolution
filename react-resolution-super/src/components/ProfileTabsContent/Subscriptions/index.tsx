import React, { useCallback, useEffect, useState } from 'react'
import * as ST from './styled'
import { getAllSubscriptions } from 'api/subscription'
import {
  IGetSubscriptions,
  IPatchSubscription,
  ISubscriptionWithId,
} from 'types/subscription'
import SubscriptionCard from '../../subscriptionCard'
import { AddSubscription } from './AddSubscription'
import { Preloader } from '../../preloader'

export const Subscriptions = () => {
  const [allSubscriptions, setAllSubscriptions] = useState<IGetSubscriptions>({
    subscriptions: [],
  })
  const [isLoading, setLoading] = useState(false)

  const onChangeSubscriptions = useCallback(() => {
    getAllSubscriptions()
      .then((data) => setAllSubscriptions(data))
      .finally(() => {
        setLoading(false)
      })
  }, [allSubscriptions])

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

  useEffect(() => {
    setLoading(true)
    onChangeSubscriptions()
  }, [])

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
