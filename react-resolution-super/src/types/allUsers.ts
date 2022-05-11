export interface User {
  id: number
  name: string
  email: string
  dateJoined: string
  role: string
}

export interface IGetUsers {
  users: User[]
}
