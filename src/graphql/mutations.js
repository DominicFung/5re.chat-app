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
      encrypted
    }
  }
`;
exports.createSession = `
  mutation CreateSession($apiKey: String!) {
    createSession(apiKey: $apiKey) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0YXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXV0YXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7QUFDcEIsb0JBQW9CO0FBQ3BCLDJEQUEyRDs7O0FBRTlDLFFBQUEsVUFBVSxHQUFpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0E2QnZDLENBQUM7QUFDVyxRQUFBLE1BQU0sR0FBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FtQm5DLENBQUM7QUFDVyxRQUFBLFNBQVMsR0FBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FtQnRDLENBQUM7QUFDVyxRQUFBLFNBQVMsR0FBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTJCdEMsQ0FBQztBQUNXLFFBQUEsYUFBYSxHQUFpQjs7Ozs7Ozs7Ozs7OztDQWExQyxDQUFDO0FBQ1csUUFBQSxlQUFlLEdBQWlCOzs7Ozs7Ozs7Ozs7OztDQWM1QyxDQUFDO0FBQ1csUUFBQSxhQUFhLEdBQWlCOzs7Ozs7O0NBTzFDLENBQUM7QUFDVyxRQUFBLGtCQUFrQixHQUFpQjs7OztDQUkvQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbi8qIGVzbGludC1kaXNhYmxlICovXG4vLyB0aGlzIGlzIGFuIGF1dG8gZ2VuZXJhdGVkIGZpbGUuIFRoaXMgd2lsbCBiZSBvdmVyd3JpdHRlblxuXG5leHBvcnQgY29uc3QgY3JlYXRlVXNlciA9IC8qIEdyYXBoUUwgKi8gYFxuICBtdXRhdGlvbiBDcmVhdGVVc2VyKFxuICAgICRtYXN0ZXJTZWNyZXQ6IFN0cmluZyFcbiAgICAkdXNlcm5hbWU6IFN0cmluZyFcbiAgICAkYXZhdGFyVXJsOiBTdHJpbmchXG4gICAgJGdpdGh1YklkOiBTdHJpbmchXG4gICkge1xuICAgIGNyZWF0ZVVzZXIoXG4gICAgICBtYXN0ZXJTZWNyZXQ6ICRtYXN0ZXJTZWNyZXRcbiAgICAgIHVzZXJuYW1lOiAkdXNlcm5hbWVcbiAgICAgIGF2YXRhclVybDogJGF2YXRhclVybFxuICAgICAgZ2l0aHViSWQ6ICRnaXRodWJJZFxuICAgICkge1xuICAgICAgdXNlcklkXG4gICAgICBnaXRodWJJZFxuICAgICAgdXNlcm5hbWVcbiAgICAgIGF2YXRhclVybFxuICAgICAgYXBwcyB7XG4gICAgICAgIGFwcElkXG4gICAgICAgIHVzZXJJZFxuICAgICAgICBhcHBOYW1lXG4gICAgICAgIGFwaUtleVxuICAgICAgICB1bnNlYWxcbiAgICAgICAgZGlzY29yZEd1aWxkSWRcbiAgICAgICAgc2Vzc2lvblRpbWVvdXRcbiAgICAgICAgYWN0aXZlXG4gICAgICB9XG4gICAgfVxuICB9XG5gO1xuZXhwb3J0IGNvbnN0IGFkZEFwcCA9IC8qIEdyYXBoUUwgKi8gYFxuICBtdXRhdGlvbiBBZGRBcHAoJG1hc3RlclNlY3JldDogU3RyaW5nISwgJHVzZXJJZDogSUQhLCAkYXBwTmFtZTogU3RyaW5nKSB7XG4gICAgYWRkQXBwKG1hc3RlclNlY3JldDogJG1hc3RlclNlY3JldCwgdXNlcklkOiAkdXNlcklkLCBhcHBOYW1lOiAkYXBwTmFtZSkge1xuICAgICAgdXNlcklkXG4gICAgICBnaXRodWJJZFxuICAgICAgdXNlcm5hbWVcbiAgICAgIGF2YXRhclVybFxuICAgICAgYXBwcyB7XG4gICAgICAgIGFwcElkXG4gICAgICAgIHVzZXJJZFxuICAgICAgICBhcHBOYW1lXG4gICAgICAgIGFwaUtleVxuICAgICAgICB1bnNlYWxcbiAgICAgICAgZGlzY29yZEd1aWxkSWRcbiAgICAgICAgc2Vzc2lvblRpbWVvdXRcbiAgICAgICAgYWN0aXZlXG4gICAgICB9XG4gICAgfVxuICB9XG5gO1xuZXhwb3J0IGNvbnN0IHJlbW92ZUFwcCA9IC8qIEdyYXBoUUwgKi8gYFxuICBtdXRhdGlvbiBSZW1vdmVBcHAoJG1hc3RlclNlY3JldDogU3RyaW5nISwgJGFwcElkOiBJRCEpIHtcbiAgICByZW1vdmVBcHAobWFzdGVyU2VjcmV0OiAkbWFzdGVyU2VjcmV0LCBhcHBJZDogJGFwcElkKSB7XG4gICAgICB1c2VySWRcbiAgICAgIGdpdGh1YklkXG4gICAgICB1c2VybmFtZVxuICAgICAgYXZhdGFyVXJsXG4gICAgICBhcHBzIHtcbiAgICAgICAgYXBwSWRcbiAgICAgICAgdXNlcklkXG4gICAgICAgIGFwcE5hbWVcbiAgICAgICAgYXBpS2V5XG4gICAgICAgIHVuc2VhbFxuICAgICAgICBkaXNjb3JkR3VpbGRJZFxuICAgICAgICBzZXNzaW9uVGltZW91dFxuICAgICAgICBhY3RpdmVcbiAgICAgIH1cbiAgICB9XG4gIH1cbmA7XG5leHBvcnQgY29uc3QgdXBkYXRlQXBwID0gLyogR3JhcGhRTCAqLyBgXG4gIG11dGF0aW9uIFVwZGF0ZUFwcChcbiAgICAkbWFzdGVyU2VjcmV0OiBTdHJpbmchXG4gICAgJGFwcElkOiBJRCFcbiAgICAkZGlzY29yZEd1aWxkSWQ6IFN0cmluZ1xuICAgICRhcHBOYW1lOiBTdHJpbmdcbiAgICAkYWN0aXZlOiBCb29sZWFuXG4gICAgJHNlc3Npb25UaW1lb3V0OiBJbnRcbiAgKSB7XG4gICAgdXBkYXRlQXBwKFxuICAgICAgbWFzdGVyU2VjcmV0OiAkbWFzdGVyU2VjcmV0XG4gICAgICBhcHBJZDogJGFwcElkXG4gICAgICBkaXNjb3JkR3VpbGRJZDogJGRpc2NvcmRHdWlsZElkXG4gICAgICBhcHBOYW1lOiAkYXBwTmFtZVxuICAgICAgYWN0aXZlOiAkYWN0aXZlXG4gICAgICBzZXNzaW9uVGltZW91dDogJHNlc3Npb25UaW1lb3V0XG4gICAgKSB7XG4gICAgICBhcHBJZFxuICAgICAgdXNlcklkXG4gICAgICBhcHBOYW1lXG4gICAgICBhcGlLZXlcbiAgICAgIHVuc2VhbFxuICAgICAgZGlzY29yZEd1aWxkSWRcbiAgICAgIHNlc3Npb25UaW1lb3V0XG4gICAgICBhY3RpdmVcbiAgICB9XG4gIH1cbmA7XG5leHBvcnQgY29uc3QgcmVmcmVzaEFwaUtleSA9IC8qIEdyYXBoUUwgKi8gYFxuICBtdXRhdGlvbiBSZWZyZXNoQXBpS2V5KCRtYXN0ZXJTZWNyZXQ6IFN0cmluZyEsICRhcHBJZDogSUQhKSB7XG4gICAgcmVmcmVzaEFwaUtleShtYXN0ZXJTZWNyZXQ6ICRtYXN0ZXJTZWNyZXQsIGFwcElkOiAkYXBwSWQpIHtcbiAgICAgIGFwcElkXG4gICAgICB1c2VySWRcbiAgICAgIGFwcE5hbWVcbiAgICAgIGFwaUtleVxuICAgICAgdW5zZWFsXG4gICAgICBkaXNjb3JkR3VpbGRJZFxuICAgICAgc2Vzc2lvblRpbWVvdXRcbiAgICAgIGFjdGl2ZVxuICAgIH1cbiAgfVxuYDtcbmV4cG9ydCBjb25zdCBhZGRPd25lck1lc3NhZ2UgPSAvKiBHcmFwaFFMICovIGBcbiAgbXV0YXRpb24gQWRkT3duZXJNZXNzYWdlKFxuICAgICRtYXN0ZXJTZWNyZXQ6IFN0cmluZyFcbiAgICAkZGlzY29yZENoYW5uZWxJZDogU3RyaW5nIVxuICAgICRtZXNzYWdlOiBTdHJpbmchXG4gICkge1xuICAgIGFkZE93bmVyTWVzc2FnZShcbiAgICAgIG1hc3RlclNlY3JldDogJG1hc3RlclNlY3JldFxuICAgICAgZGlzY29yZENoYW5uZWxJZDogJGRpc2NvcmRDaGFubmVsSWRcbiAgICAgIG1lc3NhZ2U6ICRtZXNzYWdlXG4gICAgKSB7XG4gICAgICBlbmNyeXB0ZWRcbiAgICB9XG4gIH1cbmA7XG5leHBvcnQgY29uc3QgY3JlYXRlU2Vzc2lvbiA9IC8qIEdyYXBoUUwgKi8gYFxuICBtdXRhdGlvbiBDcmVhdGVTZXNzaW9uKCRhcGlLZXk6IFN0cmluZyEpIHtcbiAgICBjcmVhdGVTZXNzaW9uKGFwaUtleTogJGFwaUtleSkge1xuICAgICAgbWVzc2FnZVRva2VuXG4gICAgICBzZXNzaW9uVG9rZW5cbiAgICB9XG4gIH1cbmA7XG5leHBvcnQgY29uc3QgYWRkQ3VzdG9tZXJNZXNzYWdlID0gLyogR3JhcGhRTCAqLyBgXG4gIG11dGF0aW9uIEFkZEN1c3RvbWVyTWVzc2FnZSgkc2Vzc2lvblRva2VuOiBTdHJpbmchLCAkbWVzc2FnZTogU3RyaW5nISkge1xuICAgIGFkZEN1c3RvbWVyTWVzc2FnZShzZXNzaW9uVG9rZW46ICRzZXNzaW9uVG9rZW4sIG1lc3NhZ2U6ICRtZXNzYWdlKVxuICB9XG5gO1xuIl19