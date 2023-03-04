'use client'

import { useUserContext } from "@/context/usercontext"

import SyntaxHighlighter from 'react-syntax-highlighter'
import { agate as s } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export default function ApiKey() {
  const { user } = useUserContext()

  return <pre><code className="language-javascript">
      <SyntaxHighlighter language="javascript" customStyle={{background: "rgb(0 0 0 / 0%)"}} style={s}>{`// @/app/chat.tsx
"use client"

import { FireChat } from "@domfung/5re.chat"

export default function Chat() {
  return <FireChat apiKey="5rc_${user?.apps[0]?.apiKey}" 
    convoStarter={"Welcome to 🔥 Chat! This is a testing implementation, please do NOT enter any personal (sensitive) info or profane text. You can add yourself to our discord server and view it at work!"}
    avatarImageUrl="https://avatars.githubusercontent.com/oa/2112735?s=140&amp;u=88a6f5c863be9c943fd6e24dc0f12fb83e107b09&amp;v=4"
  />
}`}</SyntaxHighlighter>
    </code></pre>
}