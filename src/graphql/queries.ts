/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($masterSecret: String!, $userId: ID!) {
    getUser(masterSecret: $masterSecret, userId: $userId) {
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
export const viewConvo = /* GraphQL */ `
  query ViewConvo($masterSecret: String!, $convoId: ID!) {
    viewConvo(masterSecret: $masterSecret, convoId: $convoId) {
      appId
      convoId
      apiKeyUsed
      discordGuildId
      messageToken
      sessionStartTime
      discordChannelId
      messages {
        sendDate
        userType
        message
      }
    }
  }
`;
export const viewMessages = /* GraphQL */ `
  query ViewMessages($masterSecret: String!, $convoId: ID!) {
    viewMessages(masterSecret: $masterSecret, convoId: $convoId) {
      sendDate
      userType
      message
    }
  }
`;
export const getMessages = /* GraphQL */ `
  query GetMessages($sessionToken: String!) {
    getMessages(sessionToken: $sessionToken) {
      encrypted
    }
  }
`;
