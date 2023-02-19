/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($masterSecret: String!, $userId: ID!) {
    getUser(masterSecret: $masterSecret, userId: $userId) {
      userId
      apiKey
      githubId
      username
      avatarUrl
      discordGuildId
    }
  }
`;
export const getSessionToken = /* GraphQL */ `
  query GetSessionToken($apiKey: String!) {
    getSessionToken(apiKey: $apiKey)
  }
`;
export const getConvo = /* GraphQL */ `
  query GetConvo($sessionToken: String!, $convoId: ID!) {
    getConvo(sessionToken: $sessionToken, convoId: $convoId) {
      convoId
      messages {
        userType
        message
      }
    }
  }
`;
