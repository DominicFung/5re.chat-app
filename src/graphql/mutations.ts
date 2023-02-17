/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $masterSecret: String!
    $username: String!
    $avatarUrl: String
  ) {
    createUser(
      masterSecret: $masterSecret
      username: $username
      avatarUrl: $avatarUrl
    ) {
      userId
      apiKey
      username
      avatarUrl
      discordGuildId
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
      username
      avatarUrl
      discordGuildId
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
export const createConvo = /* GraphQL */ `
  mutation CreateConvo($sessionToken: String!) {
    createConvo(sessionToken: $sessionToken) {
      convoId
      messages {
        userType
        message
      }
    }
  }
`;
export const addMessage = /* GraphQL */ `
  mutation AddMessage(
    $sessionToken: String!
    $convoId: ID!
    $message: String!
  ) {
    addMessage(
      sessionToken: $sessionToken
      convoId: $convoId
      message: $message
    )
  }
`;
