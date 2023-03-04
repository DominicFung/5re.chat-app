import SyntaxHighlighter from 'react-syntax-highlighter'
import { agate as s } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export default function PageOrLayout() {
  return <pre><code className="language-javascript">
      <SyntaxHighlighter language="javascript" customStyle={{background: "rgb(0 0 0 / 0%)"}} style={s}>{
`//@/app/page.tsx
import dynamic from "next/dynamic"
const Chat = dynamic(() => import('./chat'), { ssr: false })

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    ...
    <Chat />
  )
}`}</SyntaxHighlighter>
    </code></pre>
}