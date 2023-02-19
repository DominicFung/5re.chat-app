/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type _User = {
  __typename: "_User",
  userId: string,
  apiKey: string,
  unseal: string,
  githubId: string,
  username: string,
  avatarUrl: string,
  // Setup
  discordGuildId: string,
  sessionTimeout: number,
};

export type Convo = {
  __typename: "Convo",
  messageToken: string,
  // use to decrypt messages for this session.
  sessionToken: string,
};

export type Message = {
  __typename: "Message",
  encrypted: string,
};

export type CreateUserMutationVariables = {
  masterSecret: string,
  username: string,
  avatarUrl: string,
  githubId: string,
};

export type CreateUserMutation = {
  // 5re.chat app
  createUser:  {
    __typename: "_User",
    userId: string,
    apiKey: string,
    unseal: string,
    githubId: string,
    username: string,
    avatarUrl: string,
    // Setup
    discordGuildId: string,
    sessionTimeout: number,
  },
};

export type UpdateUserDiscordGuildMutationVariables = {
  masterSecret: string,
  userId: string,
  discordGuildId: string,
};

export type UpdateUserDiscordGuildMutation = {
  updateUserDiscordGuild:  {
    __typename: "_User",
    userId: string,
    apiKey: string,
    unseal: string,
    githubId: string,
    username: string,
    avatarUrl: string,
    // Setup
    discordGuildId: string,
    sessionTimeout: number,
  },
};

export type RefreshUserApiKeyMutationVariables = {
  masterSecret: string,
  userId: string,
};

export type RefreshUserApiKeyMutation = {
  refreshUserApiKey: string,
};

export type AddOwnerMessageMutationVariables = {
  masterSecret: string,
  discordChannelId: string,
  message: string,
};

export type AddOwnerMessageMutation = {
  addOwnerMessage: string,
};

export type CreateSessionMutationVariables = {
  apiKey: string,
};

export type CreateSessionMutation = {
  // 5re.chat
  createSession:  {
    __typename: "Convo",
    messageToken: string,
    // use to decrypt messages for this session.
    sessionToken: string,
  },
};

export type AddMessageMutationVariables = {
  sessionToken: string,
  message: string,
};

export type AddMessageMutation = {
  addMessage: string,
};

export type GetUserQueryVariables = {
  masterSecret: string,
  userId: string,
};

export type GetUserQuery = {
  // 5re.chat app
  getUser:  {
    __typename: "_User",
    userId: string,
    apiKey: string,
    unseal: string,
    githubId: string,
    username: string,
    avatarUrl: string,
    // Setup
    discordGuildId: string,
    sessionTimeout: number,
  },
};

export type GetMessagesQueryVariables = {
  sessionToken: string,
};

export type GetMessagesQuery = {
  // 5re.chat
  // - sessionToken will have sealed the convoId
  getMessages:  Array< {
    __typename: "Message",
    encrypted: string,
  } | null >,
};
