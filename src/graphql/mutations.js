"use strict";
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCustomerMessage = exports.createSession = exports.addOwnerMessage = exports.refreshApiKey = exports.updateApp = exports.removeApp = exports.addApp = exports.createUser = void 0;
exports.createUser = `
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
exports.addApp = `
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
exports.removeApp = `
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
exports.updateApp = `
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
exports.refreshApiKey = `
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
exports.addOwnerMessage = `
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
exports.createSession = `
  mutation CreateSession($apiKey: String!) {
    createSession(apiKey: $apiKey) {
      hash
      messageToken
      sessionToken
    }
  }
`;
exports.addCustomerMessage = `
  mutation AddCustomerMessage($sessionToken: String!, $message: String!) {
    addCustomerMessage(sessionToken: $sessionToken, message: $message)
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0YXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXV0YXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7QUFDcEIsb0JBQW9CO0FBQ3BCLDJEQUEyRDs7O0FBRTlDLFFBQUEsVUFBVSxHQUFpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0E2QnZDLENBQUM7QUFDVyxRQUFBLE1BQU0sR0FBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FtQm5DLENBQUM7QUFDVyxRQUFBLFNBQVMsR0FBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FtQnRDLENBQUM7QUFDVyxRQUFBLFNBQVMsR0FBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTJCdEMsQ0FBQztBQUNXLFFBQUEsYUFBYSxHQUFpQjs7Ozs7Ozs7Ozs7OztDQWExQyxDQUFDO0FBQ1csUUFBQSxlQUFlLEdBQWlCOzs7Ozs7Ozs7Ozs7Ozs7Q0FlNUMsQ0FBQztBQUNXLFFBQUEsYUFBYSxHQUFpQjs7Ozs7Ozs7Q0FRMUMsQ0FBQztBQUNXLFFBQUEsa0JBQWtCLEdBQWlCOzs7O0NBSS9DLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuLyogZXNsaW50LWRpc2FibGUgKi9cbi8vIHRoaXMgaXMgYW4gYXV0byBnZW5lcmF0ZWQgZmlsZS4gVGhpcyB3aWxsIGJlIG92ZXJ3cml0dGVuXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVVc2VyID0gLyogR3JhcGhRTCAqLyBgXG4gIG11dGF0aW9uIENyZWF0ZVVzZXIoXG4gICAgJG1hc3RlclNlY3JldDogU3RyaW5nIVxuICAgICR1c2VybmFtZTogU3RyaW5nIVxuICAgICRhdmF0YXJVcmw6IFN0cmluZyFcbiAgICAkZ2l0aHViSWQ6IFN0cmluZyFcbiAgKSB7XG4gICAgY3JlYXRlVXNlcihcbiAgICAgIG1hc3RlclNlY3JldDogJG1hc3RlclNlY3JldFxuICAgICAgdXNlcm5hbWU6ICR1c2VybmFtZVxuICAgICAgYXZhdGFyVXJsOiAkYXZhdGFyVXJsXG4gICAgICBnaXRodWJJZDogJGdpdGh1YklkXG4gICAgKSB7XG4gICAgICB1c2VySWRcbiAgICAgIGdpdGh1YklkXG4gICAgICB1c2VybmFtZVxuICAgICAgYXZhdGFyVXJsXG4gICAgICBhcHBzIHtcbiAgICAgICAgYXBwSWRcbiAgICAgICAgdXNlcklkXG4gICAgICAgIGFwcE5hbWVcbiAgICAgICAgYXBpS2V5XG4gICAgICAgIHVuc2VhbFxuICAgICAgICBkaXNjb3JkR3VpbGRJZFxuICAgICAgICBzZXNzaW9uVGltZW91dFxuICAgICAgICBhY3RpdmVcbiAgICAgIH1cbiAgICB9XG4gIH1cbmA7XG5leHBvcnQgY29uc3QgYWRkQXBwID0gLyogR3JhcGhRTCAqLyBgXG4gIG11dGF0aW9uIEFkZEFwcCgkbWFzdGVyU2VjcmV0OiBTdHJpbmchLCAkdXNlcklkOiBJRCEsICRhcHBOYW1lOiBTdHJpbmcpIHtcbiAgICBhZGRBcHAobWFzdGVyU2VjcmV0OiAkbWFzdGVyU2VjcmV0LCB1c2VySWQ6ICR1c2VySWQsIGFwcE5hbWU6ICRhcHBOYW1lKSB7XG4gICAgICB1c2VySWRcbiAgICAgIGdpdGh1YklkXG4gICAgICB1c2VybmFtZVxuICAgICAgYXZhdGFyVXJsXG4gICAgICBhcHBzIHtcbiAgICAgICAgYXBwSWRcbiAgICAgICAgdXNlcklkXG4gICAgICAgIGFwcE5hbWVcbiAgICAgICAgYXBpS2V5XG4gICAgICAgIHVuc2VhbFxuICAgICAgICBkaXNjb3JkR3VpbGRJZFxuICAgICAgICBzZXNzaW9uVGltZW91dFxuICAgICAgICBhY3RpdmVcbiAgICAgIH1cbiAgICB9XG4gIH1cbmA7XG5leHBvcnQgY29uc3QgcmVtb3ZlQXBwID0gLyogR3JhcGhRTCAqLyBgXG4gIG11dGF0aW9uIFJlbW92ZUFwcCgkbWFzdGVyU2VjcmV0OiBTdHJpbmchLCAkYXBwSWQ6IElEISkge1xuICAgIHJlbW92ZUFwcChtYXN0ZXJTZWNyZXQ6ICRtYXN0ZXJTZWNyZXQsIGFwcElkOiAkYXBwSWQpIHtcbiAgICAgIHVzZXJJZFxuICAgICAgZ2l0aHViSWRcbiAgICAgIHVzZXJuYW1lXG4gICAgICBhdmF0YXJVcmxcbiAgICAgIGFwcHMge1xuICAgICAgICBhcHBJZFxuICAgICAgICB1c2VySWRcbiAgICAgICAgYXBwTmFtZVxuICAgICAgICBhcGlLZXlcbiAgICAgICAgdW5zZWFsXG4gICAgICAgIGRpc2NvcmRHdWlsZElkXG4gICAgICAgIHNlc3Npb25UaW1lb3V0XG4gICAgICAgIGFjdGl2ZVxuICAgICAgfVxuICAgIH1cbiAgfVxuYDtcbmV4cG9ydCBjb25zdCB1cGRhdGVBcHAgPSAvKiBHcmFwaFFMICovIGBcbiAgbXV0YXRpb24gVXBkYXRlQXBwKFxuICAgICRtYXN0ZXJTZWNyZXQ6IFN0cmluZyFcbiAgICAkYXBwSWQ6IElEIVxuICAgICRkaXNjb3JkR3VpbGRJZDogU3RyaW5nXG4gICAgJGFwcE5hbWU6IFN0cmluZ1xuICAgICRhY3RpdmU6IEJvb2xlYW5cbiAgICAkc2Vzc2lvblRpbWVvdXQ6IEludFxuICApIHtcbiAgICB1cGRhdGVBcHAoXG4gICAgICBtYXN0ZXJTZWNyZXQ6ICRtYXN0ZXJTZWNyZXRcbiAgICAgIGFwcElkOiAkYXBwSWRcbiAgICAgIGRpc2NvcmRHdWlsZElkOiAkZGlzY29yZEd1aWxkSWRcbiAgICAgIGFwcE5hbWU6ICRhcHBOYW1lXG4gICAgICBhY3RpdmU6ICRhY3RpdmVcbiAgICAgIHNlc3Npb25UaW1lb3V0OiAkc2Vzc2lvblRpbWVvdXRcbiAgICApIHtcbiAgICAgIGFwcElkXG4gICAgICB1c2VySWRcbiAgICAgIGFwcE5hbWVcbiAgICAgIGFwaUtleVxuICAgICAgdW5zZWFsXG4gICAgICBkaXNjb3JkR3VpbGRJZFxuICAgICAgc2Vzc2lvblRpbWVvdXRcbiAgICAgIGFjdGl2ZVxuICAgIH1cbiAgfVxuYDtcbmV4cG9ydCBjb25zdCByZWZyZXNoQXBpS2V5ID0gLyogR3JhcGhRTCAqLyBgXG4gIG11dGF0aW9uIFJlZnJlc2hBcGlLZXkoJG1hc3RlclNlY3JldDogU3RyaW5nISwgJGFwcElkOiBJRCEpIHtcbiAgICByZWZyZXNoQXBpS2V5KG1hc3RlclNlY3JldDogJG1hc3RlclNlY3JldCwgYXBwSWQ6ICRhcHBJZCkge1xuICAgICAgYXBwSWRcbiAgICAgIHVzZXJJZFxuICAgICAgYXBwTmFtZVxuICAgICAgYXBpS2V5XG4gICAgICB1bnNlYWxcbiAgICAgIGRpc2NvcmRHdWlsZElkXG4gICAgICBzZXNzaW9uVGltZW91dFxuICAgICAgYWN0aXZlXG4gICAgfVxuICB9XG5gO1xuZXhwb3J0IGNvbnN0IGFkZE93bmVyTWVzc2FnZSA9IC8qIEdyYXBoUUwgKi8gYFxuICBtdXRhdGlvbiBBZGRPd25lck1lc3NhZ2UoXG4gICAgJG1hc3RlclNlY3JldDogU3RyaW5nIVxuICAgICRkaXNjb3JkQ2hhbm5lbElkOiBTdHJpbmchXG4gICAgJG1lc3NhZ2U6IFN0cmluZyFcbiAgKSB7XG4gICAgYWRkT3duZXJNZXNzYWdlKFxuICAgICAgbWFzdGVyU2VjcmV0OiAkbWFzdGVyU2VjcmV0XG4gICAgICBkaXNjb3JkQ2hhbm5lbElkOiAkZGlzY29yZENoYW5uZWxJZFxuICAgICAgbWVzc2FnZTogJG1lc3NhZ2VcbiAgICApIHtcbiAgICAgIGhhc2hcbiAgICAgIG1lc3NhZ2VcbiAgICB9XG4gIH1cbmA7XG5leHBvcnQgY29uc3QgY3JlYXRlU2Vzc2lvbiA9IC8qIEdyYXBoUUwgKi8gYFxuICBtdXRhdGlvbiBDcmVhdGVTZXNzaW9uKCRhcGlLZXk6IFN0cmluZyEpIHtcbiAgICBjcmVhdGVTZXNzaW9uKGFwaUtleTogJGFwaUtleSkge1xuICAgICAgaGFzaFxuICAgICAgbWVzc2FnZVRva2VuXG4gICAgICBzZXNzaW9uVG9rZW5cbiAgICB9XG4gIH1cbmA7XG5leHBvcnQgY29uc3QgYWRkQ3VzdG9tZXJNZXNzYWdlID0gLyogR3JhcGhRTCAqLyBgXG4gIG11dGF0aW9uIEFkZEN1c3RvbWVyTWVzc2FnZSgkc2Vzc2lvblRva2VuOiBTdHJpbmchLCAkbWVzc2FnZTogU3RyaW5nISkge1xuICAgIGFkZEN1c3RvbWVyTWVzc2FnZShzZXNzaW9uVG9rZW46ICRzZXNzaW9uVG9rZW4sIG1lc3NhZ2U6ICRtZXNzYWdlKVxuICB9XG5gO1xuIl19