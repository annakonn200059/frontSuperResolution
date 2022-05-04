import React, { useCallback, useEffect, useState } from 'react'
import { IGetSubscriptions } from '../types/subscription'
import { getAllSubscriptions } from '../api/subscription'

type StringNumberPair = [IGetSubscriptions, (arg: IGetSubscriptions) => void]

export default function useGetAllSubscriptions(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): StringNumberPair {
  const [allSubscriptions, setAllSubscriptions] = useState<IGetSubscriptions>({
    subscriptions: [],
  })

  const onChangeSubscriptions = useCallback(() => {
    getAllSubscriptions()
      .then((data) => setAllSubscriptions(data))
      .finally(() => {
        setLoading(false)
      })
  }, [allSubscriptions])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setLoading(true)
      onChangeSubscriptions()
    }
    return () => {
      isMounted = false
    }
  }, [])

  const getSubscriptions = (subscriptionList: IGetSubscriptions): void =>
    setAllSubscriptions(subscriptionList)

  return [allSubscriptions, getSubscriptions]
}
