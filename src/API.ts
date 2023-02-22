/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type _User = {
  __typename: "_User",
  userId: string,
  githubId: string,
  username: string,
  avatarUrl: string,
  apps:  Array<_App | null >,
};

export type _App = {
  __typename: "_App",
  appId: string,
  appName: string,
  apiKey: string,
  unseal: string,
  discordGuildId: string,
  sessionTimeout: number,
};

export type Message = {
  __typename: "Message",
  encrypted: string,
};

export type Convo = {
  __typename: "Convo",
  messageToken: string,
  // use to decrypt messages for this session.
  sessionToken: string,
};

export type _Convo = {
  __typename: "_Convo",
  appId: string,
  convoId: string,
  apiKeyUsed: string,
  messageToken: string,
  sessionStartTime: string,
  discordChannelId: string,
  messages:  Array<_Message | null >,
};

export type _Message = {
  __typename: "_Message",
  sendDate: string,
  userType: UserType,
  message: string,
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
    githubId: string,
    username: string,
    avatarUrl: string,
    apps:  Array< {
      __typename: "_App",
      appId: string,
      appName: string,
      apiKey: string,
      unseal: string,
      discordGuildId: string,
      sessionTimeout: number,
    } | null >,
  },
};

export type UpdateUserDiscordGuildMutationVariables = {
  masterSecret: string,
  appId: string,
  discordGuildId: string,
};

export type UpdateUserDiscordGuildMutation = {
  // TODO: add App / remove App
  updateUserDiscordGuild:  {
    __typename: "_User",
    userId: string,
    githubId: string,
    username: string,
    avatarUrl: string,
    apps:  Array< {
      __typename: "_App",
      appId: string,
      appName: string,
      apiKey: string,
      unseal: string,
      discordGuildId: string,
      sessionTimeout: number,
    } | null >,
  },
};

export type RefreshUserApiKeyMutationVariables = {
  masterSecret: string,
  appId: string,
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
  addOwnerMessage:  {
    __typename: "Message",
    encrypted: string,
  },
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

export type AddCustomerMessageMutationVariables = {
  appId: string,
  sessionToken: string,
  message: string,
};

export type AddCustomerMessageMutation = {
  addCustomerMessage: string,
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
    githubId: string,
    username: string,
    avatarUrl: string,
    apps:  Array< {
      __typename: "_App",
      appId: string,
      appName: string,
      apiKey: string,
      unseal: string,
      discordGuildId: string,
      sessionTimeout: number,
    } | null >,
  },
};

export type ViewConvoQueryVariables = {
  masterSecret: string,
  convoId: string,
};

export type ViewConvoQuery = {
  viewConvo:  {
    __typename: "_Convo",
    appId: string,
    convoId: string,
    apiKeyUsed: string,
    messageToken: string,
    sessionStartTime: string,
    discordChannelId: string,
    messages:  Array< {
      __typename: "_Message",
      sendDate: string,
      userType: UserType,
      message: string,
    } | null >,
  },
};

export type ViewMessagesQueryVariables = {
  masterSecret: string,
  convoId: string,
};

export type ViewMessagesQuery = {
  viewMessages:  Array< {
    __typename: "_Message",
    sendDate: string,
    userType: UserType,
    message: string,
  } | null >,
};

export type GetMessagesQueryVariables = {
  appId: string,
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

export type OnMessageSubscriptionVariables = {
  appId: string,
  sessionToken: string,
};

export type OnMessageSubscription = {
  // 5re.chat app
  // convoCount(sessionToken: String!): Int! @aws_subscribe(mutations: ["createSession"])
  // messageCount(sessionToken: String!): Message! @aws_subscribe(mutations: ["addOwnerMessage"])
  // 5re.chat
  onMessage:  {
    __typename: "Message",
    encrypted: string,
  },
};
