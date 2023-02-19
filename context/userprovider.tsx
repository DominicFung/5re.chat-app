"use client";

import React, { ReactNode, useState } from "react"
import { UserContext } from "./usercontext"

import { _User } from "@/src/API";

interface IProps {
  children: ReactNode;
}

const UserContextProvider = ({ children }: IProps) => {
  const [user, _setUser] = useState<_User>()
  const setUser = (user: _User) => { _setUser(user) }
  
  return (<UserContext.Provider
      value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider