"use client";

import React, { ReactNode, useState } from "react";
import { UserContext, User } from "./usercontext";

interface IProps {
  children: ReactNode;
}

const UserContextProvider = ({ children }: IProps) => {
  const [user, _setUser] = useState<User>()
  const setUser = (user: User) => { _setUser(user) }
  
  return (<UserContext.Provider
      value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider