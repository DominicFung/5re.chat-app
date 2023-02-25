import { _User } from "./src/API"

export interface GithubUser {
  avatar_url: string,
  name: string,
  html_url: string,
  public_repos: string,
  followers: string
  following: string
}

export interface _UserCookie extends _User {
  cookie: string
}