"use client";

import React, { ReactNode, useEffect, useState } from "react"
import { UserContext } from "./usercontext"

import { _UserCookie } from "@/types"
import jscookie from 'js-cookie'

interface IProps {
  children: ReactNode;
}

function parse(queryString: string) {
  var query = {} as { [a:string]: string }
  var pairs = queryString.replace(/^\?/, '').split('&')
  for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query
}

const UserContextProvider = ({ children }: IProps) => {
  const [user, _setUser] = useState<_UserCookie|null>(null)
  const [loading, _setLoading] = useState(true)

  const setUser = (user: _UserCookie|null) => {
    console.log(`conext provider setUser: ${JSON.stringify(user)}`)
    if (user) { jscookie.set("token", user.cookie) }
    _setUser(user)
  }

  const processGithubLogin = async (url: string ) => {
    if (url.split("?").length < 2) return 
    
    const query = parse(url.split("?")[1])
    if (!query['code']) return

    const requestData = { code: query['code'] }
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

    setUser(data)
    
    if (query['state'] && query['state'] === 'getting-started') { window.location.assign("/getting-started") }
  }

  const getUser = async () => {
    const data = await (await fetch(`/api/user`)).json() as _UserCookie | {message: string}
    if ((data as {message: string}).message) { 
      console.log("getting login info from Github ..")
      console.log(data)
      _setLoading(false)
      return
    }
    
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
      console.log("getting login info from Github ..")
      const url = window.location.href
      const hasCode = url.includes("?code=")
      if (hasCode) { processGithubLogin(url) }
    } else {
      console.log(loading)
      console.log(user)
    }
  }, [loading, user])
  
  return (<UserContext.Provider
      value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider