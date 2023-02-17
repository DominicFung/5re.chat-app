import { createContext, useContext } from "react"

export interface User {}

interface IUserContext {
  user: User | undefined
  setUser: (user: User) => void
}

export const UserContext = createContext<IUserContext>({
  user: undefined,
  setUser(user) {}
})

export const useUserContext = () => useContext(UserContext);