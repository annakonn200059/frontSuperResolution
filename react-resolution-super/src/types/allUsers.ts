export interface User {
  id: number
  username: string
  email: string
  dateJoined: string
  role: string
}

export interface IGetUsers {
  users: User[]
}
