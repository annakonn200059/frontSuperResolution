interface IToolsItems {
  id: number
  toolName: string
  img: string
}

export const AdminTools: IToolsItems[] = [
  { id: 4, toolName: 'userInfo', img: 'user' },
  { id: 0, toolName: 'dashboard', img: 'dashboard' },
  { id: 1, toolName: 'weightsUpload', img: 'weights' },
  { id: 2, toolName: 'subscriptions', img: 'subscriptions' },
  { id: 6, toolName: 'users', img: 'people' },
  //{ id: 3, toolName: 'Promo-codes', img: 'promo' },
]

export const UserTools: IToolsItems[] = [
  { id: 4, toolName: 'userInfo', img: 'user' },
  { id: 5, toolName: 'subscriptions', img: 'subscriptions' },
]
