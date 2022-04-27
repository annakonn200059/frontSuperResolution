export interface ISubscription {
  [key: string]: string | number | undefined
  subscription_name?: string
  cost?: number
  subsription_type?: number
  downloads_amount?: number
  description?: string
}

export interface ISubscriptionWithId extends ISubscription {
  id_subscription: number
}

export interface IPatchSubscription {
  idSubscription: number
  args: ISubscription
}

export interface IGetSubscriptions {
  subscriptions: ISubscriptionWithId[]
}

export interface IAddSubscription {
  setSubscriptionList: (res: ISubscriptionWithId) => void
}

export interface IAddSubscriptionsInputs extends IAddSubscription {
  closeModal: () => void
}
