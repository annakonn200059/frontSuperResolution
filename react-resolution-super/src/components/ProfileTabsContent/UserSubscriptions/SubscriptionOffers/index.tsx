import React, { useState } from 'react'
import useGetAllSubscriptions from 'customHooks/useGetAllSubscriptions'
import * as ST from './styled'
import SubscriptionCard from '../../../subscriptionCard'
import { Carousel } from '../../../ui/Carousel'
import { buySubscription } from 'api/userPurchase'
import { Preloader } from '../../../preloader'

interface ISubscriptionOffers {
  token: string
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

export const SubscriptionOffers = ({ token }: ISubscriptionOffers) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [allSubscriptions, setAllSubscriptions] =
    useGetAllSubscriptions(setLoading)

  const onBuySubscription = (idSubscription: number): Promise<any> => {
    return buySubscription(token, idSubscription)
  }

  return (
    <>
      <ST.CardsContainer>
        {!isLoading ? (
          <>
            <ST.OffersHeader>
              You have no subscription
              <ST.SubHeader>Choose from ones below</ST.SubHeader>
            </ST.OffersHeader>
            <ST.CarouselWrapper>
              <Carousel show={1} infiniteLoop={true}>
                {allSubscriptions.subscriptions.map((subscription) => (
                  <SubscriptionCard
                    key={subscription.id_subscription}
                    props={subscription}
                    isAdmin={false}
                    shouldNotTransform={true}
                    onBuySubscription={() =>
                      onBuySubscription(subscription.id_subscription)
                    }
                  />
                ))}
              </Carousel>
            </ST.CarouselWrapper>
          </>
        ) : (
          <Preloader />
        )}
      </ST.CardsContainer>
    </>
  )
}
