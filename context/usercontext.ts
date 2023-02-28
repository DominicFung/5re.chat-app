import { createContext, useContext } from "react"
import { _User } from "@/src/API"

interface IUserContext {
  user: _User | null
  setUser: (user: _User|null) => void
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser(user) {}
})

export const useUserContext = () => useContext(UserContext);