import React, { useState } from 'react'
import useGetAllSubscriptions from 'customHooks/useGetAllSubscriptions'
import * as ST from './styled'
import SubscriptionCard from '../../../subscriptionCard'
import { Carousel } from '../../../ui/Carousel'
import { buySubscription } from 'api/userPurchase'
import { Preloader } from '../../../preloader'
import { COLORS } from '../../../../constants/colors'
import { useTranslation } from 'react-i18next'

interface ISubscriptionOffers {
  token: string
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

export const SubscriptionOffers = ({ token }: ISubscriptionOffers) => {
  const { t } = useTranslation(['profile'])
  const [isLoading, setLoading] = useState<boolean>(false)
  const [allSubscriptions, setAllSubscriptions] =
    useGetAllSubscriptions(setLoading)

  const onBuySubscription = (idSubscription: number): Promise<any> => {
    return buySubscription(token, idSubscription)
  }
  //TODO check another way of displaying preloader

  return (
    <>
      <ST.CardsContainer>
        {!isLoading ? (
          <>
            <ST.OffersHeader>
              {t('youHave')}
              <span style={{ color: `${COLORS.yellow}` }}>
                {t('noSubscription')}
              </span>
              <ST.SubHeader> {t('choose')}</ST.SubHeader>
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
