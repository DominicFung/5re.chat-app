import { createContext, useContext } from "react"
import { _User } from "@/src/API"

interface IUserContext {
  user: _User | undefined
  setUser: (user: _User) => void
}

export const UserContext = createContext<IUserContext>({
  user: undefined,
  setUser(user) {}
})

export const useUserContext = () => useContext(UserContext);