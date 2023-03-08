import { createContext, useContext } from "react"
import { _UserCookie } from "@/types"

interface IUserContext {
  user: _UserCookie | null
  setUser: (user: _UserCookie|null) => void
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser(user) {}
})

export const useUserContext = () => useContext(UserContext);