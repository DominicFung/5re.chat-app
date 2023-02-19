/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type _User = {
  __typename: "_User",
  userId: string,
  apiKey: string,
  githubId: string,
  username: string,
  avatarUrl: string,
  discordGuildId: string,
};

export type Convo = {
  __typename: "Convo",
  convoId: string,
  messages?:  Array<Message | null > | null,
};

export type Message = {
  __typename: "Message",
  userType?: UserType | null,
  message?: string | null,
};

export enum UserType {
  OWNER = "OWNER",
  CUSTOMER = "CUSTOMER",
}


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
    githubId: string,
    username: string,
    avatarUrl: string,
    discordGuildId: string,
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
    githubId: string,
    username: string,
    avatarUrl: string,
    discordGuildId: string,
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

export type CreateConvoMutationVariables = {
  sessionToken: string,
};

export type CreateConvoMutation = {
  // 5re.chat
  createConvo:  {
    __typename: "Convo",
    convoId: string,
    messages?:  Array< {
      __typename: "Message",
      userType?: UserType | null,
      message?: string | null,
    } | null > | null,
  },
};

export type AddMessageMutationVariables = {
  sessionToken: string,
  convoId: string,
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
    githubId: string,
    username: string,
    avatarUrl: string,
    discordGuildId: string,
  },
};

export type GetSessionTokenQueryVariables = {
  apiKey: string,
};

export type GetSessionTokenQuery = {
  // 5re.chat
  getSessionToken: string,
};

export type GetConvoQueryVariables = {
  sessionToken: string,
  convoId: string,
};

export type GetConvoQuery = {
  getConvo:  {
    __typename: "Convo",
    convoId: string,
    messages?:  Array< {
      __typename: "Message",
      userType?: UserType | null,
      message?: string | null,
    } | null > | null,
  },
};
