"use client";

import React, { ReactNode, useEffect, useState } from "react"
import { UserContext } from "./usercontext"

import { _User } from "@/src/API"
import { _UserCookie } from "@/types"

import jscookie from 'js-cookie'

interface IProps {
  children: ReactNode;
}

const UserContextProvider = ({ children }: IProps) => {
  const [user, _setUser] = useState<_User>()
  const [loading, _setLoading] = useState(true)

  const setUser = (user: _User) => { _setUser(user) }

  const processGithubLogin = async (url: string ) => {
    const newUrl = url.split("?code=")

    const requestData = { code: newUrl[1] }
    console.log(JSON.stringify(requestData))
      const data = await (await fetch(`/api/user/github/login`, {
        method: "POST",
        body: JSON.stringify(requestData)
      })).json() as _UserCookie
      
      console.log(data)
      if ((data as any).error?.message == "Unauthorized" || !data) {
        console.log("Unauthorized")
        window.location.assign("/")
        return
      }
  
      jscookie.set("token", data.cookie)
      setUser(data)
  }

  const getUser = async () => {
    const data = await (await fetch(`/api/user`)).json() as _UserCookie | {message: string}
    if ((data as {message: string}).message) { console.log(data); _setLoading(false); return }
    
    const u = data as _UserCookie
    if (u.userId && u.githubId && u.avatarUrl) {
      jscookie.set("token", u.cookie)
      _setUser(u)
    }
  }

  useEffect(() => {
    if (loading && !user) {
      getUser()
    } else if (!loading && !user) {
      const url = window.location.href
      const hasCode = url.includes("?code=")
      if (hasCode) { processGithubLogin(url) }
    }
  }, [loading, user])
  
  return (<UserContext.Provider
      value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider