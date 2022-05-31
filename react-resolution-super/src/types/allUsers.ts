export interface User {
  [key: string]: any
  id: number
  username: string
  email: string
  dateJoined: string
  role: string
}

export interface IGetUsers {
  users: User[]
}
