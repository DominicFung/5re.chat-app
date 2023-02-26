import { _User } from '../../src/API'

export interface _FlatUser extends _User {
  apps: string[]
}

export interface _Session {
  sessionToken: string,
  unseal: string,
  ttl: number
}
