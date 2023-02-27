/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $masterSecret: String!
    $username: String!
    $avatarUrl: String!
    $githubId: String!
  ) {
    createUser(
      masterSecret: $masterSecret
      username: $username
      avatarUrl: $avatarUrl
      githubId: $githubId
    ) {
      userId
      githubId
      username
      avatarUrl
      apps {
        appId
        userId
        appName
        apiKey
        unseal
        discordGuildId
        sessionTimeout
        active
      }
    }
  }
`;
export const addApp = /* GraphQL */ `
  mutation AddApp($masterSecret: String!, $userId: ID!, $appName: String) {
    addApp(masterSecret: $masterSecret, userId: $userId, appName: $appName) {
      userId
      githubId
      username
      avatarUrl
      apps {
        appId
        userId
        appName
        apiKey
        unseal
        discordGuildId
        sessionTimeout
        active
      }
    }
  }
`;
export const removeApp = /* GraphQL */ `
  mutation RemoveApp($masterSecret: String!, $appId: ID!) {
    removeApp(masterSecret: $masterSecret, appId: $appId) {
      userId
      githubId
      username
      avatarUrl
      apps {
        appId
        userId
        appName
        apiKey
        unseal
        discordGuildId
        sessionTimeout
        active
      }
    }
  }
`;
export const updateApp = /* GraphQL */ `
  mutation UpdateApp(
    $masterSecret: String!
    $appId: ID!
    $discordGuildId: String
    $appName: String
    $active: Boolean
    $sessionTimeout: Int
  ) {
    updateApp(
      masterSecret: $masterSecret
      appId: $appId
      discordGuildId: $discordGuildId
      appName: $appName
      active: $active
      sessionTimeout: $sessionTimeout
    ) {
      appId
      userId
      appName
      apiKey
      unseal
      discordGuildId
      sessionTimeout
      active
    }
  }
`;
export const refreshApiKey = /* GraphQL */ `
  mutation RefreshApiKey($masterSecret: String!, $appId: ID!) {
    refreshApiKey(masterSecret: $masterSecret, appId: $appId) {
      appId
      userId
      appName
      apiKey
      unseal
      discordGuildId
      sessionTimeout
      active
    }
  }
`;
export const addOwnerMessage = /* GraphQL */ `
  mutation AddOwnerMessage(
    $masterSecret: String!
    $discordChannelId: String!
    $message: String!
  ) {
    addOwnerMessage(
      masterSecret: $masterSecret
      discordChannelId: $discordChannelId
      message: $message
    ) {
      hash
      message
    }
  }
`;
export const createSession = /* GraphQL */ `
  mutation CreateSession($apiKey: String!) {
    createSession(apiKey: $apiKey) {
      hash
      messageToken
      sessionToken
    }
  }
`;
export const addCustomerMessage = /* GraphQL */ `
  mutation AddCustomerMessage($sessionToken: String!, $message: String!) {
    addCustomerMessage(sessionToken: $sessionToken, message: $message)
  }
`;
