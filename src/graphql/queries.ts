/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($masterSecret: String!, $userId: ID!) {
    getUser(masterSecret: $masterSecret, userId: $userId) {
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
export const getMessages = /* GraphQL */ `
  query GetMessages($sessionToken: String!) {
    getMessages(sessionToken: $sessionToken) {
      encrypted
    }
  }
`;
