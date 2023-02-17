/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSessionToken = /* GraphQL */ `
  query GetSessionToken($apiKey: String!) {
    getSessionToken(apiKey: $apiKey)
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($sessionToken: String!) {
    getUser(sessionToken: $sessionToken) {
      username
      avatarUrl
      setupComplete
    }
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
