"use client"
import { useUserContext } from "@/context/usercontext"
import { useEffect, useState } from "react"
import secret from "../frontend.secret.json"
import Profile from "./profile"

import Main from '@/content/other/main.mdx'

const _ENV = process.env.NODE_ENV as "development" | "production"

export default function Home() {
  const { user } = useUserContext()

  /**
   * https://discord.com/api/oauth2/authorize?client_id=1077027716156641290&permissions=2147486736&scope=bot%20applications.commands
   * - bot + applications.commands
   * 
   * - Manage Channels
   * - Read Messages / View Channels
   * - Send Messages
   * - Use Slash Commands
   */
  

  return (
    <main className="p-5">
      <Profile />
      <div className='article container mx-auto max-w-4xl mt-10 mb-20'>
        <article className='prose dark:prose-invert max-w-none prose-xl text-center'>
          <Main/>
        </article>
      </div>
    </main>
  )
}
