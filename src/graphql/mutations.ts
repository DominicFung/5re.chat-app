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
        appName
        apiKey
        unseal
        discordGuildId
        sessionTimeout
      }
    }
  }
`;
export const updateUserDiscordGuild = /* GraphQL */ `
  mutation UpdateUserDiscordGuild(
    $masterSecret: String!
    $appId: ID!
    $discordGuildId: String!
  ) {
    updateUserDiscordGuild(
      masterSecret: $masterSecret
      appId: $appId
      discordGuildId: $discordGuildId
    ) {
      userId
      githubId
      username
      avatarUrl
      apps {
        appId
        appName
        apiKey
        unseal
        discordGuildId
        sessionTimeout
      }
    }
  }
`;
export const refreshUserApiKey = /* GraphQL */ `
  mutation RefreshUserApiKey($masterSecret: String!, $appId: ID!) {
    refreshUserApiKey(masterSecret: $masterSecret, appId: $appId)
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
      encrypted
    }
  }
`;
export const createSession = /* GraphQL */ `
  mutation CreateSession($apiKey: String!) {
    createSession(apiKey: $apiKey) {
      messageToken
      sessionToken
    }
  }
`;
export const addCustomerMessage = /* GraphQL */ `
  mutation AddCustomerMessage(
    $appId: String!
    $sessionToken: String!
    $message: String!
  ) {
    addCustomerMessage(
      appId: $appId
      sessionToken: $sessionToken
      message: $message
    )
  }
`;
