import UserContextProvider from '@/context/userprovider'
import './globals.css'
import Navbar from './navbar'

import dynamic from "next/dynamic"
const Chat = dynamic(() => import('./chat'), { ssr: false })

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark:bg-gray-900 bg-gray-50'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <UserContextProvider>
          <Navbar />
          {children}
          {/** https://stackoverflow.com/questions/66096260/why-am-i-getting-referenceerror-self-is-not-defined-when-i-import-a-client-side */}
          <Chat />
        </UserContextProvider>
      </body>
    </html>
  )
}
