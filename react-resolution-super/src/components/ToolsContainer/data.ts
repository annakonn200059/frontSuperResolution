interface IToolsItems {
  id: number
  toolName: string
  img: string
}

export const AdminTools: IToolsItems[] = [
  { id: 0, toolName: 'Dashboard', img: 'dashboard' },
  { id: 1, toolName: 'Weights upload', img: 'weights' },
  { id: 2, toolName: 'Subscriptions', img: 'subscriptions' },
  { id: 3, toolName: 'Promo-codes', img: 'promo' },
]

export const UserTools: IToolsItems[] = [
  { id: 4, toolName: 'User info', img: 'user' },
  { id: 5, toolName: 'Subscriptions', img: 'subscriptions' },
]
