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
      apiKey
      unseal
      githubId
      username
      avatarUrl
      discordGuildId
      sessionTimeout
    }
  }
`;
export const updateUserDiscordGuild = /* GraphQL */ `
  mutation UpdateUserDiscordGuild(
    $masterSecret: String!
    $userId: ID!
    $discordGuildId: String!
  ) {
    updateUserDiscordGuild(
      masterSecret: $masterSecret
      userId: $userId
      discordGuildId: $discordGuildId
    ) {
      userId
      apiKey
      unseal
      githubId
      username
      avatarUrl
      discordGuildId
      sessionTimeout
    }
  }
`;
export const refreshUserApiKey = /* GraphQL */ `
  mutation RefreshUserApiKey($masterSecret: String!, $userId: ID!) {
    refreshUserApiKey(masterSecret: $masterSecret, userId: $userId)
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
    )
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
export const addMessage = /* GraphQL */ `
  mutation AddMessage($sessionToken: String!, $message: String!) {
    addMessage(sessionToken: $sessionToken, message: $message)
  }
`;
